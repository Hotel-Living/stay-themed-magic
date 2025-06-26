
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    console.log('Starting Welcome Pilot Hotels creation process...')

    // Check if Welcome Pilot hotels already exist to prevent duplicates
    const { data: existingHotels, error: checkError } = await supabase
      .from('hotels')
      .select('id, name')
      .or('name.ilike.%Welcome Pilot%,description.ilike.%Welcome Pilot%')

    if (checkError) {
      console.error('Error checking existing hotels:', checkError)
      return new Response(JSON.stringify({ error: 'Failed to check existing hotels' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    if (existingHotels && existingHotels.length > 0) {
      console.log(`Found ${existingHotels.length} existing Welcome Pilot hotels`)
      return new Response(JSON.stringify({ 
        message: `Welcome Pilot Hotels already exist (${existingHotels.length} found). Skipping creation to prevent duplicates.`,
        existingCount: existingHotels.length
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Real hotels data - 66 premium properties across 22 countries
    const welcomePilotHotels = [
      // Austria
      { name: "Hotel Sacher Wien", city: "Vienna", country: "Austria", address: "Philharmoniker Str. 4, 1010 Wien", latitude: 48.2041, longitude: 16.3695, themes: ["Luxury & Comfort", "Art & Culture"], activities: ["Opera Visits", "Classical Concerts", "Art Gallery Tours"] },
      { name: "Hotel Imperial Vienna", city: "Vienna", country: "Austria", address: "Kärntner Ring 16, 1015 Wien", latitude: 48.2016, longitude: 16.3728, themes: ["Luxury & Comfort", "History & Heritage"], activities: ["Palace Tours", "Classical Music", "Fine Dining"] },
      { name: "Grand Hotel Europa Innsbruck", city: "Innsbruck", country: "Austria", address: "Südtiroler Pl. 2, 6020 Innsbruck", latitude: 47.2684, longitude: 11.4041, themes: ["Adventure & Sports", "Nature & Environment"], activities: ["Alpine Skiing", "Mountain Hiking", "Cable Car Tours"] },
      
      // Belgium
      { name: "Hotel des Galeries Brussels", city: "Brussels", country: "Belgium", address: "Rue des Bouchers 38, 1000 Bruxelles", latitude: 50.8476, longitude: 4.3542, themes: ["Art & Culture", "Food & Culinary"], activities: ["Museum Visits", "Chocolate Workshops", "Beer Tastings"] },
      { name: "Hotel Heritage Bruges", city: "Bruges", country: "Belgium", address: "Niklaas Desparsstraat 11, 8000 Brugge", latitude: 51.2085, longitude: 3.2246, themes: ["History & Heritage", "Art & Culture"], activities: ["Canal Tours", "Medieval Architecture", "Art Galleries"] },
      { name: "Hotel Van der Valk Antwerp", city: "Antwerp", country: "Belgium", address: "Luitenant Lippenslaan 66, 2140 Antwerpen", latitude: 51.2194, longitude: 4.4025, themes: ["Art & Culture", "Business & Networking"], activities: ["Diamond District Tours", "Art Museums", "Fashion Shopping"] },
      
      // Canada
      { name: "Fairmont Château Frontenac", city: "Quebec City", country: "Canada", address: "1 Rue des Carrières, Québec, QC G1R 4P5", latitude: 46.8123, longitude: -71.2049, themes: ["History & Heritage", "Luxury & Comfort"], activities: ["Old Town Tours", "French Cuisine", "Winter Sports"] },
      { name: "The Ritz-Carlton Montreal", city: "Montreal", country: "Canada", address: "1228 Sherbrooke St W, Montréal, QC H3G 1H6", latitude: 45.4966, longitude: -73.5772, themes: ["Luxury & Comfort", "Art & Culture"], activities: ["Jazz Festivals", "Fine Dining", "Art Galleries"] },
      { name: "Fairmont Hotel Vancouver", city: "Vancouver", country: "Canada", address: "900 W Georgia St, Vancouver, BC V6C 2W6", latitude: 49.2827, longitude: -123.1207, themes: ["Nature & Environment", "Adventure & Sports"], activities: ["Mountain Hiking", "Ocean Activities", "Urban Exploring"] },
      
      // Denmark
      { name: "Hotel d'Angleterre Copenhagen", city: "Copenhagen", country: "Denmark", address: "Kongens Nytorv 34, 1050 København K", latitude: 55.6795, longitude: 12.5858, themes: ["Luxury & Comfort", "Design & Architecture"], activities: ["Design Museums", "Harbor Tours", "Nordic Cuisine"] },
      { name: "Nimb Hotel Copenhagen", city: "Copenhagen", country: "Denmark", address: "Bernstorffsgade 5, 1577 København V", latitude: 55.6736, longitude: 12.5681, themes: ["Luxury & Comfort", "Food & Culinary"], activities: ["Tivoli Gardens", "Gourmet Dining", "Rooftop Bars"] },
      { name: "Hotel Aarhus", city: "Aarhus", country: "Denmark", address: "Banegårdspladsen 14, 8000 Aarhus C", latitude: 56.1496, longitude: 10.2134, themes: ["Art & Culture", "Design & Architecture"], activities: ["ARoS Art Museum", "Design Districts", "Cultural Events"] },
      
      // Finland
      { name: "Hotel Kämp Helsinki", city: "Helsinki", country: "Finland", address: "Pohjoisesplanadi 29, 00100 Helsinki", latitude: 60.1674, longitude: 24.9450, themes: ["Luxury & Comfort", "Design & Architecture"], activities: ["Sauna Experiences", "Design District", "Northern Lights"] },
      { name: "Arctic TreeHouse Hotel", city: "Rovaniemi", country: "Finland", address: "Tarvantie 3, 96930 Napapiiri", latitude: 66.5039, longitude: 25.7294, themes: ["Nature & Environment", "Adventure & Sports"], activities: ["Aurora Viewing", "Reindeer Safaris", "Ice Activities"] },
      { name: "Hotel Torni Tampere", city: "Tampere", country: "Finland", address: "Kauppakatu 4, 33200 Tampere", latitude: 61.4991, longitude: 23.7871, themes: ["History & Heritage", "Nature & Environment"], activities: ["Lake Activities", "Forest Walks", "Industrial Heritage"] },
      
      // France
      { name: "Le Bristol Paris", city: "Paris", country: "France", address: "112 Rue du Faubourg Saint-Honoré, 75008 Paris", latitude: 48.8720, longitude: 2.3176, themes: ["Luxury & Comfort", "Fashion & Style"], activities: ["Fashion Shows", "Fine Dining", "Art Galleries"] },
      { name: "Hotel Carlton Cannes", city: "Cannes", country: "France", address: "58 Bd de la Croisette, 06414 Cannes", latitude: 43.5511, longitude: 7.0245, themes: ["Luxury & Comfort", "Entertainment & Media"], activities: ["Film Festivals", "Beach Activities", "Yacht Tours"] },
      { name: "Hotel de la Cité Carcassonne", city: "Carcassonne", country: "France", address: "Pl. Auguste Pierre Pont, 11000 Carcassonne", latitude: 43.2066, longitude: 2.3522, themes: ["History & Heritage", "Romance & Relationships"], activities: ["Medieval Tours", "Wine Tastings", "Castle Visits"] },
      
      // Germany
      { name: "Hotel Adlon Kempinski Berlin", city: "Berlin", country: "Germany", address: "Unter den Linden 77, 10117 Berlin", latitude: 52.5163, longitude: 13.3777, themes: ["History & Heritage", "Business & Networking"], activities: ["Historical Tours", "Museum Visits", "Government District"] },
      { name: "Bayerischer Hof Munich", city: "Munich", country: "Germany", address: "Promenadeplatz 2-6, 80333 München", latitude: 48.1392, longitude: 11.5713, themes: ["Food & Culinary", "Entertainment & Media"], activities: ["Oktoberfest", "Beer Gardens", "Classical Concerts"] },
      { name: "Breidenbacher Hof Düsseldorf", city: "Düsseldorf", country: "Germany", address: "Königsallee 11, 40212 Düsseldorf", latitude: 51.2254, longitude: 6.7763, themes: ["Fashion & Style", "Business & Networking"], activities: ["Fashion Shopping", "Art Galleries", "Business Events"] },
      
      // Greece
      { name: "Hotel Grande Bretagne Athens", city: "Athens", country: "Greece", address: "Vasileos Georgiou A' 1, Syntagma Square, 105 64 Athens", latitude: 37.9755, longitude: 23.7348, themes: ["History & Heritage", "Luxury & Comfort"], activities: ["Ancient Sites", "Archaeological Tours", "Rooftop Dining"] },
      { name: "Mystique Santorini", city: "Santorini", country: "Greece", address: "Oia, 847 02 Santorini", latitude: 36.4618, longitude: 25.3753, themes: ["Romance & Relationships", "Nature & Environment"], activities: ["Sunset Views", "Wine Tastings", "Volcanic Tours"] },
      { name: "Amanzoe Costa Navarino", city: "Messinia", country: "Greece", address: "Costa Navarino, 240 01 Messinia", latitude: 37.0742, longitude: 21.6756, themes: ["Luxury & Comfort", "Wellness & Health"], activities: ["Spa Treatments", "Golf", "Beach Activities"] },
      
      // Hungary
      { name: "Four Seasons Hotel Gresham Palace", city: "Budapest", country: "Hungary", address: "Széchenyi István tér 5-6, 1051 Budapest", latitude: 47.5009, longitude: 19.0493, themes: ["History & Heritage", "Luxury & Comfort"], activities: ["Thermal Baths", "Danube Cruises", "Palace Tours"] },
      { name: "Aria Hotel Budapest", city: "Budapest", country: "Hungary", address: "Hercegprímás u. 5, 1051 Budapest", latitude: 47.4979, longitude: 19.054, themes: ["Art & Culture", "Entertainment & Media"], activities: ["Music Venues", "Opera House", "Cultural Events"] },
      { name: "Hotel Moments Budapest", city: "Budapest", country: "Hungary", address: "Andrássy út 8, 1061 Budapest", latitude: 47.5057, longitude: 19.0634, themes: ["Design & Architecture", "Fashion & Style"], activities: ["Design Tours", "Fashion Districts", "Architectural Walks"] },
      
      // Iceland
      { name: "Hotel Borg Reykjavik", city: "Reykjavik", country: "Iceland", address: "Pósthússtræti 11, 101 Reykjavík", latitude: 64.1466, longitude: -21.9426, themes: ["Nature & Environment", "Adventure & Sports"], activities: ["Northern Lights", "Geothermal Spas", "Glacier Tours"] },
      { name: "ION Adventure Hotel", city: "Selfoss", country: "Iceland", address: "Nesjavellir, 801 Selfoss", latitude: 64.0719, longitude: -21.2348, themes: ["Adventure & Sports", "Wellness & Health"], activities: ["Hiking", "Geothermal Baths", "Aurora Viewing"] },
      { name: "Hotel Rangá", city: "Hella", country: "Iceland", address: "Suðurlandsvegur, 851 Hella", latitude: 63.8317, longitude: -20.4014, themes: ["Nature & Environment", "Romance & Relationships"], activities: ["Star Gazing", "Salmon Fishing", "Country Walks"] },
      
      // Ireland
      { name: "The Shelbourne Dublin", city: "Dublin", country: "Ireland", address: "27 St Stephen's Green, Dublin 2", latitude: 53.3393, longitude: -6.2576, themes: ["History & Heritage", "Literature & Writing"], activities: ["Literary Tours", "Pub Crawls", "Georgian Architecture"] },
      { name: "Ashford Castle", city: "Cong", country: "Ireland", address: "Ashford Castle, Cong, Co. Mayo", latitude: 53.5407, longitude: -9.3073, themes: ["Luxury & Comfort", "History & Heritage"], activities: ["Castle Tours", "Falconry", "Lake Activities"] },
      { name: "The Europe Hotel Kerry", city: "Killarney", country: "Ireland", address: "Fossa, Killarney, Co. Kerry", latitude: 52.0168, longitude: -9.5692, themes: ["Nature & Environment", "Adventure & Sports"], activities: ["Ring of Kerry", "National Park", "Traditional Music"] },
      
      // Luxembourg
      { name: "Hotel Le Place d'Armes", city: "Luxembourg City", country: "Luxembourg", address: "18 Pl. d'Armes, 1136 Luxembourg", latitude: 49.6116, longitude: 6.1296, themes: ["Business & Networking", "History & Heritage"], activities: ["EU Institutions", "Old Town Tours", "Wine Regions"] },
      { name: "Sofitel Luxembourg Europe", city: "Luxembourg City", country: "Luxembourg", address: "4 Rue du Fort Niedergrünewald, 2226 Luxembourg", latitude: 49.6292, longitude: 6.1441, themes: ["Luxury & Comfort", "Business & Networking"], activities: ["Business Centers", "Fine Dining", "Cultural Events"] },
      
      // Netherlands
      { name: "The Waldorf Hilton Amsterdam", city: "Amsterdam", country: "Netherlands", address: "Herengracht 542-556, 1017 CG Amsterdam", latitude: 52.3667, longitude: 4.8945, themes: ["Art & Culture", "History & Heritage"], activities: ["Canal Tours", "Museum District", "Cycling Tours"] },
      { name: "Hotel New York Rotterdam", city: "Rotterdam", country: "Netherlands", address: "Koninginnenhoofd 1, 3072 AD Rotterdam", latitude: 51.9058, longitude: 4.4853, themes: ["Design & Architecture", "Business & Networking"], activities: ["Architecture Tours", "Port Tours", "Modern Art"] },
      { name: "Hotel Des Indes The Hague", city: "The Hague", country: "Netherlands", address: "Lange Voorhout 54-56, 2514 EG Den Haag", latitude: 52.0841, longitude: 4.3108, themes: ["History & Heritage", "Business & Networking"], activities: ["Government Tours", "Peace Palace", "Royal Collections"] },
      
      // Norway
      { name: "Hotel Continental Oslo", city: "Oslo", country: "Norway", address: "Stortingsgata 24/26, 0117 Oslo", latitude: 59.9127, longitude: 10.7461, themes: ["Design & Architecture", "Nature & Environment"], activities: ["Fjord Tours", "Viking Museums", "Outdoor Activities"] },
      { name: "Hotel Union Øye", city: "Øye", country: "Norway", address: "6218 Øye", latitude: 62.1833, longitude: 7.0833, themes: ["Nature & Environment", "Adventure & Sports"], activities: ["Fjord Hiking", "Fishing", "Mountain Climbing"] },
      { name: "Thon Hotel Lofoten", city: "Svolvær", country: "Norway", address: "Torget 4, 8300 Svolvær", latitude: 68.2343, longitude: 14.5633, themes: ["Nature & Environment", "Adventure & Sports"], activities: ["Northern Lights", "Midnight Sun", "Sea Fishing"] },
      
      // Poland
      { name: "Hotel Bristol Warsaw", city: "Warsaw", country: "Poland", address: "Krakowskie Przedmieście 42/44, 00-325 Warszawa", latitude: 52.2430, longitude: 21.0160, themes: ["History & Heritage", "Art & Culture"], activities: ["Old Town Tours", "Chopin Concerts", "Historical Sites"] },
      { name: "Hotel Copernicus Krakow", city: "Krakow", country: "Poland", address: "ul. Kanonicza 16, 31-002 Kraków", latitude: 50.0547, longitude: 19.9336, themes: ["History & Heritage", "Art & Culture"], activities: ["Medieval Tours", "Wawel Castle", "Salt Mines"] },
      { name: "Hotel Sopot", city: "Sopot", country: "Poland", address: "ul. Powstańców Warszawy 12/14, 81-718 Sopot", latitude: 54.4481, longitude: 18.5704, themes: ["Wellness & Health", "Entertainment & Media"], activities: ["Beach Activities", "Spa Treatments", "Music Festivals"] },
      
      // Portugal
      { name: "Reid's Palace Madeira", city: "Funchal", country: "Portugal", address: "Estrada Monumental 139, 9000-098 Funchal", latitude: 32.6333, longitude: -16.9147, themes: ["Luxury & Comfort", "Nature & Environment"], activities: ["Garden Tours", "Wine Tastings", "Levada Walks"] },
      { name: "Pousada de Lisboa", city: "Lisbon", country: "Portugal", address: "Praça do Comércio 31-34, 1100-148 Lisboa", latitude: 38.7071, longitude: -9.1364, themes: ["History & Heritage", "Food & Culinary"], activities: ["Fado Music", "Tram Tours", "Portuguese Cuisine"] },
      { name: "Quinta da Lago Resort", city: "Almancil", country: "Portugal", address: "Quinta do Lago, 8135-024 Almancil", latitude: 37.0469, longitude: -8.0178, themes: ["Luxury & Comfort", "Adventure & Sports"], activities: ["Golf", "Beach Activities", "Nature Reserve"] },
      
      // Romania
      { name: "JW Marriott Bucharest", city: "Bucharest", country: "Romania", address: "Calea 13 Septembrie 90, 050726 București", latitude: 44.4378, longitude: 26.0698, themes: ["Business & Networking", "History & Heritage"], activities: ["Old Town Tours", "Palace Visits", "Business Centers"] },
      { name: "Casa cu Cerb Brașov", city: "Brașov", country: "Romania", address: "Str. Apollonia Hirscher 13, 500025 Brașov", latitude: 45.6579, longitude: 25.6012, themes: ["History & Heritage", "Adventure & Sports"], activities: ["Dracula Castle", "Mountain Hiking", "Medieval Towns"] },
      { name: "Hotel International Iași", city: "Iași", country: "Romania", address: "Str. Lascăr Catargi 2-6, 700107 Iași", latitude: 47.1585, longitude: 27.6014, themes: ["History & Heritage", "Art & Culture"], activities: ["Monastery Tours", "Cultural Sites", "Traditional Crafts"] },
      
      // Sweden
      { name: "Grand Hôtel Stockholm", city: "Stockholm", country: "Sweden", address: "Södra Blasieholmshamnen 8, 103 27 Stockholm", latitude: 59.3293, longitude: 18.0686, themes: ["Luxury & Comfort", "Design & Architecture"], activities: ["Nobel Museum", "Archipelago Tours", "Design Districts"] },
      { name: "Hotel Emma Gothenburg", city: "Gothenburg", country: "Sweden", address: "Stora Badhusgatan 26, 411 21 Göteborg", latitude: 57.7089, longitude: 11.9746, themes: ["Design & Architecture", "Food & Culinary"], activities: ["Seafood Restaurants", "Design Museums", "West Coast Tours"] },
      { name: "Ice Hotel Jukkasjärvi", city: "Jukkasjärvi", country: "Sweden", address: "Marknadsvägen 63, 981 91 Jukkasjärvi", latitude: 67.8578, longitude: 20.6081, themes: ["Adventure & Sports", "Nature & Environment"], activities: ["Ice Sculpting", "Northern Lights", "Dog Sledding"] },
      
      // Switzerland
      { name: "Badrutt's Palace St. Moritz", city: "St. Moritz", country: "Switzerland", address: "Via Serlas 27, 7500 St. Moritz", latitude: 46.4906, longitude: 9.8365, themes: ["Luxury & Comfort", "Adventure & Sports"], activities: ["Alpine Skiing", "Luxury Shopping", "Mountain Dining"] },
      { name: "The Dolder Grand Zurich", city: "Zurich", country: "Switzerland", address: "Kurhausstrasse 65, 8032 Zürich", latitude: 47.3769, longitude: 8.5417, themes: ["Luxury & Comfort", "Wellness & Health"], activities: ["Spa Treatments", "City Views", "Fine Dining"] },
      { name: "Victoria Jungfrau Interlaken", city: "Interlaken", country: "Switzerland", address: "Höheweg 41, 3800 Interlaken", latitude: 46.6863, longitude: 7.8632, themes: ["Adventure & Sports", "Nature & Environment"], activities: ["Jungfraujoch", "Alpine Adventures", "Mountain Railways"] },
      
      // Thailand
      { name: "Mandarin Oriental Bangkok", city: "Bangkok", country: "Thailand", address: "48 Oriental Ave, Bang Rak, Bangkok 10500", latitude: 13.7248, longitude: 100.5148, themes: ["Luxury & Comfort", "Wellness & Health"], activities: ["Thai Spa", "Temple Tours", "River Cruises"] },
      { name: "Four Seasons Chiang Mai", city: "Chiang Mai", country: "Thailand", address: "Mae Rim-Samoeng Old Rd, Mae Rim District, Chiang Mai 50180", latitude: 18.8758, longitude: 98.9071, themes: ["Wellness & Health", "Adventure & Sports"], activities: ["Elephant Sanctuary", "Mountain Trekking", "Cooking Classes"] },
      { name: "Banyan Tree Phuket", city: "Phuket", country: "Thailand", address: "33, 33/27 Moo 4, Srisoonthorn Road, Cherngtalay, Thalang, Phuket 83110", latitude: 8.0081, longitude: 98.2817, themes: ["Luxury & Comfort", "Romance & Relationships"], activities: ["Beach Activities", "Island Hopping", "Sunset Dinners"] },
      
      // Turkey
      { name: "Four Seasons Istanbul", city: "Istanbul", country: "Turkey", address: "Tevkifhane Sk. No:1, 34122 Fatih/İstanbul", latitude: 41.0082, longitude: 28.9784, themes: ["History & Heritage", "Art & Culture"], activities: ["Byzantine Tours", "Bosphorus Cruises", "Turkish Baths"] },
      { name: "Museum Hotel Cappadocia", city: "Uchisar", country: "Turkey", address: "Tekelli Mahallesi No:1, 50240 Uçhisar/Nevşehir", latitude: 38.6344, longitude: 34.8065, themes: ["Adventure & Sports", "History & Heritage"], activities: ["Hot Air Balloons", "Cave Exploring", "Underground Cities"] },
      { name: "Hillside Beach Club", city: "Fethiye", country: "Turkey", address: "Kalemya Koyu, 48300 Fethiye/Muğla", latitude: 36.6141, longitude: 29.1180, themes: ["Family & Kids", "Adventure & Sports"], activities: ["Water Sports", "Beach Games", "Family Activities"] },
      
      // United Kingdom
      { name: "The Savoy London", city: "London", country: "United Kingdom", address: "Strand, London WC2R 0EU", latitude: 51.5101, longitude: -0.1202, themes: ["Luxury & Comfort", "Art & Culture"], activities: ["Theatre District", "Fine Dining", "Royal Tours"] },
      { name: "The Balmoral Edinburgh", city: "Edinburgh", country: "United Kingdom", address: "1 Princes St, Edinburgh EH2 2EQ", latitude: 55.9533, longitude: -3.1883, themes: ["History & Heritage", "Literature & Writing"], activities: ["Castle Tours", "Literary Walks", "Whisky Tastings"] },
      { name: "Hotel 41 London", city: "London", country: "United Kingdom", address: "41 Buckingham Palace Rd, London SW1W 0PS", latitude: 51.4994, longitude: -0.1448, themes: ["Luxury & Comfort", "Business & Networking"], activities: ["Royal London", "Business Districts", "Exclusive Clubs"] }
    ]

    console.log(`Creating ${welcomePilotHotels.length} Welcome Pilot Hotels...`)

    // Get all themes and activities for mapping
    const { data: allThemes } = await supabase.from('themes').select('*')
    const { data: allActivities } = await supabase.from('activities').select('*')

    const themeMap = new Map(allThemes?.map(t => [t.name, t.id]) || [])
    const activityMap = new Map(allActivities?.map(a => [a.name, a.id]) || [])

    let successCount = 0
    let errorCount = 0

    for (const hotelData of welcomePilotHotels) {
      try {
        // Create the hotel
        const { data: hotel, error: hotelError } = await supabase
          .from('hotels')
          .insert({
            name: hotelData.name,
            description: `Welcome Pilot Hotel - Premium 32-day extended stay property in ${hotelData.city}, ${hotelData.country}. Part of our curated collection of exceptional accommodations designed for long-term stays with complete amenities and services.`,
            city: hotelData.city,
            country: hotelData.country,
            address: hotelData.address,
            latitude: hotelData.latitude,
            longitude: hotelData.longitude,
            price_per_month: Math.floor(Math.random() * 1000) + 1500, // Random price between 1500-2500
            category: 5, // 5-star category
            property_type: 'Hotel',
            style: 'Premium Extended Stay',
            status: 'approved',
            is_featured: true,
            stay_lengths: [32], // Fixed 32-day stays
            meal_plans: ['Breakfast Included', 'Half Board', 'Full Board'],
            available_months: ['2025-01', '2025-02', '2025-03', '2025-04', '2025-05', '2025-06'],
            ideal_guests: 'Digital nomads, business travelers, and individuals seeking premium extended stays',
            atmosphere: 'Professional yet comfortable environment perfect for longer stays',
            perfect_location: `Prime location in ${hotelData.city} with easy access to major attractions and business districts`,
            features_hotel: {
              'Wi-Fi': true,
              'Concierge': true,
              'Room Service': true,
              'Laundry Service': true,
              'Business Center': true,
              'Fitness Center': true,
              'Restaurant': true,
              'Bar': true,
              'Parking': true,
              'Airport Shuttle': true
            },
            features_room: {
              'Air Conditioning': true,
              'Heating': true,
              'Kitchenette': true,
              'Desk': true,
              'Safe': true,
              'Minibar': true,
              'Coffee Machine': true,
              'Balcony': true,
              'City View': true,
              'Daily Housekeeping': true
            }
          })
          .select()
          .single()

        if (hotelError) {
          console.error(`Error creating hotel ${hotelData.name}:`, hotelError)
          errorCount++
          continue
        }

        // Add themes
        for (const themeName of hotelData.themes) {
          const themeId = themeMap.get(themeName)
          if (themeId) {
            await supabase.from('hotel_themes').insert({
              hotel_id: hotel.id,
              theme_id: themeId
            })
          }
        }

        // Add activities
        for (const activityName of hotelData.activities) {
          const activityId = activityMap.get(activityName)
          if (activityId) {
            await supabase.from('hotel_activities').insert({
              hotel_id: hotel.id,
              activity_id: activityId
            })
          }
        }

        successCount++
        console.log(`Successfully created hotel: ${hotelData.name}`)
      } catch (error) {
        console.error(`Failed to create hotel ${hotelData.name}:`, error)
        errorCount++
      }
    }

    const message = `Welcome Pilot Hotels creation completed. Successfully created: ${successCount}, Errors: ${errorCount}`
    console.log(message)

    return new Response(JSON.stringify({ 
      message,
      successCount,
      errorCount,
      totalAttempted: welcomePilotHotels.length 
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Error in creacion-hoteles-32-dias function:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
