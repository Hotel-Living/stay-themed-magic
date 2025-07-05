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

// Field mapping configuration
const JOTFORM_FIELD_MAPPING = {
  'hotel_features': ['hotel_amenities', 'hotel_facilities', 'property_features'],
  'room_features': ['room_amenities', 'room_facilities', 'room_types'],
  'meal_plans': ['meal_options', 'dining_options', 'breakfast_options'],
  'activities': ['activities', 'local_activities', 'nearby_activities'],
  'property_types': ['property_type', 'accommodation_type'],
  'themes': ['themes', 'style', 'atmosphere']
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const jotformApiKey = Deno.env.get('JOTFORM_API_KEY')
    
    if (!jotformApiKey) {
      throw new Error('JOTFORM_API_KEY is not configured')
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

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
      // Get JotForm forms - assuming form ID will be provided via request or environment
      const formId = Deno.env.get('JOTFORM_FORM_ID') || 
        (await req.json()).formId || 
        '251846986373069' // Default to the form we embedded

      console.log(`Fetching JotForm data for form: ${formId}`)

      // Fetch form structure from JotForm API
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

      // Process each field and extract options
      for (const [qid, field] of Object.entries(jotformData.content)) {
        if (!field.options) continue

        // Determine category based on field text/name
        const category = determineCategory(field.text || '', qid)
        if (!category) continue

        console.log(`Processing field ${qid} (${field.text}) as category: ${category}`)

        // Parse options - JotForm stores options as pipe-separated string
        const options = field.options.split('|').filter(opt => opt.trim().length > 0)
        
        for (const option of options) {
          const trimmedOption = option.trim()
          if (!trimmedOption) continue

          stats.itemsProcessed++

          // Check if option already exists
          const { data: existingFilter } = await supabase
            .from('filters')
            .select('id, is_active')
            .eq('category', category)
            .eq('value', trimmedOption)
            .eq('jotform_field_id', qid)
            .maybeSingle()

          if (existingFilter) {
            // Update existing filter
            if (!existingFilter.is_active) {
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
              // Just update sync timestamp
              await supabase
                .from('filters')
                .update({ last_sync_at: new Date().toISOString() })
                .eq('id', existingFilter.id)
            }
          } else {
            // Create new filter
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

      // Deactivate filters that are no longer in JotForm
      const currentSyncTime = new Date().toISOString()
      const { data: outdatedFilters } = await supabase
        .from('filters')
        .update({ is_active: false })
        .eq('source_type', 'jotform')
        .is('last_sync_at', null)
        .or(`last_sync_at.lt.${currentSyncTime}`)
        .select('id')

      stats.itemsDeactivated = outdatedFilters?.length || 0

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

function determineCategory(fieldText: string, qid: string): string | null {
  const text = fieldText.toLowerCase()
  const id = qid.toLowerCase()
  
  // Check each category mapping
  for (const [category, keywords] of Object.entries(JOTFORM_FIELD_MAPPING)) {
    for (const keyword of keywords) {
      if (text.includes(keyword) || id.includes(keyword)) {
        return category
      }
    }
  }
  
  // Fallback mapping based on common terms
  if (text.includes('hotel') || text.includes('property') || text.includes('facility')) {
    return 'hotel_features'
  }
  if (text.includes('room') || text.includes('bedroom') || text.includes('suite')) {
    return 'room_features'
  }
  if (text.includes('meal') || text.includes('dining') || text.includes('breakfast')) {
    return 'meal_plans'
  }
  if (text.includes('activity') || text.includes('attraction') || text.includes('entertainment')) {
    return 'activities'
  }
  if (text.includes('type') || text.includes('style') || text.includes('category')) {
    return 'property_types'
  }
  if (text.includes('theme') || text.includes('atmosphere') || text.includes('vibe')) {
    return 'themes'
  }
  
  return null
}