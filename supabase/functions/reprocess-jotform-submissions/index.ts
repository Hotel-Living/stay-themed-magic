
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

    // Get all raw JotForm submissions
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
    const results = [];

    for (const submission of rawSubmissions || []) {
      try {
        console.log(`Processing submission ${submission.id}`);
        
        const parsedData = submission.parsed_data || {};
        
        // Skip if no meaningful data
        if (!parsedData.q2_typeA && !parsedData.q13_descripcionDel) {
          console.log("Skipping submission with no hotel data");
          continue;
        }

        // Check if hotel already exists for this submission
        const existingHotelName = String(parsedData.q2_typeA || '').trim();
        if (existingHotelName) {
          const { data: existingHotel } = await supabase
            .from('hotels')
            .select('id, name, owner_id')
            .eq('name', existingHotelName)
            .single();

          if (existingHotel && existingHotelName !== 'Unnamed Hotel') {
            console.log(`Hotel "${existingHotelName}" already exists, updating it`);
            
            // Update existing hotel with complete data
            const mappedData = mapJotFormData(parsedData);
            const dbHotelData = {
              ...mappedData,
              features_hotel: mappedData.features_hotel.length > 0 ? 
                mappedData.features_hotel.reduce((acc, feature) => ({ ...acc, [feature]: true }), {}) : {},
              features_room: mappedData.features_room.length > 0 ? 
                mappedData.features_room.reduce((acc, feature) => ({ ...acc, [feature]: true }), {}) : {},
            };

            const { error: updateError } = await supabase
              .from('hotels')
              .update(dbHotelData)
              .eq('id', existingHotel.id);

            if (updateError) {
              console.error("Error updating hotel:", updateError);
              errors++;
            } else {
              console.log("Hotel updated successfully");
              processed++;
            }
            continue;
          }
        }

        // Create new hotel
        const mappedData = mapJotFormData(parsedData);
        const dbHotelData = {
          ...mappedData,
          features_hotel: mappedData.features_hotel.length > 0 ? 
            mappedData.features_hotel.reduce((acc, feature) => ({ ...acc, [feature]: true }), {}) : {},
          features_room: mappedData.features_room.length > 0 ? 
            mappedData.features_room.reduce((acc, feature) => ({ ...acc, [feature]: true }), {}) : {},
        };

        const { data: hotel, error: hotelError } = await supabase
          .from('hotels')
          .insert(dbHotelData)
          .select()
          .single();

        if (hotelError) {
          console.error("Error creating hotel:", hotelError);
          errors++;
          continue;
        }

        console.log(`Hotel created: ${hotel.id}`);
        processed++;
        
        results.push({
          submission_id: submission.id,
          hotel_id: hotel.id,
          hotel_name: mappedData.name,
          status: 'created'
        });

      } catch (error) {
        console.error(`Error processing submission ${submission.id}:`, error);
        errors++;
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Reprocessing completed`,
        processed,
        errors,
        results
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error("Error in reprocessing:", error);
    
    return new Response(
      JSON.stringify({
        error: "Reprocessing failed",
        details: error.message
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

// Helper function to map JotForm data
function mapJotFormData(data: Record<string, any>) {
  const extractText = (value: any): string => {
    if (typeof value === 'string') return value.trim();
    if (typeof value === 'object' && value !== null) {
      if (value.addr_line1 || value.city || value.country) {
        return [value.addr_line1, value.city, value.country].filter(Boolean).join(', ');
      }
      return JSON.stringify(value);
    }
    return String(value || '').trim();
  };

  const extractArray = (value: any): string[] => {
    if (Array.isArray(value)) return value.map(v => String(v).trim()).filter(Boolean);
    if (typeof value === 'string') {
      return value.split(/[,\n\r]+/).map(v => v.trim()).filter(Boolean);
    }
    return [];
  };

  const extractNumber = (value: any, defaultValue: number = 0): number => {
    const num = parseInt(String(value || '0'));
    return isNaN(num) ? defaultValue : num;
  };

  return {
    name: extractText(data.q2_typeA) || 'Unnamed Hotel',
    description: extractText(data.q13_descripcionDel) || '',
    country: extractText(data.dropdown_search) || 'Unknown',
    city: extractText(data.q5_direccionFisica?.city) || 'Unknown',
    address: extractText(data.q5_direccionFisica?.addr_line1) || '',
    postal_code: extractText(data.q5_direccionFisica?.postal) || '',
    contact_name: extractText(data.q28_typeA28) || '',
    contact_email: extractText(data.q30_typeA30) || '',
    contact_phone: extractText(data.q39_typeA39) || '',
    property_type: extractText(data.q11_tipoDe) || 'Hotel',
    style: extractText(data.q12_estiloDel) || 'Classic',
    category: extractNumber(data.q4_categoriaOficial, 1),
    ideal_guests: extractText(data.q14_ltstronggtltemgtesIdeal) || '',
    atmosphere: extractText(data.q15_ltstronggtltemgtelAmbiente) || '',
    perfect_location: extractText(data.q16_ltstronggtltemgtlaUbicacion) || '',
    features_hotel: data.q17_instalacionesY ? extractArray(data.q17_instalacionesY) : [],
    features_room: data.q18_serviciosEn ? extractArray(data.q18_serviciosEn) : [],
    activities: data.q20_atraigaA20 ? extractArray(data.q20_atraigaA20) : [],
    themes: data.q52_atraigaA ? extractArray(data.q52_atraigaA) : [],
    meal_plans: data.q23_planDe ? extractArray(data.q23_planDe) : ['Solo alojamiento'],
    available_months: data.q22_elijaSu ? extractArray(data.q22_elijaSu) : [],
    stay_lengths: data.q26_cualEs26 ? extractArray(data.q26_cualEs26) : [],
    preferredWeekday: extractText(data.q24_elServicio) || 'Monday',
    room_types: data.q21_descripcionDe21 ? [{ 
      name: extractText(data.q21_descripcionDe21),
      description: extractText(data.q21_descripcionDe21)
    }] : [],
    price_per_month: 0,
    owner_id: null, // Will be set later if user token is found
    status: 'pending' as const,
    terms: extractText(data.q47_tarifas47) || '',
    main_image_url: null,
    rates: { default: 0 },
    images: [] as string[]
  };
}
