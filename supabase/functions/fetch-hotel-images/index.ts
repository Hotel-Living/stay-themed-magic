
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
    const { hotelId, city, country, style, hotelName } = await req.json()

    if (!hotelId) {
      throw new Error('Hotel ID is required')
    }

    console.log(`Fetching images for hotel: ${hotelName} in ${city}, ${country}`)

    const unsplashAccessKey = Deno.env.get('UNSPLASH_ACCESS_KEY')
    if (!unsplashAccessKey) {
      throw new Error('Unsplash Access Key not configured')
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Check if hotel already has images
    const { data: existingImages } = await supabase
      .from('hotel_images')
      .select('id')
      .eq('hotel_id', hotelId)

    if (existingImages && existingImages.length > 0) {
      console.log(`Hotel ${hotelId} already has ${existingImages.length} images, skipping auto-population`)
      return new Response(
        JSON.stringify({ message: 'Hotel already has images', imageCount: existingImages.length }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Define search queries in order of preference
    const searchQueries = [
      `${city} ${country} hotel`,
      `${city} luxury hotel`,
      `${style} hotel interior`,
      `boutique hotel ${country}`,
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
      const imagesNeeded = Math.min(3, 10 - imageUrls.length) // Get up to 3 images per query
      
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
      } catch (error) {
        console.warn(`Error fetching images for query "${query}":`, error)
      }

      queryIndex++
    }

    if (imageUrls.length === 0) {
      throw new Error('No images could be fetched from Unsplash')
    }

    console.log(`Successfully fetched ${imageUrls.length} images for hotel ${hotelId}`)

    // Insert images into database
    const imageRecords = imageUrls.map((url, index) => ({
      hotel_id: hotelId,
      image_url: url,
      is_main: index === 0, // First image is main
    }))

    const { data: insertedImages, error: insertError } = await supabase
      .from('hotel_images')
      .insert(imageRecords)
      .select()

    if (insertError) {
      throw new Error(`Database error: ${insertError.message}`)
    }

    // Update hotel's main_image_url
    const { error: updateError } = await supabase
      .from('hotels')
      .update({ main_image_url: imageUrls[0] })
      .eq('id', hotelId)

    if (updateError) {
      console.warn(`Could not update hotel main image: ${updateError.message}`)
    }

    console.log(`Successfully populated ${imageUrls.length} images for hotel ${hotelId}`)

    return new Response(
      JSON.stringify({ 
        success: true, 
        imageCount: imageUrls.length,
        images: insertedImages
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in fetch-hotel-images function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
