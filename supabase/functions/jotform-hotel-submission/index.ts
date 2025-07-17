import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface JotFormSubmission {
  submissionID: string
  formID: string
  ip: string
  formTitle: string
  answers: {
    [key: string]: {
      name: string
      answer: string | string[]
      text: string
      type: string
    }
  }
}

interface PricingMatrix {
  category: number
  stayLength: number
  doubleOccupancy: number
  singleOccupancy: number
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  console.log(`JotForm hotel submission handler triggered via ${req.method} request`)

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    let submissionData: JotFormSubmission

    if (req.method === 'POST') {
      const contentType = req.headers.get('content-type') || ''
      
      if (contentType.includes('application/x-www-form-urlencoded')) {
        // JotForm webhook data comes as form-encoded
        const formData = await req.formData()
        const rawSubmissionID = formData.get('submissionID') as string
        const rawJSONData = formData.get('rawRequest') as string
        
        if (rawJSONData) {
          submissionData = JSON.parse(rawJSONData)
        } else {
          throw new Error('No submission data received from JotForm')
        }
        
        console.log('JotForm submission received:', {
          submissionID: submissionData.submissionID,
          formID: submissionData.formID,
          answersCount: Object.keys(submissionData.answers).length
        })
        
      } else if (contentType.includes('application/json')) {
        submissionData = await req.json()
      } else {
        throw new Error('Unsupported content type')
      }
    } else {
      throw new Error('Only POST requests are supported')
    }

    // Parse hotel data from JotForm submission
    const hotelData = parseHotelSubmission(submissionData)
    console.log('Parsed hotel data:', hotelData)

    // Apply mappings to hotel data for consistency
    const mappedHotelData = await applyFilterMappings(hotelData, supabase)
    
    // Create hotel record
    const { data: hotel, error: hotelError } = await supabase
      .from('hotels')
      .insert({
        name: mappedHotelData.name,
        description: mappedHotelData.description,
        country: mappedHotelData.country,
        city: mappedHotelData.city,
        address: mappedHotelData.address,
        postal_code: mappedHotelData.postalCode,
        latitude: mappedHotelData.latitude,
        longitude: mappedHotelData.longitude,
        category: mappedHotelData.category,
        property_type: mappedHotelData.propertyType,
        style: mappedHotelData.style,
        contact_name: mappedHotelData.contactName,
        contact_email: mappedHotelData.contactEmail,
        contact_phone: mappedHotelData.contactPhone,
        stay_lengths: mappedHotelData.stayLengths,
        meal_plans: mappedHotelData.mealPlans,
        rates: mappedHotelData.rates,
        features_hotel: mappedHotelData.hotelFeatures,
        features_room: mappedHotelData.roomFeatures,
        room_types: mappedHotelData.roomTypes,
        photos: mappedHotelData.photos,
        status: 'pending'
      })
      .select()
      .single()

    if (hotelError) {
      console.error('Error creating hotel:', hotelError)
      throw new Error(`Failed to create hotel: ${hotelError.message}`)
    }

    console.log(`Successfully created hotel: ${hotel.name} (ID: ${hotel.id})`)

    // Process availability packages if provided
    const packages = parseAvailabilityPackages(submissionData, hotel.id, hotelData)
    if (packages.length > 0) {
      console.log(`Processing ${packages.length} availability packages for hotel ${hotel.id}`)
      
      for (const packageData of packages) {
        try {
          const { error: packageError } = await supabase
            .from('availability_packages')
            .insert({
              hotel_id: hotel.id,
              start_date: packageData.startDate,
              end_date: packageData.endDate,
              duration_days: packageData.durationDays,
              total_rooms: packageData.totalRooms,
              available_rooms: packageData.availableRooms
            })

          if (packageError) {
            console.error('Error creating availability package:', packageError)
          } else {
            console.log(`Created package: ${packageData.startDate} - ${packageData.endDate} (${packageData.durationDays} days, ${packageData.totalRooms} rooms)`)
          }
        } catch (error) {
          console.error('Error processing package:', error)
        }
      }
    }

    // Insert hotel themes/affinities if provided
    if (hotelData.themes && hotelData.themes.length > 0) {
      const themeInserts = hotelData.themes.map(themeId => ({
        hotel_id: hotel.id,
        theme_id: themeId
      }))

      const { error: themesError } = await supabase
        .from('hotel_themes')
        .insert(themeInserts)

      if (themesError) {
        console.error('Error inserting hotel themes:', themesError)
      } else {
        console.log(`Inserted ${themeInserts.length} hotel themes`)
      }
    }

    // Insert hotel activities if provided
    if (hotelData.activities && hotelData.activities.length > 0) {
      const activityInserts = hotelData.activities.map(activityId => ({
        hotel_id: hotel.id,
        activity_id: activityId
      }))

      const { error: activitiesError } = await supabase
        .from('hotel_activities')
        .insert(activityInserts)

      if (activitiesError) {
        console.error('Error inserting hotel activities:', activitiesError)
      } else {
        console.log(`Inserted ${activityInserts.length} hotel activities`)
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Hotel submission processed successfully',
        hotelId: hotel.id,
        hotelName: hotel.name,
        submissionId: submissionData.submissionID
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    )

  } catch (error) {
    console.error('JotForm hotel submission error:', error)
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})

function parseHotelSubmission(submission: JotFormSubmission) {
  const answers = submission.answers
  console.log('Parsing submission answers:', Object.keys(answers))

  // Extract basic hotel information
  const hotelData: any = {
    name: '',
    description: '',
    country: '',
    city: '',
    address: '',
    postalCode: '',
    latitude: null,
    longitude: null,
    category: null,
    propertyType: '',
    style: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    stayLengths: [],
    mealPlans: [],
    rates: {},
    hotelFeatures: {},
    roomFeatures: {},
    roomTypes: [],
    photos: [],
    themes: [],
    activities: []
  }

  // Parse each answer by field text/name patterns
  Object.entries(answers).forEach(([qid, answer]) => {
    const fieldText = answer.text?.toLowerCase() || answer.name?.toLowerCase() || ''
    const answerValue = Array.isArray(answer.answer) ? answer.answer : [answer.answer]
    
    console.log(`Processing field ${qid}: "${fieldText}" = ${JSON.stringify(answerValue)}`)

    // Basic Information Fields
    if (fieldText.includes('nombre del hotel') || fieldText.includes('hotel name')) {
      hotelData.name = answerValue[0] || ''
    }
    else if (fieldText.includes('descripción') || fieldText.includes('description')) {
      hotelData.description = answerValue[0] || ''
    }
    else if (fieldText.includes('país') || fieldText.includes('country')) {
      hotelData.country = answerValue[0] || ''
    }
    else if (fieldText.includes('ciudad') || fieldText.includes('city')) {
      hotelData.city = answerValue[0] || ''
    }
    else if (fieldText.includes('dirección') || fieldText.includes('address')) {
      hotelData.address = answerValue[0] || ''
    }
    else if (fieldText.includes('código postal') || fieldText.includes('postal code')) {
      hotelData.postalCode = answerValue[0] || ''
    }
    else if (fieldText.includes('latitud') || fieldText.includes('latitude')) {
      hotelData.latitude = parseFloat(answerValue[0]) || null
    }
    else if (fieldText.includes('longitud') || fieldText.includes('longitude')) {
      hotelData.longitude = parseFloat(answerValue[0]) || null
    }
    else if (fieldText.includes('categoría') || fieldText.includes('category')) {
      const categoryStr = answerValue[0] || ''
      const categoryMatch = categoryStr.match(/(\d+)/)
      hotelData.category = categoryMatch ? parseInt(categoryMatch[1]) : null
    }
    else if (fieldText.includes('tipo de propiedad') || fieldText.includes('property type')) {
      hotelData.propertyType = answerValue[0] || ''
    }
    else if (fieldText.includes('estilo') || fieldText.includes('style')) {
      hotelData.style = answerValue[0] || ''
    }
    
    // Contact Information
    else if (fieldText.includes('nombre de contacto') || fieldText.includes('contact name')) {
      hotelData.contactName = answerValue[0] || ''
    }
    else if (fieldText.includes('email') || fieldText.includes('correo')) {
      hotelData.contactEmail = answerValue[0] || ''
    }
    else if (fieldText.includes('teléfono') || fieldText.includes('phone')) {
      hotelData.contactPhone = answerValue[0] || ''
    }
    
    // Stay Lengths and Meal Plans
    else if (fieldText.includes('duración') || fieldText.includes('stay length') || fieldText.includes('noches')) {
      const stayLengths = answerValue.map(val => {
        const match = val.match(/(\d+)/)
        return match ? parseInt(match[1]) : null
      }).filter(val => val !== null)
      hotelData.stayLengths = [...new Set([...hotelData.stayLengths, ...stayLengths])]
    }
    else if (fieldText.includes('plan de comida') || fieldText.includes('meal plan')) {
      hotelData.mealPlans = [...new Set([...hotelData.mealPlans, ...answerValue])]
    }
    
    // Pricing Matrix - New pricing structure based on category and stay lengths
    else if (fieldText.includes('precio') || fieldText.includes('price') || fieldText.includes('tarifa')) {
      parsePricingField(qid, fieldText, answerValue, hotelData)
    }
    
    // Features and Amenities
    else if (fieldText.includes('servicios del hotel') || fieldText.includes('hotel features')) {
      const features = {}
      answerValue.forEach(feature => {
        features[feature] = true
      })
      hotelData.hotelFeatures = { ...hotelData.hotelFeatures, ...features }
    }
    else if (fieldText.includes('servicios de habitación') || fieldText.includes('room features')) {
      const features = {}
      answerValue.forEach(feature => {
        features[feature] = true
      })  
      hotelData.roomFeatures = { ...hotelData.roomFeatures, ...features }
    }
    
    // Room Types
    else if (fieldText.includes('tipos de habitación') || fieldText.includes('room types')) {
      const roomTypes = answerValue.map(roomType => ({
        type: roomType,
        description: ''
      }))
      hotelData.roomTypes = [...hotelData.roomTypes, ...roomTypes]
    }
    
    // Photos/Images
    else if (fieldText.includes('foto') || fieldText.includes('image') || fieldText.includes('photo')) {
      hotelData.photos = [...new Set([...hotelData.photos, ...answerValue])]
    }
  })

  console.log('Parsed hotel data summary:', {
    name: hotelData.name,
    category: hotelData.category,
    stayLengths: hotelData.stayLengths,
    ratesKeys: Object.keys(hotelData.rates)
  })

  return hotelData
}

function parsePricingField(qid: string, fieldText: string, answerValue: string[], hotelData: any) {
  // Parse pricing fields based on the new structure
  // Expected format: category-based pricing tables with stay durations and occupancy types
  
  console.log(`Parsing pricing field: ${fieldText}`)
  
  // Look for patterns like:
  // "3 estrellas - 7 noches - doble" 
  // "4 stars - 14 nights - single"
  // "categoria 3 - 30 dias - ocupacion doble"
  
  const categoryMatch = fieldText.match(/(\d+)\s*(estrella|star|categoria|category)/i)
  const stayLengthMatch = fieldText.match(/(\d+)\s*(noche|night|día|day)/i)
  const occupancyMatch = fieldText.match(/(doble|double|individual|single)/i)
  
  if (categoryMatch && stayLengthMatch) {
    const category = parseInt(categoryMatch[1])
    const stayLength = parseInt(stayLengthMatch[1])
    const occupancy = occupancyMatch ? occupancyMatch[1].toLowerCase() : 'double'
    const price = parseFloat(answerValue[0]) || 0
    
    // Normalize occupancy terms
    const normalizedOccupancy = ['doble', 'double'].includes(occupancy) ? 'double' : 'single'
    
    // Store in rates object with structured key
    const rateKey = `${category}star_${stayLength}nights_${normalizedOccupancy}`
    hotelData.rates[rateKey] = price
    
    console.log(`Parsed pricing: Category ${category}, ${stayLength} nights, ${normalizedOccupancy} = $${price}`)
  } else {
    // Fallback: try to parse general pricing information
    const price = parseFloat(answerValue[0]) || 0
    if (price > 0) {
      // Store with field ID as key for now
      hotelData.rates[`field_${qid}`] = price
    }
  }
}

// Apply filter mappings to ensure consistent data storage
async function applyFilterMappings(hotelData: any, supabase: any) {
  console.log('Applying filter mappings to hotel data')
  
  // Get all mappings
  const { data: mappings, error } = await supabase
    .from('filter_value_mappings')
    .select('category, spanish_value, english_value')
    .eq('is_active', true)

  if (error) {
    console.error('Error fetching mappings:', error)
    return hotelData // Return original data if mappings fail
  }

  if (!mappings || mappings.length === 0) {
    console.log('No mappings found, returning original data')
    return hotelData
  }

  // Create lookup maps
  const spanishToEnglish = new Map<string, Map<string, string>>()
  const englishToSpanish = new Map<string, Map<string, string>>()

  mappings.forEach(mapping => {
    // Spanish to English mappings
    if (!spanishToEnglish.has(mapping.category)) {
      spanishToEnglish.set(mapping.category, new Map())
    }
    spanishToEnglish.get(mapping.category)!.set(mapping.spanish_value, mapping.english_value)

    // English to Spanish mappings  
    if (!englishToSpanish.has(mapping.category)) {
      englishToSpanish.set(mapping.category, new Map())
    }
    englishToSpanish.get(mapping.category)!.set(mapping.english_value, mapping.spanish_value)
  })

  const mappedData = { ...hotelData }

  // Apply mappings to meal plans (store Spanish as primary, ensure English equivalent exists)
  if (mappedData.mealPlans && mappedData.mealPlans.length > 0) {
    const mealPlanMap = spanishToEnglish.get('meal_plans')
    const englishMealPlanMap = englishToSpanish.get('meal_plans')
    
    mappedData.mealPlans = mappedData.mealPlans.map((mealPlan: string) => {
      // If it's English, convert to Spanish (primary)
      if (englishMealPlanMap && englishMealPlanMap.has(mealPlan)) {
        return englishMealPlanMap.get(mealPlan)
      }
      // If it's already Spanish or unmapped, keep as-is
      return mealPlan
    })
    
    console.log('Mapped meal plans:', mappedData.mealPlans)
  }

  // Apply mappings to room types (stored in JSONB array)
  if (mappedData.roomTypes && mappedData.roomTypes.length > 0) {
    const roomTypeMap = spanishToEnglish.get('room_types')
    const englishRoomTypeMap = englishToSpanish.get('room_types')
    
    mappedData.roomTypes = mappedData.roomTypes.map((roomTypeObj: any) => {
      const roomType = roomTypeObj.type || roomTypeObj
      
      // If it's English, convert to Spanish (primary)
      if (englishRoomTypeMap && englishRoomTypeMap.has(roomType)) {
        const spanishValue = englishRoomTypeMap.get(roomType)
        return typeof roomTypeObj === 'object' 
          ? { ...roomTypeObj, type: spanishValue }
          : spanishValue
      }
      // If it's already Spanish or unmapped, keep as-is
      return roomTypeObj
    })
    
    console.log('Mapped room types:', mappedData.roomTypes)
  }

  // Apply mappings to property style
  if (mappedData.style) {
    const styleMap = spanishToEnglish.get('property_styles')
    const englishStyleMap = englishToSpanish.get('property_styles')
    
    // If it's English, convert to Spanish (primary)
    if (englishStyleMap && englishStyleMap.has(mappedData.style)) {
      mappedData.style = englishStyleMap.get(mappedData.style)
      console.log('Mapped property style to Spanish:', mappedData.style)
    }
    // If it's already Spanish or unmapped, keep as-is
  }

  console.log('Applied mappings successfully')
  return mappedData
}

// Parse availability packages from JotForm submission
function parseAvailabilityPackages(submission: JotFormSubmission, hotelId: string, hotelData: any) {
  const packages: any[] = []
  const answers = submission.answers
  
  console.log('Parsing availability packages from JotForm submission')

  // Get check-in weekday preference (default to Monday)
  let checkInWeekday = 'Monday'
  
  // Look for weekday preference field
  Object.entries(answers).forEach(([qid, answer]) => {
    const fieldText = answer.text?.toLowerCase() || answer.name?.toLowerCase() || ''
    const answerValue = Array.isArray(answer.answer) ? answer.answer[0] : answer.answer
    
    if (fieldText.includes('día de entrada') || fieldText.includes('check-in day') || 
        fieldText.includes('weekday') || fieldText.includes('preferred day')) {
      checkInWeekday = parseWeekday(answerValue || 'Monday')
    }
  })

  // Look for package-related fields
  Object.entries(answers).forEach(([qid, answer]) => {
    const fieldText = answer.text?.toLowerCase() || answer.name?.toLowerCase() || ''
    const answerValue = Array.isArray(answer.answer) ? answer.answer : [answer.answer]
    
    // Look for package data patterns
    const packageMatch = fieldText.match(/(paquete|package|bloque|block|disponibilidad)\s*(\d+)/i)
    if (packageMatch) {
      const packageNumber = parseInt(packageMatch[2])
      console.log(`Found package ${packageNumber} field: ${fieldText}`)
      
      // Parse package data from answer
      const packageData = parsePackageFromAnswer(answerValue, packageNumber, checkInWeekday)
      if (packageData) {
        packages.push(packageData)
      }
    }

    // Look for date range fields that might contain package information
    if (fieldText.includes('fechas disponibles') || fieldText.includes('available dates') ||
        fieldText.includes('periodos') || fieldText.includes('periods')) {
      const parsedPackages = parsePackagesFromDateField(answerValue, checkInWeekday)
      packages.push(...parsedPackages)
    }

    // Look for structured package data in specific field formats
    if (fieldText.includes('disponibilidad') || fieldText.includes('availability')) {
      const structuredPackages = parseStructuredPackageData(answerValue, checkInWeekday)
      packages.push(...structuredPackages)
    }
  })

  console.log(`Parsed ${packages.length} availability packages`)
  return packages.slice(0, 10) // Limit to 10 packages as per specification
}

function parseWeekday(weekdayStr: string): string {
  const weekdays: { [key: string]: string } = {
    'lunes': 'Monday', 'monday': 'Monday',
    'martes': 'Tuesday', 'tuesday': 'Tuesday', 
    'miércoles': 'Wednesday', 'wednesday': 'Wednesday',
    'miercoles': 'Wednesday',
    'jueves': 'Thursday', 'thursday': 'Thursday',
    'viernes': 'Friday', 'friday': 'Friday',
    'sábado': 'Saturday', 'saturday': 'Saturday',
    'sabado': 'Saturday',
    'domingo': 'Sunday', 'sunday': 'Sunday'
  }
  
  const normalized = weekdayStr.toLowerCase().trim()
  return weekdays[normalized] || 'Monday'
}

function parsePackageFromAnswer(answerValues: string[], packageNumber: number, checkInWeekday: string) {
  if (!answerValues || answerValues.length === 0) return null
  
  const packageValue = answerValues[0]
  
  // Try to parse structured data (pipe-separated: startDate|duration|rooms)
  if (packageValue.includes('|')) {
    const parts = packageValue.split('|')
    const startDate = parts[0]?.trim()
    const duration = parseInt(parts[1]?.trim() || '0')
    const rooms = parseInt(parts[2]?.trim() || '1')
    
    if (startDate && isValidDuration(duration)) {
      return {
        startDate: formatDate(startDate),
        endDate: calculateEndDate(startDate, duration),
        durationDays: duration,
        totalRooms: rooms,
        availableRooms: rooms
      }
    }
  }
  
  // Try to parse as JSON
  try {
    const packageData = JSON.parse(packageValue)
    if (packageData.startDate && packageData.duration && packageData.rooms) {
      const duration = parseInt(packageData.duration)
      if (isValidDuration(duration)) {
        return {
          startDate: formatDate(packageData.startDate),
          endDate: calculateEndDate(packageData.startDate, duration),
          durationDays: duration,
          totalRooms: parseInt(packageData.rooms) || 1,
          availableRooms: parseInt(packageData.rooms) || 1
        }
      }
    }
  } catch (e) {
    // Not JSON, continue with other parsing methods
  }
  
  return null
}

function parsePackagesFromDateField(answerValues: string[], checkInWeekday: string) {
  const packages: any[] = []
  
  for (const value of answerValues) {
    // Look for date ranges like "2024-06-01 to 2024-06-15 (15 days, 3 rooms)"
    const rangeMatch = value.match(/(\d{4}-\d{2}-\d{2})\s*to\s*(\d{4}-\d{2}-\d{2})\s*\((\d+)\s*days?,\s*(\d+)\s*rooms?\)/i)
    if (rangeMatch) {
      const [, startDate, endDate, durationStr, roomsStr] = rangeMatch
      const duration = parseInt(durationStr)
      const rooms = parseInt(roomsStr)
      
      if (isValidDuration(duration)) {
        packages.push({
          startDate: formatDate(startDate),
          endDate: formatDate(endDate),
          durationDays: duration,
          totalRooms: rooms,
          availableRooms: rooms
        })
      }
    }
  }
  
  return packages
}

function parseStructuredPackageData(answerValues: string[], checkInWeekday: string) {
  const packages: any[] = []
  
  for (const value of answerValues) {
    // Try to parse multiple packages from a single field
    // Format: "Package1:2024-06-01,15,3;Package2:2024-07-01,22,2"
    if (value.includes(';')) {
      const packageStrings = value.split(';')
      
      for (const packageStr of packageStrings) {
        const colonIndex = packageStr.indexOf(':')
        if (colonIndex > 0) {
          const packageData = packageStr.substring(colonIndex + 1)
          const parts = packageData.split(',')
          
          if (parts.length >= 3) {
            const startDate = parts[0]?.trim()
            const duration = parseInt(parts[1]?.trim() || '0')
            const rooms = parseInt(parts[2]?.trim() || '1')
            
            if (startDate && isValidDuration(duration)) {
              packages.push({
                startDate: formatDate(startDate),
                endDate: calculateEndDate(startDate, duration),
                durationDays: duration,
                totalRooms: rooms,
                availableRooms: rooms
              })
            }
          }
        }
      }
    }
  }
  
  return packages
}

function isValidDuration(duration: number): boolean {
  return [8, 15, 22, 29].includes(duration)
}

function formatDate(dateStr: string): string {
  // Handle different date formats and convert to YYYY-MM-DD
  const formats = [
    /(\d{4})-(\d{2})-(\d{2})/, // YYYY-MM-DD
    /(\d{2})\/(\d{2})\/(\d{4})/, // MM/DD/YYYY
    /(\d{2})-(\d{2})-(\d{4})/, // MM-DD-YYYY
  ]
  
  for (const format of formats) {
    const match = dateStr.match(format)
    if (match) {
      if (format === formats[0]) {
        // YYYY-MM-DD format
        return dateStr
      } else {
        // Convert to YYYY-MM-DD
        const [, part1, part2, year] = match
        const month = part1.padStart(2, '0')
        const day = part2.padStart(2, '0')
        return `${year}-${month}-${day}`
      }
    }
  }
  
  return dateStr // Return as-is if no pattern matches
}

function calculateEndDate(startDate: string, durationDays: number): string {
  const start = new Date(startDate)
  const end = new Date(start)
  end.setDate(start.getDate() + durationDays - 1)
  return end.toISOString().split('T')[0]
}