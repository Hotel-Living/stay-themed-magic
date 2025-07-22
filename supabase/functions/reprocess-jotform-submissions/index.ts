
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  console.log('=== JOTFORM REPROCESS SUBMISSIONS ===');

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  try {
    // Get all raw JotForm submissions that haven't been processed successfully
    const { data: rawSubmissions, error: fetchError } = await supabase
      .from('jotform_raw')
      .select('*')
      .not('parsed_data', 'is', null)
      .order('created_at', { ascending: false });

    if (fetchError) {
      throw fetchError;
    }

    console.log(`Found ${rawSubmissions.length} raw submissions to process`);

    let processed = 0;
    let errors = 0;

    for (const submission of rawSubmissions) {
      try {
        const parsedData = submission.parsed_data;
        console.log(`Processing submission: ${submission.id}`);

        // Check if hotel already exists for this submission
        const hotelName = parsedData.q2_typeA || '';
        const contactEmail = parsedData.q30_typeA30 || '';
        
        if (!hotelName && !contactEmail) {
          console.log(`Skipping submission ${submission.id} - no name or email`);
          continue;
        }

        // Check for existing hotel
        const { data: existingHotel } = await supabase
          .from('hotels')
          .select('id')
          .or(`name.eq.${hotelName},contact_email.eq.${contactEmail}`)
          .single();

        if (existingHotel) {
          console.log(`Hotel already exists for submission ${submission.id}`);
          continue;
        }

        // Extract user token and resolve user ID
        const userToken = parsedData.user_token || null;
        let userId = null;

        if (userToken) {
          const { data: tokenData, error: tokenError } = await supabase
            .rpc('get_user_from_jotform_token', { token: userToken });
          
          if (!tokenError && tokenData) {
            userId = tokenData;
          }
        }

        // Map JotForm fields to hotel data structure
        const hotelData = {
          name: parsedData.q2_typeA || '',
          description: parsedData.q13_descripcionDel || '',
          country: parsedData.q5_direccionFisica?.country || parsedData.dropdown_search || '',
          city: parsedData.q5_direccionFisica?.city || '',
          address: parsedData.q5_direccionFisica?.addr_line1 || '',
          contact_name: parsedData.q28_typeA28 || '',
          contact_email: parsedData.q30_typeA30 || '',
          contact_phone: parsedData.q39_typeA39 || '',
          price_per_month: parseInt(parsedData.q47_tarifas47) || 0,
          category: parseInt(parsedData.q4_categoriaOficial) || 1,
          property_type: parsedData.q11_tipoDe || '',
          style: parsedData.q12_estiloDel || '',
          ideal_guests: parsedData.q14_ltstronggtltemgtesIdeal || '',
          atmosphere: parsedData.q15_ltstronggtltemgtelAmbiente || '',
          perfect_location: parsedData.q16_ltstronggtltemgtlaUbicacion || '',
          available_months: parsedData.q22_elijaSu ? 
            (Array.isArray(parsedData.q22_elijaSu) ? parsedData.q22_elijaSu : [parsedData.q22_elijaSu]) : [],
          meal_plans: parsedData.q23_planDe ? 
            (Array.isArray(parsedData.q23_planDe) ? parsedData.q23_planDe : [parsedData.q23_planDe]) : [],
          main_image_url: null,
          owner_id: userId,
          status: 'pending' as const,
          features_hotel: parsedData.q17_instalacionesY || {},
          features_room: parsedData.q18_serviciosEn || {},
          activities: parsedData.q20_atraigaA20 || parsedData.q52_atraigaA || parsedData.q41_atraigaA41 || [],
          room_types: parsedData.q21_descripcionDe21 || [],
          rates: parsedData.q47_tarifas47 ? { default: parseInt(parsedData.q47_tarifas47) } : {},
          terms: parsedData.q24_elServicio || '',
          preferredWeekday: parsedData.q26_cualEs26 || 'Monday',
          images: parsedData.file || []
        };

        // Insert hotel into database
        const { data: hotel, error: hotelError } = await supabase
          .from('hotels')
          .insert({
            name: hotelData.name,
            description: hotelData.description,
            country: hotelData.country,
            city: hotelData.city,
            address: hotelData.address,
            contact_name: hotelData.contact_name,
            contact_email: hotelData.contact_email,
            contact_phone: hotelData.contact_phone,
            price_per_month: hotelData.price_per_month,
            category: hotelData.category,
            property_type: hotelData.property_type,
            style: hotelData.style,
            ideal_guests: hotelData.ideal_guests,
            atmosphere: hotelData.atmosphere,
            perfect_location: hotelData.perfect_location,
            available_months: hotelData.available_months,
            meal_plans: hotelData.meal_plans,
            main_image_url: hotelData.main_image_url,
            owner_id: hotelData.owner_id,
            status: hotelData.status,
            features_hotel: hotelData.features_hotel,
            features_room: hotelData.features_room,
            room_types: hotelData.room_types,
            rates: hotelData.rates,
            terms: hotelData.terms,
            preferredWeekday: hotelData.preferredWeekday
          })
          .select()
          .single();

        if (hotelError) {
          console.error(`Error creating hotel for submission ${submission.id}:`, hotelError);
          errors++;
          continue;
        }

        console.log(`Hotel created successfully for submission ${submission.id}: ${hotel.id}`);
        processed++;

        // Process activities if provided
        if (hotelData.activities && Array.isArray(hotelData.activities) && hotelData.activities.length > 0) {
          for (const activityName of hotelData.activities) {
            const { data: activity } = await supabase
              .from('activities')
              .select('id')
              .eq('name', activityName)
              .single();

            if (activity) {
              await supabase
                .from('hotel_activities')
                .insert({
                  hotel_id: hotel.id,
                  activity_id: activity.id
                });
            }
          }
        }

        // Process themes if provided
        if (hotelData.themes && Array.isArray(hotelData.themes) && hotelData.themes.length > 0) {
          for (const themeName of hotelData.themes) {
            const { data: theme } = await supabase
              .from('themes')
              .select('id')
              .eq('name', themeName)
              .single();

            if (theme) {
              await supabase
                .from('hotel_themes')
                .insert({
                  hotel_id: hotel.id,
                  theme_id: theme.id
                });
            }
          }
        }

        // Process images if provided
        if (hotelData.images && Array.isArray(hotelData.images) && hotelData.images.length > 0) {
          for (let i = 0; i < hotelData.images.length; i++) {
            const imageUrl = hotelData.images[i];
            if (imageUrl) {
              await supabase
                .from('hotel_images')
                .insert({
                  hotel_id: hotel.id,
                  image_url: imageUrl,
                  is_main: i === 0
                });
            }
          }
        }

      } catch (error) {
        console.error(`Error processing submission ${submission.id}:`, error);
        errors++;
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Reprocessing completed. Processed: ${processed}, Errors: ${errors}`,
        processed,
        errors
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error reprocessing JotForm submissions:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Unknown error occurred'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
