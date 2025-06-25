
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
    console.log('Starting 32-day hotel creation process...')
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // First, get the current user's ID as the owner
    const authHeader = req.headers.get('Authorization')?.replace('Bearer ', '')
    let ownerId: string | null = null
    
    if (authHeader) {
      const { data: { user } } = await supabase.auth.getUser(authHeader)
      ownerId = user?.id || null
    }
    
    // If no valid user, use the first available admin user
    if (!ownerId) {
      const { data: adminUsers } = await supabase
        .from('admin_users')
        .select('id')
        .limit(1)
      
      if (adminUsers && adminUsers.length > 0) {
        ownerId = adminUsers[0].id
      } else {
        // Create a default admin user if none exists
        const { data: profiles } = await supabase
          .from('profiles')
          .select('id')
          .eq('is_hotel_owner', true)
          .limit(1)
        
        if (profiles && profiles.length > 0) {
          ownerId = profiles[0].id
        }
      }
    }

    if (!ownerId) {
      throw new Error('No valid owner found for hotel creation')
    }

    // Get all available themes and activities
    const { data: themes } = await supabase
      .from('themes')
      .select('*')
      .order('name')

    const { data: activities } = await supabase
      .from('activities')
      .select('*')
      .order('name')

    if (!themes || !activities) {
      throw new Error('Failed to fetch themes or activities')
    }

    console.log(`Found ${themes.length} themes and ${activities.length} activities`)

    // Hotel data for 66 hotels across different countries
    const hotelData = [
      // Spain (11 hotels)
      { name: "Villa Serena Madrid", country: "Spain", city: "Madrid", type: "Boutique Hotel", style: "Modern" },
      { name: "Casa Luna Barcelona", country: "Spain", city: "Barcelona", type: "Urban Hotel", style: "Contemporary" },
      { name: "Hotel Palacio Sevilla", country: "Spain", city: "Sevilla", type: "Heritage Hotel", style: "Traditional" },
      { name: "Oasis Valencia", country: "Spain", city: "Valencia", type: "Business Hotel", style: "Modern" },
      { name: "Mar y Sol Málaga", country: "Spain", city: "Málaga", type: "Beach Resort", style: "Mediterranean" },
      { name: "Mirador Granada", country: "Spain", city: "Granada", type: "Boutique Hotel", style: "Andalusian" },
      { name: "Costa Dorada Bilbao", country: "Spain", city: "Bilbao", type: "Urban Hotel", style: "Industrial" },
      { name: "Refugio Santander", country: "Spain", city: "Santander", type: "Coastal Hotel", style: "Maritime" },
      { name: "Plaza Mayor Salamanca", country: "Spain", city: "Salamanca", type: "Historic Hotel", style: "Classical" },
      { name: "Sierra Nevada Resort", country: "Spain", city: "Granada", type: "Mountain Resort", style: "Alpine" },
      { name: "Camino Santiago León", country: "Spain", city: "León", type: "Pilgrim Hotel", style: "Rustic" },

      // Portugal (11 hotels)
      { name: "Quinta do Porto", country: "Portugal", city: "Porto", type: "Wine Hotel", style: "Traditional" },
      { name: "Fado Lisboa", country: "Portugal", city: "Lisboa", type: "Cultural Hotel", style: "Historic" },
      { name: "Oceano Azul Cascais", country: "Portugal", city: "Cascais", type: "Beach Hotel", style: "Coastal" },
      { name: "Mosteiro Óbidos", country: "Portugal", city: "Óbidos", type: "Historic Hotel", style: "Medieval" },
      { name: "Douro Valley Resort", country: "Portugal", city: "Vila Real", type: "River Resort", style: "Rural" },
      { name: "Algarve Sol", country: "Portugal", city: "Faro", type: "Beach Resort", style: "Mediterranean" },
      { name: "Sintra Palace", country: "Portugal", city: "Sintra", type: "Palace Hotel", style: "Romantic" },
      { name: "Aveiro Canal", country: "Portugal", city: "Aveiro", type: "Canal Hotel", style: "Venetian" },
      { name: "Braga Sanctuary", country: "Portugal", city: "Braga", type: "Spiritual Hotel", style: "Religious" },
      { name: "Madeira Gardens", country: "Portugal", city: "Funchal", type: "Garden Hotel", style: "Tropical" },
      { name: "Azores Volcanic", country: "Portugal", city: "Ponta Delgada", type: "Nature Hotel", style: "Volcanic" },

      // Italy (11 hotels)
      { name: "Roma Eterna", country: "Italy", city: "Roma", type: "Historic Hotel", style: "Imperial" },
      { name: "Gondola Venezia", country: "Italy", city: "Venezia", type: "Canal Hotel", style: "Venetian" },
      { name: "Duomo Milano", country: "Italy", city: "Milano", type: "Fashion Hotel", style: "Designer" },
      { name: "Borgo Toscano", country: "Italy", city: "Firenze", type: "Villa Hotel", style: "Renaissance" },
      { name: "Amalfi Dreams", country: "Italy", city: "Amalfi", type: "Coastal Resort", style: "Mediterranean" },
      { name: "Lago Como", country: "Italy", city: "Como", type: "Lake Resort", style: "Romantic" },
      { name: "Sicilia Sole", country: "Italy", city: "Palermo", type: "Island Hotel", style: "Sicilian" },
      { name: "Verona Romeo", country: "Italy", city: "Verona", type: "Romantic Hotel", style: "Medieval" },
      { name: "Napoli Vista", country: "Italy", city: "Napoli", type: "Bay Hotel", style: "Neapolitan" },
      { name: "Bologna Cultura", country: "Italy", city: "Bologna", type: "University Hotel", style: "Academic" },
      { name: "Torino Regale", country: "Italy", city: "Torino", type: "Royal Hotel", style: "Baroque" },

      // France (11 hotels)
      { name: "Lumière Paris", country: "France", city: "Paris", type: "Luxury Hotel", style: "Haussmann" },
      { name: "Château Loire", country: "France", city: "Tours", type: "Castle Hotel", style: "Renaissance" },
      { name: "Lavande Provence", country: "France", city: "Avignon", type: "Country Hotel", style: "Provençal" },
      { name: "Côte d'Azur Nice", country: "France", city: "Nice", type: "Riviera Hotel", style: "Belle Époque" },
      { name: "Mont Blanc Chamonix", country: "France", city: "Chamonix", type: "Alpine Resort", style: "Chalet" },
      { name: "Bordeaux Vigne", country: "France", city: "Bordeaux", type: "Wine Hotel", style: "Georgian" },
      { name: "Strasbourg Alsace", country: "France", city: "Strasbourg", type: "Historic Hotel", style: "Germanic" },
      { name: "Lyon Soie", country: "France", city: "Lyon", type: "Silk Hotel", style: "Renaissance" },
      { name: "Marseille Port", country: "France", city: "Marseille", type: "Harbor Hotel", style: "Mediterranean" },
      { name: "Normandie Honfleur", country: "France", city: "Honfleur", type: "Maritime Hotel", style: "Norman" },
      { name: "Carcassonne Citadel", country: "France", city: "Carcassonne", type: "Fortress Hotel", style: "Medieval" },

      // Germany (11 hotels)
      { name: "Berlin Moderne", country: "Germany", city: "Berlin", type: "Modern Hotel", style: "Contemporary" },
      { name: "München Oktoberfest", country: "Germany", city: "München", type: "Bavarian Hotel", style: "Alpine" },
      { name: "Hamburg Hafen", country: "Germany", city: "Hamburg", type: "Harbor Hotel", style: "Maritime" },
      { name: "Köln Kathedrale", country: "Germany", city: "Köln", type: "Cathedral Hotel", style: "Gothic" },
      { name: "Frankfurt Business", country: "Germany", city: "Frankfurt", type: "Business Hotel", style: "Corporate" },
      { name: "Dresden Barock", country: "Germany", city: "Dresden", type: "Palace Hotel", style: "Baroque" },
      { name: "Heidelberg Schloss", country: "Germany", city: "Heidelberg", type: "Castle Hotel", style: "Romantic" },
      { name: "Rothenburg Medieval", country: "Germany", city: "Rothenburg", type: "Medieval Hotel", style: "Historic" },
      { name: "Black Forest Baden", country: "Germany", city: "Baden-Baden", type: "Spa Resort", style: "Wellness" },
      { name: "Rhine Valley Koblenz", country: "Germany", city: "Koblenz", type: "River Hotel", style: "Romantic" },
      { name: "Leipzig Music", country: "Germany", city: "Leipzig", type: "Music Hotel", style: "Classical" },

      // Netherlands (11 hotels)
      { name: "Amsterdam Canal", country: "Netherlands", city: "Amsterdam", type: "Canal Hotel", style: "Dutch Golden Age" },
      { name: "Tulip Fields Keukenhof", country: "Netherlands", city: "Lisse", type: "Garden Hotel", style: "Floral" },
      { name: "Rotterdam Modern", country: "Netherlands", city: "Rotterdam", type: "Design Hotel", style: "Architecture" },
      { name: "Den Haag Royal", country: "Netherlands", city: "Den Haag", type: "Royal Hotel", style: "Diplomatic" },
      { name: "Utrecht Historic", country: "Netherlands", city: "Utrecht", type: "Historic Hotel", style: "Medieval" },
      { name: "Kinderdijk Mills", country: "Netherlands", city: "Kinderdijk", type: "Windmill Hotel", style: "Traditional" },
      { name: "Giethoorn Venice", country: "Netherlands", city: "Giethoorn", type: "Water Hotel", style: "Rural" },
      { name: "Zaanse Schans", country: "Netherlands", city: "Zaandam", type: "Heritage Hotel", style: "Industrial" },
      { name: "Volendam Fisher", country: "Netherlands", city: "Volendam", type: "Fishing Hotel", style: "Maritime" },
      { name: "Marken Island", country: "Netherlands", city: "Marken", type: "Island Hotel", style: "Wooden" },
      { name: "Haarlem Flowers", country: "Netherlands", city: "Haarlem", type: "Flower Hotel", style: "Baroque" }
    ]

    let successCount = 0

    for (let i = 0; i < hotelData.length; i++) {
      const hotel = hotelData[i]
      
      try {
        console.log(`Creating hotel ${i + 1}: ${hotel.name}`)
        
        // Generate realistic descriptions based on location and style
        const descriptions = generateHotelDescriptions(hotel)
        
        // Create the hotel
        const { data: newHotel, error: hotelError } = await supabase
          .from('hotels')
          .insert({
            name: hotel.name,
            country: hotel.country,
            city: hotel.city,
            description: descriptions.description,
            ideal_guests: descriptions.idealGuests,
            atmosphere: descriptions.atmosphere,
            perfect_location: descriptions.perfectLocation,
            property_type: hotel.type,
            style: hotel.style,
            price_per_month: Math.floor(Math.random() * 2000) + 1500, // 1500-3500
            owner_id: ownerId,
            status: 'approved',
            category: Math.floor(Math.random() * 3) + 3, // 3-5 stars
            stay_lengths: [32],
            meal_plans: ['breakfast', 'half-board'],
            available_months: ['2025-01', '2025-02', '2025-03', '2025-04', '2025-05', '2025-06']
          })
          .select()
          .single()

        if (hotelError) {
          console.error(`Error creating hotel ${hotel.name}:`, hotelError)
          continue
        }

        console.log(`Hotel created successfully: ${newHotel.id}`)

        // Select 1-3 random themes
        const selectedThemes = getRandomItems(themes, Math.floor(Math.random() * 3) + 1)
        
        // Create theme relationships
        for (const theme of selectedThemes) {
          const { error: themeError } = await supabase
            .from('hotel_themes')
            .insert({
              hotel_id: newHotel.id,
              theme_id: theme.id
            })
          
          if (themeError) {
            console.error(`Error linking theme ${theme.name} to hotel:`, themeError)
          } else {
            console.log(`Linked theme: ${theme.name}`)
          }
        }

        // Select 3-5 activities that match the theme style
        const matchingActivities = getMatchingActivities(activities, selectedThemes)
        const selectedActivities = getRandomItems(matchingActivities, Math.floor(Math.random() * 3) + 3) // 3-5 activities
        
        // Create activity relationships
        for (const activity of selectedActivities) {
          const { error: activityError } = await supabase
            .from('hotel_activities')
            .insert({
              hotel_id: newHotel.id,
              activity_id: activity.id
            })
          
          if (activityError) {
            console.error(`Error linking activity ${activity.name} to hotel:`, activityError)
          } else {
            console.log(`Linked activity: ${activity.name}`)
          }
        }

        successCount++
        console.log(`Successfully created hotel ${hotel.name} with ${selectedThemes.length} themes and ${selectedActivities.length} activities`)
        
      } catch (error) {
        console.error(`Error creating hotel ${hotel.name}:`, error)
      }
    }

    console.log(`Batch creation completed. Successfully created ${successCount} hotels with themes and activities`)

    return new Response(JSON.stringify({
      success: true,
      message: `Successfully created ${successCount} hotels with themes and activities`,
      total: successCount
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('Batch creation error:', error)
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    })
  }
})

// Helper function to get random items from array
function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

// Helper function to get activities that match theme style
function getMatchingActivities(activities: any[], themes: any[]): any[] {
  const themeCategories = themes.map(t => t.category?.toLowerCase() || t.name.toLowerCase())
  const matching = activities.filter(activity => {
    const activityCategory = activity.category?.toLowerCase() || activity.name.toLowerCase()
    return themeCategories.some(tc => 
      activityCategory.includes(tc) || 
      tc.includes(activityCategory) ||
      isRelatedCategory(tc, activityCategory)
    )
  })
  
  // If no direct matches, return a random selection
  return matching.length > 0 ? matching : activities
}

// Helper function to determine if categories are related
function isRelatedCategory(theme: string, activity: string): boolean {
  const relations = {
    'art': ['culture', 'music', 'design', 'creative'],
    'culture': ['art', 'history', 'museum', 'heritage'],
    'nature': ['outdoor', 'adventure', 'sports', 'hiking'],
    'wellness': ['spa', 'fitness', 'yoga', 'health'],
    'food': ['culinary', 'cooking', 'wine', 'dining'],
    'business': ['conference', 'meeting', 'corporate', 'work'],
    'romance': ['couple', 'wedding', 'intimate', 'romantic'],
    'adventure': ['sports', 'outdoor', 'active', 'extreme']
  }
  
  for (const [key, values] of Object.entries(relations)) {
    if (theme.includes(key) && values.some(v => activity.includes(v))) {
      return true
    }
    if (activity.includes(key) && values.some(v => theme.includes(v))) {
      return true
    }
  }
  
  return false
}

// Helper function to generate realistic hotel descriptions
function generateHotelDescriptions(hotel: any) {
  const countryDescriptions = {
    'Spain': {
      base: 'Authentic Spanish hospitality meets modern comfort in this exceptional property.',
      atmosphere: 'Vibrant Mediterranean atmosphere with warm Spanish hospitality',
      idealGuests: 'Culture enthusiasts and travelers seeking authentic Spanish experiences',
      location: 'Perfectly positioned to explore Spain\'s rich cultural heritage and stunning landscapes'
    },
    'Portugal': {
      base: 'Discover the charm of Portugal in this beautifully appointed accommodation.',
      atmosphere: 'Cozy Portuguese charm with modern amenities and local character',
      idealGuests: 'Travelers appreciating Portuguese culture, history, and coastal beauty',
      location: 'Ideally located to experience Portugal\'s historic sites and natural wonders'
    },
    'Italy': {
      base: 'Experience la dolce vita in this elegant Italian retreat.',
      atmosphere: 'Refined Italian elegance with artistic flair and culinary excellence',
      idealGuests: 'Art lovers, history buffs, and culinary enthusiasts',
      location: 'Strategic location for exploring Italy\'s artistic treasures and cultural landmarks'
    },
    'France': {
      base: 'Sophistication and French savoir-vivre define this exceptional establishment.',
      atmosphere: 'Chic French sophistication with attention to detail and refined service',
      idealGuests: 'Discerning travelers seeking French culture, cuisine, and luxury',
      location: 'Prime location for experiencing France\'s cultural richness and gastronomic delights'
    },
    'Germany': {
      base: 'German efficiency meets warm hospitality in this outstanding property.',
      atmosphere: 'Modern German comfort with efficiency and attention to guest satisfaction',
      idealGuests: 'Business travelers and culture seekers exploring German heritage',
      location: 'Excellently positioned for business and leisure exploration of German cities'
    },
    'Netherlands': {
      base: 'Dutch charm and hospitality create an unforgettable stay experience.',
      atmosphere: 'Friendly Dutch hospitality with modern comfort and local character',
      idealGuests: 'Cultural explorers and travelers interested in Dutch art and history',
      location: 'Perfect base for discovering Dutch cultural sites and picturesque landscapes'
    }
  }

  const country = countryDescriptions[hotel.country] || countryDescriptions['Spain']
  
  return {
    description: `${country.base} Located in the beautiful city of ${hotel.city}, this ${hotel.type.toLowerCase()} offers guests an authentic taste of local culture combined with modern comfort and convenience.`,
    idealGuests: country.idealGuests,
    atmosphere: country.atmosphere,
    perfectLocation: `${country.location}. ${hotel.city} provides the perfect backdrop for an extended stay experience.`
  }
}
