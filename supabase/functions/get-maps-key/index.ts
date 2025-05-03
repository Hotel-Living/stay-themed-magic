
// This Edge Function retrieves the Google Maps API key from environment variables
// and returns it to the client in a consistent format.

import { serve } from "https://deno.land/std@0.131.0/http/server.ts";

console.log("Hello from get-maps-key Edge Function!");

serve(async (req) => {
  try {
    // Get API key from Edge Function environment variables
    const apiKey = Deno.env.get("GOOGLE_MAPS_API_KEY");
    
    if (!apiKey) {
      console.error("GOOGLE_MAPS_API_KEY not defined in Edge Function environment");
      return new Response(
        JSON.stringify({ 
          error: "API key not configured on server" 
        }),
        { 
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    
    // Return the API key with both naming conventions for maximum compatibility
    return new Response(
      JSON.stringify({ 
        key: apiKey,
        apiKey: apiKey
      }),
      { 
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Error in get-maps-key Edge Function:", error);
    return new Response(
      JSON.stringify({ 
        error: "Internal server error retrieving API key" 
      }),
      { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
});
