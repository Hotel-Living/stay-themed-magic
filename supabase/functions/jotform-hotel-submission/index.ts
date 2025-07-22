
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  console.log('=== JOTFORM HOTEL SUBMISSION WEBHOOK ===')
  console.log('Request method:', req.method)
  console.log('Request URL:', req.url)
  
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing required environment variables')
      return new Response(JSON.stringify({ error: 'Missing environment variables' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Get raw body
    const bodyText = await req.text()
    console.log('Raw body received, length:', bodyText.length)

    // Parse multipart/form-data using URLSearchParams
    let parsedData = null
    let formData = null
    
    try {
      const urlParams = new URLSearchParams(bodyText)
      parsedData = Object.fromEntries(urlParams.entries())
      console.log('Successfully parsed form data')
    } catch (parseError) {
      console.error('Failed to parse form data:', parseError)
      throw new Error('Invalid form data format')
    }

    // Extract the rawRequest JSON which contains all the form fields
    const rawRequestString = parsedData.rawRequest
    if (!rawRequestString) {
      console.error('No rawRequest field found in submission')
      throw new Error('Missing rawRequest data')
    }

    try {
      formData = JSON.parse(rawRequestString)
      console.log('Form data extracted successfully')
    } catch (jsonError) {
      console.error('Failed to parse rawRequest JSON:', jsonError)
      throw new Error('Invalid rawRequest JSON format')
    }

    // Store raw payload for debugging
    const rawPayload = {
      received_at: new Date().toISOString(),
      headers: Object.fromEntries(req.headers.entries()),
      content_type: req.headers.get('content-type') || 'unknown',
      raw_body: bodyText,
      parsed_data: formData,
      parse_method: 'multipart',
      user_agent: req.headers.get('user-agent') || 'unknown'
    }

    await supabase.from('jotform_raw').insert([rawPayload])

    // Extract user token from localStorage approach or URL parameter
    let userToken = null
    let ownerId = null

    // Check if there's a user_token in the parsed data or try localStorage
    if (parsedData.user_token) {
      userToken = parsedData.user_token
    }

    if (userToken) {
      // Get user ID from token
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('jotform_token', userToken)
        .single()
      
      if (profile) {
        ownerId = profile.id
        console.log('Found user for token:', ownerId)
      }
    }

    // Extract and map all form fields to hotel data
    const hotelData = {
      name: formData.q2_typeA || 'Unnamed Hotel',
      description: formData.q13_descripcionDel || '',
      
      // Address and location
      country: formData.q5_direccionFisica?.country || formData.dropdown_search || '',
      city: formData.q5_direccionFisica?.city || '',
      address: formData.q5_direccionFisica ? 
        `${formData.q5_direccionFisica.addr_line1 || ''} ${formData.q5_direccionFisica.addr_line2 || ''}`.trim() : '',
      postal_code: formData.q5_direccionFisica?.postal || '',
      
      // Property details
      property_type: formData.q11_tipoDe || '',
      style: formData.q12_estiloDel || '',
      category: formData.q4_categoriaOficial === '***' ? 3 : null,
      
      // Descriptions
      ideal_guests: formData.q14_ltstronggtltemgtesIdeal || '',
      atmosphere: formData.q15_ltstronggtltemgtelAmbiente || '',
      perfect_location: formData.q16_ltstronggtltemgtlaUbicacion || '',
      
      // Features
      features_hotel: {
        wifi: formData.q17_instalacionesY?.includes('WiFi Gratis') || false,
        restaurant: formData.q17_instalacionesY?.includes('Restaurante') || false,
        spa: formData.q17_instalacionesY?.includes('Spa') || false,
        gym: formData.q17_instalacionesY?.includes('Gimnasio') || false,
        pool: formData.q17_instalacionesY?.includes('Piscina') || false,
        parking: formData.q17_instalacionesY?.includes('Parking') || false,
        laundry: formData.q24_elServicio === 'SÍ'
      },
      
      features_room: {
        air_conditioning: formData.q18_serviciosEn?.includes('Aire Acondicionado') || false,
        tv: formData.q18_serviciosEn?.includes('Televisor') || false,
        minibar: formData.q18_serviciosEn?.includes('Mini Bar') || false,
        safe: formData.q18_serviciosEn?.includes('Caja Fuerte') || false,
        balcony: formData.q18_serviciosEn?.includes('Balcón') || false,
        wifi: formData.q18_serviciosEn?.includes('WiFi') || false
      },
      
      // Room description
      location_description: formData.q21_descripcionDe21 || '',
      
      // Scheduling
      preferredWeekday: formData.q22_elijaSu || 'Monday',
      
      // Meal plans
      meal_plans: formData.q23_planDe ? [formData.q23_planDe] : [],
      
      // Stay lengths - convert from strings to numbers
      stay_lengths: formData.q26_cualEs26 ? 
        formData.q26_cualEs26.map(duration => {
          const match = duration.match(/(\d+)\s*días/)
          return match ? parseInt(match[1]) : 7
        }) : [7],
      
      // Pricing matrix
      pricingmatrix: formData.q47_tarifas47 ? (() => {
        const rates = formData.q47_tarifas47
        const matrix = []
        if (rates['0'] && rates['0'][0]) {
          matrix.push({
            roomType: 'Standard',
            stayLength: '8 days / 7 nights',
            mealPlan: formData.q23_planDe || 'Solo alojamiento',
            price: parseInt(rates['0'][0]) || 0
          })
        }
        if (rates['0'] && rates['0'][1]) {
          matrix.push({
            roomType: 'Standard',
            stayLength: '15 days / 14 nights',
            mealPlan: formData.q23_planDe || 'Solo alojamiento',
            price: parseInt(rates['0'][1]) || 0
          })
        }
        return matrix
      })() : [],
      
      // Set price per month from first pricing entry
      price_per_month: (() => {
        if (formData.q47_tarifas47?.['0']?.[0]) {
          return parseInt(formData.q47_tarifas47['0'][0]) || 1000
        }
        return 1000
      })(),
      
      // Availability packages from q28_typeA28
      room_types: formData.q28_typeA28 ? (() => {
        try {
          const packages = JSON.parse(formData.q28_typeA28)
          return packages.map(pkg => ({
            rooms: parseInt(pkg['Número de habitaciones']) || 1,
            checkIn: pkg['Fecha de entrada'] || '',
            checkOut: pkg['Fecha de salida'] || ''
          }))
        } catch (e) {
          return []
        }
      })() : [],
      
      // Contact information from legal data
      contact_name: (() => {
        const legalData = formData.q30_typeA30 || ''
        const nameMatch = legalData.match(/Nombre del titular de la cuenta:\s*([^\r\n]+)/)
        return nameMatch ? nameMatch[1].trim() : ''
      })(),
      
      contact_email: (() => {
        const legalData = formData.q30_typeA30 || ''
        // Try to extract email if present, otherwise use a placeholder
        const emailMatch = legalData.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/)
        return emailMatch ? emailMatch[1] : `contact@${(formData.q2_typeA || 'hotel').toLowerCase().replace(/\s+/g, '')}.com`
      })(),
      
      // Terms acceptance
      terms: formData.q39_typeA39 || '',
      
      // Set owner and status
      owner_id: ownerId,
      status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    console.log('Creating hotel with data:', JSON.stringify(hotelData, null, 2))

    // Insert hotel into database
    const { data: hotelResult, error: hotelError } = await supabase
      .from('hotels')
      .insert([hotelData])
      .select()
      .single()

    if (hotelError) {
      console.error('Error creating hotel:', hotelError)
      throw new Error(`Failed to create hotel: ${hotelError.message}`)
    }

    console.log('Hotel created successfully:', hotelResult.id)

    // Process activities if present
    const activities = [
      ...(formData.q20_atraigaA20 || []),
      ...(formData.q52_atraigaA || []),
      ...(formData.q41_atraigaA41 || [])
    ]

    if (activities.length > 0) {
      console.log('Processing activities:', activities)
      
      // Get existing activities from database
      const { data: existingActivities } = await supabase
        .from('activities')
        .select('id, name')
        .in('name', activities)

      const existingActivityNames = existingActivities?.map(a => a.name) || []
      const newActivities = activities.filter(name => !existingActivityNames.includes(name))

      // Create new activities if needed
      if (newActivities.length > 0) {
        const { data: createdActivities } = await supabase
          .from('activities')
          .insert(newActivities.map(name => ({ name, category: 'general' })))
          .select()

        if (createdActivities) {
          existingActivities.push(...createdActivities)
        }
      }

      // Link activities to hotel
      if (existingActivities && existingActivities.length > 0) {
        const hotelActivities = existingActivities.map(activity => ({
          hotel_id: hotelResult.id,
          activity_id: activity.id
        }))

        await supabase
          .from('hotel_activities')
          .insert(hotelActivities)
      }
    }

    console.log('Hotel submission processed successfully')

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Hotel submission processed successfully',
      hotel_id: hotelResult.id
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('=== WEBHOOK ERROR ===')
    console.error('Error type:', error.constructor.name)
    console.error('Error message:', error.message)
    console.error('Error stack:', error.stack)
    
    return new Response(JSON.stringify({ 
      error: 'Webhook processing failed',
      message: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
