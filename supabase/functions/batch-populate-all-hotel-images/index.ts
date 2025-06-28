
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('Starting comprehensive hotel image population process')

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Get all approved hotels
    const { data: hotels, error: hotelError } = await supabase
      .from('hotels')
      .select(`
        id, name, city, country, style, 
        hotel_images(id, image_url)
      `)
      .eq('status', 'approved')

    if (hotelError) {
      throw new Error(`Error fetching hotels: ${hotelError.message}`)
    }

    console.log(`Found ${hotels?.length || 0} approved hotels`)

    // Identify hotels that need images
    const hotelsNeedingImages = hotels?.filter(hotel => 
      !hotel.hotel_images || hotel.hotel_images.length === 0
    ) || []

    console.log(`${hotelsNeedingImages.length} hotels need images`)

    // Process hotels in batches to avoid overwhelming the API
    const batchSize = 5
    const results = []
    let successCount = 0
    let failureCount = 0

    for (let i = 0; i < hotelsNeedingImages.length; i += batchSize) {
      const batch = hotelsNeedingImages.slice(i, i + batchSize)
      console.log(`Processing batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(hotelsNeedingImages.length/batchSize)}`)

      // Process batch with delay to respect API limits
      const batchPromises = batch.map(async (hotel, index) => {
        // Add staggered delay to prevent hitting rate limits
        await new Promise(resolve => setTimeout(resolve, index * 2000))
        
        try {
          const response = await fetch(
            `${supabaseUrl}/functions/v1/fetch-hotel-images`,
            {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${supabaseServiceKey}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                hotelId: hotel.id,
                city: hotel.city,
                country: hotel.country,
                style: hotel.style || 'boutique',
                hotelName: hotel.name,
                forceRefresh: false
              })
            }
          )

          const result = await response.json()
          
          if (response.ok) {
            console.log(`✅ Successfully populated images for ${hotel.name}`)
            successCount++
            return { hotel: hotel.name, success: true, ...result }
          } else {
            console.error(`❌ Failed to populate images for ${hotel.name}:`, result.error)
            failureCount++
            return { hotel: hotel.name, success: false, error: result.error }
          }
        } catch (error) {
          console.error(`❌ Error processing ${hotel.name}:`, error)
          failureCount++
          return { hotel: hotel.name, success: false, error: error.message }
        }
      })

      const batchResults = await Promise.all(batchPromises)
      results.push(...batchResults)

      // Add delay between batches
      if (i + batchSize < hotelsNeedingImages.length) {
        console.log('Waiting 10 seconds before next batch...')
        await new Promise(resolve => setTimeout(resolve, 10000))
      }
    }

    // Clean up any remaining duplicates
    console.log('Starting duplicate cleanup...')
    
    try {
      const cleanupResponse = await fetch(
        `${supabaseUrl}/functions/v1/cleanup-duplicate-images`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${supabaseServiceKey}`,
            'Content-Type': 'application/json',
          }
        }
      )
      
      const cleanupResult = await cleanupResponse.json()
      console.log('Duplicate cleanup result:', cleanupResult)
    } catch (cleanupError) {
      console.warn('Error during cleanup:', cleanupError)
    }

    // Generate summary statistics
    const { data: finalStats } = await supabase
      .from('hotels')
      .select(`
        id, name,
        hotel_images(id)
      `)
      .eq('status', 'approved')

    const hotelsWithImages = finalStats?.filter(hotel => 
      hotel.hotel_images && hotel.hotel_images.length > 0
    ).length || 0

    const totalImages = finalStats?.reduce((sum, hotel) => 
      sum + (hotel.hotel_images?.length || 0), 0
    ) || 0

    console.log(`Batch population complete: ${successCount} successes, ${failureCount} failures`)
    console.log(`Final stats: ${hotelsWithImages}/${finalStats?.length} hotels have images, ${totalImages} total images`)

    return new Response(
      JSON.stringify({ 
        success: true,
        processed: hotelsNeedingImages.length,
        successCount,
        failureCount,
        finalStats: {
          totalHotels: finalStats?.length || 0,
          hotelsWithImages,
          totalImages
        },
        results: results.slice(0, 50) // Limit response size
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in batch-populate-all-hotel-images function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
