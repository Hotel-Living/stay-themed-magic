import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { count = 20 } = await req.json()

    // Fetch all themes and activities from database
    const { data: themes, error: themesError } = await supabase
      .from('themes')
      .select('*')
      .order('name')

    const { data: activities, error: activitiesError } = await supabase
      .from('activities')
      .select('*')
      .order('name')

    if (themesError || activitiesError) {
      throw new Error(`Database fetch error: ${themesError?.message || activitiesError?.message}`)
    }

    if (!themes?.length || !activities?.length) {
      throw new Error('No themes or activities found in database')
    }

    console.log(`Fetched ${themes.length} themes and ${activities.length} activities`)

    // Create coherent theme-activity mappings
    const createThemeActivityMappings = (themes: any[], activities: any[]) => {
      const mappings: { [key: string]: string[] } = {}

      // Group themes by category/name patterns
      const mindfulnessThemes = themes.filter(t => 
        t.name.toLowerCase().includes('mindfulness') || 
        t.name.toLowerCase().includes('meditation') ||
        t.name.toLowerCase().includes('zen') ||
        t.name.toLowerCase().includes('wellness')
      ).map(t => t.id)

      const sportsThemes = themes.filter(t => 
        t.name.toLowerCase().includes('sport') || 
        t.name.toLowerCase().includes('fitness') ||
        t.name.toLowerCase().includes('active') ||
        t.name.toLowerCase().includes('running') ||
        t.name.toLowerCase().includes('swimming')
      ).map(t => t.id)

      const artThemes = themes.filter(t => 
        t.name.toLowerCase().includes('art') || 
        t.name.toLowerCase().includes('creative') ||
        t.name.toLowerCase().includes('painting') ||
        t.name.toLowerCase().includes('craft') ||
        t.name.toLowerCase().includes('design')
      ).map(t => t.id)

      const cookingThemes = themes.filter(t => 
        t.name.toLowerCase().includes('cook') || 
        t.name.toLowerCase().includes('food') ||
        t.name.toLowerCase().includes('culinary') ||
        t.name.toLowerCase().includes('gastronomy')
      ).map(t => t.id)

      const natureThemes = themes.filter(t => 
        t.name.toLowerCase().includes('nature') || 
        t.name.toLowerCase().includes('outdoor') ||
        t.name.toLowerCase().includes('garden') ||
        t.name.toLowerCase().includes('hiking') ||
        t.name.toLowerCase().includes('environment')
      ).map(t => t.id)

      const cultureThemes = themes.filter(t => 
        t.name.toLowerCase().includes('culture') || 
        t.name.toLowerCase().includes('history') ||
        t.name.toLowerCase().includes('museum') ||
        t.name.toLowerCase().includes('heritage') ||
        t.name.toLowerCase().includes('tradition')
      ).map(t => t.id)

      // Group activities by category/name patterns
      const mindfulnessActivities = activities.filter(a => 
        a.name.toLowerCase().includes('yoga') || 
        a.name.toLowerCase().includes('meditation') ||
        a.name.toLowerCase().includes('spa') ||
        a.name.toLowerCase().includes('wellness') ||
        a.name.toLowerCase().includes('massage') ||
        a.name.toLowerCase().includes('pilates')
      ).map(a => a.id)

      const sportsActivities = activities.filter(a => 
        a.name.toLowerCase().includes('swim') || 
        a.name.toLowerCase().includes('run') ||
        a.name.toLowerCase().includes('gym') ||
        a.name.toLowerCase().includes('fitness') ||
        a.name.toLowerCase().includes('tennis') ||
        a.name.toLowerCase().includes('football') ||
        a.name.toLowerCase().includes('basketball') ||
        a.name.toLowerCase().includes('cycling') ||
        a.name.toLowerCase().includes('sport')
      ).map(a => a.id)

      const artActivities = activities.filter(a => 
        a.name.toLowerCase().includes('paint') || 
        a.name.toLowerCase().includes('art') ||
        a.name.toLowerCase().includes('craft') ||
        a.name.toLowerCase().includes('ceramic') ||
        a.name.toLowerCase().includes('draw') ||
        a.name.toLowerCase().includes('creative') ||
        a.name.toLowerCase().includes('design')
      ).map(a => a.id)

      const cookingActivities = activities.filter(a => 
        a.name.toLowerCase().includes('cook') || 
        a.name.toLowerCase().includes('baking') ||
        a.name.toLowerCase().includes('wine') ||
        a.name.toLowerCase().includes('tasting') ||
        a.name.toLowerCase().includes('culinary') ||
        a.name.toLowerCase().includes('food')
      ).map(a => a.id)

      const natureActivities = activities.filter(a => 
        a.name.toLowerCase().includes('hiking') || 
        a.name.toLowerCase().includes('garden') ||
        a.name.toLowerCase().includes('outdoor') ||
        a.name.toLowerCase().includes('nature') ||
        a.name.toLowerCase().includes('bird') ||
        a.name.toLowerCase().includes('botanical')
      ).map(a => a.id)

      const cultureActivities = activities.filter(a => 
        a.name.toLowerCase().includes('museum') || 
        a.name.toLowerCase().includes('history') ||
        a.name.toLowerCase().includes('culture') ||
        a.name.toLowerCase().includes('heritage') ||
        a.name.toLowerCase().includes('tour') ||
        a.name.toLowerCase().includes('tradition')
      ).map(a => a.id)

      // Create mappings
      mindfulnessThemes.forEach(themeId => {
        mappings[themeId] = mindfulnessActivities.length > 0 ? mindfulnessActivities : activities.slice(0, 5).map(a => a.id)
      })

      sportsThemes.forEach(themeId => {
        mappings[themeId] = sportsActivities.length > 0 ? sportsActivities : activities.slice(0, 5).map(a => a.id)
      })

      artThemes.forEach(themeId => {
        mappings[themeId] = artActivities.length > 0 ? artActivities : activities.slice(0, 5).map(a => a.id)
      })

      cookingThemes.forEach(themeId => {
        mappings[themeId] = cookingActivities.length > 0 ? cookingActivities : activities.slice(0, 5).map(a => a.id)
      })

      natureThemes.forEach(themeId => {
        mappings[themeId] = natureActivities.length > 0 ? natureActivities : activities.slice(0, 5).map(a => a.id)
      })

      cultureThemes.forEach(themeId => {
        mappings[themeId] = cultureActivities.length > 0 ? cultureActivities : activities.slice(0, 5).map(a => a.id)
      })

      // For themes without specific mappings, use general activities
      themes.forEach(theme => {
        if (!mappings[theme.id]) {
          mappings[theme.id] = activities.slice(0, Math.min(10, activities.length)).map(a => a.id)
        }
      })

      return mappings
    }

    const themeActivityMappings = createThemeActivityMappings(themes, activities)

    const authorizedCountries = [
      { name: "Spain", code: "ES" },
      { name: "Portugal", code: "PT" },
      { name: "France", code: "FR" },
      { name: "Italy", code: "IT" },
      { name: "Germany", code: "DE" },
      { name: "Netherlands", code: "NL" },
      { name: "Belgium", code: "BE" },
      { name: "Austria", code: "AT" },
      { name: "Switzerland", code: "CH" },
      { name: "Denmark", code: "DK" },
      { name: "Sweden", code: "SE" },
      { name: "Norway", code: "NO" },
      { name: "Finland", code: "FI" },
      { name: "Ireland", code: "IE" },
      { name: "Luxembourg", code: "LU" },
      { name: "Greece", code: "GR" },
      { name: "Turkey", code: "TR" },
      { name: "Japan", code: "JP" }
    ]

    const citiesByCountry = {
      "Spain": ["Madrid", "Barcelona", "Valencia", "Seville", "Bilbao", "Granada", "Córdoba", "Toledo", "Santiago de Compostela", "San Sebastián"],
      "Portugal": ["Lisbon", "Porto", "Braga", "Coimbra", "Aveiro", "Faro", "Évora", "Viseu", "Setúbal", "Funchal"],
      "France": ["Paris", "Lyon", "Marseille", "Toulouse", "Nice", "Nantes", "Montpellier", "Strasbourg", "Bordeaux", "Lille"],
      "Italy": ["Rome", "Milan", "Naples", "Turin", "Florence", "Bologna", "Venice", "Genoa", "Palermo", "Verona"],
      "Germany": ["Berlin", "Munich", "Frankfurt", "Hamburg", "Cologne", "Stuttgart", "Düsseldorf", "Dresden", "Leipzig", "Nuremberg"],
      "Netherlands": ["Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven", "Groningen", "Tilburg", "Almere", "Breda", "Nijmegen"],
      "Belgium": ["Brussels", "Antwerp", "Ghent", "Bruges", "Leuven", "Namur", "Mons", "Liège", "Mechelen", "Ostend"],
      "Austria": ["Vienna", "Salzburg", "Innsbruck", "Graz", "Linz", "Klagenfurt", "Bregenz", "St. Pölten", "Wels", "Dornbirn"],
      "Switzerland": ["Zurich", "Geneva", "Basel", "Bern", "Lausanne", "Winterthur", "Lucerne", "St. Gallen", "Lugano", "Thun"],
      "Denmark": ["Copenhagen", "Aarhus", "Odense", "Aalborg", "Esbjerg", "Randers", "Kolding", "Horsens", "Vejle", "Roskilde"],
      "Sweden": ["Stockholm", "Gothenburg", "Malmö", "Uppsala", "Västerås", "Örebro", "Linköping", "Helsingborg", "Jönköping", "Norrköping"],
      "Norway": ["Oslo", "Bergen", "Trondheim", "Stavanger", "Kristiansand", "Fredrikstad", "Tromsø", "Sandnes", "Drammen", "Asker"],
      "Finland": ["Helsinki", "Espoo", "Tampere", "Vantaa", "Oulu", "Turku", "Jyväskylä", "Lahti", "Kuopio", "Pori"],
      "Ireland": ["Dublin", "Cork", "Limerick", "Galway", "Waterford", "Drogheda", "Dundalk", "Swords", "Bray", "Navan"],
      "Luxembourg": ["Luxembourg City", "Esch-sur-Alzette", "Differdange", "Dudelange", "Ettelbruck", "Diekirch", "Strassen", "Bertrange", "Belvaux", "Pétange"],
      "Greece": ["Athens", "Thessaloniki", "Patras", "Heraklion", "Larissa", "Volos", "Rhodes", "Chania", "Chalcis", "Serres"],
      "Turkey": ["Istanbul", "Ankara", "Izmir", "Bursa", "Antalya", "Adana", "Konya", "Gaziantep", "Mersin", "Diyarbakır"],
      "Japan": ["Tokyo", "Osaka", "Yokohama", "Nagoya", "Sapporo", "Fukuoka", "Kobe", "Kyoto", "Kawasaki", "Saitama"]
    }

    const hotelPrefixes = [
      "Hotel", "Central Hotel", "Park Hotel", "Plaza Hotel", "Grand Hotel", "Best Western",
      "Holiday Inn", "Ibis", "Novotel", "Travelodge", "Premier Inn", "Comfort Inn",
      "Quality Inn", "Hampton Inn", "Courtyard", "Residence Inn", "Fairfield Inn",
      "SpringHill Suites", "Extended Stay", "Homewood Suites", "Embassy Suites",
      "Hilton Garden Inn", "DoubleTree", "Marriott", "Hyatt House", "Candlewood Suites",
      "Staybridge Suites", "Country Inn", "La Quinta", "Sleep Inn", "Microtel",
      "Red Roof Inn", "Super 8", "Days Inn", "Ramada", "Howard Johnson",
      "Wyndham", "Baymont", "Hawthorn Suites", "MainStay Suites", "Suburban",
      "Bridge Hotel", "City Hotel", "Downtown Hotel", "Express Hotel", "Inn",
      "Lodge", "Resort", "Suites", "Center", "House"
    ]

    const hotelFeaturesList = [
      "Free WiFi", "Pool", "Gym", "Spa", "Restaurant", "Bar", 
      "Room Service", "Concierge", "Business Center", "Meeting Rooms",
      "Pet Friendly", "Non-smoking Rooms", "Family Rooms", "Accessible Rooms",
      "Laundry Service", "Dry Cleaning", "Currency Exchange", "Tour Desk",
      "Bicycle Rental", "Car Rental", "Shuttle Service", "Valet Parking",
      "Self Parking", "Electric Car Charging", "ATM", "Gift Shop",
      "Multilingual Staff", "24-Hour Front Desk", "Express Check-in/out", "Luggage Storage"
    ]

    const roomFeaturesList = [
      "Air Conditioning", "Heating", "Private Bathroom", "Shower", "Bathtub",
      "Hair Dryer", "Towels", "Toiletries", "TV", "Cable/Satellite TV",
      "Flat-screen TV", "DVD Player", "Radio", "Telephone", "Safe",
      "Mini Bar", "Coffee/Tea Maker", "Refrigerator", "Microwave", "Kitchenette",
      "Desk", "Seating Area", "Balcony", "Terrace", "City View", "Sea View",
      "Mountain View", "Garden View", "Soundproofing", "Blackout Curtains"
    ]

    const results = {
      success: true,
      message: `Successfully created ${count} hotels with coherent themes and activities`,
      stats: {
        totalCreated: 0,
        errors: [] as string[],
        hotelDetails: [] as any[]
      }
    }

    for (let i = 0; i < count; i++) {
      try {
        const country = authorizedCountries[Math.floor(Math.random() * authorizedCountries.length)]
        const cities = citiesByCountry[country.name]
        const city = cities[Math.floor(Math.random() * cities.length)]
        const hotelPrefix = hotelPrefixes[Math.floor(Math.random() * hotelPrefixes.length)]
        const hotelName = `${hotelPrefix} ${city}`

        // Generate realistic coordinates for the city
        const getCoordinatesForCity = (country: string, city: string) => {
          const baseCoords: { [key: string]: { [key: string]: { lat: number, lng: number } } } = {
            "Spain": {
              "Madrid": { lat: 40.4168, lng: -3.7038 },
              "Barcelona": { lat: 41.3851, lng: 2.1734 },
              "Valencia": { lat: 39.4699, lng: -0.3763 }
            },
            "Portugal": {
              "Lisbon": { lat: 38.7223, lng: -9.1393 },
              "Porto": { lat: 41.1579, lng: -8.6291 }
            },
            "France": {
              "Paris": { lat: 48.8566, lng: 2.3522 },
              "Lyon": { lat: 45.7640, lng: 4.8357 }
            }
          }

          const coords = baseCoords[country]?.[city] || { lat: 50.0, lng: 10.0 }
          return {
            lat: coords.lat + (Math.random() - 0.5) * 0.02,
            lng: coords.lng + (Math.random() - 0.5) * 0.02
          }
        }

        const coordinates = getCoordinatesForCity(country.name, city)
        const address = `${Math.floor(Math.random() * 999 + 1)} Main Street, ${city}`

        // GUARANTEED theme selection (1-3 themes)
        const shuffledThemes = [...themes].sort(() => Math.random() - 0.5)
        const numThemes = Math.floor(Math.random() * 3) + 1 // Always 1-3 themes
        const selectedThemes = shuffledThemes.slice(0, numThemes)
        const selectedThemeIds = selectedThemes.map(t => t.id)

        // COHERENT activity selection based on selected themes
        let possibleActivities: string[] = []
        selectedThemeIds.forEach(themeId => {
          const mappedActivities = themeActivityMappings[themeId] || []
          possibleActivities = [...possibleActivities, ...mappedActivities]
        })

        // Remove duplicates and select 1-3 activities
        const uniqueActivities = [...new Set(possibleActivities)]
        const numActivities = Math.floor(Math.random() * 3) + 1 // Always 1-3 activities
        const selectedActivityIds = uniqueActivities.length > 0 
          ? uniqueActivities.sort(() => Math.random() - 0.5).slice(0, numActivities)
          : activities.sort(() => Math.random() - 0.5).slice(0, numActivities).map(a => a.id)

        const selectedHotelFeatures = hotelFeaturesList
          .sort(() => Math.random() - 0.5)
          .slice(0, Math.floor(Math.random() * 8) + 5)
          .reduce((acc, feature) => ({ ...acc, [feature]: true }), {})

        const selectedRoomFeatures = roomFeaturesList
          .sort(() => Math.random() - 0.5)
          .slice(0, Math.floor(Math.random() * 10) + 8)
          .reduce((acc, feature) => ({ ...acc, [feature]: true }), {})

        const basePrice = Math.floor(Math.random() * 450) + 950 // €950-€1400

        const hotelData = {
          name: hotelName,
          description: `A comfortable mid-range hotel in ${city}, ${country.name}. Perfect for extended stays with excellent amenities and convenient location.`,
          country: country.name,
          city: city,
          address: address,
          latitude: coordinates.lat,
          longitude: coordinates.lng,
          price_per_month: basePrice,
          category: Math.floor(Math.random() * 2) + 3, // 3-4 stars only
          property_type: 'Hotel',
          style: 'Modern',
          ideal_guests: 'Business travelers, digital nomads, and extended stay guests',
          atmosphere: 'Professional yet comfortable, ideal for longer stays',
          perfect_location: `Located in the heart of ${city} with easy access to local attractions and business districts`,
          status: 'approved',
          available_months: ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'],
          contact_name: `${hotelName} Manager`,
          contact_email: `info@${hotelName.toLowerCase().replace(/\s+/g, '')}.com`,
          contact_phone: `+${Math.floor(Math.random() * 99) + 10}${Math.floor(Math.random() * 9000000) + 1000000}`,
          features_hotel: selectedHotelFeatures,
          features_room: selectedRoomFeatures,
          meal_plans: ['Half Board'],
          stay_lengths: [32],
          room_types: [{
            id: `room-${Date.now()}-${Math.random()}`,
            name: 'Double Room',
            description: 'Comfortable double room with modern amenities',
            maxOccupancy: 2,
            size: 25,
            roomCount: Math.floor(Math.random() * 20) + 10,
            basePrice: basePrice,
            rates: { 32: basePrice },
            images: [],
            availabilityDates: []
          }],
          rates: { 32: basePrice },
          preferredWeekday: 'Monday'
        }

        const { data: hotel, error: hotelError } = await supabase
          .from('hotels')
          .insert(hotelData)
          .select()
          .single()

        if (hotelError) {
          console.error('Hotel creation error:', hotelError)
          results.stats.errors.push(`Hotel ${i + 1}: ${hotelError.message}`)
          continue
        }

        console.log(`Successfully created hotel: ${hotelName} in ${city}, ${country.name}`)

        // Insert themes with validation
        if (selectedThemeIds.length > 0) {
          const themeInserts = selectedThemeIds.map(themeId => ({
            hotel_id: hotel.id,
            theme_id: themeId
          }))

          const { error: themesError } = await supabase
            .from('hotel_themes')
            .insert(themeInserts)

          if (themesError) {
            console.error('Themes insertion error:', themesError)
          } else {
            console.log(`Added ${selectedThemeIds.length} themes to hotel ${hotelName}`)
          }
        }

        // Insert activities with validation
        if (selectedActivityIds.length > 0) {
          const activityInserts = selectedActivityIds.map(activityId => ({
            hotel_id: hotel.id,
            activity_id: activityId
          }))

          const { error: activitiesError } = await supabase
            .from('hotel_activities')
            .insert(activityInserts)

          if (activitiesError) {
            console.error('Activities insertion error:', activitiesError)
          } else {
            console.log(`Added ${selectedActivityIds.length} activities to hotel ${hotelName}`)
          }
        }

        results.stats.totalCreated++
        results.stats.hotelDetails.push({
          id: hotel.id,
          name: hotelName,
          city: city,
          country: country.name,
          themes: selectedThemes.map(t => t.name),
          activities: activities.filter(a => selectedActivityIds.includes(a.id)).map(a => a.name)
        })

      } catch (error) {
        console.error(`Error creating hotel ${i + 1}:`, error)
        results.stats.errors.push(`Hotel ${i + 1}: ${error.message}`)
      }
    }

    return new Response(JSON.stringify(results), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Batch hotel creation error:', error)
    return new Response(JSON.stringify({
      success: false,
      message: 'Failed to create hotels',
      stats: {
        totalCreated: 0,
        errors: [error.message],
        hotelDetails: []
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    })
  }
})
