
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
    console.log('Starting Welcome Pilot Hotels creation process...')
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // English hotel features from the platform
    const hotelFeatures = {
      "WiFi": true,
      "Parking": true,
      "Restaurant": true,
      "Bar": true,
      "Room Service": true,
      "Laundry Service": true,
      "24/7 Reception": true,
      "Elevator": true,
      "Heating": true,
      "Air Conditioning": true,
      "Fitness Center": true,
      "Business Center": true
    }

    const roomFeatures = {
      "Private Bathroom": true,
      "Television": true,
      "Mini Fridge": true,
      "Desk": true,
      "Wardrobe": true,
      "Safe": true,
      "Hairdryer": true,
      "Iron/Ironing Board": true,
      "Coffee/Tea Maker": true
    }

    // Expanded hotel dataset for 22 countries (3+ hotels per country)
    const welcomePilotHotels = [
      // Austria
      { name: "Hotel Am Park", city: "Vienna", country: "Austria", address: "Kaisermühlenstraße 2, 1020 Vienna", lat: 48.2082, lng: 16.3738, postal: "1020" },
      { name: "Hotel Goldener Hirsch", city: "Salzburg", country: "Austria", address: "Getreidegasse 37, 5020 Salzburg", lat: 47.8021, lng: 13.0472, postal: "5020" },
      { name: "Hotel Europa Tyrol", city: "Innsbruck", country: "Austria", address: "Südtiroler Platz 2, 6020 Innsbruck", lat: 47.2692, lng: 11.4041, postal: "6020" },
      
      // Belgium
      { name: "Hotel des Galeries", city: "Brussels", country: "Belgium", address: "Rue des Bouchers 38, 1000 Brussels", lat: 50.8503, lng: 4.3517, postal: "1000" },
      { name: "Hotel Ter Duinen", city: "Bruges", country: "Belgium", address: "Langerei 52, 8000 Bruges", lat: 51.2093, lng: 3.2247, postal: "8000" },
      { name: "Hotel Agora", city: "Antwerp", country: "Belgium", address: "Grote Markt 4, 2000 Antwerp", lat: 51.2194, lng: 4.4025, postal: "2000" },
      
      // Canada
      { name: "Hotel Le Germain Quebec", city: "Quebec City", country: "Canada", address: "126 Rue Saint-Pierre, Quebec City, QC G1K 4A8", lat: 46.8139, lng: -71.2082, postal: "G1K 4A8" },
      { name: "Hotel Clarendon", city: "Quebec City", country: "Canada", address: "57 Rue Sainte-Anne, Quebec City, QC G1R 3X4", lat: 46.8131, lng: -71.2068, postal: "G1R 3X4" },
      { name: "Best Western Plus Village Park Inn", city: "Calgary", country: "Canada", address: "1804 Crowchild Trail NW, Calgary, AB T2M 3Y7", lat: 51.0447, lng: -114.0719, postal: "T2M 3Y7" },
      
      // Denmark
      { name: "Hotel CPH Studio", city: "Copenhagen", country: "Denmark", address: "Helgolandsgade 15, 1653 Copenhagen", lat: 55.6761, lng: 12.5683, postal: "1653" },
      { name: "Hotel Richmond", city: "Copenhagen", country: "Denmark", address: "Vester Farimagsgade 33, 1606 Copenhagen", lat: 55.6744, lng: 12.5651, postal: "1606" },
      { name: "Hotel Mayfair", city: "Copenhagen", country: "Denmark", address: "Helgolandsgade 3, 1653 Copenhagen", lat: 55.6759, lng: 12.5688, postal: "1653" },
      
      // Finland
      { name: "Hotel Arthur", city: "Helsinki", country: "Finland", address: "Vuorikatu 19, 00100 Helsinki", lat: 60.1699, lng: 24.9384, postal: "00100" },
      { name: "Hotel Kämp", city: "Helsinki", country: "Finland", address: "Pohjoisesplanadi 29, 00100 Helsinki", lat: 60.1695, lng: 24.9490, postal: "00100" },
      { name: "Hotel Torni", city: "Helsinki", country: "Finland", address: "Yrjönkatu 26, 00100 Helsinki", lat: 60.1692, lng: 24.9417, postal: "00100" },
      
      // France
      { name: "Hotel du Louvre", city: "Paris", country: "France", address: "Place André Malraux, 75001 Paris", lat: 48.8651, lng: 2.3353, postal: "75001" },
      { name: "Hotel Brighton", city: "Paris", country: "France", address: "218 Rue de Rivoli, 75001 Paris", lat: 48.8606, lng: 2.3376, postal: "75001" },
      { name: "Hotel des Grands Boulevards", city: "Paris", country: "France", address: "17 Boulevard Poissonnière, 75002 Paris", lat: 48.8712, lng: 2.3431, postal: "75002" },
      
      // Germany
      { name: "Hotel Augustinerhof", city: "Vienna", country: "Germany", address: "Augustinerstraße 5, 80333 Munich", lat: 48.1351, lng: 11.5820, postal: "80333" },
      { name: "Meininger Hotel Berlin Central Station", city: "Berlin", country: "Germany", address: "Ella-Trebe-Straße 9, 10557 Berlin", lat: 52.5244, lng: 13.3690, postal: "10557" },
      { name: "Hotel Bleibtreu Berlin", city: "Berlin", country: "Germany", address: "Bleibtreustraße 31, 10707 Berlin", lat: 52.5037, lng: 13.3238, postal: "10707" },
      
      // Greece
      { name: "Hotel Grande Bretagne", city: "Athens", country: "Greece", address: "Vasileos Georgiou A' 1, Athens 105 64", lat: 37.9755, lng: 23.7348, postal: "105 64" },
      { name: "Hotel Electra Palace Athens", city: "Athens", country: "Greece", address: "18-20 Navarchou Nikodimou, Athens 105 57", lat: 37.9734, lng: 23.7348, postal: "105 57" },
      { name: "Hotel Titania", city: "Athens", country: "Greece", address: "52 Panepistimiou Avenue, Athens 106 78", lat: 37.9789, lng: 23.7318, postal: "106 78" },
      
      // Hungary
      { name: "Hotel Central Basilica", city: "Budapest", country: "Hungary", address: "Hercegprímás utca 8, 1051 Budapest", lat: 47.5017, lng: 19.0522, postal: "1051" },
      { name: "Mercure Budapest Korona", city: "Budapest", country: "Hungary", address: "Kecskeméti u. 14, 1053 Budapest", lat: 47.4875, lng: 19.0625, postal: "1053" },
      { name: "City Hotel Ring", city: "Budapest", country: "Hungary", address: "Szent István krt. 22, 1137 Budapest", lat: 47.5138, lng: 19.0548, postal: "1137" },
      
      // Iceland
      { name: "Hotel Reykjavik Centrum", city: "Reykjavik", country: "Iceland", address: "Aðalstræti 16, 101 Reykjavík", lat: 64.1466, lng: -21.9426, postal: "101" },
      { name: "Hotel Frón", city: "Reykjavik", country: "Iceland", address: "Laugavegur 22A, 101 Reykjavík", lat: 64.1447, lng: -21.9308, postal: "101" },
      { name: "Hotel Björk", city: "Reykjavik", country: "Iceland", address: "Brautarholt 29, 105 Reykjavík", lat: 64.1335, lng: -21.8987, postal: "105" },
      
      // Ireland
      { name: "The Stephen's Green Hotel", city: "Dublin", country: "Ireland", address: "The Green, Dublin 2", lat: 53.3386, lng: -6.2603, postal: "D02 VN88" },
      { name: "Brooks Hotel", city: "Dublin", country: "Ireland", address: "59-62 Drury Street, Dublin 2", lat: 53.3422, lng: -6.2633, postal: "D02 TD44" },
      { name: "Travelodge Dublin Phoenix Park", city: "Dublin", country: "Ireland", address: "Phoenix Park, Castleknock, Dublin 15", lat: 53.3751, lng: -6.3456, postal: "D15 KN61" },
      
      // Luxembourg
      { name: "Hotel Le Place d'Armes", city: "Luxembourg", country: "Luxembourg", address: "18 Place d'Armes, 1136 Luxembourg", lat: 49.6116, lng: 6.1319, postal: "1136" },
      { name: "Hotel Français", city: "Luxembourg", country: "Luxembourg", address: "14 Place d'Armes, 1136 Luxembourg", lat: 49.6117, lng: 6.1316, postal: "1136" },
      { name: "Hotel International", city: "Luxembourg", country: "Luxembourg", address: "20-22 Place de la Gare, 1616 Luxembourg", lat: 49.6007, lng: 6.1335, postal: "1616" },
      
      // Netherlands
      { name: "Hotel V Nesplein", city: "Amsterdam", country: "Netherlands", address: "Nes 49, 1012 KD Amsterdam", lat: 52.3702, lng: 4.8952, postal: "1012 KD" },
      { name: "Hotel Des Indes", city: "The Hague", country: "Netherlands", address: "Lange Voorhout 54-56, 2514 EG The Hague", lat: 52.0807, lng: 4.3121, postal: "2514 EG" },
      { name: "Hotel Europa 92", city: "Amsterdam", country: "Netherlands", address: "Nieuwe Doelenstraat 2-14, 1012 CP Amsterdam", lat: 52.3676, lng: 4.8935, postal: "1012 CP" },
      
      // Norway
      { name: "Hotel Continental Oslo", city: "Oslo", country: "Norway", address: "Stortingsgata 24/26, 0117 Oslo", lat: 59.9127, lng: 10.7395, postal: "0117" },
      { name: "Hotel Bristol", city: "Oslo", country: "Norway", address: "Kristian IVs gate 7, 0164 Oslo", lat: 59.9138, lng: 10.7387, postal: "0164" },
      { name: "Hotel Bondeheimen", city: "Oslo", country: "Norway", address: "Rosenkrantz' gate 8, 0159 Oslo", lat: 59.9127, lng: 10.7368, postal: "0159" },
      
      // Poland
      { name: "Hotel Cracovia", city: "Krakow", country: "Poland", address: "Al. Focha 1, 30-119 Kraków", lat: 50.0647, lng: 19.9450, postal: "30-119" },
      { name: "Hotel Europejski", city: "Krakow", country: "Poland", address: "Lubicz 5, 31-034 Kraków", lat: 50.0676, lng: 19.9465, postal: "31-034" },
      { name: "Novotel Warszawa Centrum", city: "Warsaw", country: "Poland", address: "ul. Marszałkowska 94/98, 00-510 Warsaw", lat: 52.2244, lng: 21.0150, postal: "00-510" },
      
      // Portugal
      { name: "Hotel Real Palácio", city: "Lisbon", country: "Portugal", address: "Rua do Alecrim 12, 1200-018 Lisboa", lat: 38.7081, lng: -9.1439, postal: "1200-018" },
      { name: "Hotel Dom Henrique", city: "Porto", country: "Portugal", address: "Rua Guedes de Azevedo 179, 4000-271 Porto", lat: 41.1496, lng: -8.6109, postal: "4000-271" },
      { name: "Hotel Belvedere", city: "Lisbon", country: "Portugal", address: "Rua Particular à Rua do Jasmineiro, 1200-781 Lisboa", lat: 38.7223, lng: -9.1393, postal: "1200-781" },
      
      // Romania
      { name: "Hotel Cismigiu", city: "Bucharest", country: "Romania", address: "Bulevardul Regina Elisabeta 38, 030167 Bucharest", lat: 44.4378, lng: 26.0995, postal: "030167" },
      { name: "Hotel Continental Forum", city: "Bucharest", country: "Romania", address: "Bulevardul Nicolae Bălcescu 56, 010044 Bucharest", lat: 44.4398, lng: 26.0975, postal: "010044" },
      { name: "Hotel Europa Eforie", city: "Constanta", country: "Romania", address: "Bulevardul Ferdinand 20, 900601 Constanța", lat: 44.1598, lng: 28.6348, postal: "900601" },
      
      // Sweden
      { name: "Hotel Diplomat", city: "Stockholm", country: "Sweden", address: "Strandvägen 7C, 114 56 Stockholm", lat: 59.3293, lng: 18.0686, postal: "114 56" },
      { name: "Hotel Rival", city: "Stockholm", country: "Sweden", address: "Mariatorget 3, 118 91 Stockholm", lat: 59.3154, lng: 18.0686, postal: "118 91" },
      { name: "Hotel Scandic Continental", city: "Stockholm", country: "Sweden", address: "Vasagatan 22, 111 20 Stockholm", lat: 59.3293, lng: 18.0578, postal: "111 20" },
      
      // Switzerland
      { name: "Hotel Schweizerhof Bern", city: "Bern", country: "Switzerland", address: "Bahnhofplatz 11, 3001 Bern", lat: 46.9489, lng: 7.4638, postal: "3001" },
      { name: "Hotel Bellevue Palace", city: "Bern", country: "Switzerland", address: "Kochergasse 3-5, 3011 Bern", lat: 46.9457, lng: 7.4474, postal: "3011" },
      { name: "Hotel Allegro Bern", city: "Bern", country: "Switzerland", address: "Kornhausstrasse 3, 3013 Bern", lat: 46.9489, lng: 7.4419, postal: "3013" },
      
      // Thailand
      { name: "Hotel Muse Bangkok", city: "Bangkok", country: "Thailand", address: "55/555 Langsuan Road, Lumpini, Pathumwan, Bangkok 10330", lat: 13.7563, lng: 100.5018, postal: "10330" },
      { name: "Hotel Baraquda Pattaya", city: "Pattaya", country: "Thailand", address: "485/2 Pattaya 2nd Road, Nongprue, Banglamung, Chonburi 20150", lat: 12.9236, lng: 100.8825, postal: "20150" },
      { name: "Hotel De Chai Colonial", city: "Bangkok", country: "Thailand", address: "36 Surawong Road, Si Phraya, Bang Rak, Bangkok 10500", lat: 13.7234, lng: 100.5176, postal: "10500" },
      
      // Turkey
      { name: "Hotel Empress Zoe", city: "Istanbul", country: "Turkey", address: "Adliye Sokak No 10, Sultanahmet, 34122 Istanbul", lat: 41.0082, lng: 28.9784, postal: "34122" },
      { name: "Hotel Arcadia Blue", city: "Istanbul", country: "Turkey", address: "Dr. Imran Oktem Caddesi No 1, Sultanahmet, 34122 Istanbul", lat: 41.0058, lng: 28.9769, postal: "34122" },
      { name: "Hotel Sura Hagia Sophia", city: "Istanbul", country: "Turkey", address: "Tevkifhane Sokak No 53, Sultanahmet, 34122 Istanbul", lat: 41.0057, lng: 28.9774, postal: "34122" },
      
      // United Kingdom
      { name: "Hotel Russell", city: "London", country: "United Kingdom", address: "1-8 Russell Square, Bloomsbury, London WC1B 5BE", lat: 51.5213, lng: -0.1240, postal: "WC1B 5BE" },
      { name: "Hotel Zephyr", city: "London", country: "United Kingdom", address: "133 Notting Hill Gate, London W11 3LB", lat: 51.5095, lng: -0.1982, postal: "W11 3LB" },
      { name: "Hotel Indigo London Tower Hill", city: "London", country: "United Kingdom", address: "142 Minories, London EC3N 1LS", lat: 51.5108, lng: -0.0759, postal: "EC3N 1LS" }
    ]

    // Get all available themes and activities
    const { data: themes } = await supabaseClient.from('themes').select('id, name')
    const { data: activities } = await supabaseClient.from('activities').select('id, name')

    if (!themes || !activities) {
      throw new Error('Failed to fetch themes and activities')
    }

    // Blocked luxury terms
    const blockedTerms = ['palace', 'kempinski', 'four seasons', 'ritz', 'mandarin', 'shangri', 'peninsula', 'st. regis', 'luxury', 'grand hotel', 'royal', 'imperial', 'presidential', 'platinum', 'diamond', 'gold', 'premium', 'deluxe', 'exclusive', 'elite', 'prestige']

    // Filter hotels that don't contain blocked terms
    const filteredHotels = welcomePilotHotels.filter(hotel => 
      !blockedTerms.some(term => hotel.name.toLowerCase().includes(term.toLowerCase()))
    )

    console.log(`Creating ${Math.min(filteredHotels.length, 66)} Welcome Pilot Hotels...`)
    
    let successCount = 0
    let errorCount = 0

    // Take first 66 hotels or all available
    const hotelsToCreate = filteredHotels.slice(0, 66)

    for (const hotel of hotelsToCreate) {
      try {
        // Generate room types with corrected pricing
        const roomTypes = [
          {
            id: `single-${Date.now()}-${Math.random()}`,
            name: "Single Room",
            description: "Comfortable single occupancy room with modern amenities and city views",
            maxOccupancy: 1,
            size: 18,
            roomCount: Math.floor(Math.random() * 8) + 3, // 3-10 rooms
            basePrice: Math.floor(Math.random() * (1800 - 1400 + 1)) + 1400, // €1400-€1800
            rates: {},
            images: [],
            availabilityDates: []
          },
          {
            id: `double-${Date.now()}-${Math.random()}`,
            name: "Double Room", 
            description: "Spacious double occupancy room with modern amenities and city views",
            maxOccupancy: 2,
            size: 25,
            roomCount: Math.floor(Math.random() * 8) + 3, // 3-10 rooms
            basePrice: Math.floor(Math.random() * (1450 - 1100 + 1)) + 1100, // €1100-€1450 per person
            rates: {},
            images: [],
            availabilityDates: []
          }
        ]

        // Build complete pricing matrix for 32-day stays with Half Board
        const pricingMatrix = []
        roomTypes.forEach(room => {
          // Adjust prices to end in 20 or 95
          let price = room.basePrice
          const remainder = price % 100
          if (remainder < 50) {
            price = price - remainder + 20
          } else {
            price = price - remainder + 95
          }
          
          pricingMatrix.push({
            roomType: room.name,
            stayLength: "32 days",
            mealPlan: "Half Board",
            price: price
          })
        })

        // Select random themes (1-3)
        const selectedThemes = themes
          .sort(() => 0.5 - Math.random())
          .slice(0, Math.floor(Math.random() * 3) + 1)

        // Select random activities (3-5) 
        const selectedActivities = activities
          .sort(() => 0.5 - Math.random())
          .slice(0, Math.floor(Math.random() * 3) + 3)

        // Generate all 12 months availability
        const availableMonths = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ]

        // Create the hotel record
        const hotelData = {
          name: hotel.name,
          description: `Located in the heart of ${hotel.city}, this comfortable hotel offers modern amenities and excellent service for extended stays. Perfect for business travelers and digital nomads seeking a home away from home with professional facilities and local neighborhood atmosphere.`,
          country: hotel.country,
          city: hotel.city,
          address: hotel.address,
          postal_code: hotel.postal,
          latitude: hotel.lat,
          longitude: hotel.lng,
          price_per_month: Math.min(...pricingMatrix.map(p => p.price)),
          category: Math.floor(Math.random() * 2) + 3, // 3 or 4 stars
          property_type: ["Hotel", "Boutique Hotel", "Business Hotel"][Math.floor(Math.random() * 3)],
          style: ["modern", "classic", "urban", "minimalist"][Math.floor(Math.random() * 4)],
          ideal_guests: "Business travelers, digital nomads, and professionals seeking comfortable extended stays with modern amenities and convenient city center location.",
          atmosphere: "Professional yet welcoming atmosphere with modern facilities, comfortable common areas, and attentive service tailored for longer-term guests.",
          perfect_location: `Ideally located in ${hotel.city} city center with easy access to business districts, cultural attractions, restaurants, and public transportation for both work and leisure activities.`,
          available_months: availableMonths,
          check_in_weekday: "Monday",
          preferredWeekday: "Monday",
          meal_plans: ["Half Board"],
          stay_lengths: [32],
          features_hotel: hotelFeatures,
          features_room: roomFeatures,
          room_types: roomTypes,
          pricingMatrix: pricingMatrix,
          rates: pricingMatrix.reduce((acc, item) => {
            acc[`${item.roomType}-${item.stayLength}-${item.mealPlan}`] = item.price
            return acc
          }, {}),
          status: 'approved',
          terms: "Welcome Pilot Hotel - 32-day minimum stay required. Half Board meal plan included. Check-in available on Mondays. Cancellation policy: 7 days notice required for full refund."
        }

        // Insert hotel
        const { data: insertedHotel, error: hotelError } = await supabaseClient
          .from('hotels')
          .insert(hotelData)
          .select()
          .single()

        if (hotelError) {
          console.error(`Error creating hotel ${hotel.name}:`, hotelError)
          errorCount++
          continue
        }

        // Insert hotel themes
        for (const theme of selectedThemes) {
          await supabaseClient.from('hotel_themes').insert({
            hotel_id: insertedHotel.id,
            theme_id: theme.id
          })
        }

        // Insert hotel activities  
        for (const activity of selectedActivities) {
          await supabaseClient.from('hotel_activities').insert({
            hotel_id: insertedHotel.id,
            activity_id: activity.id
          })
        }

        // Generate availability dates for next 12 months
        const startDate = new Date()
        for (let month = 0; month < 12; month++) {
          const targetDate = new Date(startDate.getFullYear(), startDate.getMonth() + month, 1)
          const monthName = targetDate.toLocaleString('default', { month: 'long' })
          
          await supabaseClient.from('hotel_availability').insert({
            hotel_id: insertedHotel.id,
            availability_date: `${targetDate.getFullYear()}-${String(targetDate.getMonth() + 1).padStart(2, '0')}-01`,
            availability_month: monthName,
            availability_year: targetDate.getFullYear(),
            is_full_month: true,
            preferred_weekday: "Monday"
          })
        }

        successCount++
        console.log(`Successfully created hotel: ${hotel.name}`)

      } catch (error) {
        console.error(`Error creating hotel ${hotel.name}:`, error)
        errorCount++
      }
    }

    console.log(`Welcome Pilot Hotels creation completed. Successfully created: ${successCount}, Errors: ${errorCount}`)

    return new Response(
      JSON.stringify({ 
        message: `Welcome Pilot Hotels batch completed. Created ${successCount} hotels with ${errorCount} errors.`,
        details: {
          totalHotels: hotelsToCreate.length,
          successCount,
          errorCount,
          countries: 22,
          features: "Complete Steps 1-5 data with English features",
          pricing: "Single rooms: €1400-€1800, Double rooms: €1100-€1450 per person",
          roomTypes: "Both Single and Double room types created",
          stayLength: "32 days only",
          mealPlan: "Half Board included",
          affinities: "1-3 random themes per hotel", 
          activities: "3-5 random activities per hotel",
          availability: "All 12 months available"
        }
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Error in Welcome Pilot Hotels creation:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        message: 'Failed to create Welcome Pilot Hotels batch'
      }),
      { 
        status: 500, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})
