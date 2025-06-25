
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Sample hotel data with variations
const sampleHotels = [
  {
    name: "Ocean Breeze Resort",
    description: "A stunning beachfront resort with panoramic ocean views and luxurious amenities.",
    country: "Portugal",
    city: "Lagos",
    address: "Praia da Batata, 8600-315 Lagos",
    price_per_month: 2800,
    property_type: "Resort",
    style: "Modern",
    ideal_guests: "Beach lovers and luxury seekers",
    atmosphere: "Relaxed and sophisticated",
    perfect_location: "Perfect for those seeking tranquil beach vibes with easy access to local attractions"
  },
  {
    name: "Mountain View Lodge",
    description: "Cozy mountain retreat with breathtaking alpine scenery and outdoor adventures.",
    country: "Switzerland",
    city: "Zermatt",
    address: "Bahnhofstrasse 55, 3920 Zermatt",
    price_per_month: 4200,
    property_type: "Lodge",
    style: "Rustic",
    ideal_guests: "Adventure enthusiasts and nature lovers",
    atmosphere: "Cozy and adventurous",
    perfect_location: "Ideal for skiing, hiking, and mountain sports enthusiasts"
  },
  {
    name: "Urban Loft Boutique",
    description: "Contemporary urban accommodation in the heart of the city's cultural district.",
    country: "Spain",
    city: "Barcelona",
    address: "Carrer del Rec, 08003 Barcelona",
    price_per_month: 3200,
    property_type: "Boutique Hotel",
    style: "Contemporary",
    ideal_guests: "Urban explorers and culture enthusiasts",
    atmosphere: "Vibrant and cosmopolitan",
    perfect_location: "Perfect for experiencing city life, museums, and nightlife"
  },
  {
    name: "Countryside Villa",
    description: "Charming countryside villa surrounded by vineyards and rolling hills.",
    country: "Italy",
    city: "Chianti",
    address: "Via del Castello, 50022 Greve in Chianti",
    price_per_month: 3800,
    property_type: "Villa",
    style: "Traditional",
    ideal_guests: "Wine enthusiasts and countryside lovers",
    atmosphere: "Peaceful and authentic",
    perfect_location: "Ideal for wine tours, countryside walks, and authentic Italian experiences"
  },
  {
    name: "Coastal Retreat House",
    description: "Modern coastal house with direct beach access and stunning sunset views.",
    country: "Greece",
    city: "Santorini",
    address: "Oia, 84702 Santorini",
    price_per_month: 4500,
    property_type: "House",
    style: "Mediterranean",
    ideal_guests: "Romantic couples and sunset chasers",
    atmosphere: "Romantic and serene",
    perfect_location: "Perfect for romantic getaways and witnessing famous Santorini sunsets"
  }
];

const countries = ["Portugal", "Spain", "Italy", "Greece", "France", "Croatia", "Malta", "Cyprus"];
const cities = {
  "Portugal": ["Lisbon", "Porto", "Lagos", "Sintra", "Óbidos"],
  "Spain": ["Barcelona", "Madrid", "Seville", "Valencia", "Granada"],
  "Italy": ["Rome", "Florence", "Venice", "Milan", "Naples"],
  "Greece": ["Athens", "Santorini", "Mykonos", "Crete", "Rhodes"],
  "France": ["Paris", "Nice", "Lyon", "Marseille", "Cannes"],
  "Croatia": ["Dubrovnik", "Split", "Zagreb", "Pula", "Hvar"],
  "Malta": ["Valletta", "Sliema", "St. Julian's", "Mdina", "Gozo"],
  "Cyprus": ["Nicosia", "Limassol", "Paphos", "Larnaca", "Ayia Napa"]
};

const propertyTypes = ["Hotel", "Resort", "Villa", "Apartment", "House", "Lodge", "Boutique Hotel"];
const styles = ["Modern", "Traditional", "Contemporary", "Rustic", "Mediterranean", "Classic", "Minimalist"];

function getRandomElement(array: any[]) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateRandomHotel(index: number) {
  const country = getRandomElement(countries);
  const city = getRandomElement(cities[country]);
  const baseHotel = getRandomElement(sampleHotels);
  
  return {
    name: `${baseHotel.name} ${index + 1}`,
    description: baseHotel.description,
    country: country,
    city: city,
    address: `Sample Address ${index + 1}, ${city}`,
    price_per_month: Math.floor(Math.random() * 3000) + 1500, // 1500-4500
    property_type: getRandomElement(propertyTypes),
    style: getRandomElement(styles),
    ideal_guests: baseHotel.ideal_guests,
    atmosphere: baseHotel.atmosphere,
    perfect_location: baseHotel.perfect_location,
    status: 'approved',
    is_featured: Math.random() > 0.8, // 20% chance of being featured
    available_months: getRandomElement([
      ['january', 'february', 'march'],
      ['april', 'may', 'june'],
      ['july', 'august', 'september'],
      ['october', 'november', 'december'],
      ['january', 'april', 'july', 'october']
    ]),
    meal_plans: getRandomElement([
      ['breakfast'],
      ['breakfast', 'dinner'],
      ['all_inclusive'],
      ['breakfast', 'lunch', 'dinner']
    ]),
    stay_lengths: getRandomElement([
      [7, 14, 30],
      [14, 30],
      [30, 60, 90],
      [7, 14, 30, 60]
    ])
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('=== BATCH HOTEL CREATION STARTED ===');
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Parse request body and handle both maxHotels and count parameters
    const requestBody = await req.json();
    console.log('Request body received:', requestBody);
    
    const count = requestBody.maxHotels || requestBody.count;
    console.log('Extracted count:', count);
    
    // Validate count parameter
    if (!count || count < 1 || count > 50) {
      return new Response(
        JSON.stringify({ 
          error: 'Count must be between 1 and 50',
          received: count 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log(`Starting batch creation of ${count} hotels`);

    // Get a default owner (first admin user or create a system user)
    const { data: adminUsers, error: adminError } = await supabase
      .from('admin_users')
      .select('id')
      .limit(1);

    if (adminError) {
      console.error('Error fetching admin users:', adminError);
      throw new Error('Failed to find admin user');
    }

    const ownerId = adminUsers && adminUsers.length > 0 
      ? adminUsers[0].id 
      : '00000000-0000-0000-0000-000000000000'; // fallback system user

    console.log('Using owner ID:', ownerId);

    // Fetch available themes and activities - FIX: Use correct column names
    const { data: themes, error: themesError } = await supabase
      .from('themes')
      .select('id, name')
      .limit(20);

    if (themesError) {
      console.error('Themes error:', themesError);
      throw new Error(`Failed to fetch themes: ${themesError.message}`);
    }

    const { data: activities, error: activitiesError } = await supabase
      .from('activities')
      .select('id, name')
      .limit(20);

    if (activitiesError) {
      console.error('Activities error:', activitiesError);
      throw new Error(`Failed to fetch activities: ${activitiesError.message}`);
    }

    console.log(`Found ${themes?.length || 0} themes and ${activities?.length || 0} activities`);

    const createdHotels = [];
    const errors = [];

    // Create hotels in batches
    for (let i = 0; i < count; i++) {
      try {
        console.log(`Creating hotel ${i + 1}/${count}`);
        
        const hotelData = generateRandomHotel(i);
        console.log(`Generated hotel data:`, hotelData.name);

        // Insert hotel
        const { data: hotel, error: hotelError } = await supabase
          .from('hotels')
          .insert({
            ...hotelData,
            owner_id: ownerId
          })
          .select()
          .single();

        if (hotelError) {
          console.error(`Error creating hotel ${i + 1}:`, hotelError);
          errors.push(`Hotel ${i + 1}: ${hotelError.message}`);
          continue;
        }

        console.log(`Hotel created with ID: ${hotel.id}`);

        // Add random themes (2-4 themes per hotel)
        if (themes && themes.length > 0) {
          const numThemes = Math.floor(Math.random() * 3) + 2; // 2-4 themes
          const selectedThemes = themes
            .sort(() => 0.5 - Math.random())
            .slice(0, numThemes);

          for (const theme of selectedThemes) {
            const { error: themeError } = await supabase
              .from('hotel_themes')
              .insert({
                hotel_id: hotel.id,
                theme_id: theme.id
              });

            if (themeError) {
              console.error(`Error adding theme to hotel ${hotel.id}:`, themeError);
            }
          }
          console.log(`Added ${selectedThemes.length} themes to hotel ${hotel.id}`);
        }

        // Add random activities (2-5 activities per hotel)
        if (activities && activities.length > 0) {
          const numActivities = Math.floor(Math.random() * 4) + 2; // 2-5 activities
          const selectedActivities = activities
            .sort(() => 0.5 - Math.random())
            .slice(0, numActivities);

          for (const activity of selectedActivities) {
            const { error: activityError } = await supabase
              .from('hotel_activities')
              .insert({
                hotel_id: hotel.id,
                activity_id: activity.id
              });

            if (activityError) {
              console.error(`Error adding activity to hotel ${hotel.id}:`, activityError);
            }
          }
          console.log(`Added ${selectedActivities.length} activities to hotel ${hotel.id}`);
        }

        createdHotels.push({
          id: hotel.id,
          name: hotel.name,
          country: hotel.country,
          city: hotel.city
        });

        // Small delay to prevent overwhelming the database
        await new Promise(resolve => setTimeout(resolve, 100));

      } catch (error) {
        console.error(`Error in hotel creation loop ${i + 1}:`, error);
        errors.push(`Hotel ${i + 1}: ${error.message}`);
      }
    }

    console.log('=== BATCH HOTEL CREATION COMPLETED ===');
    console.log(`Successfully created: ${createdHotels.length}/${count} hotels`);
    if (errors.length > 0) {
      console.log(`Errors encountered: ${errors.length}`);
      console.log('Errors:', errors);
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: `Successfully created ${createdHotels.length} out of ${count} hotels`,
        created_hotels: createdHotels,
        errors: errors.length > 0 ? errors : undefined
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Batch hotel creation error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'An error occurred during batch creation',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
