
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Authorized countries with their major cities and coordinates
const AUTHORIZED_LOCATIONS = {
  'Poland': {
    cities: ['Warsaw', 'Krakow', 'Gdansk', 'Wroclaw', 'Poznan'],
    coords: { lat: [49.0, 54.8], lng: [14.1, 24.1] }
  },
  'Hungary': {
    cities: ['Budapest', 'Debrecen', 'Szeged', 'Miskolc', 'Pecs'],
    coords: { lat: [45.7, 48.6], lng: [16.1, 22.9] }
  },
  'Romania': {
    cities: ['Bucharest', 'Cluj-Napoca', 'Timisoara', 'Iasi', 'Constanta'],
    coords: { lat: [43.6, 48.3], lng: [20.2, 29.7] }
  },
  'Canada': {
    cities: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa'],
    coords: { lat: [41.7, 83.1], lng: [-141.0, -52.6] }
  },
  'Ireland': {
    cities: ['Dublin', 'Cork', 'Limerick', 'Galway', 'Waterford'],
    coords: { lat: [51.4, 55.4], lng: [-10.5, -5.9] }
  },
  'Germany': {
    cities: ['Berlin', 'Munich', 'Hamburg', 'Cologne', 'Frankfurt'],
    coords: { lat: [47.3, 55.1], lng: [5.9, 15.0] }
  },
  'Portugal': {
    cities: ['Lisbon', 'Porto', 'Braga', 'Coimbra', 'Faro'],
    coords: { lat: [36.9, 42.2], lng: [-9.5, -6.2] }
  },
  'Belgium': {
    cities: ['Brussels', 'Antwerp', 'Ghent', 'Charleroi', 'Liege'],
    coords: { lat: [49.5, 51.5], lng: [2.5, 6.4] }
  },
  'Netherlands': {
    cities: ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht', 'Eindhoven'],
    coords: { lat: [50.8, 53.6], lng: [3.4, 7.2] }
  },
  'Luxembourg': {
    cities: ['Luxembourg City', 'Esch-sur-Alzette', 'Differdange', 'Dudelange'],
    coords: { lat: [49.4, 50.2], lng: [5.7, 6.5] }
  },
  'Switzerland': {
    cities: ['Zurich', 'Geneva', 'Basel', 'Bern', 'Lausanne'],
    coords: { lat: [45.8, 47.8], lng: [5.9, 10.5] }
  },
  'Austria': {
    cities: ['Vienna', 'Salzburg', 'Innsbruck', 'Graz', 'Linz'],
    coords: { lat: [46.4, 49.0], lng: [9.5, 17.2] }
  },
  'Denmark': {
    cities: ['Copenhagen', 'Aarhus', 'Odense', 'Aalborg', 'Esbjerg'],
    coords: { lat: [54.6, 57.7], lng: [8.1, 15.2] }
  },
  'Norway': {
    cities: ['Oslo', 'Bergen', 'Trondheim', 'Stavanger', 'Kristiansand'],
    coords: { lat: [58.0, 71.2], lng: [4.6, 31.3] }
  },
  'Sweden': {
    cities: ['Stockholm', 'Gothenburg', 'Malmo', 'Uppsala', 'Vasteras'],
    coords: { lat: [55.3, 69.1], lng: [11.0, 24.2] }
  },
  'Greece': {
    cities: ['Athens', 'Thessaloniki', 'Patras', 'Heraklion', 'Rhodes'],
    coords: { lat: [34.8, 41.7], lng: [19.4, 29.6] }
  },
  'Finland': {
    cities: ['Helsinki', 'Espoo', 'Tampere', 'Vantaa', 'Turku'],
    coords: { lat: [59.8, 70.1], lng: [19.1, 31.6] }
  },
  'Iceland': {
    cities: ['Reykjavik', 'Kopavogur', 'Hafnarfjordur', 'Akureyri'],
    coords: { lat: [63.4, 66.6], lng: [-24.5, -13.5] }
  },
  'France': {
    cities: ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice'],
    coords: { lat: [41.3, 51.1], lng: [-5.1, 9.6] }
  },
  'United Kingdom': {
    cities: ['London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow'],
    coords: { lat: [49.9, 60.8], lng: [-8.2, 1.8] }
  },
  'Turkey': {
    cities: ['Istanbul', 'Ankara', 'Izmir', 'Bursa', 'Antalya'],
    coords: { lat: [35.8, 42.1], lng: [25.7, 44.8] }
  },
  'Thailand': {
    cities: ['Bangkok', 'Chiang Mai', 'Phuket', 'Pattaya', 'Hua Hin'],
    coords: { lat: [5.6, 20.5], lng: [97.3, 105.6] }
  },
  'Japan': {
    cities: ['Tokyo', 'Osaka', 'Kyoto', 'Yokohama', 'Nagoya'],
    coords: { lat: [24.2, 45.5], lng: [122.9, 153.9] }
  }
};

// Simple hotel names without luxury terms
const SIMPLE_HOTEL_NAMES = [
  'City Hotel', 'Central Hotel', 'Park Hotel', 'Garden Hotel', 'Station Hotel',
  'Plaza Hotel', 'Express Hotel', 'Business Hotel', 'Comfort Hotel', 'Grand Hotel',
  'International Hotel', 'Metropolitan Hotel', 'Continental Hotel', 'Europa Hotel',
  'Atlantic Hotel', 'Pacific Hotel', 'Royal Hotel', 'Imperial Hotel', 'Crown Hotel',
  'Diamond Hotel', 'Golden Hotel', 'Silver Hotel', 'Blue Hotel', 'Green Hotel'
];

// Property types from the filter system
const PROPERTY_TYPES = ['Hotel', 'Boutique Hotel', 'Motel', 'Inn'];

// Property styles from the filter system
const PROPERTY_STYLES = ['Classic', 'Classic Elegant', 'Modern', 'Fusion', 'Urban', 'Minimalist'];

// Hotel features from the system
const HOTEL_FEATURES = [
  'WiFi Gratis', 'Estacionamiento', 'Restaurante', 'Piscina', 'Gimnasio', 
  'Recepción 24/7', 'Servicio de Habitaciones', 'Bar', 'Salón', 
  'Centro de Negocios', 'Servicio de Lavandería', 'Conserjería', 
  'Traslado al Aeropuerto', 'Jardín', 'Terraza', 'Centro de Fitness'
];

// Room features from the system
const ROOM_FEATURES = [
  'Aire Acondicionado', 'Baño Privado', 'Televisor', 'Caja Fuerte', 'Mini Bar', 
  'Máquina de Café', 'Hervidor de Agua', 'Secador de Pelo', 'Plancha', 'Escritorio',
  'Balcón', 'Internet de Alta Velocidad', 'Cortinas Opacas', 'Servicio de Habitaciones'
];

function getRandomLocation() {
  const countries = Object.keys(AUTHORIZED_LOCATIONS);
  const country = countries[Math.floor(Math.random() * countries.length)];
  const locationData = AUTHORIZED_LOCATIONS[country];
  const city = locationData.cities[Math.floor(Math.random() * locationData.cities.length)];
  
  // Generate coordinates within the country's bounds
  const lat = locationData.coords.lat[0] + 
    Math.random() * (locationData.coords.lat[1] - locationData.coords.lat[0]);
  const lng = locationData.coords.lng[0] + 
    Math.random() * (locationData.coords.lng[1] - locationData.coords.lng[0]);
  
  return { country, city, lat, lng };
}

function generateHotelName(city: string) {
  const baseName = SIMPLE_HOTEL_NAMES[Math.floor(Math.random() * SIMPLE_HOTEL_NAMES.length)];
  return `${city} ${baseName}`;
}

function getRandomFeatures(featureList: string[], min: number, max: number) {
  const shuffled = [...featureList].sort(() => 0.5 - Math.random());
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  return shuffled.slice(0, count).reduce((acc, feature) => {
    acc[feature] = true;
    return acc;
  }, {} as Record<string, boolean>);
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { count = 20 } = await req.json();
    
    console.log(`=== BATCH HOTEL CREATION STARTED ===`);
    console.log(`Creating ${count} compliant hotels`);

    // Fetch themes and activities from database
    const { data: themes } = await supabaseClient
      .from('themes')
      .select('id, name')
      .limit(50);
    
    const { data: activities } = await supabaseClient
      .from('activities')  
      .select('id, name')
      .limit(50);

    if (!themes || !activities) {
      throw new Error('Failed to fetch themes or activities');
    }

    const createdHotels = [];
    const errors = [];

    for (let i = 1; i <= count; i++) {
      try {
        console.log(`Creating compliant hotel ${i}/${count}`);
        
        const location = getRandomLocation();
        const hotelName = generateHotelName(location.city);
        
        // Only 3 or 4 stars allowed
        const category = Math.random() < 0.5 ? 3 : 4;
        
        const hotelData = {
          name: hotelName,
          description: `A comfortable ${category}-star hotel located in ${location.city}, ${location.country}. Perfect for business and leisure travelers seeking quality accommodation.`,
          country: location.country,
          city: location.city,
          address: `${Math.floor(Math.random() * 999) + 1} Main Street, ${location.city}`,
          property_type: PROPERTY_TYPES[Math.floor(Math.random() * PROPERTY_TYPES.length)],
          style: PROPERTY_STYLES[Math.floor(Math.random() * PROPERTY_STYLES.length)],
          price_per_month: Math.floor(Math.random() * 1500) + 1000, // 1000-2500 range
          category: category,
          latitude: location.lat,
          longitude: location.lng,
          status: 'approved',
          // Required fixed values
          stay_lengths: [32], // Only 32-day stays
          meal_plans: ['half board'], // Only half board
          room_types: [{ // Only double rooms
            id: crypto.randomUUID(),
            name: 'double',
            description: 'Double room with comfortable accommodation',
            maxOccupancy: 2,
            size: 25,
            roomCount: Math.floor(Math.random() * 20) + 10,
            basePrice: Math.floor(Math.random() * 150) + 80,
            rates: { 32: Math.floor(Math.random() * 150) + 80 }
          }],
          // Features from approved lists
          features_hotel: getRandomFeatures(HOTEL_FEATURES, 3, 8),
          features_room: getRandomFeatures(ROOM_FEATURES, 3, 6),
          // Additional required fields
          available_months: ['january', 'february', 'march', 'april', 'may', 'june', 
                           'july', 'august', 'september', 'october', 'november', 'december'],
          preferredWeekday: 'Monday',
          enable_price_increase: false,
          price_increase_cap: 0
        };

        console.log(`Generated compliant hotel data: ${hotelData.name} (${category} stars)`);

        // Insert hotel
        const { data: hotel, error: hotelError } = await supabaseClient
          .from('hotels')
          .insert(hotelData)
          .select()
          .single();

        if (hotelError) throw hotelError;
        
        console.log(`Hotel created with ID: ${hotel.id}`);

        // Add random themes (2-4 themes per hotel)
        const randomThemes = themes
          .sort(() => 0.5 - Math.random())
          .slice(0, Math.floor(Math.random() * 3) + 2);

        const themeInserts = randomThemes.map(theme => ({
          hotel_id: hotel.id,
          theme_id: theme.id
        }));

        const { error: themesError } = await supabaseClient
          .from('hotel_themes')
          .insert(themeInserts);

        if (themesError) throw themesError;
        console.log(`Added ${randomThemes.length} themes to hotel ${hotel.id}`);

        // Add random activities (2-5 activities per hotel)
        const randomActivities = activities
          .sort(() => 0.5 - Math.random())
          .slice(0, Math.floor(Math.random() * 4) + 2);

        const activityInserts = randomActivities.map(activity => ({
          hotel_id: hotel.id,
          activity_id: activity.id
        }));

        const { error: activitiesError } = await supabaseClient
          .from('hotel_activities')
          .insert(activityInserts);

        if (activitiesError) throw activitiesError;
        console.log(`Added ${randomActivities.length} activities to hotel ${hotel.id}`);

        createdHotels.push({
          id: hotel.id,
          name: hotel.name,
          city: hotel.city,
          country: hotel.country,
          category: hotel.category
        });

      } catch (error) {
        console.error(`Error creating hotel ${i}:`, error);
        errors.push(`Hotel ${i}: ${error.message}`);
      }
    }

    console.log(`=== BATCH HOTEL CREATION COMPLETED ===`);
    console.log(`Successfully created: ${createdHotels.length}/${count} compliant hotels`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully created ${createdHotels.length} compliant hotels`,
        stats: {
          totalCreated: createdHotels.length,
          errors: errors,
          hotelDetails: createdHotels
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Batch hotel creation failed:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        message: 'An error occurred during batch hotel creation',
        stats: {
          totalCreated: 0,
          errors: [error.message],
          hotelDetails: []
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
