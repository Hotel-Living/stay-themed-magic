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

interface AvailabilityPackage {
  hotelId: string
  startDate: string
  endDate: string
  durationDays: number
  totalRooms: number
  availableRooms: number
  checkInWeekday: string
}

interface PackageSyncResult {
  success: boolean
  packagesCreated: number
  packagesUpdated: number
  errors: string[]
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  console.log(`JotForm availability packages sync triggered via ${req.method} request`)

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const jotformApiKey = Deno.env.get('JOTFORM_API_KEY')
    
    if (!jotformApiKey) {
      throw new Error('JOTFORM_API_KEY is not configured')
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    let submissionData: JotFormSubmission | null = null
    let isWebhookCall = false

    // Handle different request types
    if (req.method === 'POST') {
      const contentType = req.headers.get('content-type') || ''
      
      if (contentType.includes('application/x-www-form-urlencoded')) {
        // JotForm webhook data comes as form-encoded
        const formData = await req.formData()
        const rawJSONData = formData.get('rawRequest') as string
        
        if (rawJSONData) {
          submissionData = JSON.parse(rawJSONData)
          isWebhookCall = true
          console.log('Webhook submission received for packages:', {
            submissionID: submissionData.submissionID,
            formID: submissionData.formID
          })
        }
      } else if (contentType.includes('application/json')) {
        const jsonData = await req.json()
        if (jsonData.submissionData) {
          submissionData = jsonData.submissionData
        }
      }
    }

    let syncResult: PackageSyncResult

    if (submissionData) {
      // Process individual submission for packages
      syncResult = await processSubmissionPackages(submissionData, supabase)
    } else {
      // Bulk sync all recent submissions for packages
      syncResult = await bulkSyncPackages(supabase, jotformApiKey)
    }

    console.log('Package sync completed:', syncResult)

    return new Response(
      JSON.stringify({
        success: syncResult.success,
        packagesCreated: syncResult.packagesCreated,
        packagesUpdated: syncResult.packagesUpdated,
        errors: syncResult.errors,
        timestamp: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: syncResult.success ? 200 : 500
      }
    )

  } catch (error) {
    console.error('JotForm package sync error:', error)
    
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

async function processSubmissionPackages(
  submission: JotFormSubmission, 
  supabase: any
): Promise<PackageSyncResult> {
  console.log('Processing submission for availability packages')
  
  const result: PackageSyncResult = {
    success: true,
    packagesCreated: 0,
    packagesUpdated: 0,
    errors: []
  }

  try {
    // Parse hotel identification from submission
    const hotelInfo = parseHotelIdentification(submission)
    
    if (!hotelInfo.hotelId) {
      result.errors.push('Could not identify hotel from submission')
      result.success = false
      return result
    }

    // Parse availability packages from submission
    const packages = parseAvailabilityPackages(submission, hotelInfo)
    
    console.log(`Found ${packages.length} availability packages for hotel ${hotelInfo.hotelId}`)

    // Process each package
    for (const packageData of packages) {
      try {
        const syncResult = await upsertAvailabilityPackage(packageData, supabase)
        if (syncResult.created) {
          result.packagesCreated++
        } else {
          result.packagesUpdated++
        }
      } catch (error) {
        console.error('Error processing package:', error)
        result.errors.push(`Package error: ${error.message}`)
      }
    }

  } catch (error) {
    console.error('Error in processSubmissionPackages:', error)
    result.errors.push(error.message)
    result.success = false
  }

  return result
}

async function bulkSyncPackages(supabase: any, jotformApiKey: string): Promise<PackageSyncResult> {
  console.log('Starting bulk sync of availability packages')
  
  const result: PackageSyncResult = {
    success: true,
    packagesCreated: 0,
    packagesUpdated: 0,
    errors: []
  }

  try {
    // Get form ID
    const formId = Deno.env.get('JOTFORM_FORM_ID') || '251846986373069'
    
    // Fetch recent submissions from JotForm
    const jotformResponse = await fetch(
      `https://api.jotform.com/form/${formId}/submissions?apikey=${jotformApiKey}&limit=100&orderby=created_at`,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )

    if (!jotformResponse.ok) {
      throw new Error(`JotForm API error: ${jotformResponse.status} ${jotformResponse.statusText}`)
    }

    const jotformData = await jotformResponse.json()
    const submissions = jotformData.content || []
    
    console.log(`Processing ${submissions.length} submissions for package data`)

    // Process each submission
    for (const submissionData of submissions) {
      try {
        const submissionResult = await processSubmissionPackages(submissionData, supabase)
        result.packagesCreated += submissionResult.packagesCreated
        result.packagesUpdated += submissionResult.packagesUpdated
        result.errors.push(...submissionResult.errors)
      } catch (error) {
        console.error('Error processing submission:', error)
        result.errors.push(`Submission ${submissionData.id}: ${error.message}`)
      }
    }

  } catch (error) {
    console.error('Error in bulkSyncPackages:', error)
    result.errors.push(error.message)
    result.success = false
  }

  return result
}

function parseHotelIdentification(submission: JotFormSubmission): { hotelId: string | null, hotelName: string } {
  const answers = submission.answers
  let hotelName = ''
  
  // Find hotel name/identifier
  Object.entries(answers).forEach(([qid, answer]) => {
    const fieldText = answer.text?.toLowerCase() || answer.name?.toLowerCase() || ''
    const answerValue = Array.isArray(answer.answer) ? answer.answer[0] : answer.answer
    
    if (fieldText.includes('nombre del hotel') || fieldText.includes('hotel name')) {
      hotelName = answerValue || ''
    }
  })

  // For now, we'll need to look up the hotel by name or implement a better identification system
  // This is a placeholder - in production, you might want a more robust hotel identification method
  return {
    hotelId: null, // Will be resolved by hotel name lookup
    hotelName: hotelName
  }
}

function parseAvailabilityPackages(
  submission: JotFormSubmission, 
  hotelInfo: { hotelId: string | null, hotelName: string }
): AvailabilityPackage[] {
  const packages: AvailabilityPackage[] = []
  const answers = submission.answers
  
  console.log('Parsing availability packages from submission')

  // Look for package-related fields in the submission
  // JotForm package fields should contain:
  // - Package start dates
  // - Duration (8, 15, 22, 29 days)
  // - Number of rooms available
  // - Check-in weekday preference

  let checkInWeekday = 'Monday' // Default
  let packageCount = 0

  Object.entries(answers).forEach(([qid, answer]) => {
    const fieldText = answer.text?.toLowerCase() || answer.name?.toLowerCase() || ''
    const answerValue = Array.isArray(answer.answer) ? answer.answer : [answer.answer]
    
    console.log(`Processing field ${qid}: "${fieldText}" = ${JSON.stringify(answerValue)}`)

    // Parse check-in weekday preference
    if (fieldText.includes('día de entrada') || fieldText.includes('check-in day') || fieldText.includes('weekday')) {
      checkInWeekday = parseWeekday(answerValue[0] || 'Monday')
    }

    // Parse availability packages - look for package data patterns
    // Expected patterns: "Paquete 1", "Package 1", "Bloque 1", etc.
    const packageMatch = fieldText.match(/(paquete|package|bloque|block)\s*(\d+)/i)
    if (packageMatch) {
      const packageNumber = parseInt(packageMatch[2])
      console.log(`Found package ${packageNumber} data`)
      
      // This is a package field - parse the package information
      const packageData = parsePackageData(answerValue, packageNumber, checkInWeekday)
      if (packageData) {
        packages.push({
          ...packageData,
          hotelId: hotelInfo.hotelId || '', // Will be resolved later
        })
        packageCount++
      }
    }

    // Alternative pattern: Look for date ranges and duration fields
    if (fieldText.includes('fecha inicio') || fieldText.includes('start date')) {
      const startDate = parseDateField(answerValue[0])
      if (startDate) {
        // Look for corresponding duration and rooms fields
        const duration = findRelatedField(answers, qid, ['duración', 'duration', 'días', 'days'])
        const rooms = findRelatedField(answers, qid, ['habitaciones', 'rooms', 'cantidad'])
        
        if (duration && rooms) {
          const durationDays = parseDuration(duration)
          const totalRooms = parseInt(rooms) || 1
          
          if (isValidDuration(durationDays)) {
            const endDate = calculateEndDate(startDate, durationDays)
            packages.push({
              hotelId: hotelInfo.hotelId || '',
              startDate: startDate,
              endDate: endDate,
              durationDays: durationDays,
              totalRooms: totalRooms,
              availableRooms: totalRooms, // Initially all rooms are available
              checkInWeekday: checkInWeekday
            })
          }
        }
      }
    }
  })

  console.log(`Parsed ${packages.length} availability packages`)
  return packages.slice(0, 10) // Limit to 10 packages as per specification
}

function parsePackageData(answerValues: string[], packageNumber: number, checkInWeekday: string): Partial<AvailabilityPackage> | null {
  // Parse package data from answer values
  // Expected format might be: "2024-06-01|15|3" (startDate|duration|rooms)
  // or structured JSON, or separate fields
  
  if (!answerValues || answerValues.length === 0) return null
  
  const packageValue = answerValues[0]
  
  // Try to parse structured data (pipe-separated)
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
        availableRooms: rooms,
        checkInWeekday: checkInWeekday
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
          availableRooms: parseInt(packageData.rooms) || 1,
          checkInWeekday: checkInWeekday
        }
      }
    }
  } catch (e) {
    // Not JSON, continue with other parsing methods
  }
  
  return null
}

function findRelatedField(answers: any, baseQid: string, searchTerms: string[]): string | null {
  // Find a related field by looking for nearby question IDs or matching terms
  const baseQidNum = parseInt(baseQid) || 0
  
  for (let offset = 1; offset <= 3; offset++) {
    const checkQids = [`${baseQidNum + offset}`, `${baseQidNum - offset}`]
    
    for (const qid of checkQids) {
      const answer = answers[qid]
      if (!answer) continue
      
      const fieldText = answer.text?.toLowerCase() || answer.name?.toLowerCase() || ''
      const hasMatchingTerm = searchTerms.some(term => fieldText.includes(term))
      
      if (hasMatchingTerm) {
        return Array.isArray(answer.answer) ? answer.answer[0] : answer.answer
      }
    }
  }
  
  return null
}

function parseWeekday(weekdayStr: string): string {
  const weekdays = {
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

function parseDateField(dateStr: string): string | null {
  if (!dateStr) return null
  
  // Try different date formats
  const formats = [
    /(\d{4})-(\d{2})-(\d{2})/, // YYYY-MM-DD
    /(\d{2})\/(\d{2})\/(\d{4})/, // MM/DD/YYYY
    /(\d{2})-(\d{2})-(\d{4})/, // MM-DD-YYYY
    /(\d{1,2})\/(\d{1,2})\/(\d{4})/ // M/D/YYYY
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
  
  return null
}

function parseDuration(durationStr: string): number {
  const match = durationStr.match(/(\d+)/)
  const duration = match ? parseInt(match[1]) : 0
  
  // Map common duration values to valid ones
  if (duration === 7) return 8
  if (duration === 14) return 15
  if (duration === 21) return 22
  if (duration === 28 || duration === 30) return 29
  
  return duration
}

function isValidDuration(duration: number): boolean {
  return [8, 15, 22, 29].includes(duration)
}

function formatDate(dateStr: string): string {
  const parsed = parseDateField(dateStr)
  return parsed || dateStr
}

function calculateEndDate(startDate: string, durationDays: number): string {
  const start = new Date(startDate)
  const end = new Date(start)
  end.setDate(start.getDate() + durationDays - 1)
  return end.toISOString().split('T')[0]
}

async function upsertAvailabilityPackage(
  packageData: AvailabilityPackage, 
  supabase: any
): Promise<{ created: boolean }> {
  
  // First, resolve hotel ID if needed
  let hotelId = packageData.hotelId
  
  if (!hotelId && packageData.hotelId === '') {
    // Try to find hotel by name or other identifying information
    // This is a placeholder - implement proper hotel resolution
    console.warn('Hotel ID resolution not implemented - skipping package')
    throw new Error('Hotel ID could not be resolved')
  }

  // Check if package already exists (same hotel, start date, duration)
  const { data: existingPackage } = await supabase
    .from('availability_packages')
    .select('id, available_rooms, total_rooms')
    .eq('hotel_id', hotelId)
    .eq('start_date', packageData.startDate)
    .eq('duration_days', packageData.durationDays)
    .maybeSingle()

  if (existingPackage) {
    // Update existing package (only if no bookings have reduced availability)
    const canUpdate = existingPackage.available_rooms === existingPackage.total_rooms
    
    if (canUpdate) {
      const { error } = await supabase
        .from('availability_packages')
        .update({
          end_date: packageData.endDate,
          total_rooms: packageData.totalRooms,
          available_rooms: packageData.availableRooms,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingPackage.id)

      if (error) {
        throw new Error(`Failed to update package: ${error.message}`)
      }

      console.log(`Updated availability package for hotel ${hotelId}`)
      return { created: false }
    } else {
      console.log(`Skipped update for package with active bookings`)
      return { created: false }
    }
  } else {
    // Create new package
    const { error } = await supabase
      .from('availability_packages')
      .insert({
        hotel_id: hotelId,
        start_date: packageData.startDate,
        end_date: packageData.endDate,
        duration_days: packageData.durationDays,
        total_rooms: packageData.totalRooms,
        available_rooms: packageData.availableRooms
      })

    if (error) {
      throw new Error(`Failed to create package: ${error.message}`)
    }

    console.log(`Created new availability package for hotel ${hotelId}`)
    return { created: true }
  }
}