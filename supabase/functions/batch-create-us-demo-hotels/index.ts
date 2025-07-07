import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Forbidden hotel chain names and luxury terms
const FORBIDDEN_TERMS = [
  'Palace', 'Palacio', 'Palácio', 'Ritz', 'Ritz-Carlton', 'Mansion', 'Mansión', 
  '5-star', 'Five Star', '*****', 'Superior deluxe', 'Ultra luxury', 'Ultra-luxury', 
  'Premium resort', 'AC Hotels', 'Alila', 'Allegro', 'Aman', 'Anantara', 'Andaz', 
  'Ascend Hotel Collection', 'Autograph Collection', 'Banyan Tree', 'Barceló', 
  'Baymont', 'Best Western', 'Best Western Plus', 'Best Western Premier', 'BlueBay', 
  'Boutique Collection', 'Bulgari Hotels', 'BW Signature Collection', 'Cambria', 
  'Canopy', 'Candlewood Suites', 'Collection', 'Comfort', 'Conrad', 'Country Inn & Suites', 
  'Courtyard', 'Crowne Plaza', 'Curio Collection', 'Days Inn', 'DoubleTree', 'Edition', 
  'Embassy Suites', 'EVEN Hotels', 'Exclusive', 'Fairmont', 'Fiesta Americana', 
  'Fiesta Inn', 'Four Seasons', 'Grand', 'Grand Hyatt', 'Grand Palladium', 'Gran Meliá', 
  'Hampton', 'Hawthorn Suites', 'Heritage', 'Hilton', 'Holiday Inn', 'Holiday Inn Express', 
  'Home2 Suites', 'Homewood Suites', 'Hotel Indigo', 'Hyatt', 'Hyatt Centric', 
  'Hyatt House', 'Hyatt Place', 'Hyatt Regency', 'Ibis', 'Ibis Budget', 'Ibis Styles', 
  'Imperial', 'Innside', 'InterContinental', 'JW Marriott', 'Kempinski', 'Kimpton', 
  'La Quinta', 'Leading Hotels of the World', 'Le Méridien', 'Live Aqua', 'Lopesan', 
  'Luxury', 'MGallery', 'Mandarin Oriental', 'Marriott', 'ME by Meliá', 'Meliá', 
  'Microtel', 'Moxy', 'NH Collection', 'NH Hotels', 'Novotel', 'Oaks', 'Occidental', 
  'Park Hyatt', 'Park Inn', 'Park Plaza', 'Paradisus', 'Pullman', 'Quality', 
  'Radisson', 'Radisson Blu', 'Radisson RED', 'Ramada', 'Raffles', 'Relais & Châteaux', 
  'Renaissance', 'RIU', 'Rodeway Inn', 'Rosewood', 'Royal', 'Royal Hideaway', 
  'Shangri-La', 'Sheraton', 'Signature', 'Sleep Inn', 'Sol', 'Sofitel', 'St. Regis', 
  'Staybridge Suites', 'Super 8', 'SureStay', 'SureStay Plus', 'SureStay Studio', 
  'Superior', 'Swissôtel', 'The Luxury Collection', 'The Peninsula', 'Thompson Hotels', 
  'Tivoli', 'TRS', 'Tru', 'TRYP', 'voco', 'Waldorf Astoria', 'Westin', 'Wingate', 
  'W Hotels', 'Wyndham'
];

// Maximum pricing per category and duration (from user's image)
const MAX_PRICING = {
  3: { // 3-star
    8: { double: 515, single: 400 },   // Interpolated from 7-night rates
    15: { double: 915, single: 700 },  // Interpolated from 14-night rates  
    22: { double: 1290, single: 995 }, // Interpolated from 21-night rates
    29: { double: 1720, single: 1290 } // Interpolated from 28-night rates
  },
  4: { // 4-star
    8: { double: 800, single: 630 },
    15: { double: 1450, single: 1125 },
    22: { double: 2095, single: 1610 },
    29: { double: 2795, single: 2040 }
  },
  5: { // 5-star
    8: { double: 1200, single: 915 },
    15: { double: 2145, single: 1610 },
    22: { double: 3060, single: 2255 },
    29: { double: 3870, single: 2900 }
  }
};

// Real US cities spread across regions
const US_CITIES = [
  { city: 'New York', state: 'NY', region: 'Northeast' },
  { city: 'Los Angeles', state: 'CA', region: 'West' },
  { city: 'Chicago', state: 'IL', region: 'Midwest' },
  { city: 'Miami', state: 'FL', region: 'Southeast' },
  { city: 'San Francisco', state: 'CA', region: 'West' },
  { city: 'Las Vegas', state: 'NV', region: 'West' },
  { city: 'Orlando', state: 'FL', region: 'Southeast' },
  { city: 'Seattle', state: 'WA', region: 'West' },
  { city: 'Boston', state: 'MA', region: 'Northeast' },
  { city: 'Washington', state: 'DC', region: 'Northeast' },
  { city: 'Atlanta', state: 'GA', region: 'Southeast' },
  { city: 'Philadelphia', state: 'PA', region: 'Northeast' },
  { city: 'Phoenix', state: 'AZ', region: 'West' },
  { city: 'San Diego', state: 'CA', region: 'West' },
  { city: 'Dallas', state: 'TX', region: 'South' },
  { city: 'Houston', state: 'TX', region: 'South' },
  { city: 'Austin', state: 'TX', region: 'South' },
  { city: 'Denver', state: 'CO', region: 'West' },
  { city: 'Nashville', state: 'TN', region: 'South' },
  { city: 'New Orleans', state: 'LA', region: 'South' }
];

// Sample hotel names that don't contain forbidden terms
const HOTEL_NAMES = [
  'The American', 'City View Hotel', 'Downtown Inn', 'Harbor View', 'Riverside Hotel',
  'Central Station Hotel', 'Metropolitan Inn', 'Urban Retreat', 'The Continental',
  'Parkside Hotel', 'Bayfront Inn', 'The Historic', 'Midtown Hotel', 'Lakefront Lodge',
  'The Ambassador', 'Capitol Hotel', 'Sunset Inn', 'The Plaza Hotel', 'Garden Hotel',
  'Waterfront Inn', 'The Sterling', 'Oak Tree Hotel', 'Maple Inn', 'Pine Lodge',
  'Cedar Hotel', 'Willow Inn', 'Elm Hotel', 'Birch Lodge', 'Aspen Inn', 'Redwood Hotel',
  'Magnolia Inn', 'Cypress Hotel', 'Palmetto Inn', 'Azalea Hotel', 'Dogwood Inn',
  'Peachtree Hotel', 'Sycamore Inn', 'Hickory Lodge', 'Chestnut Hotel', 'Poplar Inn',
  'The Academy', 'Library Hotel', 'University Inn', 'College Hotel', 'Campus Lodge',
  'The Artisan', 'Gallery Hotel', 'Studio Inn', 'Museum Hotel', 'Theater Inn',
  'The Merchant', 'Trade Hotel', 'Commerce Inn', 'Market Hotel', 'Exchange Inn',
  'The Navigator', 'Compass Hotel', 'Anchor Inn', 'Lighthouse Hotel', 'Marina Inn',
  'The Pioneer', 'Frontier Hotel', 'Heritage Inn', 'Legacy Hotel', 'Tradition Inn'
];

// Meal plans in Spanish (to be mapped via filter_value_mappings)
const MEAL_PLANS = [
  'Solo alojamiento',
  'Desayuno incluido', 
  'Media pensión',
  'Pensión completa',
  'Todo incluido'
];

const PROPERTY_STYLES = [
  'Boutique', 'Moderno', 'Tradicional', 'Contemporáneo', 'Clásico', 'Urbano', 'Histórico'
];

const PROPERTY_TYPES = ['Hotel', 'Resort'];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    console.log('Starting creation of 1 test hotel for validation...');
    console.log('Database has been pre-cleaned via SQL migration - proceeding with generation');

    // Fetch existing themes and activities
    const { data: themes } = await supabase.from('themes').select('id, name');
    const { data: activities } = await supabase.from('activities').select('id, name');
    
    if (!themes || !activities) {
      throw new Error('Failed to fetch themes or activities');
    }

    const hotels = [];
    let hotelIndex = 0;

    // Generate 1 test hotel
    const distributions = [
      { durations: [8, 15, 22, 29], count: 1 } // Test hotel with all durations
    ];

    for (const dist of distributions) {
      for (let i = 0; i < dist.count; i++) {
        const category = [3, 4, 5][i % 3]; // Rotate through categories
        const mealPlan = MEAL_PLANS[i % MEAL_PLANS.length]; // Rotate through meal plans
        const cityInfo = US_CITIES[hotelIndex % US_CITIES.length];
        
        let hotelName;
        let attempts = 0;
        do {
          hotelName = HOTEL_NAMES[Math.floor(Math.random() * HOTEL_NAMES.length)];
          attempts++;
        } while (attempts < 10 && FORBIDDEN_TERMS.some(term => 
          hotelName.toLowerCase().includes(term.toLowerCase())
        ));

        if (attempts >= 10) {
          console.warn(`Could not find valid hotel name after 10 attempts, using: ${hotelName}`);
        }

        // Generate pricing for this hotel's durations
        const pricingMatrix = [];
        let calculatedPricePerMonth = 0;
        
        for (const duration of dist.durations) {
          const maxPrices = MAX_PRICING[category][duration];
          
          // Generate random prices within limits (multiples of 25)
          const doublePrice = Math.floor((Math.random() * maxPrices.double * 0.8 + maxPrices.double * 0.2) / 25) * 25;
          const singlePrice = Math.floor((Math.random() * maxPrices.single * 0.8 + maxPrices.single * 0.2) / 25) * 25;
          
          // Occasionally end in 95
          const adjustDouble = Math.random() < 0.3 ? (Math.floor(doublePrice / 100) * 100 - 5) : doublePrice;
          const adjustSingle = Math.random() < 0.3 ? (Math.floor(singlePrice / 100) * 100 - 5) : singlePrice;

          pricingMatrix.push({
            roomType: 'Double',
            stayLength: duration.toString(), // Ensure string type
            mealPlan: mealPlan,
            price: Math.max(adjustDouble, 25)
          });
          
          pricingMatrix.push({
            roomType: 'Single', 
            stayLength: duration.toString(), // Ensure string type
            mealPlan: mealPlan,
            price: Math.max(adjustSingle, 25)
          });
          
          // Calculate monthly equivalent for price_per_month (use longest duration's double room price)
          if (duration === Math.max(...dist.durations)) {
            const monthlyMultiplier = 30 / duration; // Convert stay duration to monthly equivalent
            calculatedPricePerMonth = Math.round(Math.max(adjustDouble, 25) * monthlyMultiplier);
          }
        }

        // Generate descriptions
        const landmarks = {
          'New York': ['Times Square', 'Central Park', 'Broadway'],
          'Los Angeles': ['Hollywood', 'Beverly Hills', 'Santa Monica'],
          'Chicago': ['Millennium Park', 'Navy Pier', 'The Loop'],
          'Miami': ['South Beach', 'Art Deco District', 'Biscayne Bay'],
          'San Francisco': ['Golden Gate Bridge', 'Fisherman\'s Wharf', 'Union Square'],
          'Las Vegas': ['The Strip', 'Fremont Street', 'Red Rock Canyon'],
          'Orlando': ['Disney World', 'Universal Studios', 'International Drive'],
          'Seattle': ['Pike Place Market', 'Space Needle', 'Puget Sound'],
          'Boston': ['Freedom Trail', 'Fenway Park', 'Harvard Square'],
          'Washington': ['National Mall', 'Smithsonian', 'Capitol Hill']
        };

        const cityLandmarks = landmarks[cityInfo.city] || ['downtown area', 'historic district', 'cultural center'];
        const selectedLandmark = cityLandmarks[Math.floor(Math.random() * cityLandmarks.length)];

        const hotel = {
          name: hotelName,
          description: `${hotelName} se encuentra en el corazón de ${cityInfo.city}, ${cityInfo.state}, ofreciendo una experiencia auténtica en una de las ciudades más vibrantes de Estados Unidos. Su ubicación estratégica cerca de ${selectedLandmark} lo convierte en el punto de partida perfecto para explorar la rica cultura y las atracciones de la región.`,
          country: 'United States',
          city: `${cityInfo.city}, ${cityInfo.state}`,
          address: `${Math.floor(Math.random() * 9999) + 1} Main Street`,
          postal_code: `${Math.floor(Math.random() * 90000) + 10000}`,
          category: category,
          property_type: PROPERTY_TYPES[Math.floor(Math.random() * PROPERTY_TYPES.length)],
          style: PROPERTY_STYLES[Math.floor(Math.random() * PROPERTY_STYLES.length)],
          price_per_month: calculatedPricePerMonth, // Properly calculated monthly equivalent
          status: 'approved',
          owner_id: null, // Demo hotels have no owner
          is_featured: Math.random() < 0.2, // 20% featured
          latitude: 40.7128 + (Math.random() - 0.5) * 20, // Rough US latitude range
          longitude: -74.0060 + (Math.random() - 0.5) * 50, // Rough US longitude range
          
          // Required contextual phrases
          perfect_location: `explorar ${selectedLandmark} y disfrutar de la energía única de ${cityInfo.city}`,
          ideal_guests: `quienes buscan una experiencia auténtica americana y desean estar cerca de las principales atracciones de ${cityInfo.city}`,
          atmosphere: category === 5 ? 'sofisticado y elegante, con un servicio excepcional' : 
                     category === 4 ? 'acogedor y profesional, ideal para viajeros exigentes' : 
                     'cálido y familiar, perfecto para una estancia cómoda y accesible',
          
          // Hotel features (as object with boolean values)
          features_hotel: {
            'WiFi gratuito': true,
            'Aire acondicionado': true,
            'Recepción 24h': true,
            'Servicio de habitaciones': Math.random() > 0.3,
            'Gimnasio': Math.random() > 0.4,
            'Piscina': Math.random() > 0.5,
            'Restaurante': Math.random() > 0.2,
            'Bar': Math.random() > 0.3,
            'Aparcamiento': Math.random() > 0.4,
            'Servicio de lavandería': Math.random() > 0.3
          },
          
          // Room features (as object with boolean values)  
          features_room: {
            'TV pantalla plana': true,
            'Minibar': Math.random() > 0.3,
            'Caja fuerte': true,
            'Escritorio': Math.random() > 0.2,
            'Balcón': Math.random() > 0.6,
            'Vista a la ciudad': Math.random() > 0.4,
            'Baño privado': true,
            'Secador de pelo': true,
            'Plancha': Math.random() > 0.3,
            'Teléfono': Math.random() > 0.4
          },
          
          // Room types
          room_types: [
            { type: 'Double', capacity: 2, description: 'Habitación doble con cama matrimonial' },
            { type: 'Single', capacity: 1, description: 'Habitación individual' }
          ],
          
          // Meal plans
          meal_plans: [mealPlan],
          
          // Stay lengths
          stay_lengths: dist.durations,
          
          // Pricing matrix
          pricingmatrix: pricingMatrix,
          
          // Booking settings
          enable_price_increase: true,
          price_increase_cap: 20,
          allow_stay_extensions: true,
          
          // Terms
          terms: 'Hotel demo para fines de demostración. No disponible para reservas reales.',
          
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        hotels.push(hotel);
        hotelIndex++;
      }
    }

    console.log(`Generated ${hotels.length} hotels, inserting into database...`);
    
    // Log first hotel for debugging
    if (hotels.length > 0) {
      console.log('🏨 First hotel debug data:', {
        name: hotels[0].name,
        features_hotel: hotels[0].features_hotel,
        features_room: hotels[0].features_room,
        pricingmatrix: hotels[0].pricingmatrix,
        address: hotels[0].address,
        city: hotels[0].city,
        postal_code: hotels[0].postal_code
      });
    }

    // Insert hotels in batches
    const batchSize = 10;
    const insertedHotels = [];
    
    for (let i = 0; i < hotels.length; i += batchSize) {
      const batch = hotels.slice(i, i + batchSize);
      const { data, error } = await supabase
        .from('hotels')
        .insert(batch)
        .select('id, name');
      
      if (error) {
        console.error('Error inserting hotel batch:', error);
        throw error;
      }
      
      insertedHotels.push(...data);
      console.log(`Inserted batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(hotels.length/batchSize)}`);
    }

    // Add themes and activities to hotels
    console.log('Adding themes and activities to hotels...');
    
    for (const hotel of insertedHotels) {
      // Add 2-4 random themes
      const selectedThemes = shuffleArray(themes).slice(0, Math.floor(Math.random() * 3) + 2);
      const themeInserts = selectedThemes.map(theme => ({
        hotel_id: hotel.id,
        theme_id: theme.id
      }));
      
      await supabase.from('hotel_themes').insert(themeInserts);
      
      // Add 3-6 random activities
      const selectedActivities = shuffleArray(activities).slice(0, Math.floor(Math.random() * 4) + 3);
      const activityInserts = selectedActivities.map(activity => ({
        hotel_id: hotel.id,
        activity_id: activity.id
      }));
      
      await supabase.from('hotel_activities').insert(activityInserts);
    }

    console.log('Successfully created 1 test hotel!');

    return new Response(JSON.stringify({
      success: true,
      stats: {
        totalCreated: insertedHotels.length,
        errors: 0,
        hotelDetails: insertedHotels.map(hotel => ({
          id: hotel.id,
          name: hotel.name
        }))
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error in batch hotel creation:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});

// Utility function to shuffle array
function shuffleArray(array: any[]) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}