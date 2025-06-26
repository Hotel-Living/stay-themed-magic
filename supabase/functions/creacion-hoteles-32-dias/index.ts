
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Blocked terms to exclude luxury/5-star hotels
const BLOCKED_TERMS = [
  'palace', 'ritz', 'mansion', '5-star', 'five star', '*****', 
  'superior deluxe', 'ultra luxury', 'premium resort', 'grand', 
  'luxury', 'boutique', 'collection', 'signature', 'exclusive', 
  'royal', 'imperial', 'premium', 'deluxe', 'superior', 
  'st. regis', 'mandarin oriental', 'four seasons', 'waldorf astoria', 
  'edition', 'jw marriott', 'intercontinental', 'hyatt', 'meliá', 
  'barceló', 'raffles', 'kempinski', 'rosewood', 'sofitel', 
  'fairmont', 'marriott', 'the luxury collection', 'the peninsula', 
  'banyan tree'
];

// 22 allowed countries
const ALLOWED_COUNTRIES = [
  'Poland', 'Hungary', 'Romania', 'Canada', 'Ireland', 'Germany', 
  'Portugal', 'Belgium', 'Netherlands', 'Luxembourg', 'Switzerland', 
  'Austria', 'Denmark', 'Norway', 'Sweden', 'Greece', 'Finland', 
  'Iceland', 'France', 'United Kingdom', 'Turkey', 'Thailand'
];

// Real hotels data for 32-day batch (3-4 star only, filtered for blocked terms)
const WELCOME_PILOT_HOTELS = [
  // Poland
  { name: "Hotel Cracovia", country: "Poland", city: "Krakow", address: "Focha 1, 30-119 Kraków", category: 4 },
  { name: "Hotel Europejski", country: "Poland", city: "Warsaw", address: "Krakowskie Przedmieście 13, 00-071 Warsaw", category: 4 },
  { name: "Novotel Warszawa Centrum", country: "Poland", city: "Warsaw", address: "Marszałkowska 94/98, 00-510 Warsaw", category: 4 },
  
  // Hungary
  { name: "Hotel Central Basilica", country: "Hungary", city: "Budapest", address: "Hercegprímás u. 8, 1051 Budapest", category: 4 },
  { name: "Mercure Budapest Korona", country: "Hungary", city: "Budapest", address: "Kecskeméti u. 14, 1053 Budapest", category: 4 },
  { name: "City Hotel Ring", country: "Hungary", city: "Budapest", address: "Szent István krt. 22, 1137 Budapest", category: 3 },
  
  // Romania
  { name: "Hotel Cismigiu", country: "Romania", city: "Bucharest", address: "Regina Elisabeta Boulevard 38, 030018 Bucharest", category: 4 },
  { name: "Hotel Belvedere", country: "Romania", city: "Brasov", address: "Apollonia Hirscher 2, 500025 Brasov", category: 3 },
  { name: "Hotel Continental Forum", country: "Romania", city: "Sibiu", address: "Calea Dumbravii 2-4, 550324 Sibiu", category: 4 },
  
  // Canada
  { name: "Hotel Le Germain Quebec", country: "Canada", city: "Quebec City", address: "126 Rue Saint-Pierre, Quebec City, QC G1K 4A8", category: 4 },
  { name: "Hotel Clarendon", country: "Canada", city: "Quebec City", address: "57 Rue Sainte-Anne, Quebec City, QC G1R 3X4", category: 3 },
  { name: "Best Western Plus Village Park Inn", country: "Canada", city: "Calgary", address: "1804 Crowchild Trail NW, Calgary, AB T2M 3Y7", category: 3 },
  
  // Ireland
  { name: "The Stephen's Green Hotel", country: "Ireland", city: "Dublin", address: "The Green, Dublin 2", category: 4 },
  { name: "Brooks Hotel", country: "Ireland", city: "Dublin", address: "59-62 Drury Street, Dublin 2", category: 4 },
  { name: "Travelodge Dublin Phoenix Park", country: "Ireland", city: "Dublin", address: "Phoenix Park, Castleknock, Dublin 15", category: 3 },
  
  // Germany
  { name: "Hotel Augustinerhof", country: "Germany", city: "Nuremberg", address: "Augustinerstraße 27, 90403 Nuremberg", category: 4 },
  { name: "Meininger Hotel Berlin Central Station", country: "Germany", city: "Berlin", address: "Ella-Trebe-Straße 9, 10557 Berlin", category: 3 },
  
  // Portugal
  { name: "Hotel Real Palácio", country: "Portugal", city: "Lisbon", address: "Rua do Alecrim 12-20, 1200-017 Lisbon", category: 4 },
  { name: "Hotel Dom Henrique", country: "Portugal", city: "Porto", address: "Rua Guedes de Azevedo 179, 4000-271 Porto", category: 4 },
  
  // Belgium
  { name: "Hotel des Galeries", country: "Belgium", city: "Brussels", address: "Rue des Bouchers 38, 1000 Brussels", category: 4 },
  { name: "Hotel Agora", country: "Belgium", city: "Brussels", address: "Rue de la Vierge Noire 1-3, 1000 Brussels", category: 3 },
  { name: "Hotel Ter Duinen", country: "Belgium", city: "Bruges", address: "Langerei 52, 8000 Bruges", category: 3 },
  
  // Netherlands
  { name: "Hotel V Nesplein", country: "Netherlands", city: "Amsterdam", address: "Nesplein 49, 1012 CD Amsterdam", category: 4 },
  { name: "Hotel Europa 92", country: "Netherlands", city: "Amsterdam", address: "Roemer Visscherstraat 35, 1054 EW Amsterdam", category: 3 },
  { name: "Hotel Des Indes", country: "Netherlands", city: "The Hague", address: "Lange Voorhout 54-56, 2514 EG The Hague", category: 4 }
];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting Welcome Pilot Hotels creation process...');
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Filter out hotels with blocked terms
    const validHotels = WELCOME_PILOT_HOTELS.filter(hotel => {
      const hotelName = hotel.name.toLowerCase();
      const hasBlockedTerm = BLOCKED_TERMS.some(term => hotelName.includes(term));
      if (hasBlockedTerm) {
        console.log(`Excluding hotel "${hotel.name}" - contains blocked terms`);
        return false;
      }
      return true;
    });

    console.log(`Creating ${validHotels.length} Welcome Pilot Hotels...`);

    let successCount = 0;
    let errorCount = 0;

    for (const hotelData of validHotels) {
      try {
        // Generate a random price between €950 and €1400, ending in 20 or 95
        const basePrice = Math.floor(Math.random() * (1400 - 950 + 1)) + 950;
        const price = basePrice % 100 >= 50 ? Math.floor(basePrice / 20) * 20 + 95 : Math.floor(basePrice / 20) * 20;

        const hotelInsertData = {
          name: hotelData.name,
          country: hotelData.country,
          city: hotelData.city,
          address: hotelData.address,
          category: hotelData.category,
          price_per_month: price,
          property_type: 'Hotel',
          property_style: 'Contemporary',
          stay_lengths: [32],
          meal_plans: ['Half Board'],
          status: 'approved',
          enable_price_increase: true,
          price_increase_cap: 20,
          room_types: [{
            name: 'Double Room',
            capacity: 2,
            features: [
              'Private Bathroom',
              'Air Conditioning',
              'Free WiFi',
              'TV',
              'Mini Fridge',
              'Work Desk',
              'Safe',
              'Balcony',
              'Room Service'
            ]
          }],
          features_hotel: {
            'Restaurant': true,
            'Bar/Lounge': true,
            'Fitness Center': true,
            'Business Center': true,
            '24/7 Reception': true,
            'Laundry Service': true,
            'Room Service': true,
            'WiFi': true,
            'Parking': true,
            'Concierge': true,
            'Elevator': true,
            'Heating': true
          }
        };

        const { error: insertError } = await supabase
          .from('hotels')
          .insert(hotelInsertData);

        if (insertError) {
          console.error(`Error creating hotel ${hotelData.name}:`, insertError);
          errorCount++;
        } else {
          successCount++;
        }

      } catch (error) {
        console.error(`Error processing hotel ${hotelData.name}:`, error);
        errorCount++;
      }
    }

    const message = `Welcome Pilot Hotels creation completed. Successfully created: ${successCount}, Errors: ${errorCount}`;
    console.log(message);

    return new Response(
      JSON.stringify({ 
        message,
        success: true,
        created: successCount,
        errors: errorCount
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in Welcome Pilot Hotels creation:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to create Welcome Pilot Hotels',
        details: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
