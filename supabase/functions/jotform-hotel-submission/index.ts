
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  console.log(`[${new Date().toISOString()}] JotForm hotel submission handler triggered via ${req.method} request`);
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const GOOGLE_MAPS_API_KEY = Deno.env.get("GOOGLE_MAPS_API_KEY");

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Missing required environment variables");
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    
    // Enhanced logging for debugging
    const contentType = req.headers.get("content-type") || "unknown";
    console.log(`[${new Date().toISOString()}] Request content-type: ${contentType}`);
    console.log(`[${new Date().toISOString()}] Request method: ${req.method}`);
    console.log(`[${new Date().toISOString()}] Request headers:`, Object.fromEntries(req.headers.entries()));

    let formData;
    
    // Handle different content types flexibly
    if (contentType.includes("application/x-www-form-urlencoded")) {
      const text = await req.text();
      console.log(`[${new Date().toISOString()}] Raw form data:`, text);
      formData = new URLSearchParams(text);
    } else if (contentType.includes("multipart/form-data")) {
      formData = await req.formData();
    } else if (contentType.includes("application/json")) {
      const jsonData = await req.json();
      console.log(`[${new Date().toISOString()}] JSON data:`, jsonData);
      // Convert JSON to FormData-like structure
      formData = new Map();
      for (const [key, value] of Object.entries(jsonData)) {
        formData.set(key, value);
      }
    } else {
      // Try to parse as form data anyway
      try {
        formData = await req.formData();
      } catch (e) {
        console.log(`[${new Date().toISOString()}] Failed to parse as FormData, trying text:`, e);
        const text = await req.text();
        console.log(`[${new Date().toISOString()}] Raw text data:`, text);
        formData = new URLSearchParams(text);
      }
    }

    // Log all form fields for debugging
    console.log(`[${new Date().toISOString()}] Form data type:`, formData.constructor.name);
    
    if (formData instanceof FormData) {
      console.log(`[${new Date().toISOString()}] FormData entries:`);
      for (const [key, value] of formData.entries()) {
        console.log(`  ${key}: ${value}`);
      }
    } else if (formData instanceof URLSearchParams) {
      console.log(`[${new Date().toISOString()}] URLSearchParams entries:`);
      for (const [key, value] of formData.entries()) {
        console.log(`  ${key}: ${value}`);
      }
    } else if (formData instanceof Map) {
      console.log(`[${new Date().toISOString()}] Map entries:`);
      for (const [key, value] of formData.entries()) {
        console.log(`  ${key}: ${value}`);
      }
    }

    // Helper function to get form value
    const getFormValue = (key: string): string | null => {
      if (formData instanceof FormData || formData instanceof URLSearchParams) {
        return formData.get(key) as string;
      } else if (formData instanceof Map) {
        return formData.get(key) as string;
      }
      return null;
    };

    // Helper function to find field by pattern
    const findFieldByPattern = (patterns: string[]): string | null => {
      for (const pattern of patterns) {
        const value = getFormValue(pattern);
        if (value) return value;
        
        // Also try to find by partial match
        if (formData instanceof FormData || formData instanceof URLSearchParams) {
          for (const [key, val] of formData.entries()) {
            if (key.toLowerCase().includes(pattern.toLowerCase())) {
              return val as string;
            }
          }
        } else if (formData instanceof Map) {
          for (const [key, val] of formData.entries()) {
            if (key.toLowerCase().includes(pattern.toLowerCase())) {
              return val as string;
            }
          }
        }
      }
      return null;
    };

    // Extract user token from various possible sources
    let userToken = getFormValue("user_token") || 
                   getFormValue("token") || 
                   getFormValue("jotform_user_token");

    console.log(`[${new Date().toISOString()}] User token found:`, userToken ? "Yes" : "No");

    // Extract hotel data with flexible field matching
    const hotelName = findFieldByPattern([
      "nombre del hotel",
      "hotel name",
      "nombre_del_hotel",
      "hotelName",
      "name"
    ]);

    const country = findFieldByPattern([
      "país",
      "country",
      "pais",
      "país_del_hotel",
      "country_of_hotel"
    ]);

    const city = findFieldByPattern([
      "ciudad",
      "city",
      "ciudad_del_hotel",
      "city_of_hotel"
    ]);

    const address = findFieldByPattern([
      "dirección",
      "address",
      "direccion",
      "dirección_del_hotel",
      "address_of_hotel"
    ]);

    const description = findFieldByPattern([
      "descripción",
      "description",
      "descripcion",
      "descripción_del_hotel",
      "hotel_description"
    ]);

    const contactName = findFieldByPattern([
      "nombre de contacto",
      "contact name",
      "nombre_de_contacto",
      "contactName",
      "contact_name"
    ]);

    const contactEmail = findFieldByPattern([
      "correo electrónico",
      "email",
      "correo",
      "contact_email",
      "contactEmail"
    ]);

    const contactPhone = findFieldByPattern([
      "teléfono",
      "phone",
      "telefono",
      "contact_phone",
      "contactPhone"
    ]);

    const pricePerMonth = findFieldByPattern([
      "precio por mes",
      "price per month",
      "precio_por_mes",
      "pricePerMonth",
      "monthly_price"
    ]);

    console.log(`[${new Date().toISOString()}] Extracted data:`, {
      hotelName,
      country,
      city,
      address,
      contactName,
      contactEmail,
      contactPhone,
      pricePerMonth
    });

    // Validate required fields
    if (!hotelName || !country || !city) {
      console.error(`[${new Date().toISOString()}] Missing required fields:`, {
        hotelName: !!hotelName,
        country: !!country,
        city: !!city
      });
      throw new Error("Missing required fields: hotel name, country, and city are required");
    }

    // Get user ID from token if provided
    let ownerId = null;
    if (userToken) {
      console.log(`[${new Date().toISOString()}] Looking up user by token...`);
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('jotform_token', userToken)
        .single();
      
      if (profile) {
        ownerId = profile.id;
        console.log(`[${new Date().toISOString()}] Found user:`, ownerId);
      } else {
        console.log(`[${new Date().toISOString()}] No user found for token`);
      }
    }

    // Geocode address if Google Maps API key is available
    let latitude = null;
    let longitude = null;
    
    if (GOOGLE_MAPS_API_KEY && address) {
      try {
        const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address + ", " + city + ", " + country)}&key=${GOOGLE_MAPS_API_KEY}`;
        const geocodeResponse = await fetch(geocodeUrl);
        const geocodeData = await geocodeResponse.json();
        
        if (geocodeData.results && geocodeData.results.length > 0) {
          const location = geocodeData.results[0].geometry.location;
          latitude = location.lat;
          longitude = location.lng;
          console.log(`[${new Date().toISOString()}] Geocoded coordinates:`, { latitude, longitude });
        }
      } catch (geocodeError) {
        console.error(`[${new Date().toISOString()}] Geocoding error:`, geocodeError);
      }
    }

    // Create hotel record
    const hotelData = {
      name: hotelName,
      country,
      city,
      address,
      description,
      contact_name: contactName,
      contact_email: contactEmail,
      contact_phone: contactPhone,
      price_per_month: pricePerMonth ? parseInt(pricePerMonth) : 1000,
      owner_id: ownerId,
      latitude,
      longitude,
      status: 'pending'
    };

    console.log(`[${new Date().toISOString()}] Creating hotel with data:`, hotelData);

    const { data: hotel, error: hotelError } = await supabase
      .from('hotels')
      .insert(hotelData)
      .select()
      .single();

    if (hotelError) {
      console.error(`[${new Date().toISOString()}] Hotel creation error:`, hotelError);
      throw new Error(`Failed to create hotel: ${hotelError.message}`);
    }

    console.log(`[${new Date().toISOString()}] Hotel created successfully:`, hotel);

    return new Response(
      JSON.stringify({ 
        success: true, 
        hotel_id: hotel.id,
        message: "Hotel submitted successfully"
      }),
      {
        status: 200,
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders 
        },
      }
    );

  } catch (error) {
    console.error(`[${new Date().toISOString()}] JotForm hotel submission error:`, error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || "Internal server error",
        timestamp: new Date().toISOString()
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders 
        },
      }
    );
  }
});
