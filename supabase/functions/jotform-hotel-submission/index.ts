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

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const rawRequest = await req.json();
    
    console.log('Received JotForm submission:', JSON.stringify(rawRequest, null, 2));

    // Store the raw request for debugging
    await supabase
      .from('jotform_raw')
      .insert({
        submission_id: rawRequest.submissionID || rawRequest.submission_id || null,
        form_id: rawRequest.formID || null,
        raw_body: JSON.stringify(rawRequest),
        headers: JSON.stringify(req.headers),
        content_type: req.headers.get('content-type') || 'unknown',
        parse_method: 'jotform-webhook',
        parsed_data: rawRequest,
        received_at: new Date().toISOString()
      });

    // Enhanced field parsing with new JotForm fields
    const parseJotFormSubmission = (rawRequest: any) => {
      // JotForm webhook sends data in rawRequest directly, not in parsed_data
      const data = rawRequest;
      
      console.log('Parsing JotForm data:', JSON.stringify(data, null, 2));
      
      // Extract address components
      const addressField = data.q5_direccionFisica || {};
      const fullAddress = `${addressField.addr_line1 || ''} ${addressField.addr_line2 || ''}`.trim();
      
      // Parse banking info from q30_typeA30 field
      const bankingText = data.q30_typeA30 || '';
      const parseBankingInfo = (text: string) => {
        const lines = text.split('\n').map(line => line.trim());
        const bankingInfo: any = {};
        
        lines.forEach(line => {
          if (line.includes('Nombre legal del establecimiento:')) {
            bankingInfo.legal_name = line.split(':')[1]?.trim();
          }
          if (line.includes('Nombre del titular de la cuenta:')) {
            bankingInfo.account_holder = line.split(':')[1]?.trim();
          }
          if (line.includes('Número de cuenta bancaria (IBAN):')) {
            bankingInfo.iban_account = line.split(':')[1]?.trim();
          }
          if (line.includes('Nombre del banco:')) {
            bankingInfo.bank_name = line.split(':')[1]?.trim();
          }
          if (line.includes('País de la cuen')) {
            bankingInfo.bank_country = line.split(':')[1]?.trim();
          }
        });
        
        return Object.keys(bankingInfo).length > 0 ? bankingInfo : null;
      };
      
      // Extract pricing from q47_tarifas47
      const extractPricing = (tarifasData: any) => {
        if (!tarifasData || typeof tarifasData !== 'object') return 0;
        
        // Try to extract the first price value
        if (tarifasData['0'] && Array.isArray(tarifasData['0']) && tarifasData['0'][0]) {
          const price = parseInt(tarifasData['0'][0]);
          return isNaN(price) ? 0 : price;
        }
        
        return 0;
      };
      
      // Core hotel information mapped to actual JotForm field names
      const hotelData: any = {
        name: data.q2_typeA || '',  // Hotel name
        description: data.q13_descripcionDel || '',  // Description
        country: addressField.country || '',
        city: addressField.city || '',
        address: fullAddress,
        postal_code: addressField.postal || null,
        contact_email: '', // Not provided in this form structure
        contact_name: '', // Not provided in this form structure
        contact_phone: '', // Not provided in this form structure
        price_per_month: extractPricing(data.q47_tarifas47),
        property_type: data.q11_tipoDe || '',  // Hotel type
        style: data.q12_estiloDel || '',  // Hotel style
        ideal_guests: data.q14_ltstronggtltemgtesIdeal || '',
        atmosphere: data.q15_ltstronggtltemgtelAmbiente || '',
        perfect_location: data.q16_ltstronggtltemgtlaUbicacion || '',
        
        // Arrays from JotForm
        meal_plans: parseArrayField(data.q23_planDe),
        available_months: [], // Will need to be set based on q28_typeA28
        stay_lengths: parseArrayField(data.q26_cualEs26?.map((item: string) => {
          const match = item.match(/(\d+)\s+días/);
          return match ? parseInt(match[1]) : null;
        }).filter(Boolean), true),
        
        // Hotel features from checkboxes
        features_hotel: {
          wifi: data.q17_instalacionesY?.includes('WiFi Gratis') || false,
          restaurant: data.q17_instalacionesY?.includes('Restaurante') || false,
        },
        
        features_room: {
          air_conditioning: data.q18_serviciosEn?.includes('Aire Acondicionado') || false,
          tv: data.q18_serviciosEn?.includes('Televisor') || false,
        },
        
        // Banking information
        banking_info: parseBankingInfo(bankingText),
        
        // Laundry service
        laundry_service: {
          available: data.q24_elServicio === 'SÍ',
          self_service: false,
          full_service: data.q24_elServicio === 'SÍ',
          external_redirect: null,
          pricing: null
        },
        
        // Weekday preference
        preferredWeekday: data.q22_elijaSu || 'Monday',
        
        // Store all unmapped fields for debugging
        additional_data: {
          jotform_fields: {
            q20_atraigaA20: data.q20_atraigaA20,
            q21_descripcionDe21: data.q21_descripcionDe21,
            q28_typeA28: data.q28_typeA28,
            q41_atraigaA41: data.q41_atraigaA41,
            q52_atraigaA: data.q52_atraigaA,
            submission_id: data.submission_id,
            form_id: rawRequest.formID
          }
        }
      };

      // Enhanced user token extraction with comprehensive fallback logic
      let userToken = null;
      const tokenSources = [
        data.user_token,
        data.q_user_token,
        data.q6_userToken,
        data.q_userToken,
        data.token,
        data.auth_token,
        rawRequest.user_token,
        rawRequest.q_user_token,
        rawRequest.q6_userToken,
        rawRequest.token
      ];

      userToken = tokenSources.find(token => token && token.trim() !== '');
      
      console.log('=== TOKEN EXTRACTION DEBUG ===');
      console.log('Token sources checked:', {
        'data.user_token': data.user_token,
        'data.q_user_token': data.q_user_token,
        'data.q6_userToken': data.q6_userToken,
        'data.token': data.token,
        'rawRequest.user_token': rawRequest.user_token
      });
      console.log('Final userToken found:', userToken);
      console.log('Extracted hotel data:', JSON.stringify(hotelData, null, 2));
      
      return { hotelData, userToken };
    };

    const parseArrayField = (field: any, isNumeric = false) => {
      if (!field) return [];
      if (Array.isArray(field)) return field;
      if (typeof field === 'string') {
        const items = field.split(',').map(item => item.trim()).filter(Boolean);
        return isNumeric ? items.map(item => parseInt(item)).filter(num => !isNaN(num)) : items;
      }
      return [];
    };

    const extractUnmappedFields = (data: any) => {
      const mappedFields = new Set([
        'name', 'hotel_name', 'nombre_hotel', 'description', 'descripcion',
        'country', 'pais', 'city', 'ciudad', 'address', 'direccion',
        'contact_email', 'email', 'correo', 'contact_name', 'nombre_contacto',
        'contact_phone', 'telefono', 'price_per_month', 'precio_mes',
        'property_type', 'tipo_propiedad', 'style', 'estilo',
        'ideal_guests', 'huespedes_ideales', 'atmosphere', 'ambiente',
        'perfect_location', 'ubicacion_perfecta', 'meal_plans', 'planes_comida',
        'available_months', 'meses_disponibles', 'stay_lengths', 'duraciones_estancia',
        'bank_name', 'nombre_banco', 'iban_account', 'cuenta_iban',
        'swift_bic', 'codigo_swift', 'bank_country', 'pais_banco',
        'account_holder', 'titular_cuenta', 'laundry_available', 'lavanderia_disponible',
        'laundry_self_service', 'lavanderia_autoservicio', 'laundry_full_service',
        'lavanderia_completa', 'laundry_external_redirect', 'lavanderia_externa',
        'laundry_pricing', 'precios_lavanderia', 'additional_amenities',
        'servicios_adicionales', 'special_features', 'caracteristicas_especiales',
        'accessibility_features', 'accesibilidad', 'check_in_instructions',
        'instrucciones_checkin', 'local_recommendations', 'recomendaciones_locales',
        'house_rules', 'reglas_casa', 'cancellation_policy', 'politica_cancelacion',
        'user_token'
      ]);
      
      const unmapped: any = {};
      Object.keys(data).forEach(key => {
        if (!mappedFields.has(key)) {
          unmapped[key] = data[key];
        }
      });
      
      return Object.keys(unmapped).length > 0 ? unmapped : null;
    };

    const { hotelData, userToken } = parseJotFormSubmission(rawRequest);
    
    // Enhanced validation and user resolution
    if (!userToken) {
      console.error('❌ No user token found in submission');
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Authentication token missing - cannot identify hotel owner',
          debug: { availableFields: Object.keys(rawRequest) }
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Resolve user from token
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, first_name, last_name')
      .eq('jotform_token', userToken)
      .single();
    
    if (!profile || profileError) {
      console.error('❌ Invalid user token - profile not found:', profileError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Invalid authentication token - user not found',
          debug: { profileError: profileError?.message }
        }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const userId = profile.id;
    console.log('✅ Valid user found:', userId, `(${profile.first_name} ${profile.last_name})`);

    // Pre-validation: Check critical fields
    if (!hotelData.name || hotelData.name.trim() === '') {
      console.error('❌ Hotel submission missing name');
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Hotel name is required',
          debug: { nameField: hotelData.name }
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Final validation before database insertion
    if (!userId || !hotelData.name) {
      console.error('❌ Critical hotel data missing - aborting insertion');
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Critical hotel data missing - cannot create hotel record',
          debug: { 
            hasUserId: !!userId,
            hasName: !!hotelData.name,
            userIdValue: userId,
            nameValue: hotelData.name
          }
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('=== FINAL HOTEL DATA VALIDATION ===');
    console.log('About to insert hotel:', { 
      name: hotelData.name, 
      owner_id: userId, 
      hasRequiredFields: !!hotelData.name && !!userId 
    });

    // Insert hotel with new fields
    const { data: hotel, error: hotelError } = await supabase
      .from('hotels')
      .insert({
        ...hotelData,
        owner_id: userId,
        status: 'pending',
        // Store additional structured data
        banking_info: hotelData.banking_info,
        laundry_service: hotelData.laundry_service,
        additional_data: hotelData.additional_data
      })
      .select()
      .single();

    if (hotelError) {
      console.error('Hotel insertion error:', hotelError);
      throw hotelError;
    }

    console.log('Hotel created successfully:', hotel.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        hotel_id: hotel.id,
        parsed_fields: Object.keys(hotelData).length
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Edge function error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
