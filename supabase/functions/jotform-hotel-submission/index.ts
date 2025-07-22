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
      .from('jotform_submissions')
      .insert({
        submission_id: rawRequest.submissionID || null,
        form_id: rawRequest.formID || null,
        raw_data: rawRequest,
        created_at: new Date().toISOString()
      });

    // Enhanced field parsing with new JotForm fields
    const parseJotFormSubmission = (rawRequest: any) => {
      const data = rawRequest.parsed_data || {};
      
      // Core hotel information
      const hotelData: any = {
        name: data.name || data.hotel_name || data.nombre_hotel || '',
        description: data.description || data.descripcion || '',
        country: data.country || data.pais || '',
        city: data.city || data.ciudad || '',
        address: data.address || data.direccion || '',
        contact_email: data.contact_email || data.email || data.correo || '',
        contact_name: data.contact_name || data.nombre_contacto || '',
        contact_phone: data.contact_phone || data.telefono || '',
        price_per_month: parseInt(data.price_per_month || data.precio_mes || '0') || 0,
        property_type: data.property_type || data.tipo_propiedad || '',
        style: data.style || data.estilo || '',
        ideal_guests: data.ideal_guests || data.huespedes_ideales || '',
        atmosphere: data.atmosphere || data.ambiente || '',
        perfect_location: data.perfect_location || data.ubicacion_perfecta || '',
        
        // Existing arrays
        meal_plans: parseArrayField(data.meal_plans || data.planes_comida),
        available_months: parseArrayField(data.available_months || data.meses_disponibles),
        stay_lengths: parseArrayField(data.stay_lengths || data.duraciones_estancia, true),
        
        // New banking information (optional)
        banking_info: {
          bank_name: data.bank_name || data.nombre_banco || null,
          iban_account: data.iban_account || data.cuenta_iban || null,
          swift_bic: data.swift_bic || data.codigo_swift || null,
          bank_country: data.bank_country || data.pais_banco || null,
          account_holder: data.account_holder || data.titular_cuenta || null
        },
        
        // Laundry service options
        laundry_service: {
          available: data.laundry_available === 'Yes' || data.lavanderia_disponible === 'Sí',
          self_service: data.laundry_self_service === 'Yes' || data.lavanderia_autoservicio === 'Sí',
          full_service: data.laundry_full_service === 'Yes' || data.lavanderia_completa === 'Sí',
          external_redirect: data.laundry_external_redirect || data.lavanderia_externa || null,
          pricing: data.laundry_pricing || data.precios_lavanderia || null
        },
        
        // Additional amenities and features
        additional_amenities: parseArrayField(data.additional_amenities || data.servicios_adicionales),
        special_features: parseArrayField(data.special_features || data.caracteristicas_especiales),
        accessibility_features: parseArrayField(data.accessibility_features || data.accesibilidad),
        
        // New metadata for enhanced listings
        check_in_instructions: data.check_in_instructions || data.instrucciones_checkin || '',
        local_recommendations: data.local_recommendations || data.recomendaciones_locales || '',
        house_rules: parseArrayField(data.house_rules || data.reglas_casa),
        cancellation_policy: data.cancellation_policy || data.politica_cancelacion || '',
        
        // Store any unmapped fields for future use
        additional_data: extractUnmappedFields(data)
      };

      // Extract user token for ownership
      const userToken = data.user_token || null;
      
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
    
    // Resolve user from token
    let userId = null;
    if (userToken) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('jotform_token', userToken)
        .single();
      
      if (profile) {
        userId = profile.id;
      }
    }

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
