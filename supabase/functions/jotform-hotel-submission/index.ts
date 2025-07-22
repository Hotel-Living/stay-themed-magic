
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface JotFormSubmission {
  [key: string]: any;
}

serve(async (req) => {
  console.log('=== JotForm Hotel Submission Webhook ===');
  console.log('Method:', req.method);
  console.log('URL:', req.url);

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get request data
    const contentType = req.headers.get('content-type') || '';
    const userAgent = req.headers.get('user-agent') || '';
    
    console.log('Content-Type:', contentType);
    console.log('User-Agent:', userAgent);

    let rawBody: string;
    let parsedData: JotFormSubmission;
    let parseMethod: string;

    if (contentType.includes('application/json')) {
      rawBody = await req.text();
      parsedData = JSON.parse(rawBody);
      parseMethod = 'json';
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      rawBody = await req.text();
      const formData = new URLSearchParams(rawBody);
      parsedData = Object.fromEntries(formData.entries());
      parseMethod = 'form-urlencoded';
    } else {
      rawBody = await req.text();
      parsedData = { raw: rawBody };
      parseMethod = 'raw';
    }

    console.log('Parsed data keys:', Object.keys(parsedData));
    console.log('Raw body preview:', rawBody.substring(0, 500));

    // Store raw submission for debugging
    await supabase
      .from('jotform_raw')
      .insert({
        headers: Object.fromEntries(req.headers.entries()),
        content_type: contentType,
        raw_body: rawBody,
        parsed_data: parsedData,
        parse_method: parseMethod,
        user_agent: userAgent
      });

    console.log('Raw submission stored successfully');

    // Extract user token from multiple possible sources
    let userToken: string | null = null;
    
    // Method 1: Check for user_token in parsed data (URL parameter or hidden field)
    if (parsedData.user_token) {
      userToken = parsedData.user_token;
      console.log('Token found in parsed data:', userToken);
    }
    
    // Method 2: Check for token in form fields (JotForm specific structure)
    if (!userToken && parsedData.rawRequest) {
      const rawRequest = JSON.parse(parsedData.rawRequest);
      if (rawRequest.user_token) {
        userToken = rawRequest.user_token;
        console.log('Token found in rawRequest:', userToken);
      }
    }
    
    // Method 3: Check for token in submission data structure
    if (!userToken) {
      for (const [key, value] of Object.entries(parsedData)) {
        if (key.includes('user_token') || key.includes('userToken')) {
          userToken = String(value);
          console.log('Token found in field:', key, '=', userToken);
          break;
        }
      }
    }

    console.log('Final extracted token:', userToken);

    // Get user ID from token if available
    let userId: string | null = null;
    if (userToken) {
      try {
        const { data: tokenResult } = await supabase
          .rpc('get_user_from_jotform_token', { token: userToken });
        
        if (tokenResult) {
          userId = tokenResult;
          console.log('User ID from token:', userId);
        } else {
          console.log('No user found for token:', userToken);
        }
      } catch (error) {
        console.error('Error getting user from token:', error);
      }
    }

    // Fallback: If no token or user found, log for manual association
    if (!userId) {
      console.log('WARNING: No user association found - hotel will be created without owner');
      console.log('Parsed data for manual review:', JSON.stringify(parsedData, null, 2));
    }

    // Helper function to safely extract string value
    const extractString = (value: any): string => {
      if (typeof value === 'string') return value;
      if (typeof value === 'object' && value !== null) {
        return JSON.stringify(value);
      }
      return String(value || '');
    };

    // Helper function to safely extract array
    const extractArray = (value: any): string[] => {
      if (Array.isArray(value)) return value.map(String);
      if (typeof value === 'string') {
        // Handle comma-separated values
        return value.split(',').map(s => s.trim()).filter(s => s);
      }
      return [];
    };

    // Helper function to convert feature arrays to JSON objects
    const convertFeaturesToJSON = (features: string[]): { [key: string]: boolean } => {
      const result: { [key: string]: boolean } = {};
      features.forEach(feature => {
        if (feature && feature.trim()) {
          result[feature.trim()] = true;
        }
      });
      return result;
    };

    // Map JotForm fields to hotel data with improved extraction
    const hotelData = {
      name: extractString(parsedData.q2_typeA || parsedData.q2_name || parsedData.name || 'Unnamed Hotel'),
      description: extractString(parsedData.q13_descripcionDel || parsedData.q13_description || parsedData.description || ''),
      
      // Address fields
      city: extractString(parsedData.q5_direccionFisica?.city || parsedData.q5_city || parsedData.city || ''),
      country: extractString(parsedData.q5_direccionFisica?.country || parsedData.q5_country || parsedData.country || ''),
      address: extractString(parsedData.q5_direccionFisica?.addr_line1 || parsedData.q5_address || parsedData.address || ''),
      postal_code: extractString(parsedData.q5_direccionFisica?.postal || parsedData.q5_postal || parsedData.postal_code || ''),
      
      // Contact information
      contact_name: extractString(parsedData.q6_contacto?.first || parsedData.q6_name || parsedData.contact_name || ''),
      contact_email: extractString(parsedData.q7_correoElectronico || parsedData.q7_email || parsedData.contact_email || ''),
      contact_phone: extractString(parsedData.q8_numeroDe || parsedData.q8_phone || parsedData.contact_phone || ''),
      
      // Property details
      property_type: extractString(parsedData.q9_tipoDePropiedad || parsedData.q9_property_type || parsedData.property_type || ''),
      property_style: extractString(parsedData.q10_estiloDePropiedad || parsedData.q10_style || parsedData.property_style || ''),
      
      // Features
      features_hotel: convertFeaturesToJSON(extractArray(parsedData.q11_comodidadesGlobales || parsedData.q11_hotel_features || parsedData.hotel_features || [])),
      features_room: convertFeaturesToJSON(extractArray(parsedData.q12_comodidadesPor || parsedData.q12_room_features || parsedData.room_features || [])),
      
      // Pricing
      price_per_month: parseInt(extractString(parsedData.q14_precioMensual || parsedData.q14_price || parsedData.price_per_month || '0')) || 0,
      
      // Available months
      available_months: extractArray(parsedData.q15_mesesDisponibles || parsedData.q15_months || parsedData.available_months || []),
      
      // Additional fields
      atmosphere: extractString(parsedData.q16_atmosfera || parsedData.q16_atmosphere || parsedData.atmosphere || ''),
      ideal_guests: extractString(parsedData.q17_huespedesIdeales || parsedData.q17_guests || parsedData.ideal_guests || ''),
      perfect_location: extractString(parsedData.q18_ubicacionPerfecta || parsedData.q18_location || parsedData.perfect_location || ''),
      
      // System fields
      owner_id: userId, // This is the critical fix - associate with user
      status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    console.log('Hotel data to insert:', JSON.stringify(hotelData, null, 2));

    // Insert hotel into database
    const { data: hotel, error: hotelError } = await supabase
      .from('hotels')
      .insert(hotelData)
      .select()
      .single();

    if (hotelError) {
      console.error('Error inserting hotel:', hotelError);
      throw new Error(`Hotel insertion failed: ${hotelError.message}`);
    }

    console.log('Hotel inserted successfully:', hotel);

    // If user was found, log success
    if (userId) {
      console.log(`Hotel "${hotelData.name}" successfully associated with user ${userId}`);
    } else {
      console.log(`Hotel "${hotelData.name}" created without user association - requires manual linking`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Hotel submission processed successfully',
        hotel_id: hotel.id,
        user_associated: !!userId
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing JotForm submission:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
})
