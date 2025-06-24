
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
    console.log('Starting batch hotel image population process')

    const unsplashAccessKey = Deno.env.get('UNSPLASH_ACCESS_KEY')
    if (!unsplashAccessKey) {
      throw new Error('Unsplash Access Key not configured')
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Get all hotels that don't have images
    const { data: hotelsWithoutImages, error: hotelsError } = await supabase
      .from('hotels')
      .select(`
        id,
        name,
        city,
        country,
        style,
        status
      `)
      .not('id', 'in', `(
        SELECT DISTINCT hotel_id 
        FROM hotel_images 
        WHERE hotel_id IS NOT NULL
      )`)
      .in('status', ['approved', 'pending'])

    if (hotelsError) {
      throw new Error(`Error fetching hotels: ${hotelsError.message}`)
    }

    if (!hotelsWithoutImages || hotelsWithoutImages.length === 0) {
      console.log('No hotels without images found')
      return new Response(
        JSON.stringify({ 
          message: 'No hotels without images found',
          processedCount: 0
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log(`Found ${hotelsWithoutImages.length} hotels without images`)

    let processedCount = 0
    let errorCount = 0
    const results = []

    // Process each hotel
    for (const hotel of hotelsWithoutImages) {
      try {
        console.log(`Processing hotel: ${hotel.name} (${hotel.id})`)

        // Define search queries in order of preference
        const searchQueries = [
          `${hotel.city} ${hotel.country} hotel`,
          `${hotel.city} luxury hotel`,
          `${hotel.style || 'luxury'} hotel interior`,
          `boutique hotel ${hotel.country}`,
          `luxury hotel room`,
          `hotel lobby elegant`,
          `hotel restaurant`,
          `hotel spa wellness`,
          `hotel pool`,
          `luxury accommodation`
        ]

        const imageUrls: string[] = []
        let queryIndex = 0

        // Fetch images from different search queries to ensure variety
        while (imageUrls.length < 10 && queryIndex < searchQueries.length) {
          const query = searchQueries[queryIndex]
          const imagesNeeded = Math.min(3, 10 - imageUrls.length)
          
          console.log(`Searching Unsplash for: "${query}" (need ${imagesNeeded} images)`)

          try {
            const response = await fetch(
              `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${imagesNeeded}&orientation=landscape`,
              {
                headers: {
                  'Authorization': `Client-ID ${unsplashAccessKey}`,
                }
              }
            )

            if (response.ok) {
              const data = await response.json()
              const newUrls = data.results
                .filter((photo: any) => photo.urls?.regular && !imageUrls.includes(photo.urls.regular))
                .map((photo: any) => photo.urls.regular)
                .slice(0, imagesNeeded)
              
              imageUrls.push(...newUrls)
              console.log(`Found ${newUrls.length} new images from query: "${query}"`)
            } else {
              console.warn(`Unsplash API error for query "${query}":`, response.status)
            }
          } catch (queryError) {
            console.warn(`Error fetching images for query "${query}":`, queryError)
          }

          queryIndex++
          
          // Add small delay to respect rate limits
          await new Promise(resolve => setTimeout(resolve, 100))
        }

        if (imageUrls.length === 0) {
          console.warn(`No images found for hotel ${hotel.name}`)
          errorCount++
          results.push({
            hotelId: hotel.id,
            hotelName: hotel.name,
            success: false,
            error: 'No images found',
            imageCount: 0
          })
          continue
        }

        console.log(`Found ${imageUrls.length} images for hotel ${hotel.name}`)

        // Insert images into database
        const imageRecords = imageUrls.map((url, index) => ({
          hotel_id: hotel.id,
          image_url: url,
          is_main: index === 0, // First image is main
        }))

        const { data: insertedImages, error: insertError } = await supabase
          .from('hotel_images')
          .insert(imageRecords)
          .select()

        if (insertError) {
          console.error(`Database error for hotel ${hotel.name}:`, insertError.message)
          errorCount++
          results.push({
            hotelId: hotel.id,
            hotelName: hotel.name,
            success: false,
            error: insertError.message,
            imageCount: 0
          })
          continue
        }

        // Update hotel's main_image_url
        const { error: updateError } = await supabase
          .from('hotels')
          .update({ main_image_url: imageUrls[0] })
          .eq('id', hotel.id)

        if (updateError) {
          console.warn(`Could not update hotel main image for ${hotel.name}:`, updateError.message)
        }

        processedCount++
        results.push({
          hotelId: hotel.id,
          hotelName: hotel.name,
          success: true,
          error: null,
          imageCount: imageUrls.length
        })

        console.log(`Successfully processed hotel ${hotel.name} with ${imageUrls.length} images`)

        // Add delay between hotels to respect rate limits
        await new Promise(resolve => setTimeout(resolve, 200))

      } catch (hotelError) {
        console.error(`Error processing hotel ${hotel.name}:`, hotelError)
        errorCount++
        results.push({
          hotelId: hotel.id,
          hotelName: hotel.name,
          success: false,
          error: hotelError.message,
          imageCount: 0
        })
      }
    }

    console.log(`Batch processing complete. Processed: ${processedCount}, Errors: ${errorCount}`)

    return new Response(
      JSON.stringify({ 
        message: 'Batch hotel image population completed',
        totalHotels: hotelsWithoutImages.length,
        processedCount,
        errorCount,
        results
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in batch-populate-hotel-images function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
