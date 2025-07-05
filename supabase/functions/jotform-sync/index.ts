import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface JotFormField {
  qid: string
  type: string
  text: string
  options?: string
  special?: any
}

interface JotFormResponse {
  content: {
    [key: string]: JotFormField
  }
}

interface SyncStats {
  itemsProcessed: number
  itemsAdded: number
  itemsUpdated: number
  itemsDeactivated: number
}


Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  console.log(`JotForm sync triggered via ${req.method} request`)

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const jotformApiKey = Deno.env.get('JOTFORM_API_KEY')
    
    if (!jotformApiKey) {
      throw new Error('JOTFORM_API_KEY is not configured')
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Handle webhook validation - JotForm sends POST requests to webhooks
    let isWebhookCall = false
    let webhookData = null
    
    if (req.method === 'POST') {
      try {
        const contentType = req.headers.get('content-type') || ''
        
        if (contentType.includes('application/x-www-form-urlencoded')) {
          // JotForm webhook data comes as form-encoded
          const formData = await req.formData()
          webhookData = Object.fromEntries(formData.entries())
          isWebhookCall = true
          console.log('Webhook call detected from JotForm:', {
            submissionID: webhookData.submissionID,
            formID: webhookData.formID
          })
        } else if (contentType.includes('application/json')) {
          // Manual API calls or other JSON payloads
          const jsonData = await req.json()
          console.log('JSON call detected:', jsonData)
        }
      } catch (e) {
        // If parsing fails, continue with manual sync
        console.log('Request parsing failed, continuing with manual sync:', e.message)
      }
    }

    // Create sync log entry
    const { data: syncLog, error: logError } = await supabase
      .from('jotform_sync_logs')
      .insert({ status: 'running' })
      .select()
      .single()

    if (logError) {
      throw new Error(`Failed to create sync log: ${logError.message}`)
    }

    console.log(`Starting JotForm sync with log ID: ${syncLog.id}`)

    const stats: SyncStats = {
      itemsProcessed: 0,
      itemsAdded: 0,
      itemsUpdated: 0,
      itemsDeactivated: 0
    }

    try {
      // Get JotForm form ID - prioritize webhook data, then environment, then default
      let formId = Deno.env.get('JOTFORM_FORM_ID') || '251846986373069'
      
      if (isWebhookCall && webhookData?.formID) {
        formId = webhookData.formID
        console.log(`Using form ID from webhook: ${formId}`)
      } else {
        console.log(`Using default/configured form ID: ${formId}`)
      }

      console.log(`Fetching JotForm data for form: ${formId}`)

      // PHASE 1: Mark all existing JotForm filters as inactive (complete replacement approach)
      console.log('Phase 1: Deactivating all existing JotForm filters for complete replacement...')
      const { data: deactivatedFilters } = await supabase
        .from('filters')
        .update({ is_active: false })
        .eq('source_type', 'jotform')
        .select('id')

      console.log(`Deactivated ${deactivatedFilters?.length || 0} existing JotForm filters`)

      // PHASE 2: Fetch complete form structure from JotForm API
      const jotformResponse = await fetch(
        `https://api.jotform.com/form/${formId}/questions?apikey=${jotformApiKey}`,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )

      if (!jotformResponse.ok) {
        throw new Error(`JotForm API error: ${jotformResponse.status} ${jotformResponse.statusText}`)
      }

      const jotformData: JotFormResponse = await jotformResponse.json()
      console.log(`Retrieved ${Object.keys(jotformData.content).length} fields from JotForm`)

      // PHASE 3: Process ALL fields with options - JotForm is single source of truth
      for (const [qid, field] of Object.entries(jotformData.content)) {
        // Skip fields without options (these are not filter-relevant)
        if (!field.options) continue

        // Process ALL option fields regardless of their name or language
        const category = determineCategory(field.text || '', qid, field.type)
        
        console.log(`Processing field ${qid} (${field.text}) [Type: ${field.type}] as category: ${category || 'SKIPPED'}`)

        // If we can't categorize, still log it but skip processing
        if (!category) {
          console.warn(`Could not categorize field ${qid}: "${field.text}" - Type: ${field.type}`)
          continue
        }

        // Parse options - JotForm stores options as pipe-separated string
        const options = field.options.split('|').filter(opt => opt.trim().length > 0)
        
        console.log(`Found ${options.length} options for ${category}: ${options.join(', ')}`)
        
        for (const option of options) {
          const trimmedOption = option.trim()
          if (!trimmedOption) continue

          stats.itemsProcessed++

          // Create or reactivate filter - JotForm data completely replaces existing
          const { data: existingFilter } = await supabase
            .from('filters')
            .select('id, is_active')
            .eq('category', category)
            .eq('value', trimmedOption)
            .eq('jotform_field_id', qid)
            .maybeSingle()

          if (existingFilter) {
            // Reactivate existing filter
            await supabase
              .from('filters')
              .update({ 
                is_active: true, 
                last_sync_at: new Date().toISOString(),
                source_type: 'jotform'
              })
              .eq('id', existingFilter.id)
            
            stats.itemsUpdated++
            console.log(`Reactivated filter: ${category} - ${trimmedOption}`)
          } else {
            // Create new filter - ALL JotForm options are included
            const { error: insertError } = await supabase
              .from('filters')
              .insert({
                category,
                value: trimmedOption,
                jotform_field_id: qid,
                source_type: 'jotform',
                last_sync_at: new Date().toISOString(),
                is_active: true
              })

            if (insertError) {
              console.error(`Failed to insert filter: ${insertError.message}`)
            } else {
              stats.itemsAdded++
              console.log(`Added new filter: ${category} - ${trimmedOption}`)
            }
          }
        }
      }

      // PHASE 4: Count final deactivated filters (those not present in current JotForm)
      const { data: finalInactiveFilters } = await supabase
        .from('filters')
        .select('id')
        .eq('source_type', 'jotform')
        .eq('is_active', false)

      stats.itemsDeactivated = finalInactiveFilters?.length || 0

      // Update sync log with success
      await supabase
        .from('jotform_sync_logs')
        .update({
          status: 'completed',
          sync_completed_at: new Date().toISOString(),
          items_processed: stats.itemsProcessed,
          items_added: stats.itemsAdded,
          items_updated: stats.itemsUpdated,
          items_deactivated: stats.itemsDeactivated
        })
        .eq('id', syncLog.id)

      console.log('JotForm sync completed successfully:', stats)

      return new Response(
        JSON.stringify({
          success: true,
          syncLogId: syncLog.id,
          stats
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        }
      )

    } catch (syncError) {
      console.error('Sync error:', syncError)
      
      // Update sync log with error
      await supabase
        .from('jotform_sync_logs')
        .update({
          status: 'failed',
          sync_completed_at: new Date().toISOString(),
          error_message: syncError.message,
          items_processed: stats.itemsProcessed,
          items_added: stats.itemsAdded,
          items_updated: stats.itemsUpdated,
          items_deactivated: stats.itemsDeactivated
        })
        .eq('id', syncLog.id)

      throw syncError
    }

  } catch (error) {
    console.error('JotForm sync error:', error)
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})

function determineCategory(fieldText: string, qid: string, fieldType: string): string | null {
  const text = fieldText.toLowerCase()
  const id = qid.toLowerCase()
  
  // ENHANCED CONTENT-BASED DETECTION - Analyze individual values, not just field names
  
  // Check if this looks like content rather than a field name
  const isContentValue = !text.includes('select') && !text.includes('choose') && !text.includes('pick') && 
                        !text.includes('selecciona') && !text.includes('elige') && !text.includes('escoge')
  
  if (isContentValue) {
    // MEAL PLANS - Direct content detection
    if (text.includes('desayuno') || text.includes('breakfast') || text.includes('media pensión') || 
        text.includes('pensión completa') || text.includes('solo alojamiento') || text.includes('all inclusive') ||
        text.includes('half board') || text.includes('full board') || text.includes('bed & breakfast') ||
        text.includes('room only') || text.includes('cena') || text.includes('almuerzo') || text.includes('comida')) {
      return 'meal_plans'
    }
    
    // HOTEL FEATURES - Direct amenity detection (standalone terms)
    if (text === 'wifi' || text === 'wifi gratis' || text === 'piscina' || text === 'pool' || 
        text === 'gimnasio' || text === 'gym' || text === 'spa' || text === 'bar' || 
        text === 'restaurante' || text === 'restaurant' || text === 'parking' || 
        text === 'estacionamiento' || text === 'ascensor' || text === 'elevator' || 
        text === 'jardín' || text === 'garden' || text === 'terraza' || text === 'terrace' ||
        text === 'biblioteca' || text === 'library' || text === 'sala de juegos' || 
        text === 'game room' || text === 'centro de negocios' || text === 'business center' ||
        text === 'conserjería' || text === 'concierge' || text === 'recepción 24/7' ||
        text === 'recepción 24 horas' || text === '24 hour reception' ||
        text.includes('recepción 24') || text.includes('24 hour') || 
        text.includes('wifi') || text.includes('piscina') || text.includes('pool') || 
        text.includes('gimnasio') || text.includes('gym') || text.includes('spa') || 
        text.includes('bar') || text.includes('restaurante') || text.includes('restaurant') || 
        text.includes('parking') || text.includes('estacionamiento') ||
        text.includes('ascensor') || text.includes('elevator') || text.includes('jardín') || 
        text.includes('garden') || text.includes('terraza') || text.includes('terrace') || 
        text.includes('biblioteca') || text.includes('library') || 
        text.includes('sala de juegos') || text.includes('game room') || 
        text.includes('centro de negocios') || text.includes('business center') || 
        text.includes('conserjería') || text.includes('concierge')) {
      return 'hotel_features'
    }
    
    // ROOM FEATURES - Direct room amenities (standalone terms)
    if (text === 'aire acondicionado' || text === 'air conditioning' || text === 'balcón' || 
        text === 'balcony' || text === 'baño privado' || text === 'private bathroom' ||
        text === 'cocina' || text === 'kitchen' || text === 'minibar' || text === 'mini bar' ||
        text === 'televisor' || text === 'tv' || text === 'television' || text === 'escritorio' || 
        text === 'desk' || text === 'sofá' || text === 'sofa' || text === 'chimenea' || 
        text === 'fireplace' || text === 'caja fuerte' || text === 'safe' || text === 'plancha' || 
        text === 'iron' || text === 'secador de pelo' || text === 'hair dryer' || 
        text === 'teléfono' || text === 'phone' ||
        text.includes('aire acondicionado') || text.includes('air condition') || 
        text.includes('balcón') || text.includes('balcony') || text.includes('baño privado') || 
        text.includes('private bath') || text.includes('cocina') || text.includes('kitchen') || 
        text.includes('minibar') || text.includes('mini bar') || text.includes('televisor') || 
        text.includes('tv') || text.includes('escritorio') || text.includes('desk') ||
        text.includes('sofá') || text.includes('sofa') || text.includes('chimenea') || 
        text.includes('fireplace') || text.includes('caja fuerte') || text.includes('safe') || 
        text.includes('plancha') || text.includes('iron') || text.includes('secador') || 
        text.includes('hair dryer') || text.includes('teléfono') || text.includes('phone') ||
        text.includes('vista al mar') || text.includes('sea view') || 
        text.includes('vista a la montaña') || text.includes('mountain view') || 
        text.includes('vista a la ciudad') || text.includes('city view') ||
        text.includes('vista al jardín') || text.includes('garden view')) {
      return 'room_features'
    }
    
    // ROOM TYPES - Direct room type detection  
    if (text.includes('individual') || text.includes('single') || text.includes('doble') || text.includes('double') ||
        text.includes('apartamento') || text.includes('apartment') || text.includes('suite') || 
        text.includes('estudio') || text.includes('studio') || text.includes('familiar') || text.includes('family') ||
        text.includes('twin') || text.includes('triple') || text.includes('cuádruple') || text.includes('quad')) {
      return 'room_types'
    }
  }
  
  // FIELD NAME BASED DETECTION - For actual form field labels
  
  // Room Types - Field names
  if (text.includes('room type') || text.includes('type of room') || text.includes('accommodation type') ||
      text.includes('tipo de habitación') || text.includes('tipos de cuarto') || text.includes('modalidad habitación')) {
    return 'room_types'
  }
  
  // Meal Plans - Field names  
  if (text.includes('meal plan') || text.includes('dining plan') || text.includes('plan de comida') ||
      text.includes('plan alimentación') || text.includes('régimen') || text.includes('pensión')) {
    return 'meal_plans'
  }

  // Hotel Features - Field names
  if ((text.includes('hotel') || text.includes('property')) && 
      (text.includes('feature') || text.includes('amenity') || text.includes('service') || 
       text.includes('facility') || text.includes('servicio') || text.includes('instalación') || 
       text.includes('comodidad'))) {
    return 'hotel_features'
  }
  
  // Room Features - Field names 
  if (text.includes('room') && 
      (text.includes('feature') || text.includes('amenity') || text.includes('service') ||
       text.includes('comodidad') || text.includes('servicio') || text.includes('equipamiento'))) {
    return 'room_features'
  }
  
  // Property Styles - Enhanced detection for style-related fields
  if (text.includes('style') || text.includes('design') || text.includes('decor') || text.includes('aesthetic') ||
      text.includes('estilo') || text.includes('diseño') || text.includes('decoración') || text.includes('aspecto') ||
      text.includes('classic') || text.includes('modern') || text.includes('luxury') || text.includes('minimalist') ||
      text.includes('clásico') || text.includes('moderno') || text.includes('lujo') || text.includes('minimalista') ||
      text.includes('fusion') || text.includes('urban') || text.includes('rural') || text.includes('elegant')) {
    return 'property_styles'
  }
  
  // Activities
  if (text.includes('activity') || text.includes('attraction') || text.includes('entertainment') ||
      text.includes('actividad') || text.includes('entretenimiento') || text.includes('ocio') ||
      text.includes('diversión') || text.includes('recreation') || text.includes('things to do')) {
    return 'activities'
  }
  
  // Property Types - General property classification
  if (text.includes('type') || text.includes('category') || text.includes('classification') ||
      text.includes('tipo') || text.includes('categoría') || text.includes('clase') ||
      text.includes('kind') || text.includes('modalidad')) {
    return 'property_types'
  }
  
  // Themes/Atmosphere/Style
  if (text.includes('theme') || text.includes('atmosphere') || text.includes('vibe') ||
      text.includes('tema') || text.includes('ambiente') || text.includes('estilo') ||
      text.includes('mood') || text.includes('feeling') || text.includes('ambiance')) {
    return 'themes'
  }
  
  // Countries/Locations
  if (text.includes('country') || text.includes('location') || text.includes('destination') ||
      text.includes('país') || text.includes('destino') || text.includes('lugar') ||
      text.includes('ubicación') || text.includes('región')) {
    return 'countries'
  }
  
  // Price-related
  if (text.includes('price') || text.includes('cost') || text.includes('budget') ||
      text.includes('precio') || text.includes('coste') || text.includes('presupuesto') ||
      text.includes('tarifa') || text.includes('rate')) {
    return 'price_ranges'
  }
  
  // Duration/Stay Length
  if (text.includes('duration') || text.includes('length') || text.includes('stay') ||
      text.includes('duración') || text.includes('estancia') || text.includes('tiempo') ||
      text.includes('período') || text.includes('nights') || text.includes('noches')) {
    return 'stay_lengths'
  }
  
  // FALLBACK: Use field type and position to make educated guesses
  // If it's a multiple choice field and we couldn't categorize it, log it for manual review
  if (fieldType === 'control_dropdown' || fieldType === 'control_radio' || 
      fieldType === 'control_checkbox' || fieldType === 'control_matrix') {
    console.log(`UNCATEGORIZED FIELD DETECTED: ID=${qid}, Text="${fieldText}", Type=${fieldType}`)
    // Return a generic category so data isn't lost
    return 'other_options'
  }
  
  return null
}