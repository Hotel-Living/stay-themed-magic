
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  console.log("=== JOTFORM HOTEL SUBMISSION WEBHOOK ===");
  console.log(`Request method: ${req.method}`);
  console.log(`Request URL: ${req.url}`);
  console.log(`User-Agent: ${req.headers.get('user-agent')}`);
  console.log(`Content-Type: ${req.headers.get('content-type')}`);

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    let formData: Record<string, any> = {};
    let parsedData: Record<string, any> = {};

    // Parse different content types
    if (req.headers.get('content-type')?.includes('multipart/form-data')) {
      console.log("Parsing multipart/form-data");
      const formDataObj = await req.formData();
      
      // Extract form fields
      for (const [key, value] of formDataObj.entries()) {
        formData[key] = value;
      }
      
      console.log("Form data keys:", Object.keys(formData));

      // Parse the rawRequest JSON if it exists
      if (formData.rawRequest) {
        try {
          parsedData = JSON.parse(formData.rawRequest);
          console.log("Successfully parsed rawRequest JSON");
          console.log("Parsed data keys:", Object.keys(parsedData));
        } catch (e) {
          console.error("Failed to parse rawRequest JSON:", e);
        }
      }
    } else {
      // Handle JSON content
      const body = await req.text();
      try {
        formData = JSON.parse(body);
        parsedData = formData;
      } catch (e) {
        console.error("Failed to parse JSON body:", e);
        return new Response(JSON.stringify({ error: "Invalid JSON" }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // Store raw data for debugging
    const { error: rawError } = await supabase
      .from('jotform_raw')
      .insert({
        raw_body: JSON.stringify(formData),
        parsed_data: parsedData,
        headers: Object.fromEntries(req.headers.entries()),
        content_type: req.headers.get('content-type') || 'unknown',
        parse_method: 'multipart'
      });

    if (rawError) {
      console.error("Error storing raw data:", rawError);
    }

    // Extract user token for authentication
    let userId: string | null = null;
    
    // Try to get user token from various sources
    const userToken = parsedData.user_token || 
                     parsedData.q_user_token || 
                     formData.user_token ||
                     (typeof window !== 'undefined' ? localStorage?.getItem('jotform_user_token') : null);

    if (userToken) {
      console.log("Found user token, looking up user");
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('jotform_token', userToken)
        .single();
      
      if (profile) {
        userId = profile.id;
        console.log("Successfully linked to user:", userId);
      } else {
        console.log("No user found for token");
      }
    }

    // Map JotForm fields to hotel data structure
    const mapJotFormData = (data: Record<string, any>) => {
      console.log("Mapping JotForm data:", data);

      // Helper function to safely extract text from various data types
      const extractText = (value: any): string => {
        if (typeof value === 'string') return value.trim();
        if (typeof value === 'object' && value !== null) {
          // Handle address objects
          if (value.addr_line1 || value.city || value.country) {
            return [value.addr_line1, value.city, value.country].filter(Boolean).join(', ');
          }
          return JSON.stringify(value);
        }
        return String(value || '').trim();
      };

      // Helper function to safely extract arrays
      const extractArray = (value: any): string[] => {
        if (Array.isArray(value)) return value.map(v => String(v).trim()).filter(Boolean);
        if (typeof value === 'string') {
          // Handle comma-separated strings or newline-separated
          return value.split(/[,\n\r]+/).map(v => v.trim()).filter(Boolean);
        }
        return [];
      };

      // Helper function to safely extract numbers
      const extractNumber = (value: any, defaultValue: number = 0): number => {
        const num = parseInt(String(value || '0'));
        return isNaN(num) ? defaultValue : num;
      };

      // Map basic information
      const hotelData = {
        name: extractText(data.q2_typeA) || 'Unnamed Hotel',
        description: extractText(data.q13_descripcionDel) || '',
        
        // Extract location from address object
        country: extractText(data.dropdown_search) || 'Unknown',
        city: extractText(data.q5_direccionFisica?.city) || 'Unknown',
        address: extractText(data.q5_direccionFisica?.addr_line1) || '',
        postal_code: extractText(data.q5_direccionFisica?.postal) || '',
        
        // Contact information
        contact_name: extractText(data.q28_typeA28) || '',
        contact_email: extractText(data.q30_typeA30) || '',
        contact_phone: extractText(data.q39_typeA39) || '',
        
        // Property details
        property_type: extractText(data.q11_tipoDe) || 'Hotel',
        style: extractText(data.q12_estiloDel) || 'Classic',
        category: extractNumber(data.q4_categoriaOficial, 1),
        
        // Descriptions
        ideal_guests: extractText(data.q14_ltstronggtltemgtesIdeal) || '',
        atmosphere: extractText(data.q15_ltstronggtltemgtelAmbiente) || '',
        perfect_location: extractText(data.q16_ltstronggtltemgtlaUbicacion) || '',
        
        // Features and amenities
        features_hotel: data.q17_instalacionesY ? extractArray(data.q17_instalacionesY) : [],
        features_room: data.q18_serviciosEn ? extractArray(data.q18_serviciosEn) : [],
        
        // Activities and themes
        activities: data.q20_atraigaA20 ? extractArray(data.q20_atraigaA20) : [],
        themes: data.q52_atraigaA ? extractArray(data.q52_atraigaA) : [],
        
        // Meal plans and availability
        meal_plans: data.q23_planDe ? extractArray(data.q23_planDe) : ['Solo alojamiento'],
        available_months: data.q22_elijaSu ? extractArray(data.q22_elijaSu) : [],
        
        // Stay lengths and pricing
        stay_lengths: data.q26_cualEs26 ? extractArray(data.q26_cualEs26) : [],
        preferredWeekday: extractText(data.q24_elServicio) || 'Monday',
        
        // Room types - handle as JSON array
        room_types: data.q21_descripcionDe21 ? [{ 
          name: extractText(data.q21_descripcionDe21),
          description: extractText(data.q21_descripcionDe21)
        }] : [],
        
        // Default values
        price_per_month: 0,
        owner_id: userId,
        status: 'pending' as const,
        terms: extractText(data.q47_tarifas47) || '',
        main_image_url: null,
        rates: { default: 0 },
        images: [] as string[]
      };

      console.log("Mapped hotel data:", hotelData);
      return hotelData;
    };

    const hotelData = mapJotFormData(parsedData);

    // Convert arrays to proper format for database
    const dbHotelData = {
      ...hotelData,
      features_hotel: hotelData.features_hotel.length > 0 ? 
        hotelData.features_hotel.reduce((acc, feature) => ({ ...acc, [feature]: true }), {}) : {},
      features_room: hotelData.features_room.length > 0 ? 
        hotelData.features_room.reduce((acc, feature) => ({ ...acc, [feature]: true }), {}) : {},
    };

    console.log("Creating hotel with data:", dbHotelData);

    // Create hotel record
    const { data: hotel, error: hotelError } = await supabase
      .from('hotels')
      .insert(dbHotelData)
      .select()
      .single();

    if (hotelError) {
      console.error("Error creating hotel:", hotelError);
      throw hotelError;
    }

    console.log("Hotel created successfully:", hotel.id);

    // Handle themes if any
    if (hotelData.themes.length > 0) {
      console.log("Processing themes:", hotelData.themes);
      
      for (const themeName of hotelData.themes) {
        // Find theme by name
        const { data: theme } = await supabase
          .from('themes')
          .select('id')
          .ilike('name', `%${themeName}%`)
          .limit(1)
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

    // Handle activities if any
    if (hotelData.activities.length > 0) {
      console.log("Processing activities:", hotelData.activities);
      
      for (const activityName of hotelData.activities) {
        // Find activity by name
        const { data: activity } = await supabase
          .from('activities')
          .select('id')
          .ilike('name', `%${activityName}%`)
          .limit(1)
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

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Hotel created successfully",
        hotel_id: hotel.id,
        user_associated: !!userId
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error("Error processing JotForm submission:", error);
    
    return new Response(
      JSON.stringify({ 
        error: "Failed to process submission", 
        details: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
})
