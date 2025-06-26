
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Blocked terms that indicate 5-star/luxury hotels (case-insensitive)
const blockedTerms = [
  'palace', 'ritz', 'mansion', '5-star', 'five star', '*****', 'superior deluxe', 
  'ultra luxury', 'premium resort', 'grand', 'luxury', 'boutique', 'collection', 
  'signature', 'exclusive', 'royal', 'imperial', 'premium', 'deluxe', 'superior', 
  'st. regis', 'mandarin oriental', 'four seasons', 'waldorf astoria', 'edition', 
  'jw marriott', 'intercontinental', 'hyatt', 'meliá', 'barceló', 'raffles', 
  'kempinski', 'rosewood', 'sofitel', 'fairmont', 'marriott', 'the luxury collection', 
  'the peninsula', 'banyan tree'
];

// Allowed countries (22 only)
const allowedCountries = [
  'Poland', 'Hungary', 'Romania', 'Canada', 'Ireland', 'Germany', 'Portugal', 
  'Belgium', 'Netherlands', 'Luxembourg', 'Switzerland', 'Austria', 'Denmark', 
  'Norway', 'Sweden', 'Greece', 'Finland', 'Iceland', 'France', 'United Kingdom', 
  'Turkey', 'Thailand'
];

// 3-star and 4-star hotels from allowed countries only
const validHotels = [
  // Poland (3-4 star only)
  { name: "Hotel Cracovia", city: "Krakow", country: "Poland", address: "Focha 1, 30-119 Kraków", category: 4 },
  { name: "Hotel Europejski", city: "Krakow", country: "Poland", address: "Lubicz 5, 31-034 Kraków", category: 3 },
  { name: "Novotel Warszawa Centrum", city: "Warsaw", country: "Poland", address: "Marszałkowska 94/98, 00-510 Warszawa", category: 4 },
  
  // Hungary (3-4 star only)
  { name: "Hotel Central Basilica", city: "Budapest", country: "Hungary", address: "Hercegprímás utca 8, 1051 Budapest", category: 4 },
  { name: "Mercure Budapest Korona", city: "Budapest", country: "Hungary", address: "Kecskeméti u. 14, 1053 Budapest", category: 4 },
  { name: "City Hotel Ring", city: "Budapest", country: "Hungary", address: "Szent István körút 22, 1137 Budapest", category: 3 },
  
  // Romania (3-4 star only)
  { name: "Hotel Cismigiu", city: "Bucharest", country: "Romania", address: "Regina Elisabeta 38, 030018 București", category: 4 },
  { name: "Hotel Belvedere", city: "Brasov", country: "Romania", address: "Piața Sfatului 15, 500025 Brașov", category: 3 },
  { name: "Hotel Continental Forum", city: "Brasov", country: "Romania", address: "Strada Republicii 62, 500030 Brașov", category: 4 },
  
  // Canada (3-4 star only)
  { name: "Hotel Le Germain Quebec", city: "Quebec City", country: "Canada", address: "126 Rue Saint-Pierre, Quebec City, QC G1K 4A8", category: 4 },
  { name: "Hotel Clarendon", city: "Quebec City", country: "Canada", address: "57 Rue Sainte-Anne, Quebec City, QC G1R 3X4", category: 3 },
  { name: "Best Western Plus Village Park Inn", city: "Calgary", country: "Canada", address: "1804 Crowchild Trail NW, Calgary, AB T2M 3Y7", category: 3 },
  
  // Ireland (3-4 star only)
  { name: "The Stephen's Green Hotel", city: "Dublin", country: "Ireland", address: "The Green, Dublin 2, D02 VN50", category: 4 },
  { name: "Brooks Hotel", city: "Dublin", country: "Ireland", address: "59-62 Drury Street, Dublin 2, D02 XK84", category: 4 },
  { name: "Travelodge Dublin Phoenix Park", city: "Dublin", country: "Ireland", address: "Phoenix Park, Castleknock, Dublin 15, D15 KN28", category: 3 },
  
  // Germany (3-4 star only)
  { name: "Hotel Augustinerhof", city: "Berlin", country: "Germany", address: "Auguststraße 82, 10117 Berlin", category: 4 },
  { name: "Meininger Hotel Berlin Central Station", city: "Berlin", country: "Germany", address: "Ella-Trebe-Straße 9, 10557 Berlin", category: 3 },
  { name: "Hotel Vier Jahreszeiten Kempinski München", city: "Munich", country: "Germany", address: "Maximilianstraße 17, 80539 München", category: 4 },
  
  // Portugal (3-4 star only)
  { name: "Hotel Real Palácio", city: "Lisbon", country: "Portugal", address: "Rua do Alecrim 12, 1200-018 Lisboa", category: 4 },
  { name: "Hotel Avenida Palace", city: "Lisbon", country: "Portugal", address: "Rua 1º de Dezembro 123, 1200-359 Lisboa", category: 4 },
  { name: "Hotel Dom Henrique", city: "Porto", country: "Portugal", address: "Rua Guedes de Azevedo 179, 4000-271 Porto", category: 3 },
  
  // Belgium (3-4 star only)
  { name: "Hotel des Galeries", city: "Brussels", country: "Belgium", address: "Rue des Bouchers 38, 1000 Bruxelles", category: 4 },
  { name: "Hotel Agora", city: "Brussels", country: "Belgium", address: "Rue de la Vierge Noire 3, 1000 Bruxelles", category: 3 },
  { name: "Hotel Ter Duinen", city: "Bruges", country: "Belgium", address: "Langerei 52, 8000 Brugge", category: 3 },
  
  // Netherlands (3-4 star only)
  { name: "Hotel V Nesplein", city: "Amsterdam", country: "Netherlands", address: "Nes 49, 1012 KD Amsterdam", category: 4 },
  { name: "Hotel Europa 92", city: "Amsterdam", country: "Netherlands", address: "Nieuwe Doelenstraat 2-14, 1012 CP Amsterdam", category: 3 },
  { name: "Hotel Des Indes", city: "The Hague", country: "Netherlands", address: "Lange Voorhout 54-56, 2514 EG Den Haag", category: 4 },
];

function containsBlockedTerms(hotelName: string): boolean {
  const nameLower = hotelName.toLowerCase();
  return blockedTerms.some(term => nameLower.includes(term.toLowerCase()));
}

function generatePrice(): number {
  // Prices between €950 and €1400, ending in multiples of 20 or 95
  const baseOptions = [950, 960, 980, 995, 1000, 1020, 1040, 1060, 1080, 1095, 1100, 1120, 1140, 1160, 1180, 1195, 1200, 1220, 1240, 1260, 1280, 1295, 1300, 1320, 1340, 1360, 1380, 1395, 1400];
  return baseOptions[Math.floor(Math.random() * baseOptions.length)];
}

function getRandomAffinities(): string[] {
  const affinities = [
    'Art', 'Business', 'Culture', 'Education', 'Entertainment', 
    'Food and Drinks', 'Health and Wellness', 'History', 'Hobbies', 
    'Languages', 'Lifestyle', 'Nature', 'Personal Development', 
    'Relationships', 'Science and Technology', 'Social Impact', 'Sports'
  ];
  const selectedCount = Math.floor(Math.random() * 3) + 1; // 1-3 affinities
  const shuffled = affinities.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, selectedCount);
}

function getRandomActivities(): string[] {
  const activities = [
    'Sightseeing', 'Walking Tours', 'Museums', 'Local Markets', 'Cultural Events',
    'Food Tours', 'Language Practice', 'Yoga Classes', 'Fitness Centers', 'Swimming',
    'City Exploration', 'Photography', 'Reading', 'Cooking Classes', 'Art Galleries'
  ];
  const selectedCount = Math.floor(Math.random() * 3) + 3; // 3-5 activities
  const shuffled = activities.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, selectedCount);
}

function getRandomRoomFeatures(): Record<string, boolean> {
  const allFeatures = [
    'air_conditioning', 'balcony', 'bathtub', 'city_view', 'coffee_machine',
    'desk', 'free_wifi', 'hair_dryer', 'kitchenette', 'minibar',
    'room_service', 'safe', 'shower', 'television', 'work_space'
  ];
  const shuffled = allFeatures.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 9); // Exactly 9 features
  
  const features: Record<string, boolean> = {};
  allFeatures.forEach(feature => {
    features[feature] = selected.includes(feature);
  });
  return features;
}

function getRandomHotelFeatures(): Record<string, boolean> {
  const allFeatures = [
    'fitness_center', 'spa', 'restaurant', 'bar', 'pool', 'parking',
    'pet_friendly', 'business_center', 'laundry', 'concierge',
    'room_service', 'elevator', 'disabled_access', 'luggage_storage',
    'tour_desk', 'car_rental'
  ];
  const shuffled = allFeatures.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 12); // Exactly 12 features
  
  const features: Record<string, boolean> = {};
  allFeatures.forEach(feature => {
    features[feature] = selected.includes(feature);
  });
  return features;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    console.log('Starting Welcome Pilot Hotels creation process...');

    // Filter hotels to ensure they meet ALL criteria
    const filteredHotels = validHotels.filter(hotel => {
      // Check if name contains blocked terms
      if (containsBlockedTerms(hotel.name)) {
        console.log(`Excluding hotel "${hotel.name}" - contains blocked terms`);
        return false;
      }

      // Check if country is allowed
      if (!allowedCountries.includes(hotel.country)) {
        console.log(`Excluding hotel "${hotel.name}" - country not allowed: ${hotel.country}`);
        return false;
      }

      // Check if category is 3 or 4 stars only
      if (hotel.category < 3 || hotel.category > 4) {
        console.log(`Excluding hotel "${hotel.name}" - invalid category: ${hotel.category}`);
        return false;
      }

      return true;
    });

    console.log(`Creating ${filteredHotels.length} Welcome Pilot Hotels...`);

    let successCount = 0;
    let errorCount = 0;

    for (const hotelData of filteredHotels) {
      try {
        const price = generatePrice();
        const affinities = getRandomAffinities();
        const activities = getRandomActivities();

        const hotelRecord = {
          name: `${hotelData.name} - Welcome Pilot`,
          description: `Experience comfortable extended stays at ${hotelData.name}, part of our Welcome Pilot program. This ${hotelData.category}-star property offers quality accommodation for 32-day stays in ${hotelData.city}.`,
          country: hotelData.country,
          city: hotelData.city,
          address: hotelData.address,
          price_per_month: price,
          category: hotelData.category,
          property_type: 'Hotel',
          style: 'Modern',
          ideal_guests: 'Digital nomads and extended stay travelers looking for comfortable, affordable accommodation',
          atmosphere: 'Professional and welcoming, perfect for extended stays',
          perfect_location: `Ideally located in ${hotelData.city} for easy access to local attractions and amenities`,
          status: 'approved',
          available_months: ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'],
          stay_lengths: [32],
          meal_plans: ['half_board'],
          room_types: [{
            name: 'Double Room',
            capacity: 2,
            price_per_month: price,
            features: getRandomRoomFeatures()
          }],
          features_hotel: getRandomHotelFeatures(),
          features_room: getRandomRoomFeatures(),
          enable_price_increase: true,
          price_increase_cap: 20,
          enablePriceIncrease: true,
          priceIncreaseCap: 20,
          terms: 'Terms accepted: Yes',
          contact_name: 'Welcome Pilot Program',
          contact_email: 'pilot@welcomestays.com',
          owner_id: '00000000-0000-0000-0000-000000000000' // Default owner for pilot program
        };

        const { data: hotel, error: hotelError } = await supabaseClient
          .from('hotels')
          .insert(hotelRecord)
          .select()
          .single();

        if (hotelError) throw hotelError;

        // Add themes/affinities
        const { data: themes } = await supabaseClient
          .from('themes')
          .select('id, name')
          .in('name', affinities);

        if (themes && themes.length > 0) {
          const hotelThemes = themes.map(theme => ({
            hotel_id: hotel.id,
            theme_id: theme.id
          }));

          await supabaseClient
            .from('hotel_themes')
            .insert(hotelThemes);
        }

        // Add activities
        const { data: activitiesData } = await supabaseClient
          .from('activities')
          .select('id, name')
          .in('name', activities);

        if (activitiesData && activitiesData.length > 0) {
          const hotelActivities = activitiesData.map(activity => ({
            hotel_id: hotel.id,
            activity_id: activity.id
          }));

          await supabaseClient
            .from('hotel_activities')
            .insert(hotelActivities);
        }

        console.log(`Successfully created hotel: ${hotelData.name}`);
        successCount++;

      } catch (error) {
        console.error(`Error creating hotel ${hotelData.name}:`, error);
        errorCount++;
      }
    }

    console.log(`Welcome Pilot Hotels creation completed. Successfully created: ${successCount}, Errors: ${errorCount}`);

    return new Response(
      JSON.stringify({
        message: `Welcome Pilot Hotels batch completed. Successfully created: ${successCount} hotels, Errors: ${errorCount}`,
        success: true,
        created: successCount,
        errors: errorCount
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in Welcome Pilot Hotels creation:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to create Welcome Pilot Hotels',
        details: error.message,
        success: false
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
