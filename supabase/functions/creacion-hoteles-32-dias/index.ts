
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    console.log('Starting 32-day hotel creation process...')

    // Fetch available themes and activities
    const { data: themes, error: themesError } = await supabaseClient
      .from('themes')
      .select('*')
      .order('name')

    if (themesError) {
      console.error('Error fetching themes:', themesError)
      return new Response(JSON.stringify({ error: 'Failed to fetch themes' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const { data: activities, error: activitiesError } = await supabaseClient
      .from('activities')
      .select('*')
      .order('name')

    if (activitiesError) {
      console.error('Error fetching activities:', activitiesError)
      return new Response(JSON.stringify({ error: 'Failed to fetch activities' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Function to get random themes (1-3)
    const getRandomThemes = () => {
      const count = Math.floor(Math.random() * 3) + 1 // 1-3 themes
      const shuffled = [...themes].sort(() => 0.5 - Math.random())
      return shuffled.slice(0, count)
    }

    // Function to get matching activities (3-5) based on themes
    const getMatchingActivities = (selectedThemes) => {
      const count = Math.floor(Math.random() * 3) + 3 // 3-5 activities
      
      // Get activities that match the theme categories or are generally applicable
      const themeCategories = selectedThemes.map(t => t.category?.toLowerCase()).filter(Boolean)
      
      let matchingActivities = activities.filter(activity => {
        const activityCategory = activity.category?.toLowerCase()
        return themeCategories.some(themeCategory => 
          activityCategory?.includes(themeCategory) || 
          themeCategory?.includes(activityCategory)
        )
      })

      // If no matching activities found, use all activities
      if (matchingActivities.length === 0) {
        matchingActivities = activities
      }

      // Shuffle and select the required count
      const shuffled = [...matchingActivities].sort(() => 0.5 - Math.random())
      return shuffled.slice(0, Math.min(count, shuffled.length))
    }

    const countries = [
      'Spain', 'Portugal', 'France', 'Italy', 'Germany', 'Netherlands', 
      'Austria', 'Switzerland', 'Belgium', 'Czech Republic', 'Hungary'
    ]

    const cities = {
      'Spain': ['Madrid', 'Barcelona', 'Seville', 'Valencia', 'Granada', 'Bilbao'],
      'Portugal': ['Lisbon', 'Porto', 'Braga', 'Coimbra', 'Aveiro', 'Faro'],
      'France': ['Paris', 'Lyon', 'Marseille', 'Nice', 'Bordeaux', 'Toulouse'],
      'Italy': ['Rome', 'Milan', 'Florence', 'Venice', 'Naples', 'Bologna'],
      'Germany': ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Cologne', 'Dresden'],
      'Netherlands': ['Amsterdam', 'Rotterdam', 'Utrecht', 'The Hague', 'Eindhoven', 'Groningen'],
      'Austria': ['Vienna', 'Salzburg', 'Innsbruck', 'Graz', 'Linz', 'Hallstatt'],
      'Switzerland': ['Zurich', 'Geneva', 'Basel', 'Bern', 'Lucerne', 'Lausanne'],
      'Belgium': ['Brussels', 'Antwerp', 'Ghent', 'Bruges', 'Leuven', 'Namur'],
      'Czech Republic': ['Prague', 'Brno', 'Ostrava', 'Plzen', 'Liberec', 'Olomouc'],
      'Hungary': ['Budapest', 'Debrecen', 'Szeged', 'Miskolc', 'Pécs', 'Győr']
    }

    const propertyTypes = ['Hotel', 'Boutique Hotel', 'Apartment', 'Guesthouse', 'Hostel', 'Resort']
    const styles = ['Modern', 'Traditional', 'Contemporary', 'Classic', 'Boutique', 'Luxury']
    const atmospheres = ['Relaxed', 'Vibrant', 'Peaceful', 'Lively', 'Intimate', 'Cosmopolitan']

    const availableMonths = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]

    const mealPlans = ['Breakfast Only', 'Half Board', 'Full Board', 'All Inclusive', 'Room Only']
    const stayLengths = [7, 14, 21, 28, 30, 60, 90]

    let createdCount = 0
    const targetCount = 66 // 6 hotels per country

    for (const country of countries) {
      const countryCities = cities[country]
      
      for (let i = 0; i < 6; i++) {
        try {
          const city = countryCities[Math.floor(Math.random() * countryCities.length)]
          const selectedThemes = getRandomThemes()
          const selectedActivities = getMatchingActivities(selectedThemes)
          
          const hotelData = {
            name: `Hotel ${city} Premium ${i + 1}`,
            description: `A wonderful ${propertyTypes[Math.floor(Math.random() * propertyTypes.length)].toLowerCase()} located in the heart of ${city}, offering comfortable accommodations for extended stays.`,
            country: country,
            city: city,
            address: `${Math.floor(Math.random() * 999) + 1} Main Street, ${city}`,
            latitude: Math.random() * 180 - 90,
            longitude: Math.random() * 360 - 180,
            price_per_month: Math.floor(Math.random() * 1500) + 800,
            category: Math.floor(Math.random() * 2) + 3, // 3 or 4 stars
            property_type: propertyTypes[Math.floor(Math.random() * propertyTypes.length)],
            style: styles[Math.floor(Math.random() * styles.length)],
            ideal_guests: 'Digital nomads, remote workers, and long-term travelers',
            atmosphere: atmospheres[Math.floor(Math.random() * atmospheres.length)],
            perfect_location: `Perfect location in ${city} with easy access to attractions and amenities`,
            status: 'approved',
            available_months: availableMonths.slice(Math.floor(Math.random() * 6), Math.floor(Math.random() * 6) + 6),
            contact_name: 'Hotel Manager',
            contact_email: `manager@hotel${city.toLowerCase().replace(/\s+/g, '')}${i + 1}.com`,
            contact_phone: `+${Math.floor(Math.random() * 999999999)}`,
            features_hotel: {
              wifi: true,
              parking: Math.random() > 0.5,
              restaurant: Math.random() > 0.3,
              gym: Math.random() > 0.6,
              spa: Math.random() > 0.7,
              pool: Math.random() > 0.4,
              concierge: Math.random() > 0.5,
              laundry: true,
              business_center: Math.random() > 0.6
            },
            features_room: {
              air_conditioning: true,
              kitchen: Math.random() > 0.4,
              balcony: Math.random() > 0.5,
              workspace: true,
              tv: true,
              minibar: Math.random() > 0.6,
              safe: true,
              bathroom: true
            },
            meal_plans: mealPlans.slice(0, Math.floor(Math.random() * 3) + 1),
            stay_lengths: stayLengths.slice(0, Math.floor(Math.random() * 4) + 2),
            preferredWeekday: 'Monday',
            owner_id: '00000000-0000-0000-0000-000000000000' // System user
          }

          // Create the hotel
          const { data: hotel, error: hotelError } = await supabaseClient
            .from('hotels')
            .insert(hotelData)
            .select()
            .single()

          if (hotelError) {
            console.error('Error creating hotel:', hotelError)
            continue
          }

          console.log(`Created hotel: ${hotel.name} (ID: ${hotel.id})`)

          // Assign themes to the hotel
          for (const theme of selectedThemes) {
            const { error: themeError } = await supabaseClient
              .from('hotel_themes')
              .insert({
                hotel_id: hotel.id,
                theme_id: theme.id
              })

            if (themeError) {
              console.error('Error assigning theme to hotel:', themeError)
            } else {
              console.log(`Assigned theme "${theme.name}" to hotel ${hotel.name}`)
            }
          }

          // Assign activities to the hotel
          for (const activity of selectedActivities) {
            const { error: activityError } = await supabaseClient
              .from('hotel_activities')
              .insert({
                hotel_id: hotel.id,
                activity_id: activity.id
              })

            if (activityError) {
              console.error('Error assigning activity to hotel:', activityError)
            } else {
              console.log(`Assigned activity "${activity.name}" to hotel ${hotel.name}`)
            }
          }

          createdCount++
          console.log(`Progress: ${createdCount}/${targetCount} hotels created`)

        } catch (error) {
          console.error('Error in hotel creation loop:', error)
        }
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully created ${createdCount} hotels with themes and activities`,
        createdCount,
        targetCount
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Error in hotel creation function:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Failed to create hotels',
        details: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
