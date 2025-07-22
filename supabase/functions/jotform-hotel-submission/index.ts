
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
  console.log("Request method:", req.method);
  console.log("Request URL:", req.url);

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get request headers and body
    const headers = Object.fromEntries(req.headers.entries());
    const contentType = req.headers.get('content-type') || '';
    const userAgent = req.headers.get('user-agent') || '';
    
    console.log("Content-Type:", contentType);
    console.log("User-Agent:", userAgent);

    let rawBody: string;
    let parsedData: any = {};
    let parseMethod: string;

    if (contentType.includes('multipart/form-data')) {
      console.log("Parsing multipart/form-data");
      
      // Parse multipart form data
      const formData = await req.formData();
      rawBody = '';
      
      // Convert FormData to object and build raw body representation
      const formObject: any = {};
      for (const [key, value] of formData.entries()) {
        formObject[key] = value;
        rawBody += `${key}: ${value}\n`;
      }
      
      console.log("Form data keys:", Object.keys(formObject));
      
      // Extract rawRequest from form data
      const rawRequest = formObject.rawRequest;
      if (rawRequest) {
        try {
          parsedData = JSON.parse(rawRequest);
          parseMethod = 'multipart-json';
          console.log("Successfully parsed rawRequest JSON");
        } catch (jsonError) {
          console.error("Failed to parse rawRequest JSON:", jsonError);
          parsedData = formObject;
          parseMethod = 'multipart-direct';
        }
      } else {
        console.log("No rawRequest field found, using form data directly");
        parsedData = formObject;
        parseMethod = 'multipart-direct';
      }
    } else {
      console.log("Parsing as text/form-data");
      rawBody = await req.text();
      
      try {
        const urlParams = new URLSearchParams(rawBody);
        const formObject: any = {};
        for (const [key, value] of urlParams.entries()) {
          formObject[key] = value;
        }
        
        const rawRequest = formObject.rawRequest;
        if (rawRequest) {
          parsedData = JSON.parse(rawRequest);
          parseMethod = 'urlencoded-json';
        } else {
          parsedData = formObject;
          parseMethod = 'urlencoded-direct';
        }
      } catch (parseError) {
        console.error("Failed to parse form data:", parseError);
        parsedData = { raw: rawBody };
        parseMethod = 'raw';
      }
    }

    console.log("Parse method:", parseMethod);
    console.log("Parsed data keys:", Object.keys(parsedData));

    // Store raw submission for debugging
    const { error: rawError } = await supabase
      .from('jotform_raw')
      .insert({
        headers,
        content_type: contentType,
        raw_body: rawBody,
        parsed_data: parsedData,
        parse_method: parseMethod,
        user_agent: userAgent
      });

    if (rawError) {
      console.error("Error storing raw data:", rawError);
    }

    // Ensure we have structured data to work with
    if (!parsedData || typeof parsedData !== 'object') {
      throw new Error("No valid form data found in submission");
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

    console.log("Mapped hotel data:", hotelData);

    // Insert hotel record
    const { data: hotel, error: hotelError } = await supabase
      .from('hotels')
      .insert(hotelData)
      .select()
      .single();

    if (hotelError) {
      console.error("Error inserting hotel:", hotelError);
      throw hotelError;
    }

    console.log("Hotel created successfully:", hotel.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        hotel_id: hotel.id,
        message: 'Hotel submission processed successfully'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error: any) {
    console.log("=== WEBHOOK ERROR ===");
    console.log("Error type:", error.constructor.name);
    console.log("Error message:", error.message);
    console.log("Error stack:", error.stack);

    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        details: error.stack
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
