
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

// Real hotel data by country
const HOTEL_DATA = {
  "Austria": [
    { name: "Hotel Sacher Wien", city: "Vienna", lat: 48.2038, lng: 16.3697 },
    { name: "Hotel Imperial Vienna", city: "Vienna", lat: 48.2016, lng: 16.3731 },
    { name: "Grand Hotel Europa", city: "Salzburg", lat: 47.8021, lng: 13.0474 }
  ],
  "Belgium": [
    { name: "Hotel des Galeries", city: "Brussels", lat: 50.8476, lng: 4.3572 },
    { name: "Hotel Dukes' Palace", city: "Bruges", lat: 51.2093, lng: 3.2247 },
    { name: "Hotel Julien", city: "Antwerp", lat: 51.2194, lng: 4.4025 }
  ],
  "Canada": [
    { name: "Fairmont Chateau Lake Louise", city: "Lake Louise", lat: 51.4254, lng: -116.2073 },
    { name: "Hotel Le St-James", city: "Montreal", lat: 45.5017, lng: -73.5673 },
    { name: "Shangri-La Toronto", city: "Toronto", lat: 43.6532, lng: -79.3832 }
  ],
  "Denmark": [
    { name: "Hotel d'Angleterre", city: "Copenhagen", lat: 55.6761, lng: 12.5683 },
    { name: "Copenhagen Admiral Hotel", city: "Copenhagen", lat: 55.6837, lng: 12.5920 },
    { name: "Hotel Nimb", city: "Copenhagen", lat: 55.6738, lng: 12.5681 }
  ],
  "Finland": [
    { name: "Hotel Kämp", city: "Helsinki", lat: 60.1699, lng: 24.9384 },
    { name: "Hotel Torni", city: "Helsinki", lat: 60.1675, lng: 24.9427 },
    { name: "Scandic Tampere City", city: "Tampere", lat: 61.4978, lng: 23.7610 }
  ],
  "France": [
    { name: "Hotel Ritz Paris", city: "Paris", lat: 48.8684, lng: 2.3293 },
    { name: "Hotel Martinez", city: "Cannes", lat: 43.5504, lng: 7.0174 },
    { name: "Hotel Villa Florentine", city: "Lyon", lat: 45.7640, lng: 4.8357 }
  ],
  "Germany": [
    { name: "Hotel Adlon Kempinski", city: "Berlin", lat: 52.5162, lng: 13.3777 },
    { name: "Hotel Vier Jahreszeiten", city: "Munich", lat: 48.1394, lng: 11.5770 },
    { name: "Steigenberger Frankfurter Hof", city: "Frankfurt", lat: 50.1109, lng: 8.6821 }
  ],
  "Greece": [
    { name: "Hotel Grande Bretagne", city: "Athens", lat: 37.9755, lng: 23.7348 },
    { name: "Mystique Hotel", city: "Santorini", lat: 36.4138, lng: 25.4303 },
    { name: "Blue Palace Resort", city: "Crete", lat: 35.3387, lng: 25.7208 }
  ],
  "Hungary": [
    { name: "Four Seasons Gresham Palace", city: "Budapest", lat: 47.4979, lng: 19.0402 },
    { name: "Aria Hotel Budapest", city: "Budapest", lat: 47.4979, lng: 19.0402 },
    { name: "Hotel Moments", city: "Budapest", lat: 47.4956, lng: 19.0598 }
  ],
  "Iceland": [
    { name: "Hotel Borg", city: "Reykjavik", lat: 64.1466, lng: -21.9426 },
    { name: "Canopy by Hilton", city: "Reykjavik", lat: 64.1436, lng: -21.9270 },
    { name: "Hotel Rangá", city: "Hella", lat: 63.8319, lng: -20.4014 }
  ],
  "Ireland": [
    { name: "The Shelbourne", city: "Dublin", lat: 53.3398, lng: -6.2603 },
    { name: "Ashford Castle", city: "Cong", lat: 53.5444, lng: -9.3056 },
    { name: "The Europe Hotel", city: "Killarney", lat: 52.0599, lng: -9.5044 }
  ],
  "Italy": [
    { name: "Hotel Danieli", city: "Venice", lat: 45.4335, lng: 12.3410 },
    { name: "Hotel de Russie", city: "Rome", lat: 41.9109, lng: 12.4818 },
    { name: "Villa San Michele", city: "Florence", lat: 43.7696, lng: 11.2558 }
  ],
  "Japan": [
    { name: "The Ritz-Carlton Tokyo", city: "Tokyo", lat: 35.6762, lng: 139.6503 },
    { name: "Park Hyatt Tokyo", city: "Tokyo", lat: 35.6938, lng: 139.7034 },
    { name: "Hoshinoya Kyoto", city: "Kyoto", lat: 35.0116, lng: 135.7681 }
  ],
  "Luxembourg": [
    { name: "Hotel Le Royal", city: "Luxembourg City", lat: 49.6116, lng: 6.1319 },
    { name: "Sofitel Luxembourg Europe", city: "Luxembourg City", lat: 49.6269, lng: 6.1777 },
    { name: "Grand Hotel Cravat", city: "Luxembourg City", lat: 49.6117, lng: 6.1300 }
  ],
  "Netherlands": [
    { name: "Waldorf Astoria Amsterdam", city: "Amsterdam", lat: 52.3676, lng: 4.8923 },
    { name: "Hotel De L'Europe", city: "Amsterdam", lat: 52.3676, lng: 4.8923 },
    { name: "Hotel New York", city: "Rotterdam", lat: 51.9058, lng: 4.4853 }
  ],
  "Norway": [
    { name: "Hotel Continental", city: "Oslo", lat: 59.9139, lng: 10.7522 },
    { name: "Hotel Union Øye", city: "Norangsfjord", lat: 62.1774, lng: 7.2076 },
    { name: "Scandic Bergen City", city: "Bergen", lat: 60.3913, lng: 5.3221 }
  ],
  "Poland": [
    { name: "Hotel Europejski", city: "Warsaw", lat: 52.2297, lng: 21.0122 },
    { name: "Hotel Copernicus", city: "Krakow", lat: 50.0647, lng: 19.9450 },
    { name: "Hotel Monopol", city: "Wroclaw", lat: 51.1079, lng: 17.0385 }
  ],
  "Portugal": [
    { name: "Pestana Palace", city: "Lisbon", lat: 38.7223, lng: -9.1393 },
    { name: "The Yeatman", city: "Porto", lat: 41.1579, lng: -8.6291 },
    { name: "Belmond Reid's Palace", city: "Funchal", lat: 32.6669, lng: -16.9241 }
  ],
  "Romania": [
    { name: "JW Marriott Bucharest", city: "Bucharest", lat: 44.4268, lng: 26.1025 },
    { name: "Grand Hotel Italia", city: "Cluj-Napoca", lat: 46.7712, lng: 23.6236 },
    { name: "Hotel Alexandros", city: "Brasov", lat: 45.6579, lng: 25.6012 }
  ],
  "Sweden": [
    { name: "Grand Hôtel Stockholm", city: "Stockholm", lat: 59.3293, lng: 18.0686 },
    { name: "Hotel Pigalle", city: "Gothenburg", lat: 57.7089, lng: 11.9746 },
    { name: "Elite Hotel Marina Tower", city: "Stockholm", lat: 59.3293, lng: 18.0686 }
  ],
  "Switzerland": [
    { name: "Badrutt's Palace Hotel", city: "St. Moritz", lat: 46.4908, lng: 9.8355 },
    { name: "The Dolder Grand", city: "Zurich", lat: 47.3769, lng: 8.5417 },
    { name: "Hotel des Trois Couronnes", city: "Vevey", lat: 46.4634, lng: 6.8426 }
  ],
  "Thailand": [
    { name: "Mandarin Oriental Bangkok", city: "Bangkok", lat: 13.7563, lng: 100.5018 },
    { name: "Four Seasons Resort Chiang Mai", city: "Chiang Mai", lat: 18.7883, lng: 98.9853 },
    { name: "Banyan Tree Phuket", city: "Phuket", lat: 7.8804, lng: 98.3923 }
  ],
  "Turkey": [
    { name: "Four Seasons Sultanahmet", city: "Istanbul", lat: 41.0082, lng: 28.9784 },
    { name: "Çırağan Palace Kempinski", city: "Istanbul", lat: 41.0473, lng: 29.0436 },
    { name: "Museum Hotel", city: "Cappadocia", lat: 38.6431, lng: 34.8322 }
  ],
  "United Kingdom": [
    { name: "The Savoy", city: "London", lat: 51.5074, lng: -0.1278 },
    { name: "The Langham", city: "London", lat: 51.5155, lng: -0.1426 },
    { name: "The Balmoral", city: "Edinburgh", lat: 55.9533, lng: -3.1883 }
  ]
}

// Randomization data
const PROPERTY_TYPES = ["hotel", "resort", "boutique hotel", "luxury hotel"];
const STYLES = ["classic", "modern", "boutique", "luxury", "contemporary"];
const MEAL_PLANS = ["breakfast only", "half board", "full board", "all inclusive"];
const ROOM_TYPES = ["single", "double", "twin", "suite", "deluxe"];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomPrice(): number {
  return Math.floor(Math.random() * (1600 - 1200 + 1)) + 1200;
}

function getRandomCategory(): number {
  return Math.floor(Math.random() * 2) + 3; // 3 or 4 stars
}

function generateDescription(hotelName: string, city: string, country: string): string {
  const templates = [
    `Experience luxury and comfort at ${hotelName}, perfectly located in the heart of ${city}, ${country}. Our hotel offers exceptional service and modern amenities.`,
    `Discover the elegance of ${hotelName}, a distinguished hotel in ${city}, ${country}. Enjoy premium accommodations with stunning views and world-class facilities.`,
    `Welcome to ${hotelName}, your perfect retreat in ${city}, ${country}. We combine traditional hospitality with contemporary luxury for an unforgettable stay.`
  ];
  return getRandomElement(templates);
}

async function createHotelForCountry(country: string, hotelData: any, ownerId: string) {
  const basePrice = getRandomPrice();
  
  // Create basic hotel record
  const hotelRecord = {
    owner_id: ownerId,
    name: hotelData.name,
    description: generateDescription(hotelData.name, hotelData.city, country),
    country: country,
    city: hotelData.city,
    address: `${hotelData.name}, ${hotelData.city}, ${country}`,
    latitude: hotelData.lat,
    longitude: hotelData.lng,
    price_per_month: basePrice,
    category: getRandomCategory(),
    property_type: getRandomElement(PROPERTY_TYPES),
    style: getRandomElement(STYLES),
    ideal_guests: "Travelers seeking comfort and authentic experiences",
    atmosphere: "Welcoming and sophisticated",
    perfect_location: `Perfect for exploring ${hotelData.city} and its surroundings`,
    meal_plans: [getRandomElement(MEAL_PLANS)],
    room_types: [{
      name: getRandomElement(ROOM_TYPES),
      basePrice: basePrice,
      rates: { 7: basePrice, 14: Math.floor(basePrice * 0.9), 30: Math.floor(basePrice * 0.8) }
    }],
    stay_lengths: [7, 14, 30],
    features_hotel: {
      "wifi": true,
      "parking": true,
      "restaurant": true,
      "bar": Math.random() > 0.5,
      "spa": Math.random() > 0.6,
      "gym": Math.random() > 0.4,
      "pool": Math.random() > 0.7
    },
    features_room: {
      "air_conditioning": true,
      "tv": true,
      "minibar": Math.random() > 0.5,
      "safe": true,
      "balcony": Math.random() > 0.6
    },
    enable_price_increase: true,
    price_increase_cap: 20,
    available_months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    status: 'approved'
  };

  const { data, error } = await supabase
    .from('hotels')
    .insert(hotelRecord)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create hotel ${hotelData.name}: ${error.message}`);
  }

  return data;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { countries, hotelsPerCountry } = await req.json();
    
    console.log(`Starting batch hotel creation for ${countries.length} countries, ${hotelsPerCountry} hotels each`);
    
    // Get a default owner (first admin user or create a system user)
    const { data: adminUser } = await supabase
      .from('admin_users')
      .select('id')
      .limit(1)
      .single();
    
    const ownerId = adminUser?.id || '00000000-0000-0000-0000-000000000000';
    
    const stats = {
      totalCountries: countries.length,
      processedCountries: 0,
      hotelsCreated: 0,
      errors: [] as string[],
      countryProgress: {} as { [key: string]: number }
    };

    // Process each country
    for (const country of countries) {
      try {
        console.log(`Processing country: ${country}`);
        const countryHotels = HOTEL_DATA[country as keyof typeof HOTEL_DATA] || [];
        
        let hotelsCreatedForCountry = 0;
        
        // Create hotels for this country
        for (let i = 0; i < Math.min(hotelsPerCountry, countryHotels.length); i++) {
          try {
            await createHotelForCountry(country, countryHotels[i], ownerId);
            hotelsCreatedForCountry++;
            stats.hotelsCreated++;
          } catch (error) {
            console.error(`Error creating hotel for ${country}:`, error);
            stats.errors.push(`${country}: ${error.message}`);
          }
        }
        
        stats.countryProgress[country] = hotelsCreatedForCountry;
        stats.processedCountries++;
        
        console.log(`Completed ${country}: ${hotelsCreatedForCountry} hotels created`);
        
      } catch (error) {
        console.error(`Error processing country ${country}:`, error);
        stats.errors.push(`${country}: Failed to process country - ${error.message}`);
      }
    }

    console.log(`Batch creation completed. Total hotels created: ${stats.hotelsCreated}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        stats 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Batch hotel creation error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Batch hotel creation failed', 
        details: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
