
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Approved countries list - strictly enforced
const APPROVED_COUNTRIES = [
  'Poland', 'Hungary', 'Romania', 'Canada', 'Ireland', 'Germany', 
  'Portugal', 'Belgium', 'Netherlands', 'Luxembourg', 'Switzerland', 
  'Austria', 'Denmark', 'Norway', 'Sweden', 'Greece', 'Finland', 
  'Iceland', 'Italy', 'France', 'United Kingdom', 'Turkey', 
  'Thailand', 'Morocco'
];

// Cities mapped to approved countries only
const APPROVED_CITIES_BY_COUNTRY = {
  'Poland': ['Warsaw', 'Krakow', 'Gdansk', 'Wroclaw'],
  'Hungary': ['Budapest', 'Debrecen', 'Szeged'],
  'Romania': ['Bucharest', 'Cluj-Napoca', 'Timisoara'],
  'Canada': ['Toronto', 'Vancouver', 'Montreal', 'Calgary'],
  'Ireland': ['Dublin', 'Cork', 'Galway'],
  'Germany': ['Berlin', 'Munich', 'Hamburg', 'Frankfurt'],
  'Portugal': ['Lisbon', 'Porto', 'Coimbra'],
  'Belgium': ['Brussels', 'Antwerp', 'Ghent'],
  'Netherlands': ['Amsterdam', 'Rotterdam', 'The Hague'],
  'Luxembourg': ['Luxembourg City'],
  'Switzerland': ['Zurich', 'Geneva', 'Basel'],
  'Austria': ['Vienna', 'Salzburg', 'Innsbruck'],
  'Denmark': ['Copenhagen', 'Aarhus', 'Odense'],
  'Norway': ['Oslo', 'Bergen', 'Trondheim'],
  'Sweden': ['Stockholm', 'Gothenburg', 'Malmo'],
  'Greece': ['Athens', 'Thessaloniki', 'Patras'],
  'Finland': ['Helsinki', 'Tampere', 'Turku'],
  'Iceland': ['Reykjavik'],
  'Italy': ['Rome', 'Milan', 'Naples', 'Florence'],
  'France': ['Paris', 'Lyon', 'Marseille', 'Nice'],
  'United Kingdom': ['London', 'Manchester', 'Edinburgh', 'Birmingham'],
  'Turkey': ['Istanbul', 'Ankara', 'Izmir'],
  'Thailand': ['Bangkok', 'Chiang Mai', 'Phuket'],
  'Morocco': ['Marrakech', 'Casablanca', 'Fes']
};

const HOTEL_NAMES = [
  'Hotel Europa Central', 'Grand Hotel Milano', 'Hotel Residence Paris', 
  'Berlin City Hotel', 'Hotel Amsterdam Central', 'Vienna Grand Hotel',
  'Hotel Lisboa Centro', 'Brussels Business Hotel', 'Hotel Roma Centrale', 
  'Madrid Plaza Hotel', 'Warsaw Palace Hotel', 'Budapest Crown Hotel',
  'Bucharest Central Hotel', 'Toronto Metro Hotel', 'Dublin Bay Hotel',
  'Munich Business Hotel', 'Porto Heritage Hotel', 'Antwerp Grand Hotel',
  'Rotterdam Modern Hotel', 'Geneva Lake Hotel', 'Zurich City Hotel',
  'Copenhagen Nordic Hotel', 'Oslo Fjord Hotel', 'Stockholm Royal Hotel',
  'Athens Acropolis Hotel', 'Helsinki Harbor Hotel', 'Reykjavik Northern Hotel',
  'Istanbul Golden Hotel', 'Bangkok River Hotel', 'Marrakech Desert Hotel'
];

// Generate smart pricing (€950-1400, multiples of 20 or ending in 95)
function generateSmartPrice(): number {
  const minPrice = 950;
  const maxPrice = 1400;
  
  if (Math.random() < 0.5) {
    // Generate multiple of 20
    const multiplier = Math.floor(Math.random() * ((maxPrice - minPrice) / 20)) + Math.ceil(minPrice / 20);
    return multiplier * 20;
  } else {
    // Generate price ending in 95
    const basePrice = Math.floor(Math.random() * (Math.floor((maxPrice - 95) / 100) - Math.floor((minPrice - 95) / 100) + 1)) + Math.floor((minPrice - 95) / 100);
    return basePrice * 100 + 95;
  }
}

function getRandomApprovedCountryAndCity() {
  const countries = Object.keys(APPROVED_CITIES_BY_COUNTRY);
  const randomCountry = countries[Math.floor(Math.random() * countries.length)];
  const cities = APPROVED_CITIES_BY_COUNTRY[randomCountry];
  const randomCity = cities[Math.floor(Math.random() * cities.length)];
  
  return { country: randomCountry, city: randomCity };
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { action, maxHotels = 20, categoryRange = { min: 3, max: 4 } } = await req.json();
    
    console.log(`Starting batch hotel creation: ${maxHotels} hotels, category ${categoryRange.min}-${categoryRange.max}`);
    
    if (action !== 'create_hotels') {
      throw new Error('Invalid action specified');
    }

    const stats = {
      totalCreated: 0,
      errors: [] as string[],
      hotelDetails: [] as string[]
    };

    // Create hotels with approved countries only
    for (let i = 0; i < maxHotels; i++) {
      try {
        const { country, city } = getRandomApprovedCountryAndCity();
        const hotelName = HOTEL_NAMES[Math.floor(Math.random() * HOTEL_NAMES.length)];
        const category = Math.floor(Math.random() * (categoryRange.max - categoryRange.min + 1)) + categoryRange.min;
        const price = generateSmartPrice();

        // Validate country is in approved list before creating
        if (!APPROVED_COUNTRIES.includes(country)) {
          console.error(`Attempted to create hotel in unauthorized country: ${country}`);
          stats.errors.push(`Country ${country} is not in approved list`);
          continue;
        }

        const hotelData = {
          name: hotelName,
          description: `A comfortable ${category}-star hotel in the heart of ${city}, offering modern amenities and excellent service for business and leisure travelers.`,
          country: country,
          city: city,
          address: `${Math.floor(Math.random() * 999) + 1} Main Street, ${city}`,
          category: category,
          price_per_month: price,
          property_type: 'Hotel',
          style: 'Modern',
          status: 'approved',
          available_months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          stay_lengths: [8, 16, 24, 32],
          meal_plans: ['Room Only', 'Breakfast Included'],
          features_hotel: {
            'Free WiFi': true,
            'Business Center': true,
            'Fitness Center': true,
            '24/7 Reception': true
          },
          features_room: {
            'Air Conditioning': true,
            'Private Bathroom': true,
            'Flat Screen TV': true,
            'Work Desk': true
          },
          latitude: Math.random() * 180 - 90,
          longitude: Math.random() * 360 - 180,
          main_image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
          ideal_guests: 'Business travelers and digital nomads',
          atmosphere: 'Professional and comfortable environment',
          perfect_location: `Perfect location in ${city} with easy access to business district and local attractions`,
          check_in_weekday: 'Monday'
        };

        const { data, error } = await supabase
          .from('hotels')
          .insert([hotelData])
          .select();

        if (error) throw error;

        stats.totalCreated++;
        stats.hotelDetails.push(`${hotelName} - ${city}, ${country} (${category}⭐) - €${price}/month`);
        console.log(`Created hotel: ${hotelName} - €${price}/month`);

      } catch (error) {
        console.error(`Error creating hotel ${i + 1}:`, error);
        stats.errors.push(`Hotel ${i + 1}: ${error.message}`);
      }
    }

    console.log(`Batch creation completed. Created: ${stats.totalCreated}, Errors: ${stats.errors.length}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        stats: stats 
      }),
      {
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
      }
    );

  } catch (error) {
    console.error('Batch creation error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        stats: {
          totalCreated: 0,
          errors: [error.message],
          hotelDetails: []
        }
      }),
      {
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
      }
    );
  }
});
