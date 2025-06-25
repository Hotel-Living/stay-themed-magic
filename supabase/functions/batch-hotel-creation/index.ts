import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const REAL_HOTELS = [
  {
    name: "Hotel Boutique Casa de la Cultura",
    address: "Calle 8 #15-45, Zona Rosa",
    city: "Bogotá",
    country: "Colombia",
    description: "Elegant boutique hotel in the heart of Zona Rosa with contemporary Colombian design and personalized service."
  },
  {
    name: "The Merchant Hotel",
    address: "16 Skipper Street",
    city: "Belfast",
    country: "United Kingdom",
    description: "Luxurious Victorian hotel in Belfast's Cathedral Quarter, featuring opulent interiors and world-class dining."
  },
  {
    name: "Palacio de los Duques Gran Meliá",
    address: "Cuesta de Santo Domingo 5",
    city: "Madrid",
    country: "Spain",
    description: "Historic palace turned luxury hotel near the Royal Palace, blending heritage with modern sophistication."
  },
  {
    name: "Hotel Nacional",
    address: "Calle O esq. a 21",
    city: "Havana",
    country: "Cuba",
    description: "Iconic Art Deco hotel overlooking the Malecón, steeped in Cuban history and Old World charm."
  },
  {
    name: "Tivoli Oriente",
    address: "Av. Dom João II, Lote 1.07.1.1",
    city: "Lisbon",
    country: "Portugal",
    description: "Modern hotel in Parque das Nações with contemporary design and views of the Tagus River."
  },
  {
    name: "Hotel Fasano Salvador",
    address: "Rua Luis Viana Filho, s/n",
    city: "Salvador",
    country: "Brazil",
    description: "Sophisticated beachfront hotel combining Italian elegance with Brazilian warmth in Bahia."
  },
  {
    name: "Casa Gangotena",
    address: "Bolívar 594 y Cuenca",
    city: "Quito",
    country: "Ecuador",
    description: "Restored colonial mansion turned boutique hotel in Quito's historic center with Andean mountain views."
  },
  {
    name: "Hotel Roma",
    address: "Via Veneto 125",
    city: "Rome",
    country: "Italy",
    description: "Classic Roman hotel on the famous Via Veneto, offering timeless elegance and proximity to major attractions."
  },
  {
    name: "Château de la Chèvre d'Or",
    address: "Rue du Barri",
    city: "Èze",
    country: "France",
    description: "Medieval village hotel perched on the French Riviera with breathtaking Mediterranean views."
  },
  {
    name: "The Principal Madrid",
    address: "Marqués de Valdeiglesias 1",
    city: "Madrid",
    country: "Spain",
    description: "Contemporary luxury hotel in a restored 1917 building, perfectly located in Madrid's cultural district."
  }
];

const AUTHORIZED_COUNTRIES = [
  "Spain", "Portugal", "France", "Italy", "Germany", "United Kingdom", 
  "Netherlands", "Belgium", "Austria", "Switzerland", "Greece", "Poland",
  "Brazil", "Colombia", "Mexico", "Chile", "Argentina", "Peru", "Ecuador",
  "Costa Rica", "Uruguay"
];

const LUXURY_BRANDS = [
  "Four Seasons", "Ritz-Carlton", "St. Regis", "Waldorf Astoria", "Conrad",
  "Park Hyatt", "Grand Hyatt", "Mandarin Oriental", "Peninsula", "Shangri-La",
  "Aman", "Rosewood", "Auberge", "Belmond", "Orient-Express", "EDITION",
  "W Hotels", "Le Labo", "1 Hotels", "SLS", "Thompson", "Andaz",
  "Jumeirah", "Kempinski", "Raffles", "Fairmont", "Sofitel", "Pullman",
  "InterContinental", "Crowne Plaza", "Holiday Inn", "Marriott", "Sheraton",
  "Westin", "Renaissance", "Courtyard", "Residence Inn", "SpringHill Suites",
  "Hilton", "DoubleTree", "Embassy Suites", "Hampton Inn", "Homewood Suites"
];

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateRandomPrice(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isLuxuryBrand(hotelName: string): boolean {
  return LUXURY_BRANDS.some(brand => 
    hotelName.toLowerCase().includes(brand.toLowerCase())
  );
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { count } = await req.json();
    
    if (!count || count < 1 || count > 50) {
      throw new Error('Count must be between 1 and 50');
    }

    console.log(`Starting batch creation of ${count} hotels`);

    // Fetch themes for random assignment
    const { data: themes, error: themesError } = await supabase
      .from('themes')
      .select('id, name_en')
      .limit(100);

    if (themesError) {
      throw new Error(`Failed to fetch themes: ${themesError.message}`);
    }

    // Fetch activities for random assignment
    const { data: activities, error: activitiesError } = await supabase
      .from('activities')
      .select('id, name_en')
      .limit(100);

    if (activitiesError) {
      throw new Error(`Failed to fetch activities: ${activitiesError.message}`);
    }

    // Fetch features for random assignment
    const { data: features, error: featuresError } = await supabase
      .from('features')
      .select('id, name_en')
      .limit(100);

    if (featuresError) {
      throw new Error(`Failed to fetch features: ${featuresError.message}`);
    }

    const createdHotels = [];

    for (let i = 0; i < count; i++) {
      // Select a random real hotel
      const randomHotel = REAL_HOTELS[Math.floor(Math.random() * REAL_HOTELS.length)];
      
      // Skip if country not authorized or is luxury brand
      if (!AUTHORIZED_COUNTRIES.includes(randomHotel.country) || 
          isLuxuryBrand(randomHotel.name)) {
        console.log(`Skipping ${randomHotel.name} - unauthorized country or luxury brand`);
        continue;
      }

      const stars = getRandomInt(3, 4);
      const pricePerNight = generateRandomPrice(1200, 1600);
      const totalPrice = pricePerNight * 32;

      // Random themes (1-3)
      const selectedThemes = getRandomItems(themes || [], getRandomInt(1, 3));
      
      // Random activities (3-5) - UPDATED FROM 1-3 TO 3-5
      const selectedActivities = getRandomItems(activities || [], getRandomInt(3, 5));
      
      // Random features for hotel (8-15)
      const selectedHotelFeatures = getRandomItems(features || [], getRandomInt(8, 15));
      
      // Random features for room (6-12)
      const selectedRoomFeatures = getRandomItems(features || [], getRandomInt(6, 12));

      // Create hotel
      const { data: hotel, error: hotelError } = await supabase
        .from('hotels')
        .insert({
          name: randomHotel.name,
          description: randomHotel.description,
          address: randomHotel.address,
          city: randomHotel.city,
          country: randomHotel.country,
          postal_code: `${getRandomInt(10000, 99999)}`,
          phone: `+${getRandomInt(100, 999)}-${getRandomInt(1000000, 9999999)}`,
          email: `info@${randomHotel.name.toLowerCase().replace(/\s/g, '')}.com`,
          website: `https://www.${randomHotel.name.toLowerCase().replace(/\s/g, '')}.com`,
          stars: stars,
          total_price: totalPrice,
          price_per_night: pricePerNight,
          available_months: ['january', 'february', 'march', 'april', 'may', 'june'],
          length_of_stay: '32 days',
          property_type: 'Hotel',
          property_style: 'Boutique',
          meal_plan: 'Half Board',
          terms_accepted: true,
          dynamic_pricing_enabled: true,
          status: 'approved'
        })
        .select()
        .single();

      if (hotelError) {
        console.error(`Failed to create hotel ${randomHotel.name}:`, hotelError);
        continue;
      }

      console.log(`Created hotel: ${hotel.name} (ID: ${hotel.id})`);

      // Create room type
      const { data: roomType, error: roomError } = await supabase
        .from('room_types')
        .insert({
          hotel_id: hotel.id,
          name: 'Double',
          description: 'Comfortable double room with modern amenities and city views. Perfect for couples or business travelers seeking comfort and convenience.',
          capacity: 2,
          price_per_night: pricePerNight,
          room_count: getRandomInt(1, 3)
        })
        .select()
        .single();

      if (roomError) {
        console.error(`Failed to create room type for hotel ${hotel.id}:`, roomError);
        continue;
      }

      // Create relationships
      const relationshipPromises = [];

      // Hotel themes
      if (selectedThemes.length > 0) {
        const hotelThemes = selectedThemes.map(theme => ({ hotel_id: hotel.id, theme_id: theme.id }));
        relationshipPromises.push(
          supabase.from('hotel_themes').insert(hotelThemes)
        );
      }

      // Hotel activities
      if (selectedActivities.length > 0) {
        const hotelActivities = selectedActivities.map(activity => ({ hotel_id: hotel.id, activity_id: activity.id }));
        relationshipPromises.push(
          supabase.from('hotel_activities').insert(hotelActivities)
        );
      }

      // Hotel features
      if (selectedHotelFeatures.length > 0) {
        const hotelFeatures = selectedHotelFeatures.map(feature => ({ hotel_id: hotel.id, feature_id: feature.id }));
        relationshipPromises.push(
          supabase.from('hotel_features').insert(hotelFeatures)
        );
      }

      // Room features
      if (selectedRoomFeatures.length > 0) {
        const roomFeatures = selectedRoomFeatures.map(feature => ({ room_type_id: roomType.id, feature_id: feature.id }));
        relationshipPromises.push(
          supabase.from('room_type_features').insert(roomFeatures)
        );
      }

      // Execute all relationship insertions
      await Promise.all(relationshipPromises);

      createdHotels.push({
        id: hotel.id,
        name: hotel.name,
        city: hotel.city,
        country: hotel.country,
        themes: selectedThemes.length,
        activities: selectedActivities.length,
        hotel_features: selectedHotelFeatures.length,
        room_features: selectedRoomFeatures.length
      });
    }

    console.log(`Batch creation completed. Created ${createdHotels.length} hotels.`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully created ${createdHotels.length} hotels`,
        hotels: createdHotels
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Batch hotel creation error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Unknown error occurred'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
