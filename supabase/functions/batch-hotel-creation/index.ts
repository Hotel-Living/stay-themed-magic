
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Approved countries list - Italy is excluded as requested
const APPROVED_COUNTRIES = [
  'Poland', 'Hungary', 'Romania', 'Canada', 'Ireland', 'Germany', 
  'Portugal', 'Belgium', 'Netherlands', 'Luxembourg', 'Switzerland', 
  'Austria', 'Denmark', 'Norway', 'Sweden', 'Greece', 'Finland', 
  'Iceland', 'France', 'United Kingdom', 'Turkey', 'Thailand', 'Morocco'
];

// Predefined hotel features list
const HOTEL_FEATURES = [
  'WiFi', 'Restaurant', 'Bar', 'Gym', 'Spa', 'Pool', 'Parking', 
  'Room Service', 'Concierge', 'Business Center', 'Laundry Service',
  'Pet Friendly', 'Airport Shuttle', 'Meeting Rooms', 'Garden',
  'Terrace', 'Library', '24/7 Reception', 'Breakfast', 'Elevator',
  'Air Conditioning', 'Heating', 'Soundproof Rooms', 'Non-smoking Rooms',
  'Safe', 'Luggage Storage', 'Currency Exchange', 'Tour Desk',
  'Bicycle Rental', 'Car Rental', 'Multilingual Staff', 'Conference Facilities'
];

// Predefined room features list
const ROOM_FEATURES = [
  'Private Bathroom', 'Shower', 'Bathtub', 'Hair Dryer', 'TV',
  'Mini Bar', 'Safe', 'Desk', 'Wardrobe', 'Balcony', 'City View',
  'Sea View', 'Mountain View', 'Garden View', 'Kitchenette',
  'Coffee Machine', 'Tea Facilities', 'Iron', 'Sofa', 'Dining Table',
  'Free Toiletries', 'Towels', 'Slippers', 'Bathrobe'
];

// Real hotel data by country
const REAL_HOTELS = {
  'Poland': [
    { name: 'Hotel Bristol Warsaw', city: 'Warsaw', address: 'Krakowskie Przedmieście 42/44, 00-325 Warsaw' },
    { name: 'Grand Hotel Krakow', city: 'Krakow', address: 'Sławkowska 5/7, 31-014 Kraków' },
    { name: 'Hotel Copernicus', city: 'Krakow', address: 'Kanonicza 16, 31-002 Kraków' }
  ],
  'Hungary': [
    { name: 'Four Seasons Hotel Gresham Palace', city: 'Budapest', address: 'Széchenyi István tér 5-6, 1051 Budapest' },
    { name: 'Aria Hotel Budapest', city: 'Budapest', address: 'Hercegprímás u. 5, 1051 Budapest' },
    { name: 'Kempinski Hotel Corvinus', city: 'Budapest', address: 'Erzsébet tér 7-8, 1051 Budapest' }
  ],
  'Romania': [
    { name: 'JW Marriott Bucharest Grand Hotel', city: 'Bucharest', address: 'Calea 13 Septembrie 90, 050726 București' },
    { name: 'The Marmorosch Bucharest', city: 'Bucharest', address: 'Strada Doamnei 2-4, 030167 București' }
  ],
  'Canada': [
    { name: 'Fairmont Hotel Vancouver', city: 'Vancouver', address: '900 W Georgia St, Vancouver, BC V6C 2W6' },
    { name: 'The Ritz-Carlton Toronto', city: 'Toronto', address: '181 Wellington St W, Toronto, ON M5V 3G7' },
    { name: 'Château Frontenac', city: 'Quebec City', address: '1 Rue des Carrières, Québec, QC G1R 4P5' }
  ],
  'Ireland': [
    { name: 'The Fitzwilliam Hotel', city: 'Dublin', address: 'St Stephens Green, Dublin 2, D02 XK84' },
    { name: 'The Shelbourne', city: 'Dublin', address: '27 St Stephens Green, Dublin 2, D02 K224' }
  ],
  'Germany': [
    { name: 'Bayerischer Hof', city: 'Munich', address: 'Promenadeplatz 2-6, 80333 München' },
    { name: 'Hotel Adlon Kempinski', city: 'Berlin', address: 'Unter den Linden 77, 10117 Berlin' }
  ],
  'Portugal': [
    { name: 'Reid\'s Palace', city: 'Funchal', address: 'Estrada Monumental 139, 9000-098 Funchal' },
    { name: 'Pousada de Lisboa', city: 'Lisbon', address: 'Praça do Comércio 31-34, 1100-148 Lisboa' }
  ],
  'Belgium': [
    { name: 'Rocco Forte Hotel des Galeries', city: 'Brussels', address: 'Rue des Bouchers 38, 1000 Bruxelles' },
    { name: 'Hotel des Galeries', city: 'Brussels', address: 'Rue des Bouchers 38, 1000 Bruxelles' }
  ],
  'Netherlands': [
    { name: 'Waldorf Astoria Amsterdam', city: 'Amsterdam', address: 'Herengracht 542-556, 1017 CG Amsterdam' },
    { name: 'The Hoxton Amsterdam', city: 'Amsterdam', address: 'Herengracht 255, 1016 BJ Amsterdam' }
  ],
  'Luxembourg': [
    { name: 'Hotel Le Royal', city: 'Luxembourg City', address: '12 Boulevard Royal, 2449 Luxembourg' }
  ],
  'Switzerland': [
    { name: 'Baur au Lac', city: 'Zurich', address: 'Talstrasse 1, 8001 Zürich' },
    { name: 'The Dolder Grand', city: 'Zurich', address: 'Kurhausstrasse 65, 8032Zürich' }
  ],
  'Austria': [
    { name: 'Hotel Sacher Wien', city: 'Vienna', address: 'Philharmoniker Str. 4, 1010 Wien' },
    { name: 'Hotel Imperial', city: 'Vienna', address: 'Kärntner Ring 16, 1015 Wien' }
  ],
  'Denmark': [
    { name: 'Radisson Collection Royal Hotel', city: 'Copenhagen', address: 'Hammerichsgade 1, 1611 København' },
    { name: 'Hotel d\'Angleterre', city: 'Copenhagen', address: 'Kongens Nytorv 34, 1050 København' }
  ],
  'Norway': [
    { name: 'Hotel Continental Oslo', city: 'Oslo', address: 'Stortingsgata 24/26, 0117 Oslo' },
    { name: 'Radisson Blu Royal Hotel', city: 'Bergen', address: 'Bryggen, 5003 Bergen' }
  ],
  'Sweden': [
    { name: 'Grand Hôtel Stockholm', city: 'Stockholm', address: 'Södra Blasieholmshamnen 8, 103 27 Stockholm' },
    { name: 'Hotel Diplomat', city: 'Stockholm', address: 'Strandvägen 7C, 114 56 Stockholm' }
  ],
  'Greece': [
    { name: 'King George Athens', city: 'Athens', address: '3 Vasileos Georgiou A\', Syntagma Square, 105 64 Athens' },
    { name: 'Hotel Grande Bretagne', city: 'Athens', address: '1 Vasileos Georgiou A\' Str, 105 64 Athens' }
  ],
  'Finland': [
    { name: 'Hotel Kämp', city: 'Helsinki', address: 'Pohjoisesplanadi 29, 00100 Helsinki' },
    { name: 'Scandic Helsinki City', city: 'Helsinki', address: 'Mannerheiminaukio 1C, 00100 Helsinki' },
    { name: 'Hotel Arctic TreeHouse', city: 'Rovaniemi', address: 'Tarvantie 3, 96930 Rovaniemi' }
  ],
  'Iceland': [
    { name: 'The Retreat at Blue Lagoon', city: 'Grindavik', address: 'Nordurljósavegur 9, 240 Grindavík' },
    { name: 'Hotel Borg', city: 'Reykjavik', address: 'Pósthússtræti 11, 101 Reykjavík' }
  ],
  'France': [
    { name: 'InterContinental Carlton Cannes', city: 'Cannes', address: '58 Bd de la Croisette, 06414 Cannes' },
    { name: 'Hotel Martinez', city: 'Cannes', address: '73 Bd de la Croisette, 06400 Cannes' },
    { name: 'Hotel Lutetia', city: 'Paris', address: '45 Bd Raspail, 75006 Paris' }
  ],
  'United Kingdom': [
    { name: 'The Savoy', city: 'London', address: 'Strand, London WC2R 0EU' },
    { name: 'Claridge\'s', city: 'London', address: 'Brook St, London W1K 4HR' },
    { name: 'The Balmoral', city: 'Edinburgh', address: '1 Princes St, Edinburgh EH2 2EQ' }
  ],
  'Turkey': [
    { name: 'Museum Hotel', city: 'Nevsehir', address: 'Tekelli Mah, Uçhisar, 50240 Ürgüp/Nevşehir' },
    { name: 'Four Seasons Hotel Istanbul', city: 'Istanbul', address: 'Tevkifhane Sk. No:1, 34110 Fatih/İstanbul' }
  ],
  'Thailand': [
    { name: 'The Oriental Bangkok', city: 'Bangkok', address: '48 Oriental Ave, Khwaeng Bang Rak, Bangkok 10500' },
    { name: 'The Sukhothai Bangkok', city: 'Bangkok', address: '13/3 S Sathon Rd, Thung Mahamek, Sathon, Bangkok 10120' }
  ],
  'Morocco': [
    { name: 'La Mamounia', city: 'Marrakech', address: 'Av. Bab Jdid, Marrakech 40040' },
    { name: 'Royal Mansour', city: 'Marrakech', address: 'Rue Abou Abbas El Sebti, Marrakech 40000' }
  ]
};

function getRandomHotelFeatures(): Record<string, boolean> {
  const count = Math.floor(Math.random() * 8) + 12; // 12-19 features
  const shuffled = HOTEL_FEATURES.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, count);
  
  const features: Record<string, boolean> = {};
  selected.forEach(feature => {
    features[feature] = true;
  });
  
  return features;
}

function getRandomRoomFeatures(): Record<string, boolean> {
  const count = Math.floor(Math.random() * 6) + 7; // 7-12 features
  const shuffled = ROOM_FEATURES.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, count);
  
  const features: Record<string, boolean> = {};
  selected.forEach(feature => {
    features[feature] = true;
  });
  
  return features;
}

function generateSmartPrice(): number {
  // Generate prices between €950-1400, either multiples of 20 or ending in 95
  const minPrice = 950;
  const maxPrice = 1400;
  
  const useMultipleOf20 = Math.random() < 0.7; // 70% chance for multiples of 20
  
  if (useMultipleOf20) {
    const minMultiple = Math.ceil(minPrice / 20);
    const maxMultiple = Math.floor(maxPrice / 20);
    const randomMultiple = Math.floor(Math.random() * (maxMultiple - minMultiple + 1)) + minMultiple;
    return randomMultiple * 20;
  } else {
    // Prices ending in 95
    const bases = Math.floor(Math.random() * 5) + 9; // 9-13, so 995, 1095, 1195, 1295, 1395
    return bases * 100 + 95;
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Batch hotel creation request received');
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { action, maxHotels = 20, categoryRange, excludeLuxuryBrands, requireAllFields } = await req.json();
    
    console.log(`Starting batch hotel creation: ${maxHotels} hotels, category ${categoryRange?.min}-${categoryRange?.max}`);

    const stats = {
      totalCreated: 0,
      errors: [] as string[],
      hotelDetails: [] as string[]
    };

    // Get all available countries and hotels
    const availableHotels: any[] = [];
    APPROVED_COUNTRIES.forEach(country => {
      if (REAL_HOTELS[country]) {
        REAL_HOTELS[country].forEach(hotel => {
          availableHotels.push({ ...hotel, country });
        });
      }
    });

    // Shuffle and limit to requested count
    const shuffledHotels = availableHotels.sort(() => 0.5 - Math.random()).slice(0, maxHotels);

    for (const hotelData of shuffledHotels) {
      try {
        const price = generateSmartPrice();
        const hotelFeatures = getRandomHotelFeatures();
        const roomFeatures = getRandomRoomFeatures();

        const newHotel = {
          name: hotelData.name,
          description: `Experience luxury accommodation in the heart of ${hotelData.city}. This distinguished hotel offers exceptional service and premium amenities for extended stays.`,
          country: hotelData.country,
          city: hotelData.city,
          address: hotelData.address,
          price_per_month: price,
          category: Math.floor(Math.random() * 2) + 3, // 3-4 stars only
          property_type: 'Hotel',
          style: 'Modern',
          ideal_guests: 'Business travelers, digital nomads, and extended stay guests seeking comfort and convenience.',
          atmosphere: 'Professional yet welcoming, with a focus on comfort and productivity for long-term stays.',
          perfect_location: `Strategically located in ${hotelData.city}, offering easy access to business districts, cultural attractions, and transportation hubs.`,
          status: 'approved',
          available_months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          stay_lengths: [32], // Only 32 days as requested
          meal_plans: ['Breakfast included', 'Half board', 'Full board'],
          features_hotel: hotelFeatures,
          features_room: roomFeatures,
          check_in_weekday: 'Monday',
          enable_price_increase: true,
          price_increase_cap: 20,
          main_image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop'
        };

        const { data: hotel, error: hotelError } = await supabase
          .from('hotels')
          .insert(newHotel)
          .select()
          .single();

        if (hotelError) {
          console.error('Error creating hotel:', hotelError);
          stats.errors.push(`Failed to create ${hotelData.name}: ${hotelError.message}`);
          continue;
        }

        stats.totalCreated++;
        const hotelDetail = `${hotelData.name} - €${price}/month`;
        stats.hotelDetails.push(hotelDetail);
        console.log(`Created hotel: ${hotelDetail}`);

      } catch (error) {
        console.error('Error in hotel creation loop:', error);
        stats.errors.push(`Failed to create ${hotelData.name}: ${error.message}`);
      }
    }

    console.log(`Batch creation completed. Created: ${stats.totalCreated}, Errors: ${stats.errors.length}`);

    return new Response(
      JSON.stringify({ stats }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Batch creation error:', error);
    return new Response(
      JSON.stringify({ 
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
        } 
      }
    );
  }
});
