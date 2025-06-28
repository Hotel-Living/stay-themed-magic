
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ThemeAssignmentRequest {
  hotelIds?: string[];
  clearExisting?: boolean;
  autoDiscover?: boolean;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Parse request body with proper defaults
    const requestBody = await req.json().catch(() => ({}))
    const { 
      hotelIds = [], 
      clearExisting = false, 
      autoDiscover = true 
    }: ThemeAssignmentRequest = requestBody
    
    console.log('Request received:', { hotelIds: hotelIds?.length || 0, clearExisting, autoDiscover })
    
    let targetHotelIds: string[] = []

    // Auto-discover hotels without themes if requested or no specific hotels provided
    if (autoDiscover || hotelIds.length === 0) {
      console.log('Auto-discovering hotels without themes...')
      
      const { data: hotelsWithoutThemes, error: discoverError } = await supabaseClient
        .from('hotels')
        .select(`
          id,
          name,
          hotel_themes!left(hotel_id)
        `)
        .eq('status', 'approved')
        .is('hotel_themes.hotel_id', null)

      if (discoverError) {
        console.error('Discovery error:', discoverError)
        throw new Error(`Failed to discover hotels without themes: ${discoverError.message}`)
      }

      targetHotelIds = hotelsWithoutThemes?.map(hotel => hotel.id) || []
      console.log(`Found ${targetHotelIds.length} hotels without themes`)
    } else {
      targetHotelIds = hotelIds
      console.log(`Using provided hotel IDs: ${targetHotelIds.length} hotels`)
    }

    if (targetHotelIds.length === 0) {
      return new Response(
        JSON.stringify({
          success: true,
          message: 'No hotels found that need theme assignment',
          totalCreated: 0,
          totalFailed: 0
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        },
      )
    }
    
    console.log(`Starting batch theme assignment for ${targetHotelIds.length} hotels`)

    // Get all themes first
    const { data: themes, error: themesError } = await supabaseClient
      .from('themes')
      .select('id')

    if (themesError) {
      console.error('Themes error:', themesError)
      throw new Error(`Failed to fetch themes: ${themesError.message}`)
    }

    if (!themes || themes.length === 0) {
      throw new Error('No themes found in database')
    }

    console.log(`Found ${themes.length} themes`)

    let totalCreated = 0
    let totalFailed = 0
    const failureDetails: string[] = []

    // Process hotels in batches of 5
    for (let i = 0; i < targetHotelIds.length; i += 5) {
      const batch = targetHotelIds.slice(i, i + 5)
      console.log(`Processing batch ${Math.floor(i/5) + 1}: hotels ${i + 1}-${Math.min(i + 5, targetHotelIds.length)}`)

      for (const hotelId of batch) {
        try {
          // Clear existing themes if requested
          if (clearExisting) {
            const { error: deleteError } = await supabaseClient
              .from('hotel_themes')
              .delete()
              .eq('hotel_id', hotelId)

            if (deleteError) {
              console.error(`Failed to clear themes for hotel ${hotelId}:`, deleteError)
              failureDetails.push(`Clear themes for ${hotelId}: ${deleteError.message}`)
              totalFailed++
              continue
            }
          }

          // Select 2-3 random themes
          const numThemes = Math.floor(Math.random() * 2) + 2 // 2 or 3
          const selectedThemes = []
          const usedIndices = new Set()

          while (selectedThemes.length < numThemes && selectedThemes.length < themes.length) {
            const randomIndex = Math.floor(Math.random() * themes.length)
            if (!usedIndices.has(randomIndex)) {
              usedIndices.add(randomIndex)
              selectedThemes.push(themes[randomIndex])
            }
          }

          // Insert new theme assignments
          const assignments = selectedThemes.map(theme => ({
            hotel_id: hotelId,
            theme_id: theme.id
          }))

          const { error: insertError } = await supabaseClient
            .from('hotel_themes')
            .insert(assignments)

          if (insertError) {
            console.error(`Failed to assign themes to hotel ${hotelId}:`, insertError)
            failureDetails.push(`Assign themes to ${hotelId}: ${insertError.message}`)
            totalFailed++
          } else {
            console.log(`Successfully assigned ${selectedThemes.length} themes to hotel ${hotelId}`)
            totalCreated += selectedThemes.length
          }

        } catch (error) {
          console.error(`Error processing hotel ${hotelId}:`, error)
          failureDetails.push(`Process ${hotelId}: ${error.message}`)
          totalFailed++
        }
      }

      // Small delay between batches
      await new Promise(resolve => setTimeout(resolve, 100))
    }

    console.log(`Batch theme assignment completed: ${totalCreated} created, ${totalFailed} failed`)

    return new Response(
      JSON.stringify({
        success: true,
        message: `Theme assignment completed: ${totalCreated} assignments created${totalFailed > 0 ? `, ${totalFailed} failed` : ''}`,
        totalCreated,
        totalFailed,
        hotelsProcessed: targetHotelIds.length,
        failureDetails: totalFailed > 0 ? failureDetails.slice(0, 10) : [] // Limit details to first 10 failures
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Batch theme assignment error:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
