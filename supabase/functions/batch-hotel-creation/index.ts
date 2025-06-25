
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Luxury exclusion filters
const EXCLUDED_NAME_TERMS = [
  'Palace', 'Palácio', 'Palacio', 'Mansion', 'Mansión', 'Collection',
  'Luxury', 'Royal', 'Imperial', 'Grand', 'Heritage', 'Boutique Collection',
  'Signature', 'Autograph', 'Exclusive', 'Superior'
];

const EXCLUDED_LUXURY_CHAINS = [
  'Four Seasons', 'Mandarin Oriental', 'The Ritz-Carlton', 'St. Regis',
  'Waldorf Astoria', 'Park Hyatt', 'Rosewood', 'Aman', 'Bulgari Hotels',
  'Kempinski', 'The Peninsula', 'InterContinental', 'Sofitel',
  'JW Marriott', 'Edition', 'Conrad', 'The Luxury Collection',
  'Fairmont', 'Raffles', 'Shangri-La', 'Anantara', 'Banyan Tree',
  'Leading Hotels of the World', 'Relais & Châteaux'
];

const EXCLUDED_CATEGORY_TERMS = [
  '5-star', 'Five Star', '*****', 'Superior deluxe',
  'Ultra luxury', 'Ultra-luxury', 'Premium resort'
];

// Mid-market 3-4 star hotels only
const REAL_HOTELS = [
  { name: "Hotel Scandic Oslo City", city: "Oslo", country: "Norway", address: "Europarådsplass 1, 0154 Oslo" },
  { name: "Best Western Hotel Bentleys", city: "Stockholm", country: "Sweden", address: "Drottninggatan 77, 111 60 Stockholm" },
  { name: "Hotel NH Copenhagen", city: "Copenhagen", country: "Denmark", address: "Vester Farimagsgade 6, 1606 Copenhagen" },
  { name: "Ibis Styles Berlin Mitte", city: "Berlin", country: "Germany", address: "Brunnenstraße 1, 10119 Berlin" },
  { name: "Holiday Inn Express Amsterdam", city: "Amsterdam", country: "Netherlands", address: "Sloterdijk Station, 1043 Amsterdam" },
  { name: "Mercure Hotel Vienna Center", city: "Vienna", country: "Austria", address: "Fleischmarkt 1a, 1010 Vienna" },
  { name: "Novotel Zurich City West", city: "Zurich", country: "Switzerland", address: "Schiffbaustrasse 13, 8005 Zurich" },
  { name: "Hotel Clarion Brussels", city: "Brussels", country: "Belgium", address: "Avenue des Arts 2-3, 1210 Brussels" },
  { name: "Comfort Hotel Prague", city: "Prague", country: "Czech Republic", address: "Spálená 33, 110 00 Prague" },
  { name: "Hotel Ibis Budapest Centrum", city: "Budapest", country: "Hungary", address: "Rákóczi út 58, 1074 Budapest" },
  { name: "Quality Hotel Warsaw", city: "Warsaw", country: "Poland", address: "Plac Konstytucji 5, 00-647 Warsaw" },
  { name: "Hotel Europa Vilnius", city: "Vilnius", country: "Lithuania", address: "Aušros Vartų g. 17, 01304 Vilnius" },
  { name: "Hotel Tallink Riga", city: "Riga", country: "Latvia", address: "Elizabetes iela 24, LV-1050 Riga" },
  { name: "Hotel Olympia Tallinn", city: "Tallinn", country: "Estonia", address: "Liivalaia 33, 10118 Tallinn" },
  { name: "Hotel Scandic Helsinki", city: "Helsinki", country: "Finland", address: "Simonkatu 9, 00100 Helsinki" },
  { name: "Best Western Hotel Reykjavik", city: "Reykjavik", country: "Iceland", address: "Rauðarárstígur 37, 105 Reykjavik" },
  { name: "Hotel Novotel Lisboa", city: "Lisbon", country: "Portugal", address: "Av. José Malhoa 1A, 1070-392 Lisboa" },
  { name: "Hotel NH Madrid Centro", city: "Madrid", country: "Spain", address: "Paseo del Prado 48, 28014 Madrid" },
  { name: "Hotel Ibis Barcelona Centro", city: "Barcelona", country: "Spain", address: "Carrer del Pintor Fortuny 13, 08001 Barcelona" },
  { name: "Hotel Mercure Lyon Centre", city: "Lyon", country: "France", address: "60 Bd Vivier Merle, 69003 Lyon" },
  { name: "Hotel Novotel Paris Centre", city: "Paris", country: "France", address: "4 Rue de la Paix, 75002 Paris" },
  { name: "Holiday Inn London Kensington", city: "London", country: "United Kingdom", address: "100 Cromwell Rd, London SW7 4ER" },
  { name: "Hotel Travelodge Manchester", city: "Manchester", country: "United Kingdom", address: "55 Portland St, Manchester M1 3HP" },
  { name: "Hotel Clayton Dublin", city: "Dublin", country: "Ireland", address: "Charlemont St, Saint Kevin's, Dublin" },
  { name: "Hotel Thon Brussels", city: "Brussels", country: "Belgium", address: "Avenue Louise 212, 1050 Brussels" },
  { name: "Hotel Scandic Gothenburg", city: "Gothenburg", country: "Sweden", address: "Södra Hamngatan 59-65, 411 06 Göteborg" },
  { name: "Hotel Quality Inn Trondheim", city: "Trondheim", country: "Norway", address: "Kjøpmannsgata 48, 7011 Trondheim" },
  { name: "Hotel Park Inn Copenhagen", city: "Copenhagen", country: "Denmark", address: "Østerbrogade 53, 2100 Copenhagen" },
  { name: "Hotel Comfort Düsseldorf", city: "Düsseldorf", country: "Germany", address: "Grafenberger Allee 277, 40237 Düsseldorf" }
];

// Approved countries (excluding Italy as per requirements)
const APPROVED_COUNTRIES = [
  "Spain", "France", "Germany", "Netherlands", "Belgium", "Austria", 
  "Switzerland", "Portugal", "United Kingdom", "Ireland", "Sweden", 
  "Norway", "Denmark", "Finland", "Iceland", "Czech Republic", 
  "Hungary", "Poland", "Estonia", "Latvia", "Lithuania"
];

const HOTEL_FEATURES = [
  "WiFi", "Air Conditioning", "Heating", "24/7 Reception", "Elevator", 
  "Room Service", "Laundry Service", "Concierge", "Business Center", 
  "Meeting Rooms", "Airport Shuttle", "Parking", "Pet Friendly", 
  "Non-Smoking Rooms", "Accessibility Features", "Luggage Storage", 
  "Currency Exchange", "Tour Desk", "Multilingual Staff", "Safe Deposit Box",
  "Wake-up Service", "Ironing Service", "Daily Housekeeping", "Express Check-in/out"
];

const ROOM_FEATURES = [
  "Private Bathroom", "Shower", "Hairdryer", "Towels", "Bed Linen", 
  "Work Desk", "Telephone", "TV", "Mini Fridge", "Safe", 
  "Wardrobe", "Seating Area", "Coffee/Tea Maker", "Blackout Curtains", 
  "Sound Insulation", "Wake-up Service", "Iron", "Slippers"
];

// Function to check if hotel is luxury and should be excluded
function isLuxuryHotel(hotelName: string): boolean {
  const nameUpper = hotelName.toUpperCase();
  
  // Check for excluded name terms
  const hasExcludedTerm = EXCLUDED_NAME_TERMS.some(term => 
    nameUpper.includes(term.toUpperCase())
  );
  
  // Check for excluded luxury chains
  const isLuxuryChain = EXCLUDED_LUXURY_CHAINS.some(chain => 
    nameUpper.includes(chain.toUpperCase())
  );
  
  // Check for excluded category terms
  const hasLuxuryCategory = EXCLUDED_CATEGORY_TERMS.some(category => 
    nameUpper.includes(category.toUpperCase())
  );
  
  return hasExcludedTerm || isLuxuryChain || hasLuxuryCategory;
}

function getRandomElements(array: any[], count: number) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateSmartPrice(): number {
  const multiples = [];
  for (let i = 960; i <= 1400; i += 20) {
    multiples.push(i);
  }
  
  const ending95 = [];
  for (let i = 995; i <= 1395; i += 100) {
    ending95.push(i);
  }
  
  const allPrices = [...multiples, ...ending95];
  return allPrices[Math.floor(Math.random() * allPrices.length)];
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { action, maxHotels = 20, categoryRange, excludeLuxuryBrands, requireAllFields } = await req.json();
    
    console.log('Batch hotel creation request received');
    console.log(`Starting batch hotel creation: ${maxHotels} hotels, category ${categoryRange?.min || 3}-${categoryRange?.max || 4}`);

    const stats = {
      totalCreated: 0,
      errors: [] as string[],
      hotelDetails: [] as string[]
    };

    // Filter hotels to exclude luxury properties
    const availableHotels = REAL_HOTELS.filter(hotel => {
      const hotelInApprovedCountry = APPROVED_COUNTRIES.includes(hotel.country);
      const notLuxury = !isLuxuryHotel(hotel.name);
      
      if (!hotelInApprovedCountry) {
        console.log(`Excluded ${hotel.name}: Country ${hotel.country} not approved`);
      }
      if (!notLuxury) {
        console.log(`Excluded ${hotel.name}: Identified as luxury hotel`);
      }
      
      return hotelInApprovedCountry && notLuxury;
    });

    console.log(`Available non-luxury hotels: ${availableHotels.length}`);

    for (let i = 0; i < maxHotels && i < availableHotels.length; i++) {
      try {
        const hotelTemplate = availableHotels[i];
        
        // Final luxury check before creation
        if (isLuxuryHotel(hotelTemplate.name)) {
          console.log(`Skipping luxury hotel: ${hotelTemplate.name}`);
          stats.errors.push(`Skipped luxury hotel: ${hotelTemplate.name}`);
          continue;
        }

        // Generate only 3-4 star categories
        const categories = [3, 4];
        const category = categories[Math.floor(Math.random() * categories.length)];
        
        const pricePerMonth = generateSmartPrice();
        
        // Generate 12-19 hotel features and 7-12 room features
        const hotelFeatureCount = Math.floor(Math.random() * 8) + 12; // 12-19
        const roomFeatureCount = Math.floor(Math.random() * 6) + 7; // 7-12
        
        const selectedHotelFeatures = getRandomElements(HOTEL_FEATURES, hotelFeatureCount);
        const selectedRoomFeatures = getRandomElements(ROOM_FEATURES, roomFeatureCount);

        const newHotel = {
          name: hotelTemplate.name,
          country: hotelTemplate.country,
          city: hotelTemplate.city,
          address: hotelTemplate.address,
          description: `A comfortable ${category}-star hotel located in ${hotelTemplate.city}, ${hotelTemplate.country}. Perfect for extended stays with modern amenities.`,
          category: category,
          price_per_month: pricePerMonth,
          stars: category,
          rating: parseFloat((3.5 + Math.random() * 1.5).toFixed(1)),
          reviews: Math.floor(Math.random() * 500) + 50,
          status: 'approved',
          owner_id: null,
          main_image: null,
          features: selectedHotelFeatures,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        const { data: hotel, error: hotelError } = await supabase
          .from('hotels')
          .insert([newHotel])
          .select()
          .single();

        if (hotelError) {
          console.error(`Error creating hotel ${hotelTemplate.name}:`, hotelError);
          stats.errors.push(`Failed to create ${hotelTemplate.name}: ${hotelError.message}`);
          continue;
        }

        // Add room type with 32-day stays only
        const roomType = {
          hotel_id: hotel.id,
          name: "Standard Room",
          description: "Comfortable standard room with modern amenities",
          base_rate: Math.floor(pricePerMonth / 30),
          room_count: Math.floor(Math.random() * 20) + 10,
          max_occupancy: 2,
          size_sqm: Math.floor(Math.random() * 15) + 20,
          features: selectedRoomFeatures,
          images: []
        };

        const { error: roomError } = await supabase
          .from('room_types')
          .insert([roomType]);

        if (roomError) {
          console.error(`Error creating room type for ${hotelTemplate.name}:`, roomError);
          stats.errors.push(`Failed to create room type for ${hotelTemplate.name}`);
          continue;
        }

        // Add 32-day stay length only
        const { error: stayError } = await supabase
          .from('stay_lengths')
          .insert([{
            hotel_id: hotel.id,
            length_days: 32,
            price_per_month: pricePerMonth
          }]);

        if (stayError) {
          console.error(`Error creating stay length for ${hotelTemplate.name}:`, stayError);
        }

        stats.totalCreated++;
        stats.hotelDetails.push(`${hotelTemplate.name} - €${pricePerMonth}/month`);
        console.log(`Created hotel: ${hotelTemplate.name} - €${pricePerMonth}/month`);

      } catch (error) {
        console.error(`Error processing hotel ${i}:`, error);
        stats.errors.push(`Error processing hotel ${i}: ${error.message}`);
      }
    }

    console.log(`Batch creation completed. Created: ${stats.totalCreated}, Errors: ${stats.errors.length}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        stats: stats
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
        success: false, 
        error: error.message,
        stats: {
          totalCreated: 0,
          errors: [error.message],
          hotelDetails: []
        }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
