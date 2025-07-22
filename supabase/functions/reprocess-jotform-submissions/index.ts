
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  console.log('=== Reprocess JotForm Submissions ===');

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get all raw submissions that need reprocessing
    const { data: rawSubmissions, error: fetchError } = await supabase
      .from('jotform_raw')
      .select('*')
      .order('created_at', { ascending: false });

    if (fetchError) {
      throw new Error(`Error fetching raw submissions: ${fetchError.message}`);
    }

    console.log(`Found ${rawSubmissions?.length || 0} raw submissions to process`);

    let processedCount = 0;
    let errorCount = 0;

    for (const submission of rawSubmissions || []) {
      try {
        console.log(`Processing submission ${submission.id}...`);
        
        const parsedData = submission.parsed_data;
        
        // Extract user token with improved logic
        let userToken: string | null = null;
        
        // Method 1: Check for user_token in parsed data
        if (parsedData.user_token) {
          userToken = parsedData.user_token;
        }
        
        // Method 2: Check for token in form fields
        if (!userToken && parsedData.rawRequest) {
          try {
            const rawRequest = JSON.parse(parsedData.rawRequest);
            if (rawRequest.user_token) {
              userToken = rawRequest.user_token;
            }
          } catch (e) {
            console.log('Could not parse rawRequest for token');
          }
        }
        
        // Method 3: Search through all fields for token
        if (!userToken) {
          for (const [key, value] of Object.entries(parsedData)) {
            if (key.includes('user_token') || key.includes('userToken')) {
              userToken = String(value);
              break;
            }
          }
        }

        console.log(`Token found: ${userToken}`);

        // Get user ID from token
        let userId: string | null = null;
        if (userToken) {
          try {
            const { data: tokenResult } = await supabase
              .rpc('get_user_from_jotform_token', { token: userToken });
            
            if (tokenResult) {
              userId = tokenResult;
              console.log('User ID from token:', userId);
            }
          } catch (error) {
            console.error('Error getting user from token:', error);
          }
        }

        // Helper functions for data extraction
        const extractString = (value: any): string => {
          if (typeof value === 'string') return value;
          if (typeof value === 'object' && value !== null) {
            return JSON.stringify(value);
          }
          return String(value || '');
        };

        const extractArray = (value: any): string[] => {
          if (Array.isArray(value)) return value.map(String);
          if (typeof value === 'string') {
            return value.split(',').map(s => s.trim()).filter(s => s);
          }
          return [];
        };

        const convertFeaturesToJSON = (features: string[]): { [key: string]: boolean } => {
          const result: { [key: string]: boolean } = {};
          features.forEach(feature => {
            if (feature && feature.trim()) {
              result[feature.trim()] = true;
            }
          });
          return result;
        };

        // Map JotForm fields to hotel data
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
          owner_id: userId, // Associate with user if token found
          status: 'pending',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        // Check if hotel already exists for this submission
        const { data: existingHotel } = await supabase
          .from('hotels')
          .select('id')
          .eq('name', hotelData.name)
          .eq('contact_email', hotelData.contact_email)
          .single();

        if (existingHotel) {
          // Update existing hotel with corrected data
          const { error: updateError } = await supabase
            .from('hotels')
            .update(hotelData)
            .eq('id', existingHotel.id);

          if (updateError) {
            console.error('Error updating existing hotel:', updateError);
            errorCount++;
          } else {
            console.log(`Updated existing hotel: ${hotelData.name}`);
            processedCount++;
          }
        } else {
          // Insert new hotel
          const { error: insertError } = await supabase
            .from('hotels')
            .insert(hotelData);

          if (insertError) {
            console.error('Error inserting new hotel:', insertError);
            errorCount++;
          } else {
            console.log(`Inserted new hotel: ${hotelData.name}`);
            processedCount++;
          }
        }

      } catch (error) {
        console.error(`Error processing submission ${submission.id}:`, error);
        errorCount++;
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Reprocessing completed. Processed: ${processedCount}, Errors: ${errorCount}`,
        processed_count: processedCount,
        error_count: errorCount
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in reprocessing:', error);
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
