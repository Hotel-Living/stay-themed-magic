
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface RealHotel {
  name: string;
  street: string;
  city: string;
  country: string;
  postal_code: string;
  latitude: number;
  longitude: number;
  category: 3 | 4; // Only 3 or 4 star
}

// Real 3-4 star hotels from authorized countries only
const REAL_HOTELS: RealHotel[] = [
  // Poland
  { name: "Hotel Bristol", street: "Krakowskie Przedmieście 42/44", city: "Warsaw", country: "Poland", postal_code: "00-325", latitude: 52.2370, longitude: 21.0175, category: 4 },
  { name: "Hotel Europejski", street: "Heweliusza 22", city: "Gdansk", country: "Poland", postal_code: "80-890", latitude: 54.3520, longitude: 18.6466, category: 3 },
  { name: "Hotel Pod Różą", street: "Floriańska 14", city: "Krakow", country: "Poland", postal_code: "31-021", latitude: 50.0647, longitude: 19.9384, category: 4 },
  
  // Hungary
  { name: "Hotel Moments", street: "Andrássy út 8", city: "Budapest", country: "Hungary", postal_code: "1061", latitude: 47.5058, longitude: 19.0596, category: 4 },
  { name: "Hotel President", street: "Hold utca 3-5", city: "Budapest", country: "Hungary", postal_code: "1054", latitude: 47.5015, longitude: 19.0503, category: 3 },
  { name: "Hotel Divinus", street: "Bem tér 1", city: "Debrecen", country: "Hungary", postal_code: "4026", latitude: 47.5316, longitude: 21.6273, category: 4 },

  // Romania
  { name: "Hotel Cismigiu", street: "Regina Elisabeta 38", city: "Bucharest", country: "Romania", postal_code: "030018", latitude: 44.4378, longitude: 26.0970, category: 3 },
  { name: "Hotel Central", street: "Strada Republicii 62", city: "Brasov", country: "Romania", postal_code: "500030", latitude: 45.6579, longitude: 25.6012, category: 4 },
  { name: "Hotel Continental", street: "Str. Cuza Vodă 4", city: "Cluj-Napoca", country: "Romania", postal_code: "400107", latitude: 46.7712, longitude: 23.6236, category: 3 },

  // Canada
  { name: "Hotel Le Germain", street: "2050 Rue Mansfield", city: "Montreal", country: "Canada", postal_code: "H3A 1Y9", latitude: 45.5017, longitude: -73.5673, category: 4 },
  { name: "Hotel Victoria", street: "655 Douglas St", city: "Victoria", country: "Canada", postal_code: "V8W 2B7", latitude: 48.4284, longitude: -123.3656, category: 3 },
  { name: "Hotel Arts", street: "1233 W Cordova St", city: "Vancouver", country: "Canada", postal_code: "V6E 0G7", latitude: 49.2827, longitude: -123.1207, category: 4 },

  // Ireland
  { name: "Hotel Stephen's Green", street: "The Green Hotel", city: "Dublin", country: "Ireland", postal_code: "D02 V006", latitude: 53.3387, longitude: -6.2589, category: 4 },
  { name: "Hotel Kilkenny", street: "College St", city: "Kilkenny", country: "Ireland", postal_code: "R95 F893", latitude: 52.6541, longitude: -7.2448, category: 3 },
  { name: "Hotel Galway", street: "Wellpark", city: "Galway", country: "Ireland", postal_code: "H91 K5C0", latitude: 53.2744, longitude: -9.0490, category: 4 },

  // Germany
  { name: "Hotel Adlon", street: "Unter den Linden 77", city: "Berlin", country: "Germany", postal_code: "10117", latitude: 52.5163, longitude: 13.3777, category: 4 },
  { name: "Hotel Vier Jahreszeiten", street: "Neuer Jungfernstieg 9-14", city: "Hamburg", country: "Germany", postal_code: "20354", latitude: 53.5534, longitude: 9.9925, category: 4 },
  { name: "Hotel Bayerischer Hof", street: "Promenadeplatz 2-6", city: "Munich", country: "Germany", postal_code: "80333", latitude: 48.1390, longitude: 11.5733, category: 3 },

  // Portugal
  { name: "Hotel do Chiado", street: "Rua Nova do Almada 114", city: "Lisbon", country: "Portugal", postal_code: "1200-290", latitude: 38.7077, longitude: -9.1392, category: 4 },
  { name: "Hotel Infante Sagres", street: "Praça D. Filipa de Lencastre 62", city: "Porto", country: "Portugal", postal_code: "4050-259", latitude: 41.1579, longitude: -8.6291, category: 4 },
  { name: "Hotel Eva", street: "Av. da República 1", city: "Faro", country: "Portugal", postal_code: "8000-078", latitude: 37.0194, longitude: -7.9322, category: 3 },

  // Belgium
  { name: "Hotel des Galeries", street: "Rue des Bouchers 38", city: "Brussels", country: "Belgium", postal_code: "1000", latitude: 50.8476, longitude: 4.3572, category: 4 },
  { name: "Hotel Heritage", street: "Niklaas Desparsstraat 11", city: "Bruges", country: "Belgium", postal_code: "8000", latitude: 51.2093, longitude: 3.2247, category: 3 },
  { name: "Hotel Julien", street: "Korte Nieuwstraat 24", city: "Antwerp", country: "Belgium", postal_code: "2000", latitude: 51.2194, longitude: 4.4025, category: 4 },

  // Netherlands
  { name: "Hotel V Nesplein", street: "Nes 49", city: "Amsterdam", country: "Netherlands", postal_code: "1012 KD", latitude: 52.3676, longitude: 4.8936, category: 4 },
  { name: "Hotel New York", street: "Koninginnegracht 8", city: "Rotterdam", country: "Netherlands", postal_code: "3072 AC", latitude: 51.9225, longitude: 4.4792, category: 3 },
  { name: "Hotel Des Indes", street: "Lange Voorhout 54-56", city: "The Hague", country: "Netherlands", postal_code: "2514 EG", latitude: 52.0705, longitude: 4.3007, category: 4 },

  // Luxembourg
  { name: "Hotel Le Place d'Armes", street: "Place d'Armes 18", city: "Luxembourg City", country: "Luxembourg", postal_code: "1136", latitude: 49.6116, longitude: 6.1319, category: 4 },
  { name: "Hotel Simoncini", street: "Rue Notre-Dame 6", city: "Luxembourg City", country: "Luxembourg", postal_code: "2240", latitude: 49.6097, longitude: 6.1296, category: 3 },

  // Switzerland
  { name: "Hotel Schweizerhof", street: "Schweizerhofquai 3", city: "Lucerne", country: "Switzerland", postal_code: "6002", latitude: 47.0502, longitude: 8.3093, category: 4 },
  { name: "Hotel Bernina", street: "Klosbachstrasse 99", city: "Zurich", country: "Switzerland", postal_code: "8032", latitude: 47.3769, longitude: 8.5417, category: 3 },
  { name: "Hotel des Bergues", street: "Quai des Bergues 33", city: "Geneva", country: "Switzerland", postal_code: "1201", latitude: 46.2044, longitude: 6.1432, category: 4 },

  // Austria
  { name: "Hotel Am Schubertring", street: "Schubertring 11", city: "Vienna", country: "Austria", postal_code: "1010", latitude: 48.2010, longitude: 16.3740, category: 4 },
  { name: "Hotel Goldener Hirsch", street: "Getreidegasse 37", city: "Salzburg", country: "Austria", postal_code: "5020", latitude: 47.7982, longitude: 13.0447, category: 3 },
  { name: "Hotel Innsbruck", street: "Innrain 3", city: "Innsbruck", country: "Austria", postal_code: "6020", latitude: 47.2692, longitude: 11.4041, category: 4 },

  // Denmark
  { name: "Hotel d'Angleterre", street: "Kongens Nytorv 34", city: "Copenhagen", country: "Denmark", postal_code: "1050", latitude: 55.6805, longitude: 12.5858, category: 4 },
  { name: "Hotel Scandic", street: "Banegårdspladsen 14", city: "Aarhus", country: "Denmark", postal_code: "8000", latitude: 56.1496, longitude: 10.2134, category: 3 },

  // Norway
  { name: "Hotel Continental", street: "Stortingsgaten 24/26", city: "Oslo", country: "Norway", postal_code: "0117", latitude: 59.9139, longitude: 10.7522, category: 4 },
  { name: "Hotel Union Øye", street: "Øye", city: "Norangsfjord", country: "Norway", postal_code: "6216", latitude: 62.1167, longitude: 7.0667, category: 3 },

  // Sweden
  { name: "Hotel Diplomat", street: "Strandvägen 7C", city: "Stockholm", country: "Sweden", postal_code: "114 56", latitude: 59.3293, longitude: 18.0686, category: 4 },
  { name: "Hotel Gothia Towers", street: "Mässans gata 24", city: "Gothenburg", country: "Sweden", postal_code: "412 94", latitude: 57.7089, longitude: 11.9746, category: 3 },

  // Greece
  { name: "Hotel Grande Bretagne", street: "Vasileos Georgiou A' 1", city: "Athens", country: "Greece", postal_code: "105 64", latitude: 37.9755, longitude: 23.7348, category: 4 },
  { name: "Hotel Electra Palace", street: "Aristotelous Square 9", city: "Thessaloniki", country: "Greece", postal_code: "546 24", latitude: 40.6401, longitude: 22.9444, category: 3 },

  // Finland
  { name: "Hotel Kämp", street: "Pohjoisesplanadi 29", city: "Helsinki", country: "Finland", postal_code: "00100", latitude: 60.1699, longitude: 24.9384, category: 4 },
  { name: "Hotel Arthur", street: "Vuorikatu 19", city: "Helsinki", country: "Finland", postal_code: "00100", latitude: 60.1695, longitude: 24.9354, category: 3 },

  // Iceland
  { name: "Hotel Borg", street: "Pósthússtræti 11", city: "Reykjavik", country: "Iceland", postal_code: "101", latitude: 64.1466, longitude: -21.9426, category: 4 },
  { name: "Hotel Reykjavik Centrum", street: "Aðalstræti 16", city: "Reykjavik", country: "Iceland", postal_code: "101", latitude: 64.1478, longitude: -21.9348, category: 3 },

  // France
  { name: "Hotel Malte Opera", street: "Rue de Richelieu 63", city: "Paris", country: "France", postal_code: "75002", latitude: 48.8698, longitude: 2.3380, category: 4 },
  { name: "Hotel de la Cité", street: "Place Auguste-Pierre Pont", city: "Carcassonne", country: "France", postal_code: "11000", latitude: 43.2061, longitude: 2.3522, category: 3 },
  { name: "Hotel Villa Florentine", street: "25 Montée Saint-Barthélémy", city: "Lyon", country: "France", postal_code: "69005", latitude: 45.7640, longitude: 4.8357, category: 4 },

  // United Kingdom
  { name: "Hotel Russell", street: "Russell Square 1-8", city: "London", country: "United Kingdom", postal_code: "WC1B 5BE", latitude: 51.521, longitude: -0.1240, category: 4 },
  { name: "Hotel Indigo", street: "51-59 York Place", city: "Edinburgh", country: "United Kingdom", postal_code: "EH1 3JD", latitude: 55.9533, longitude: -3.1883, category: 3 },
  { name: "Hotel du Vin", street: "The Square", city: "Winchester", country: "United Kingdom", postal_code: "SO23 9ES", latitude: 51.0632, longitude: -1.3080, category: 4 },

  // Turkey
  { name: "Hotel Sultania", street: "Ebusuud Cd. 20", city: "Istanbul", country: "Turkey", postal_code: "34110", latitude: 41.0082, longitude: 28.9784, category: 4 },
  { name: "Hotel Cappadocia", street: "Göreme Mahallesi", city: "Nevsehir", country: "Turkey", postal_code: "50180", latitude: 38.6422, longitude: 34.8292, category: 3 },

  // Thailand
  { name: "Hotel Muse Bangkok", street: "55/555 Langsuan Road", city: "Bangkok", country: "Thailand", postal_code: "10330", latitude: 13.7436, longitude: 100.5412, category: 4 },
  { name: "Hotel de Chai", street: "233/2 Changklan Road", city: "Chiang Mai", country: "Thailand", postal_code: "50100", latitude: 18.7883, longitude: 98.9853, category: 3 }
];

// Platform filter options
const PROPERTY_TYPES = ["Hotel", "Resort", "Boutique Hotel"];
const PROPERTY_STYLES = ["Contemporary", "Traditional", "Boutique", "Business", "Family-friendly", "Romantic", "Urban", "Historic"];
const HOTEL_FEATURES = [
  "WiFi", "Restaurant", "Bar", "Fitness Center", "Business Center", "Concierge", 
  "Room Service", "Laundry Service", "Parking", "Pet Friendly", "Spa", "Pool",
  "Conference Rooms", "Airport Shuttle", "24/7 Reception", "Air Conditioning", "Elevator"
];
const ROOM_FEATURES = [
  "Private Bathroom", "Air Conditioning", "Minibar", "Safe", "Balcony", 
  "City View", "Work Desk", "Coffee/Tea Maker", "Hair Dryer", "Flat Screen TV", 
  "Free WiFi", "Room Service"
];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Starting creation of 66 real hotels for 32-day stays...');

    // Get themes and activities for assignment
    const { data: themes } = await supabase.from('themes').select('*');
    const { data: activities } = await supabase.from('activities').select('*');

    if (!themes || !activities) {
      throw new Error('Failed to fetch themes or activities');
    }

    let successCount = 0;
    const errors: string[] = [];

    // Create exactly 66 hotels using real data
    for (let i = 0; i < 66; i++) {
      try {
        const hotel = REAL_HOTELS[i % REAL_HOTELS.length];
        const hotelName = `${hotel.name} ${Math.floor(i / REAL_HOTELS.length) + 1}`;
        
        console.log(`Creating hotel ${i + 1}: ${hotelName}`);

        // Generate proper pricing (950-1400 EUR, multiples of 20 or ending in 95)
        const priceOptions = [];
        for (let p = 950; p <= 1400; p += 20) {
          priceOptions.push(p);
        }
        for (let p = 995; p <= 1395; p += 100) {
          priceOptions.push(p);
        }
        const price = priceOptions[Math.floor(Math.random() * priceOptions.length)];

        // Select random affinities (1-3) and matching activities (3-5)
        const selectedThemes = themes
          .sort(() => 0.5 - Math.random())
          .slice(0, Math.floor(Math.random() * 3) + 1);
        
        const selectedActivities = activities
          .sort(() => 0.5 - Math.random())
          .slice(0, Math.floor(Math.random() * 3) + 3);

        // Select exactly 12 hotel features and 9 room features
        const hotelFeatures = HOTEL_FEATURES
          .sort(() => 0.5 - Math.random())
          .slice(0, 12)
          .reduce((acc, feature) => ({ ...acc, [feature]: true }), {});

        const roomFeatures = ROOM_FEATURES
          .sort(() => 0.5 - Math.random())
          .slice(0, 9)
          .reduce((acc, feature) => ({ ...acc, [feature]: true }), {});

        // Create hotel record
        const { data: hotelData, error: hotelError } = await supabase
          .from('hotels')
          .insert({
            name: hotelName,
            description: `A charming ${hotel.category}-star ${PROPERTY_TYPES[Math.floor(Math.random() * PROPERTY_TYPES.length)].toLowerCase()} located in the heart of ${hotel.city}, perfect for extended 32-day stays.`,
            country: hotel.country,
            city: hotel.city,
            address: hotel.street,
            postal_code: hotel.postal_code,
            latitude: hotel.latitude,
            longitude: hotel.longitude,
            price_per_month: price,
            category: hotel.category,
            property_type: PROPERTY_TYPES[Math.floor(Math.random() * PROPERTY_TYPES.length)],
            style: PROPERTY_STYLES[Math.floor(Math.random() * PROPERTY_STYLES.length)],
            status: 'approved',
            available_months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            stay_lengths: [32],
            meal_plans: ['Half board'],
            room_types: [{
              name: 'Double Room',
              description: 'Comfortable double room for 2 guests',
              maxOccupancy: 2,
              rates: { 32: price }
            }],
            features_hotel: hotelFeatures,
            features_room: roomFeatures,
            atmosphere: 'Welcoming and comfortable atmosphere perfect for extended stays',
            ideal_guests: 'Digital nomads, remote workers, and travelers seeking comfortable extended accommodations',
            perfect_location: `Ideally located in ${hotel.city} for easy access to local attractions and amenities`,
            enable_price_increase: true,
            price_increase_cap: 20,
            preferredWeekday: 'Monday',
            terms: 'Standard terms and conditions apply. Check-in on Mondays only.'
          })
          .select()
          .single();

        if (hotelError) {
          console.error(`Error creating hotel ${hotelName}:`, hotelError);
          errors.push(`Hotel ${hotelName}: ${hotelError.message}`);
          continue;
        }

        console.log(`Hotel created successfully: ${hotelData.id}`);

        // Link themes
        for (const theme of selectedThemes) {
          const { error: themeError } = await supabase
            .from('hotel_themes')
            .insert({
              hotel_id: hotelData.id,
              theme_id: theme.id
            });

          if (themeError) {
            console.error(`Error linking theme ${theme.name}:`, themeError);
          } else {
            console.log(`Linked theme: ${theme.name}`);
          }
        }

        // Link activities
        for (const activity of selectedActivities) {
          const { error: activityError } = await supabase
            .from('hotel_activities')
            .insert({
              hotel_id: hotelData.id,
              activity_id: activity.id
            });

          if (activityError) {
            console.error(`Error linking activity ${activity.name}:`, activityError);
          } else {
            console.log(`Linked activity: ${activity.name}`);
          }
        }

        console.log(`Successfully created hotel ${hotelName} with ${selectedThemes.length} themes and ${selectedActivities.length} activities`);
        successCount++;

      } catch (error) {
        console.error(`Error processing hotel ${i + 1}:`, error);
        errors.push(`Hotel ${i + 1}: ${error.message}`);
      }
    }

    const result = {
      success: true,
      message: `Successfully created ${successCount} out of 66 real hotels for 32-day stays`,
      details: {
        created: successCount,
        target: 66,
        errors: errors.length > 0 ? errors : undefined
      }
    };

    console.log('Batch creation completed:', result);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Fatal error in batch creation:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
