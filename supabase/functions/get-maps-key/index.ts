
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

console.log("Listening on http://localhost:9999/");

serve(async (req) => {
  console.log("Receiving request to get-maps-key function");
  
  try {
    // Parse the request body if any is sent
    let payload = {};
    try {
      const reqText = await req.text();
      if (reqText) {
        payload = JSON.parse(reqText);
      } else {
        console.log("No request body or invalid JSON: Unexpected end of JSON input");
      }
    } catch (e) {
      console.log(`No request body or invalid JSON: ${e.message}`);
    }

    console.log("Fetching Google Maps API key from environment variables");
    const apiKey = Deno.env.get("GOOGLE_MAPS_API_KEY");
    
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "Google Maps API key not found in environment" }),
        { headers: { "Content-Type": "application/json" }, status: 500 }
      );
    }

    console.log("Successfully retrieved Google Maps API key");
    
    return new Response(
      JSON.stringify({
        key: apiKey,
        message: "Maps API key retrieved successfully",
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in maps key function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Unknown error occurred" }),
      { headers: { "Content-Type": "application/json" }, status: 500 }
    );
  }
});
