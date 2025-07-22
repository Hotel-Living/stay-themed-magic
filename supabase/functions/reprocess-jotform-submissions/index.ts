
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  console.log("=== REPROCESSING JOTFORM SUBMISSIONS ===");

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get all raw submissions that haven't been processed successfully
    const { data: rawSubmissions, error: fetchError } = await supabase
      .from('jotform_raw')
      .select('*')
      .order('created_at', { ascending: false });

    if (fetchError) {
      throw fetchError;
    }

    console.log(`Found ${rawSubmissions?.length || 0} raw submissions to process`);

    let processed = 0;
    let errors = 0;

    for (const submission of rawSubmissions || []) {
      try {
        console.log(`Processing submission ${submission.id}`);
        
        let parsedData = submission.parsed_data;
        
        // If no parsed_data, try to parse from raw_body
        if (!parsedData && submission.raw_body) {
          if (submission.content_type.includes('multipart/form-data')) {
            // For multipart data, we need to extract the rawRequest
            const lines = submission.raw_body.split('\n');
            let rawRequestLine = lines.find(line => line.startsWith('rawRequest:'));
            if (rawRequestLine) {
              const jsonStr = rawRequestLine.replace('rawRequest:', '').trim();
              parsedData = JSON.parse(jsonStr);
            }
          } else {
            const urlParams = new URLSearchParams(submission.raw_body);
            const formObject: any = {};
            for (const [key, value] of urlParams.entries()) {
              formObject[key] = value;
            }
            
            if (formObject.rawRequest) {
              parsedData = JSON.parse(formObject.rawRequest);
            } else {
              parsedData = formObject;
            }
          }
        }

        if (!parsedData || typeof parsedData !== 'object') {
          console.log(`Skipping submission ${submission.id} - no valid data`);
          continue;
        }

        // Map JotForm fields to hotel data
        const hotelData = {
          name: parsedData.q1_hotelName || parsedData.q1_nombre || '',
          description: parsedData.q2_description || parsedData.q2_descripcion || '',
          country: parsedData.q3_country || parsedData.q3_pais || '',
          city: parsedData.q4_city || parsedData.q4_ciudad || '',
          address: parsedData.q5_address || parsedData.q5_direccion || '',
          contact_name: parsedData.q6_contactName || parsedData.q6_nombreContacto || '',
          contact_email: parsedData.q7_contactEmail || parsedData.q7_emailContacto || '',
          contact_phone: parsedData.q8_contactPhone || parsedData.q8_telefonoContacto || '',
          price_per_month: parseInt(parsedData.q9_pricePerMonth || parsedData.q9_precioPorMes || '0'),
          category: parseInt(parsedData.q10_category || parsedData.q10_categoria || '1'),
          property_type: parsedData.q11_propertyType || parsedData.q11_tipoPropiedad || '',
          ideal_guests: parsedData.q12_idealGuests || parsedData.q12_huespedesIdeales || '',
          atmosphere: parsedData.q13_atmosphere || parsedData.q13_atmosfera || '',
          perfect_location: parsedData.q14_perfectLocation || parsedData.q14_ubicacionPerfecta || '',
          available_months: parsedData.q15_availableMonths ? 
            (Array.isArray(parsedData.q15_availableMonths) ? parsedData.q15_availableMonths : [parsedData.q15_availableMonths]) : 
            [],
          meal_plans: parsedData.q16_mealPlans ? 
            (Array.isArray(parsedData.q16_mealPlans) ? parsedData.q16_mealPlans : [parsedData.q16_mealPlans]) : 
            [],
          main_image_url: parsedData.q17_mainImage || parsedData.q17_imagenPrincipal || null,
          status: 'pending'
        };

        // Skip if essential fields are missing
        if (!hotelData.name || !hotelData.country || !hotelData.city) {
          console.log(`Skipping submission ${submission.id} - missing essential fields`);
          continue;
        }

        // Check if hotel already exists based on name and location
        const { data: existingHotel } = await supabase
          .from('hotels')
          .select('id')
          .eq('name', hotelData.name)
          .eq('country', hotelData.country)
          .eq('city', hotelData.city)
          .single();

        if (existingHotel) {
          console.log(`Hotel already exists for submission ${submission.id}`);
          continue;
        }

        // Insert hotel record
        const { data: hotel, error: hotelError } = await supabase
          .from('hotels')
          .insert(hotelData)
          .select()
          .single();

        if (hotelError) {
          console.error(`Error inserting hotel for submission ${submission.id}:`, hotelError);
          errors++;
          continue;
        }

        console.log(`Successfully created hotel ${hotel.id} from submission ${submission.id}`);
        processed++;

      } catch (error) {
        console.error(`Error processing submission ${submission.id}:`, error);
        errors++;
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        processed,
        errors,
        total: rawSubmissions?.length || 0,
        message: `Reprocessed ${processed} submissions with ${errors} errors`
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error: any) {
    console.error("Reprocessing error:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
