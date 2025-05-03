
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Define CORS headers for browser access
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

console.log("Maps API key function started");

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      status: 204, 
      headers: corsHeaders 
    });
  }
  
  console.log("Receiving request to get-maps-key function");
  
  try {
    // Parse the request body if any is sent
    let payload = {};
    try {
      const reqText = await req.text();
      if (reqText) {
        payload = JSON.parse(reqText);
      } else {
        console.log("No request body provided");
      }
    } catch (e) {
      console.log(`No request body or invalid JSON: ${e.message}`);
    }

    console.log("Fetching Google Maps API key from environment variables");
    const apiKey = Deno.env.get("GOOGLE_MAPS_API_KEY");
    
    if (!apiKey) {
      console.error("Google Maps API key not found in environment");
      return new Response(
        JSON.stringify({ 
          error: "Google Maps API key not found in environment",
          message: "Please configure the GOOGLE_MAPS_API_KEY in Supabase secrets"
        }),
        { 
          headers: { 
            ...corsHeaders, 
            "Content-Type": "application/json" 
          }, 
          status: 500 
        }
      );
    }

    console.log("Successfully retrieved Google Maps API key");
    
    return new Response(
      JSON.stringify({
        key: apiKey,
        message: "Maps API key retrieved successfully",
      }),
      { 
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json" 
        } 
      }
    );
  } catch (error) {
    console.error("Error in maps key function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message || "Unknown error occurred",
        stack: error.stack
      }),
      { 
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json" 
        }, 
        status: 500 
      }
    );
  }
});
