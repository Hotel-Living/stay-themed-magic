
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  console.log('=== JOTFORM HOTEL SUBMISSION WEBHOOK ===');
  console.log('Request method:', req.method);
  console.log('Request URL:', req.url);
  console.log('User-Agent:', req.headers.get('User-Agent') || '');
  console.log('Content-Type:', req.headers.get('Content-Type') || '');

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  try {
    const contentType = req.headers.get('content-type') || '';
    console.log('Parsing multipart/form-data');
    
    // Parse multipart form data
    const formData = await req.formData();
    
    // Log form data keys for debugging
    const formDataKeys = Array.from(formData.keys());
    console.log('Form data keys:', formDataKeys);
    
    // Extract rawRequest which contains the structured form data
    const rawRequestStr = formData.get('rawRequest') as string;
    if (!rawRequestStr) {
      throw new Error('No rawRequest found in form data');
    }
    
    console.log('Successfully parsed rawRequest JSON');
    const parsedData = JSON.parse(rawRequestStr);
    
    // Log parsed data keys for debugging
    const parsedDataKeys = Object.keys(parsedData);
    console.log('Parsed data keys:', parsedDataKeys);

    // Store raw data for debugging
    const { error: rawError } = await supabase
      .from('jotform_raw')
      .insert({
        raw_body: rawRequestStr,
        headers: Object.fromEntries(req.headers.entries()),
        content_type: contentType,
        parse_method: 'multipart-json',
        user_agent: req.headers.get('User-Agent') || null,
        parsed_data: parsedData
      });

    if (rawError) {
      console.error('Error storing raw data:', rawError);
    }

    // Extract user token from localStorage (sent via JotForm)
    const userToken = parsedData.user_token || null;
    let userId = null;

    if (userToken) {
      // Get user ID from token
      const { data: tokenData, error: tokenError } = await supabase
        .rpc('get_user_from_jotform_token', { token: userToken });
      
      if (!tokenError && tokenData) {
        userId = tokenData;
        console.log('Found user ID from token:', userId);
      } else {
        console.log('Could not resolve user from token:', tokenError);
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
      // Features
      features_hotel: parsedData.q17_instalacionesY || {},
      features_room: parsedData.q18_serviciosEn || {},
      // Activities and themes
      activities: parsedData.q20_atraigaA20 || parsedData.q52_atraigaA || parsedData.q41_atraigaA41 || [],
      themes: [], // Will be processed separately
      // Room types and pricing
      room_types: parsedData.q21_descripcionDe21 || [],
      rates: parsedData.q47_tarifas47 ? { default: parseInt(parsedData.q47_tarifas47) } : {},
      // Additional service info
      terms: parsedData.q24_elServicio || '',
      preferredWeekday: parsedData.q26_cualEs26 || 'Monday',
      // File uploads
      images: parsedData.file || []
    };

    console.log('Mapped hotel data:', hotelData);

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
      console.error('Error creating hotel:', hotelError);
      throw hotelError;
    }

    console.log('Hotel created successfully:', hotel.id);

    // Process activities if provided
    if (hotelData.activities && Array.isArray(hotelData.activities) && hotelData.activities.length > 0) {
      for (const activityName of hotelData.activities) {
        // Find or create activity
        const { data: activity } = await supabase
          .from('activities')
          .select('id')
          .eq('name', activityName)
          .single();

        if (activity) {
          // Link hotel to activity
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
        // Find or create theme
        const { data: theme } = await supabase
          .from('themes')
          .select('id')
          .eq('name', themeName)
          .single();

        if (theme) {
          // Link hotel to theme
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
              is_main: i === 0 // First image is main
            });
        }
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Hotel submission processed successfully',
        hotel_id: hotel.id,
        user_id: userId
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error processing JotForm submission:', error);
    
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
