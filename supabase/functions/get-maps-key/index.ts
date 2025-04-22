
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('Receiving request to get-maps-key function')
    
    // Parse request body if it exists
    let requestBody = {}
    try {
      if (req.body) {
        const body = await req.json()
        requestBody = body
        console.log('Request body:', JSON.stringify(requestBody))
      }
    } catch (e) {
      console.log('No request body or invalid JSON:', e.message)
    }
    
    console.log('Fetching Google Maps API key from environment variables')
    const apiKey = Deno.env.get('GOOGLE_MAPS_API_KEY')
    
    if (!apiKey) {
      console.error('Google Maps API key not found in environment variables')
      throw new Error('API key not configured')
    }

    console.log('Successfully retrieved Google Maps API key')
    return new Response(
      JSON.stringify({ apiKey }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    )
  } catch (error) {
    console.error('Error in get-maps-key function:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Failed to fetch API key',
        details: error.message 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    )
  }
})
