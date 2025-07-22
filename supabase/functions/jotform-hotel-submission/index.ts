
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Enhanced logging function
function logWithTimestamp(message: string, data?: any) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`);
  if (data) {
    console.log(`[${timestamp}] Data:`, JSON.stringify(data, null, 2));
  }
}

// Test function to verify basic database connectivity
async function testBasicDatabaseConnection(supabase: any) {
  try {
    logWithTimestamp("=== TESTING BASIC DATABASE CONNECTION ===");
    
    // Test 1: Simple select query
    const { data: testSelect, error: selectError } = await supabase
      .from('hotels')
      .select('id, name')
      .limit(1);
    
    if (selectError) {
      logWithTimestamp("ERROR: Basic select failed", selectError);
      return false;
    }
    
    logWithTimestamp("SUCCESS: Basic select works", { count: testSelect?.length });
    
    // Test 2: Insert dummy hotel with hardcoded data
    const dummyHotel = {
      name: "TEST HOTEL - DEBUG",
      description: "This is a test hotel for debugging",
      address: "Test Address 123",
      city: "Test City",
      country: "Test Country",
      price_per_month: 1000,
      contact_email: "test@test.com",
      contact_phone: "123-456-7890",
      owner_id: null, // We'll handle this separately
      status: 'pending'
    };
    
    const { data: insertResult, error: insertError } = await supabase
      .from('hotels')
      .insert([dummyHotel])
      .select();
    
    if (insertError) {
      logWithTimestamp("ERROR: Dummy hotel insert failed", insertError);
      return false;
    }
    
    logWithTimestamp("SUCCESS: Dummy hotel inserted", insertResult);
    
    // Clean up test hotel
    if (insertResult && insertResult.length > 0) {
      await supabase
        .from('hotels')
        .delete()
        .eq('id', insertResult[0].id);
      logWithTimestamp("SUCCESS: Test hotel cleaned up");
    }
    
    return true;
    
  } catch (error) {
    logWithTimestamp("CRITICAL ERROR: Database connection test failed", error);
    return false;
  }
}

// Enhanced user lookup function
async function findUserByToken(supabase: any, token: string) {
  try {
    logWithTimestamp("=== STARTING USER TOKEN LOOKUP ===", { token });
    
    if (!token) {
      logWithTimestamp("WARNING: No token provided for user lookup");
      return null;
    }
    
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('id, first_name, last_name, email, jotform_token')
      .eq('jotform_token', token)
      .single();
    
    if (error) {
      logWithTimestamp("ERROR: User lookup failed", error);
      return null;
    }
    
    if (!profile) {
      logWithTimestamp("WARNING: No user found for token", { token });
      return null;
    }
    
    logWithTimestamp("SUCCESS: User found", { 
      userId: profile.id, 
      name: `${profile.first_name} ${profile.last_name}`,
      email: profile.email 
    });
    
    return profile;
    
  } catch (error) {
    logWithTimestamp("CRITICAL ERROR: User lookup exception", error);
    return null;
  }
}

// Enhanced field mapping function
function mapJotFormFields(formData: any) {
  try {
    logWithTimestamp("=== STARTING FIELD MAPPING ===");
    logWithTimestamp("Raw form data keys:", Object.keys(formData));
    
    // Log all field names and values for debugging
    const fieldsDebug: any = {};
    for (const [key, value] of Object.entries(formData)) {
      fieldsDebug[key] = typeof value === 'string' ? value.substring(0, 100) : value;
    }
    logWithTimestamp("All form fields (truncated):", fieldsDebug);
    
    // Extract fields with multiple possible patterns
    const mapped = {
      name: formData.name || formData.hotel_name || formData.hotelName || formData.property_name || '',
      description: formData.description || formData.hotel_description || formData.details || '',
      address: formData.address || formData.hotel_address || formData.street_address || '',
      city: formData.city || formData.hotel_city || '',
      country: formData.country || formData.hotel_country || '',
      price_per_month: parseInt(formData.price_per_month || formData.monthly_price || formData.price || '0') || 0,
      contact_email: formData.contact_email || formData.email || formData.owner_email || '',
      contact_phone: formData.contact_phone || formData.phone || formData.owner_phone || '',
      user_token: formData.user_token || formData.token || '',
      website: formData.website || formData.hotel_website || '',
      property_type: formData.property_type || formData.type || 'hotel',
      bedrooms: parseInt(formData.bedrooms || formData.rooms || '0') || 0,
      bathrooms: parseInt(formData.bathrooms || '0') || 0,
      amenities: formData.amenities || formData.features || ''
    };
    
    logWithTimestamp("Mapped fields:", mapped);
    return mapped;
    
  } catch (error) {
    logWithTimestamp("CRITICAL ERROR: Field mapping failed", error);
    throw error;
  }
}

// Enhanced hotel creation function
async function createHotel(supabase: any, hotelData: any, ownerId: string | null) {
  try {
    logWithTimestamp("=== STARTING HOTEL CREATION ===");
    logWithTimestamp("Hotel data:", hotelData);
    logWithTimestamp("Owner ID:", ownerId);
    
    const hotelRecord = {
      name: hotelData.name || 'Unnamed Hotel',
      description: hotelData.description || 'No description provided',
      address: hotelData.address || 'No address provided',
      city: hotelData.city || 'Unknown City',
      country: hotelData.country || 'Unknown Country',
      price_per_month: hotelData.price_per_month || 0,
      contact_email: hotelData.contact_email || 'no-email@example.com',
      contact_phone: hotelData.contact_phone || 'No phone provided',
      owner_id: ownerId,
      status: 'pending',
      website: hotelData.website || null,
      property_type: hotelData.property_type || 'hotel',
      bedrooms: hotelData.bedrooms || 0,
      bathrooms: hotelData.bathrooms || 0,
      amenities: hotelData.amenities || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    logWithTimestamp("Final hotel record to insert:", hotelRecord);
    
    const { data: insertedHotel, error: insertError } = await supabase
      .from('hotels')
      .insert([hotelRecord])
      .select();
    
    if (insertError) {
      logWithTimestamp("ERROR: Hotel insertion failed", insertError);
      throw insertError;
    }
    
    if (!insertedHotel || insertedHotel.length === 0) {
      logWithTimestamp("ERROR: Hotel inserted but no data returned");
      throw new Error("Hotel insertion returned no data");
    }
    
    logWithTimestamp("SUCCESS: Hotel created successfully", insertedHotel[0]);
    return insertedHotel[0];
    
  } catch (error) {
    logWithTimestamp("CRITICAL ERROR: Hotel creation failed", error);
    throw error;
  }
}

// Enhanced request parsing function
async function parseRequest(request: Request) {
  try {
    logWithTimestamp("=== STARTING REQUEST PARSING ===");
    
    // Log request details
    logWithTimestamp("Request method:", request.method);
    logWithTimestamp("Request URL:", request.url);
    
    // Log headers
    const headers: any = {};
    request.headers.forEach((value, key) => {
      headers[key] = value;
    });
    logWithTimestamp("Request headers:", headers);
    
    const contentType = request.headers.get('content-type') || '';
    logWithTimestamp("Content-Type:", contentType);
    
    // Get raw body
    const rawBody = await request.text();
    logWithTimestamp("Raw request body:", rawBody);
    logWithTimestamp("Raw body length:", rawBody.length);
    
    // Parse based on content type
    let parsedData: any = {};
    
    if (contentType.includes('application/json')) {
      logWithTimestamp("Parsing as JSON");
      parsedData = JSON.parse(rawBody);
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      logWithTimestamp("Parsing as URL-encoded");
      parsedData = Object.fromEntries(new URLSearchParams(rawBody));
    } else if (contentType.includes('multipart/form-data')) {
      logWithTimestamp("Parsing as FormData");
      // Create new request for FormData parsing
      const formDataRequest = new Request(request.url, {
        method: request.method,
        headers: request.headers,
        body: rawBody
      });
      const formData = await formDataRequest.formData();
      parsedData = Object.fromEntries(formData.entries());
    } else {
      logWithTimestamp("Unknown content type, trying URL-encoded as fallback");
      try {
        parsedData = Object.fromEntries(new URLSearchParams(rawBody));
      } catch (fallbackError) {
        logWithTimestamp("Fallback parsing failed, trying JSON");
        parsedData = JSON.parse(rawBody);
      }
    }
    
    logWithTimestamp("Parsed data:", parsedData);
    return parsedData;
    
  } catch (error) {
    logWithTimestamp("CRITICAL ERROR: Request parsing failed", error);
    throw error;
  }
}

serve(async (req: Request) => {
  logWithTimestamp("=== JOTFORM WEBHOOK HANDLER STARTED ===");
  
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    logWithTimestamp("Handling CORS preflight request");
    return new Response(null, { headers: corsHeaders });
  }
  
  // Check environment variables
  logWithTimestamp("=== CHECKING ENVIRONMENT VARIABLES ===");
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  
  logWithTimestamp("Environment check:", {
    supabaseUrl: supabaseUrl ? "✓ Present" : "✗ Missing",
    supabaseKey: supabaseKey ? "✓ Present" : "✗ Missing"
  });
  
  if (!supabaseUrl || !supabaseKey) {
    logWithTimestamp("CRITICAL ERROR: Missing environment variables");
    return new Response(
      JSON.stringify({ error: "Missing environment variables" }),
      { 
        status: 500, 
        headers: { "Content-Type": "application/json", ...corsHeaders }
      }
    );
  }
  
  try {
    // Initialize Supabase client
    logWithTimestamp("=== INITIALIZING SUPABASE CLIENT ===");
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Test basic database connection
    const dbConnectionOk = await testBasicDatabaseConnection(supabase);
    if (!dbConnectionOk) {
      logWithTimestamp("CRITICAL ERROR: Database connection test failed");
      return new Response(
        JSON.stringify({ error: "Database connection failed" }),
        { 
          status: 500, 
          headers: { "Content-Type": "application/json", ...corsHeaders }
        }
      );
    }
    
    // Parse request
    const formData = await parseRequest(req);
    
    // Map fields
    const mappedData = mapJotFormFields(formData);
    
    // Find user by token
    const userProfile = await findUserByToken(supabase, mappedData.user_token);
    
    // Create hotel
    const createdHotel = await createHotel(supabase, mappedData, userProfile?.id || null);
    
    logWithTimestamp("=== WEBHOOK PROCESSING COMPLETED SUCCESSFULLY ===");
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Hotel submission processed successfully",
        hotel: createdHotel
      }),
      { 
        status: 200, 
        headers: { "Content-Type": "application/json", ...corsHeaders }
      }
    );
    
  } catch (error) {
    logWithTimestamp("=== CRITICAL ERROR IN WEBHOOK PROCESSING ===");
    logWithTimestamp("Error name:", error.name);
    logWithTimestamp("Error message:", error.message);
    logWithTimestamp("Error stack:", error.stack);
    
    return new Response(
      JSON.stringify({ 
        error: "Internal server error during hotel submission processing",
        details: error.message,
        timestamp: new Date().toISOString()
      }),
      { 
        status: 500, 
        headers: { "Content-Type": "application/json", ...corsHeaders }
      }
    );
  }
});
