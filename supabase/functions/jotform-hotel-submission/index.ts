
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  console.log('=== JOTFORM WEBHOOK EMERGENCY DEBUG START ===')
  console.log('Request method:', req.method)
  console.log('Request URL:', req.url)
  
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    console.log('CORS preflight request')
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    
    console.log('Environment check:')
    console.log('- SUPABASE_URL:', supabaseUrl ? 'SET' : 'MISSING')
    console.log('- SUPABASE_SERVICE_ROLE_KEY:', supabaseKey ? 'SET' : 'MISSING')
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing required environment variables')
      return new Response(JSON.stringify({ error: 'Missing environment variables' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Capture ALL headers
    const headers = {}
    for (const [key, value] of req.headers.entries()) {
      headers[key] = value
    }
    
    console.log('=== REQUEST HEADERS ===')
    console.log(JSON.stringify(headers, null, 2))
    
    // Get content-type
    const contentType = req.headers.get('content-type') || 'unknown'
    console.log('Content-Type:', contentType)
    
    // Capture raw body
    let rawBody = ''
    let bodyText = ''
    
    try {
      bodyText = await req.text()
      rawBody = bodyText
      console.log('=== RAW BODY ===')
      console.log('Body length:', bodyText.length)
      console.log('First 500 chars:', bodyText.substring(0, 500))
      console.log('Last 500 chars:', bodyText.substring(Math.max(0, bodyText.length - 500)))
    } catch (bodyError) {
      console.error('Error reading body:', bodyError)
      rawBody = `Error reading body: ${bodyError.message}`
    }

    // Try to parse body in different ways
    let parsedData = null
    let parseMethod = 'none'
    
    // Try JSON first
    try {
      parsedData = JSON.parse(bodyText)
      parseMethod = 'json'
      console.log('Successfully parsed as JSON')
    } catch (jsonError) {
      console.log('JSON parse failed:', jsonError.message)
      
      // Try URLSearchParams
      try {
        const urlParams = new URLSearchParams(bodyText)
        parsedData = Object.fromEntries(urlParams.entries())
        parseMethod = 'urlencoded'
        console.log('Successfully parsed as URLSearchParams')
      } catch (urlError) {
        console.log('URLSearchParams parse failed:', urlError.message)
        parseMethod = 'raw'
      }
    }

    console.log('=== PARSED DATA ===')
    console.log('Parse method:', parseMethod)
    if (parsedData) {
      console.log('Parsed keys:', Object.keys(parsedData))
      console.log('Parsed data:', JSON.stringify(parsedData, null, 2))
    }

    // Store raw payload in temporary table
    const rawPayload = {
      received_at: new Date().toISOString(),
      headers: headers,
      content_type: contentType,
      raw_body: rawBody,
      parsed_data: parsedData,
      parse_method: parseMethod,
      user_agent: req.headers.get('user-agent') || 'unknown'
    }

    console.log('=== STORING RAW PAYLOAD ===')
    const { data: insertData, error: insertError } = await supabase
      .from('jotform_raw')
      .insert([rawPayload])
      .select()

    if (insertError) {
      console.error('Error storing raw payload:', insertError)
      return new Response(JSON.stringify({ 
        error: 'Failed to store raw payload', 
        details: insertError.message 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    console.log('Raw payload stored successfully:', insertData)

    // Simple success response
    console.log('=== SUCCESS RESPONSE ===')
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Raw payload captured successfully',
      id: insertData?.[0]?.id
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('=== CRITICAL ERROR ===')
    console.error('Error type:', error.constructor.name)
    console.error('Error message:', error.message)
    console.error('Error stack:', error.stack)
    
    return new Response(JSON.stringify({ 
      error: 'Critical webhook error',
      message: error.message,
      stack: error.stack
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
