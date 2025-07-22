
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log("🚀 JotForm webhook received");
    console.log("📋 Request method:", req.method);
    console.log("📋 Content-Type:", req.headers.get('content-type'));

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Parse the request body based on content type
    let formData: Record<string, any> = {};
    const contentType = req.headers.get('content-type') || '';
    let rawBody = '';

    if (contentType.includes('application/x-www-form-urlencoded')) {
      rawBody = await req.text();
      console.log("📋 Raw form data received:", rawBody);
      
      // Parse URL-encoded data
      const urlParams = new URLSearchParams(rawBody);
      for (const [key, value] of urlParams.entries()) {
        formData[key] = value;
      }
    } else if (contentType.includes('application/json')) {
      const jsonData = await req.json();
      formData = jsonData;
      rawBody = JSON.stringify(jsonData);
    } else {
      rawBody = await req.text();
      console.log("📋 Unknown content type, raw body:", rawBody);
    }

    console.log("📋 Parsed form data:", JSON.stringify(formData, null, 2));

    // Store raw data for debugging
    await supabase.from('jotform_raw').insert({
      raw_body: rawBody,
      parsed_data: formData,
      content_type: contentType,
      parse_method: contentType.includes('application/x-www-form-urlencoded') ? 'url-encoded' : 'other',
      headers: Object.fromEntries(req.headers.entries()),
      user_agent: req.headers.get('user-agent')
    });

    // Extract user token with multiple fallback strategies
    let userToken = null;
    const tokenSources = [
      formData.user_token,
      formData.token,
      formData['submission[user_token]'],
      formData.uid,
      // Try to extract from any field that might contain the token
      ...Object.values(formData).filter(value => 
        typeof value === 'string' && 
        value.length === 64 && 
        /^[a-f0-9]+$/.test(value)
      )
    ];

    for (const source of tokenSources) {
      if (source && typeof source === 'string' && source.length > 0) {
        userToken = source;
        console.log("✅ Found user token from source:", source);
        break;
      }
    }

    console.log("🔍 Token extraction result:", userToken ? "SUCCESS" : "FAILED");

    // Get user ID from token if available
    let ownerId = null;
    if (userToken) {
      const { data: userData, error: userError } = await supabase
        .rpc('get_user_from_jotform_token', { token: userToken });
      
      if (userError) {
        console.error("❌ Error getting user from token:", userError);
      } else if (userData) {
        ownerId = userData;
        console.log("✅ Found owner ID:", ownerId);
      } else {
        console.warn("⚠️ Token found but no matching user");
      }
    }

    // Extract and map hotel data with enhanced field mapping
    const hotelData = {
      // CRITICAL: Map q2_typeA to hotel name
      name: formData.q2_typeA || formData.q2_typeA2 || formData.hotel_name || formData.name,
      description: formData.q3_description || formData.description,
      country: formData.q4_country || formData.country,
      city: formData.q5_city || formData.city,
      address: formData.q6_address || formData.address,
      contact_name: formData.q7_contactName || formData.contact_name,
      contact_email: formData.q8_contactEmail || formData.contact_email,
      contact_phone: formData.q9_contactPhone || formData.contact_phone,
      property_type: formData.q10_propertyType || formData.property_type,
      style: formData.q11_style || formData.style,
      category: formData.q12_category ? parseInt(formData.q12_category) : null,
      price_per_month: formData.q12_category ? parseInt(formData.q12_category) * 1000 : 2000,
      owner_id: ownerId,
      status: 'pending'
    };

    console.log("🏨 Extracted hotel data:", JSON.stringify(hotelData, null, 2));

    // Validation: Ensure critical fields are present
    if (!hotelData.name || hotelData.name.trim().length === 0) {
      console.error("❌ VALIDATION FAILED: Hotel name is missing or empty");
      console.error("❌ Available fields:", Object.keys(formData));
      throw new Error(`Hotel name is required. Found fields: ${Object.keys(formData).join(', ')}`);
    }

    if (!ownerId) {
      console.error("❌ VALIDATION FAILED: Owner ID is missing");
      console.error("❌ Token found:", !!userToken);
      throw new Error("Owner identification failed. User token missing or invalid.");
    }

    console.log("✅ Validation passed. Creating hotel record...");

    // Insert hotel data
    const { data: hotel, error: hotelError } = await supabase
      .from('hotels')
      .insert(hotelData)
      .select()
      .single();

    if (hotelError) {
      console.error("❌ Error inserting hotel:", hotelError);
      throw hotelError;
    }

    console.log("✅ Hotel created successfully:", hotel.id);
    console.log("✅ Hotel name:", hotel.name);
    console.log("✅ Owner ID:", hotel.owner_id);

    // Send success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        hotel_id: hotel.id,
        hotel_name: hotel.name,
        owner_id: hotel.owner_id,
        message: "Hotel submission processed successfully" 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error("❌ JotForm webhook error:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        timestamp: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})
