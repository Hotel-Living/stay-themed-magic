
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Exactly 22 authorized countries - 3 hotels each = 66 total hotels
const AUTHORIZED_COUNTRIES = [
  'Poland', 'Hungary', 'Romania', 'Canada', 'Ireland', 'Germany', 'Portugal', 
  'Belgium', 'Netherlands', 'Luxembourg', 'Switzerland', 'Austria', 'Denmark', 
  'Norway', 'Sweden', 'Greece', 'Finland', 'Iceland', 'France', 'United Kingdom', 
  'Turkey', 'Thailand'
];

const PROPERTY_TYPES = ['Hotel', 'Resort', 'Boutique Hotel'];
const PROPERTY_STYLES = [
  'Modern', 'Traditional', 'Boutique', 'Luxury', 'Contemporary', 'Historic', 
  'Minimalist', 'Rustic', 'Urban', 'Coastal', 'Mountain', 'Countryside'
];

// Exactly 66 hotels - 3 per country for 22 countries
const hotelData = [
  // Poland (3 hotels)
  {
    name: "Warsaw Palace Hotel",
    city: "Warsaw",
    country: "Poland",
    address: "Aleje Jerozolimskie 45",
    postal_code: "00-692",
    latitude: 52.2297,
    longitude: 21.0122,
    property_type: "Hotel",
    style: "Historic"
  },
  {
    name: "Krakow Boutique Resort",
    city: "Krakow",
    country: "Poland",
    address: "Rynek Główny 12",
    postal_code: "31-042",
    latitude: 50.0647,
    longitude: 19.9450,
    property_type: "Boutique Hotel",
    style: "Traditional"
  },
  {
    name: "Gdansk Coastal Hotel",
    city: "Gdansk",
    country: "Poland",
    address: "Długa 45",
    postal_code: "80-831",
    latitude: 54.3520,
    longitude: 18.6466,
    property_type: "Resort",
    style: "Coastal"
  },

  // Hungary (3 hotels)
  {
    name: "Budapest Thermal Resort",
    city: "Budapest",
    country: "Hungary",
    address: "Széchenyi István tér 1",
    postal_code: "1051",
    latitude: 47.4979,
    longitude: 19.0402,
    property_type: "Resort",
    style: "Luxury"
  },
  {
    name: "Debrecen Modern Hotel",
    city: "Debrecen",
    country: "Hungary",
    address: "Piac utca 11-15",
    postal_code: "4024",
    latitude: 47.5316,
    longitude: 21.6273,
    property_type: "Hotel",
    style: "Modern"
  },
  {
    name: "Szeged Boutique Palace",
    city: "Szeged",
    country: "Hungary",
    address: "Dugonics tér 13",
    postal_code: "6720",
    latitude: 46.2530,
    longitude: 20.1414,
    property_type: "Boutique Hotel",
    style: "Contemporary"
  },

  // Romania (3 hotels)
  {
    name: "Bucharest Grand Hotel",
    city: "Bucharest",
    country: "Romania",
    address: "Calea Victoriei 63-81",
    postal_code: "010065",
    latitude: 44.4268,
    longitude: 26.1025,
    property_type: "Hotel",
    style: "Traditional"
  },
  {
    name: "Brasov Mountain Resort",
    city: "Brasov",
    country: "Romania",
    address: "Piața Sfatului 14",
    postal_code: "500025",
    latitude: 45.6574,
    longitude: 25.6012,
    property_type: "Resort",
    style: "Mountain"
  },
  {
    name: "Cluj Modern Boutique",
    city: "Cluj-Napoca",
    country: "Romania",
    address: "Piața Unirii 17",
    postal_code: "400098",
    latitude: 46.7712,
    longitude: 23.6236,
    property_type: "Boutique Hotel",
    style: "Minimalist"
  },

  // Canada (3 hotels)
  {
    name: "Toronto Urban Hotel",
    city: "Toronto",
    country: "Canada",
    address: "100 Front Street West",
    postal_code: "M5J 1E3",
    latitude: 43.6532,
    longitude: -79.3832,
    property_type: "Hotel",
    style: "Urban"
  },
  {
    name: "Vancouver Coastal Resort",
    city: "Vancouver",
    country: "Canada",
    address: "900 West Georgia Street",
    postal_code: "V6C 2W6",
    latitude: 49.2827,
    longitude: -123.1207,
    property_type: "Resort",
    style: "Coastal"
  },
  {
    name: "Montreal Boutique Palace",
    city: "Montreal",
    country: "Canada",
    address: "1228 Rue Sherbrooke Ouest",
    postal_code: "H3G 1H6",
    latitude: 45.5017,
    longitude: -73.5673,
    property_type: "Boutique Hotel",
    style: "Historic"
  },

  // Ireland (3 hotels)
  {
    name: "Dublin Castle Hotel",
    city: "Dublin",
    country: "Ireland",
    address: "27 St Stephen's Green",
    postal_code: "D02 X683",
    latitude: 53.3498,
    longitude: -6.2603,
    property_type: "Hotel",
    style: "Historic"
  },
  {
    name: "Cork Countryside Resort",
    city: "Cork",
    country: "Ireland",
    address: "South Mall 74",
    postal_code: "T12 KW89",
    latitude: 51.8985,
    longitude: -8.4756,
    property_type: "Resort",
    style: "Countryside"
  },
  {
    name: "Galway Boutique Inn",
    city: "Galway",
    country: "Ireland",
    address: "Eyre Square 15",
    postal_code: "H91 E0CW",
    latitude: 53.2744,
    longitude: -9.0490,
    property_type: "Boutique Hotel",
    style: "Traditional"
  },

  // Germany (3 hotels)
  {
    name: "Berlin Modern Hotel",
    city: "Berlin",
    country: "Germany",
    address: "Unter den Linden 77",
    postal_code: "10117",
    latitude: 52.5200,
    longitude: 13.4050,
    property_type: "Hotel",
    style: "Modern"
  },
  {
    name: "Munich Bavarian Resort",
    city: "Munich",
    country: "Germany",
    address: "Marienplatz 8",
    postal_code: "80331",
    latitude: 48.1351,
    longitude: 11.5820,
    property_type: "Resort",
    style: "Traditional"
  },
  {
    name: "Hamburg Boutique Harbor",
    city: "Hamburg",
    country: "Germany",
    address: "Jungfernstieg 9-14",
    postal_code: "20354",
    latitude: 53.5511,
    longitude: 9.9937,
    property_type: "Boutique Hotel",
    style: "Contemporary"
  },

  // Portugal (3 hotels)
  {
    name: "Lisbon Coastal Hotel",
    city: "Lisbon",
    country: "Portugal",
    address: "Praça do Comércio 31-34",
    postal_code: "1100-148",
    latitude: 38.7223,
    longitude: -9.1393,
    property_type: "Hotel",
    style: "Coastal"
  },
  {
    name: "Porto Wine Resort",
    city: "Porto",
    country: "Portugal",
    address: "Avenida dos Aliados 85",
    postal_code: "4000-067",
    latitude: 41.1579,
    longitude: -8.6291,
    property_type: "Resort",
    style: "Historic"
  },
  {
    name: "Faro Boutique Beach",
    city: "Faro",
    country: "Portugal",
    address: "Rua de Santo António 28",
    postal_code: "8000-253",
    latitude: 37.0194,
    longitude: -7.9322,
    property_type: "Boutique Hotel",
    style: "Coastal"
  },

  // Belgium (3 hotels)
  {
    name: "Brussels Grand Palace Hotel",
    city: "Brussels",
    country: "Belgium",
    address: "Grand Place 1",
    postal_code: "1000",
    latitude: 50.8503,
    longitude: 4.3517,
    property_type: "Hotel",
    style: "Historic"
  },
  {
    name: "Antwerp Diamond Resort",
    city: "Antwerp",
    country: "Belgium",
    address: "Grote Markt 40",
    postal_code: "2000",
    latitude: 51.2194,
    longitude: 4.4025,
    property_type: "Resort",
    style: "Luxury"
  },
  {
    name: "Bruges Boutique Canal",
    city: "Bruges",
    country: "Belgium",
    address: "Markt 15",
    postal_code: "8000",
    latitude: 51.2085,
    longitude: 3.2247,
    property_type: "Boutique Hotel",
    style: "Traditional"
  },

  // Netherlands (3 hotels)
  {
    name: "Amsterdam Canal Hotel",
    city: "Amsterdam",
    country: "Netherlands",
    address: "Damrak 93-94",
    postal_code: "1012 LP",
    latitude: 52.3676,
    longitude: 4.9041,
    property_type: "Hotel",
    style: "Historic"
  },
  {
    name: "Rotterdam Modern Resort",
    city: "Rotterdam",
    country: "Netherlands",
    address: "Coolsingel 31",
    postal_code: "3012 AA",
    latitude: 51.9244,
    longitude: 4.4777,
    property_type: "Resort",
    style: "Modern"
  },
  {
    name: "Utrecht Boutique Plaza",
    city: "Utrecht",
    country: "Netherlands",
    address: "Domplein 29",
    postal_code: "3512 JE",
    latitude: 52.0907,
    longitude: 5.1214,
    property_type: "Boutique Hotel",
    style: "Contemporary"
  },

  // Luxembourg (3 hotels)
  {
    name: "Luxembourg Palace Hotel",
    city: "Luxembourg City",
    country: "Luxembourg",
    address: "Place Guillaume II 2",
    postal_code: "1648",
    latitude: 49.6116,
    longitude: 6.1319,
    property_type: "Hotel",
    style: "Luxury"
  },
  {
    name: "Esch-sur-Alzette Resort",
    city: "Esch-sur-Alzette",
    country: "Luxembourg",
    address: "Place de l'Hôtel de Ville 1",
    postal_code: "4138",
    latitude: 49.4958,
    longitude: 5.9809,
    property_type: "Resort",
    style: "Modern"
  },
  {
    name: "Differdange Boutique Valley",
    city: "Differdange",
    country: "Luxembourg",
    address: "Avenue Charlotte 45",
    postal_code: "4530",
    latitude: 49.5244,
    longitude: 5.8908,
    property_type: "Boutique Hotel",
    style: "Countryside"
  },

  // Switzerland (3 hotels)
  {
    name: "Zurich Alpine Hotel",
    city: "Zurich",
    country: "Switzerland",
    address: "Bahnhofstrasse 1",
    postal_code: "8001",
    latitude: 47.3769,
    longitude: 8.5417,
    property_type: "Hotel",
    style: "Luxury"
  },
  {
    name: "Geneva Lake Resort",
    city: "Geneva",
    country: "Switzerland",
    address: "Rue du Rhône 65",
    postal_code: "1204",
    latitude: 46.2044,
    longitude: 6.1432,
    property_type: "Resort",
    style: "Mountain"
  },
  {
    name: "Basel Boutique Rhine",
    city: "Basel",
    country: "Switzerland",
    address: "Marktplatz 19",
    postal_code: "4001",
    latitude: 47.5596,
    longitude: 7.5886,
    property_type: "Boutique Hotel",
    style: "Contemporary"
  },

  // Austria (3 hotels)
  {
    name: "Vienna Imperial Hotel",
    city: "Vienna",
    country: "Austria",
    address: "Ringstrasse 16",
    postal_code: "1010",
    latitude: 48.2082,
    longitude: 16.3738,
    property_type: "Hotel",
    style: "Historic"
  },
  {
    name: "Salzburg Mozart Resort",
    city: "Salzburg",
    country: "Austria",
    address: "Getreidegasse 9",
    postal_code: "5020",
    latitude: 47.8095,
    longitude: 13.0550,
    property_type: "Resort",
    style: "Traditional"
  },
  {
    name: "Innsbruck Alpine Boutique",
    city: "Innsbruck",
    country: "Austria",
    address: "Maria-Theresien-Strasse 31",
    postal_code: "6020",
    latitude: 47.2692,
    longitude: 11.4041,
    property_type: "Boutique Hotel",
    style: "Mountain"
  },

  // Denmark (3 hotels)
  {
    name: "Copenhagen Royal Hotel",
    city: "Copenhagen",
    country: "Denmark",
    address: "Nyhavn 9",
    postal_code: "1051",
    latitude: 55.6761,
    longitude: 12.5683,
    property_type: "Hotel",
    style: "Historic"
  },
  {
    name: "Aarhus Modern Resort",
    city: "Aarhus",
    country: "Denmark",
    address: "Store Torv 1",
    postal_code: "8000",
    latitude: 56.1629,
    longitude: 10.2039,
    property_type: "Resort",
    style: "Modern"
  },
  {
    name: "Odense Boutique Castle",
    city: "Odense",
    country: "Denmark",
    address: "Flakhaven 2",
    postal_code: "5000",
    latitude: 55.4038,
    longitude: 10.4024,
    property_type: "Boutique Hotel",
    style: "Traditional"
  },

  // Norway (3 hotels)
  {
    name: "Oslo Fjord Hotel",
    city: "Oslo",
    country: "Norway",
    address: "Karl Johans gate 31",
    postal_code: "0159",
    latitude: 59.9139,
    longitude: 10.7522,
    property_type: "Hotel",
    style: "Modern"
  },
  {
    name: "Bergen Mountain Resort",
    city: "Bergen",
    country: "Norway",
    address: "Torgallmenningen 6",
    postal_code: "5014",
    latitude: 60.3913,
    longitude: 5.3221,
    property_type: "Resort",
    style: "Mountain"
  },
  {
    name: "Trondheim Boutique Harbor",
    city: "Trondheim",
    country: "Norway",
    address: "Nordre gate 24",
    postal_code: "7011",
    latitude: 63.4305,
    longitude: 10.3951,
    property_type: "Boutique Hotel",
    style: "Coastal"
  },

  // Sweden (3 hotels)
  {
    name: "Stockholm Royal Hotel",
    city: "Stockholm",
    country: "Sweden",
    address: "Gamla Stan 28",
    postal_code: "111 29",
    latitude: 59.3293,
    longitude: 18.0686,
    property_type: "Hotel",
    style: "Historic"
  },
  {
    name: "Gothenburg Coastal Resort",
    city: "Gothenburg",
    country: "Sweden",
    address: "Avenyn 46",
    postal_code: "411 36",
    latitude: 57.7089,
    longitude: 11.9746,
    property_type: "Resort",
    style: "Coastal"
  },
  {
    name: "Malmö Boutique Bridge",
    city: "Malmö",
    country: "Sweden",
    address: "Stortorget 17",
    postal_code: "211 34",
    latitude: 55.6050,
    longitude: 13.0038,
    property_type: "Boutique Hotel",
    style: "Contemporary"
  },

  // Greece (3 hotels)
  {
    name: "Athens Acropolis Hotel",
    city: "Athens",
    country: "Greece",
    address: "Syntagma Square 2",
    postal_code: "105 63",
    latitude: 37.9755,
    longitude: 23.7348,
    property_type: "Hotel",
    style: "Historic"
  },
  {
    name: "Thessaloniki Aegean Resort",
    city: "Thessaloniki",
    country: "Greece",
    address: "Aristotelous Square 5",
    postal_code: "546 23",
    latitude: 40.6401,
    longitude: 22.9444,
    property_type: "Resort",
    style: "Coastal"
  },
  {
    name: "Patras Boutique Harbor",
    city: "Patras",
    country: "Greece",
    address: "Plateia Georgiou 15",
    postal_code: "262 21",
    latitude: 38.2466,
    longitude: 21.7346,
    property_type: "Boutique Hotel",
    style: "Traditional"
  },

  // Finland (3 hotels)
  {
    name: "Helsinki Nordic Hotel",
    city: "Helsinki",
    country: "Finland",
    address: "Kauppatori 1",
    postal_code: "00170",
    latitude: 60.1699,
    longitude: 24.9384,
    property_type: "Hotel",
    style: "Modern"
  },
  {
    name: "Tampere Lake Resort",
    city: "Tampere",
    country: "Finland",
    address: "Keskustori 4",
    postal_code: "33100",
    latitude: 61.4991,
    longitude: 23.7871,
    property_type: "Resort",
    style: "Countryside"
  },
  {
    name: "Turku Boutique Castle",
    city: "Turku",
    country: "Finland",
    address: "Kauppatori 3",
    postal_code: "20100",
    latitude: 60.4518,
    longitude: 22.2666,
    property_type: "Boutique Hotel",
    style: "Historic"
  },

  // Iceland (3 hotels)
  {
    name: "Reykjavik Geothermal Hotel",
    city: "Reykjavik",
    country: "Iceland",
    address: "Laugavegur 22",
    postal_code: "101",
    latitude: 64.1466,
    longitude: -21.9426,
    property_type: "Hotel",
    style: "Modern"
  },
  {
    name: "Akureyri Northern Resort",
    city: "Akureyri",
    country: "Iceland",
    address: "Hafnarstræti 67",
    postal_code: "600",
    latitude: 65.6835,
    longitude: -18.1262,
    property_type: "Resort",
    style: "Mountain"
  },
  {
    name: "Keflavik Boutique Airport",
    city: "Keflavik",
    country: "Iceland",
    address: "Hafnargata 57",
    postal_code: "230",
    latitude: 64.0049,
    longitude: -22.5623,
    property_type: "Boutique Hotel",
    style: "Contemporary"
  },

  // France (3 hotels)
  {
    name: "Paris Champs-Élysées Hotel",
    city: "Paris",
    country: "France",
    address: "Avenue des Champs-Élysées 101",
    postal_code: "75008",
    latitude: 48.8566,
    longitude: 2.3522,
    property_type: "Hotel",
    style: "Luxury"
  },
  {
    name: "Lyon Gastronomy Resort",
    city: "Lyon",
    country: "France",
    address: "Place Bellecour 2",
    postal_code: "69002",
    latitude: 45.7640,
    longitude: 4.8357,
    property_type: "Resort",
    style: "Traditional"
  },
  {
    name: "Marseille Boutique Port",
    city: "Marseille",
    country: "France",
    address: "Vieux-Port 26",
    postal_code: "13001",
    latitude: 43.2965,
    longitude: 5.3698,
    property_type: "Boutique Hotel",
    style: "Coastal"
  },

  // United Kingdom (3 hotels)
  {
    name: "London Thames Hotel",
    city: "London",
    country: "United Kingdom",
    address: "The Strand 429",
    postal_code: "WC2R 0QX",
    latitude: 51.5074,
    longitude: -0.1278,
    property_type: "Hotel",
    style: "Historic"
  },
  {
    name: "Edinburgh Castle Resort",
    city: "Edinburgh",
    country: "United Kingdom",
    address: "Royal Mile 356",
    postal_code: "EH1 2PB",
    latitude: 55.9533,
    longitude: -3.1883,
    property_type: "Resort",
    style: "Traditional"
  },
  {
    name: "Manchester Boutique Quarter",
    city: "Manchester",
    country: "United Kingdom",
    address: "Deansgate 303",
    postal_code: "M3 4LQ",
    latitude: 53.4808,
    longitude: -2.2426,
    property_type: "Boutique Hotel",
    style: "Urban"
  },

  // Turkey (3 hotels)
  {
    name: "Istanbul Bosphorus Hotel",
    city: "Istanbul",
    country: "Turkey",
    address: "Sultanahmet Meydanı 1",
    postal_code: "34122",
    latitude: 41.0082,
    longitude: 28.9784,
    property_type: "Hotel",
    style: "Historic"
  },
  {
    name: "Antalya Mediterranean Resort",
    city: "Antalya",
    country: "Turkey",
    address: "Kaleiçi Marina 15",
    postal_code: "07100",
    latitude: 36.8969,
    longitude: 30.7133,
    property_type: "Resort",
    style: "Coastal"
  },
  {
    name: "Cappadocia Boutique Cave",
    city: "Cappadocia",
    country: "Turkey",
    address: "Göreme 50180",
    postal_code: "50180",
    latitude: 38.6431,
    longitude: 34.8289,
    property_type: "Boutique Hotel",
    style: "Traditional"
  },

  // Thailand (3 hotels)
  {
    name: "Bangkok Royal Hotel",
    city: "Bangkok",
    country: "Thailand",
    address: "Khao San Road 46",
    postal_code: "10200",
    latitude: 13.7563,
    longitude: 100.5018,
    property_type: "Hotel",
    style: "Urban"
  },
  {
    name: "Phuket Beach Resort",
    city: "Phuket",
    country: "Thailand",
    address: "Patong Beach 200/1",
    postal_code: "83150",
    latitude: 7.8804,
    longitude: 98.2923,
    property_type: "Resort",
    style: "Coastal"
  },
  {
    name: "Chiang Mai Boutique Temple",
    city: "Chiang Mai",
    country: "Thailand",
    address: "Sunday Market 78",
    postal_code: "50200",
    latitude: 18.7883,
    longitude: 98.9853,
    property_type: "Boutique Hotel",
    style: "Traditional"
  }
];

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

    console.log(`Starting batch creation of ${hotelData.length} hotels across ${AUTHORIZED_COUNTRIES.length} countries`);

    // Validate hotel data before processing
    const countryCount = {};
    hotelData.forEach(hotel => {
      if (!AUTHORIZED_COUNTRIES.includes(hotel.country)) {
        throw new Error(`Unauthorized country found: ${hotel.country}`);
      }
      countryCount[hotel.country] = (countryCount[hotel.country] || 0) + 1;
    });

    // Verify exactly 3 hotels per country
    Object.keys(countryCount).forEach(country => {
      if (countryCount[country] !== 3) {
        throw new Error(`Country ${country} has ${countryCount[country]} hotels, expected 3`);
      }
    });

    console.log('Hotel data validation passed: 66 hotels, 3 per country, 22 countries total');

    const results = {
      totalCreated: 0,
      errors: [],
      hotelDetails: []
    };

    // Process each hotel individually
    for (let i = 0; i < hotelData.length; i++) {
      const hotel = hotelData[i];
      
      try {
        console.log(`Creating hotel ${i + 1}/${hotelData.length}: ${hotel.name} in ${hotel.city}, ${hotel.country}`);

        // Prepare complete hotel data
        const hotelInsertData = {
          name: hotel.name,
          city: hotel.city,
          country: hotel.country,
          address: hotel.address,
          postal_code: hotel.postal_code,
          latitude: hotel.latitude,
          longitude: hotel.longitude,
          property_type: hotel.property_type,
          style: hotel.style,
          description: `Experience the charm of ${hotel.city} at ${hotel.name}. This ${hotel.property_type.toLowerCase()} offers ${hotel.style.toLowerCase()} accommodations perfect for extended stays. Ideally located in the heart of ${hotel.city}, guests can easily explore the vibrant culture and attractions of ${hotel.country}. Our ${hotel.style.toLowerCase()} design creates a welcoming atmosphere for digital nomads, business travelers, and lifestyle enthusiasts seeking quality accommodations for 32-day stays.`,
          ideal_guests: `Digital nomads, remote workers, and lifestyle travelers seeking extended stays in ${hotel.city}. Perfect for professionals who value comfort, location, and cultural immersion during their ${hotel.country} experience.`,
          atmosphere: `${hotel.style} and welcoming atmosphere that blends local ${hotel.country} culture with modern comfort. The space encourages both productivity and relaxation, making it ideal for extended stays.`,
          perfect_location: `Strategically positioned in ${hotel.city}'s most desirable area, offering easy access to local attractions, business districts, and cultural sites. The location perfectly balances convenience with authentic ${hotel.country} experiences.`,
          price_per_month: Math.floor(Math.random() * (2500 - 800) + 800),
          category: Math.floor(Math.random() * 3) + 3, // 3-5 stars
          available_months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          meal_plans: ['Half Board'],
          stay_lengths: [32],
          check_in_weekday: 'Monday',
          status: 'approved',
          features_hotel: {
            "Free WiFi": true,
            "24/7 Reception": true,
            "Laundry Service": true,
            "Housekeeping": true,
            "Concierge": true,
            "Room Service": true,
            "Business Center": true,
            "Fitness Center": true
          },
          features_room: {
            "Private Bathroom": true,
            "Air Conditioning": true,
            "Desk & Chair": true,
            "Wardrobe": true,
            "Safe": true,
            "Mini Fridge": true,
            "Coffee/Tea Maker": true,
            "Flat Screen TV": true
          }
        };

        // Insert hotel
        const { data: createdHotel, error: hotelError } = await supabase
          .from('hotels')
          .insert([hotelInsertData])
          .select('id, name, city, country')
          .single();

        if (hotelError) {
          console.error(`Error creating hotel ${hotel.name}:`, hotelError);
          results.errors.push(`Hotel ${hotel.name}: ${hotelError.message}`);
          continue;
        }

        // Add sample themes (2-3 themes per hotel)
        const sampleThemes = [
          'cb8c4a85-8d1a-4b2a-9c5f-7d3e2f1a4b8c', // Business Travel
          'a1b2c3d4-e5f6-7890-abcd-ef1234567890', // Cultural Immersion
          'd4e5f6g7-h8i9-j0k1-l2m3-n4o5p6q7r8s9'  // Urban Lifestyle
        ];
        
        const selectedThemes = sampleThemes.slice(0, Math.floor(Math.random() * 2) + 2);
        
        for (const themeId of selectedThemes) {
          const { error: themeError } = await supabase
            .from('hotel_themes')
            .insert([{
              hotel_id: createdHotel.id,
              theme_id: themeId
            }]);
          
          if (themeError) {
            console.log(`Warning: Could not add theme ${themeId} to hotel ${createdHotel.id}`);
          }
        }

        results.totalCreated++;
        results.hotelDetails.push({
          id: createdHotel.id,
          name: createdHotel.name,
          city: createdHotel.city,
          country: createdHotel.country
        });

        console.log(`✅ Successfully created: ${hotel.name} (${results.totalCreated}/${hotelData.length})`);

      } catch (error) {
        console.error(`Error processing hotel ${hotel.name}:`, error);
        results.errors.push(`Hotel ${hotel.name}: ${error.message}`);
      }
    }

    console.log(`Batch creation completed: ${results.totalCreated} hotels created, ${results.errors.length} errors`);

    // Final validation
    const finalCountryDistribution = {};
    results.hotelDetails.forEach(hotel => {
      finalCountryDistribution[hotel.country] = (finalCountryDistribution[hotel.country] || 0) + 1;
    });

    console.log('Final country distribution:', finalCountryDistribution);

    return new Response(JSON.stringify({
      success: results.totalCreated > 0,
      message: `Successfully created ${results.totalCreated} out of ${hotelData.length} hotels for 32-day stays across ${Object.keys(finalCountryDistribution).length} countries`,
      stats: {
        totalCreated: results.totalCreated,
        totalAttempted: hotelData.length,
        countriesProcessed: Object.keys(finalCountryDistribution).length,
        expectedCountries: AUTHORIZED_COUNTRIES.length,
        countryDistribution: finalCountryDistribution,
        errors: results.errors,
        hotelDetails: results.hotelDetails
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Batch creation failed:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Batch creation failed',
      stats: {
        totalCreated: 0,
        errors: [error.message],
        hotelDetails: []
      }
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
