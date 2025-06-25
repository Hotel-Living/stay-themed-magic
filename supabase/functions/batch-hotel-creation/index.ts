
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Approved countries list (excluding Italy as per requirements)
const APPROVED_COUNTRIES = [
  'Poland', 'Hungary', 'Romania', 'Canada', 'Ireland', 'Germany', 
  'Portugal', 'Belgium', 'Netherlands', 'Luxembourg', 'Switzerland', 
  'Austria', 'Denmark', 'Norway', 'Sweden', 'Greece', 'Finland', 
  'Iceland', 'France', 'United Kingdom', 'Turkey', 'Thailand', 'Morocco'
];

// Predefined hotel features list
const HOTEL_FEATURES = [
  "WiFi Gratis", "Estacionamiento", "Restaurante", "Piscina", "Spa", "Gimnasio", 
  "Recepción 24/7", "Servicio de Habitaciones", "Bar", "Salón", 
  "Centro de Negocios", "Salas de Conferencias", "Servicio de Lavandería",
  "Conserjería", "Traslado al Aeropuerto", "Acepta Mascotas",
  "Acceso a la Playa", "Vista a la Montaña", "Jardín", "Terraza",
  "Centro de Fitness", "Sauna", "Jacuzzi", "Baño de Vapor",
  "Cancha de Tenis", "Campo de Golf", "Club Infantil", "Parque Infantil",
  "Servicio de Cuidado de Niños", "Cambio de Moneda", "Tienda de Regalos", "Biblioteca"
];

// Predefined room features list
const ROOM_FEATURES = [
  "Aire Acondicionado", "Baño Privado", "Televisor", "Caja Fuerte", "Mini Bar", 
  "Máquina de Café", "Hervidor de Agua", "Secador de Pelo", "Plancha", "Escritorio",
  "Balcón", "Vista al Mar", "Vista a la Montaña", "Vista a la Ciudad", "Bañera",
  "Ducha a Ras de Suelo", "Cama King", "Cama Queen", "Camas Twin", "Sofá Cama",
  "Internet de Alta Velocidad", "Cortinas Opacas", "Insonorizado", "Servicio de Habitaciones",
  "Menú de Almohadas", "Servicio de Apertura de Cama", "Despertador", "Teléfono",
  "Habitaciones Comunicadas", "Cuna Disponible", "Camas Supletorias",
  "Ropa de Cama Hipoalergénica", "Batas y Zapatillas", "Productos de Aseo Premium"
];

// Real hotel data by country (excluding Italy)
const REAL_HOTELS = {
  'Poland': [
    { name: 'Hotel Bristol Warsaw', city: 'Warsaw', address: 'Krakowskie Przedmieście 42/44, 00-325 Warsaw' },
    { name: 'Sofitel Warsaw Victoria', city: 'Warsaw', address: 'ul. Królewska 11, 00-065 Warsaw' },
    { name: 'Hotel Copernicus', city: 'Krakow', address: 'ul. Kanonicza 16, 31-002 Krakow' },
    { name: 'Sheraton Grand Krakow', city: 'Krakow', address: 'ul. Powiśle 7, 31-101 Krakow' },
    { name: 'Hilton Gdansk', city: 'Gdansk', address: 'ul. Targ Rybny 1, 80-838 Gdansk' }
  ],
  'Hungary': [
    { name: 'Four Seasons Hotel Gresham Palace', city: 'Budapest', address: 'Széchenyi István tér 5-6, 1051 Budapest' },
    { name: 'The Ritz-Carlton Budapest', city: 'Budapest', address: 'Erzsébet tér 9-10, 1051 Budapest' },
    { name: 'Aria Hotel Budapest', city: 'Budapest', address: 'Hercegprímás utca 5, 1051 Budapest' },
    { name: 'Kempinski Hotel Corvinus', city: 'Budapest', address: 'Erzsébet tér 7-8, 1051 Budapest' },
    { name: 'InterContinental Budapest', city: 'Budapest', address: 'Apáczai Csere János u. 12-14, 1052 Budapest' }
  ],
  'Romania': [
    { name: 'JW Marriott Bucharest Grand Hotel', city: 'Bucharest', address: 'Calea 13 Septembrie 90, 050726 Bucharest' },
    { name: 'Radisson Blu Hotel Bucharest', city: 'Bucharest', address: 'Calea Victoriei 63-81, 010065 Bucharest' },
    { name: 'InterContinental Bucharest', city: 'Bucharest', address: 'Bulevardul Nicolae Bălcescu 4, 010051 Bucharest' },
    { name: 'Hilton Sibiu', city: 'Sibiu', address: 'Strada Colonel Enescu 1-3, 550012 Sibiu' },
    { name: 'Hotel Privo', city: 'Cluj-Napoca', address: 'Strada Iuliu Maniu 2, 400094 Cluj-Napoca' }
  ],
  'Canada': [
    { name: 'Fairmont Royal York', city: 'Toronto', address: '100 Front St W, Toronto, ON M5J 1E3' },
    { name: 'The Ritz-Carlton Toronto', city: 'Toronto', address: '181 Wellington St W, Toronto, ON M5V 3G7' },
    { name: 'Fairmont Château Frontenac', city: 'Quebec City', address: '1 Rue des Carrières, Quebec City, QC G1R 4P5' },
    { name: 'Fairmont Hotel Vancouver', city: 'Vancouver', address: '900 W Georgia St, Vancouver, BC V6C 2W6' },
    { name: 'The Westin Harbour Castle', city: 'Toronto', address: '1 Harbour Sq, Toronto, ON M5J 1A6' }
  ],
  'Ireland': [
    { name: 'The Shelbourne', city: 'Dublin', address: '27 St Stephen\'s Green, Dublin 2' },
    { name: 'Conrad Dublin', city: 'Dublin', address: 'Earlsfort Terrace, Dublin 2' },
    { name: 'The Fitzwilliam Hotel', city: 'Dublin', address: 'St Stephen\'s Green, Dublin 2' },
    { name: 'Ashford Castle', city: 'Cong', address: 'Cong, Co. Mayo F31 CA48' },
    { name: 'The Europe Hotel & Resort', city: 'Killarney', address: 'Fossa, Killarney, Co. Kerry V93 YNP5' }
  ],
  'Germany': [
    { name: 'Hotel Adlon Kempinski', city: 'Berlin', address: 'Unter den Linden 77, 10117 Berlin' },
    { name: 'The Ritz-Carlton Berlin', city: 'Berlin', address: 'Potsdamer Platz 3, 10785 Berlin' },
    { name: 'Bayerischer Hof', city: 'Munich', address: 'Promenadeplatz 2-6, 80333 Munich' },
    { name: 'Hotel Vier Jahreszeiten Kempinski', city: 'Munich', address: 'Maximilianstrasse 17, 80539 Munich' },
    { name: 'Fairmont Hotel Vier Jahreszeiten', city: 'Hamburg', address: 'Neuer Jungfernstieg 9-14, 20354 Hamburg' }
  ],
  'Portugal': [
    { name: 'The Yeatman', city: 'Porto', address: 'Rua do Choupelo, 4400-088 Vila Nova de Gaia' },
    { name: 'Four Seasons Hotel Ritz Lisbon', city: 'Lisbon', address: 'Rua Rodrigo da Fonseca 88, 1099-039 Lisbon' },
    { name: 'Tivoli Oriente', city: 'Lisbon', address: 'Oriente Station, Av. Dom João II 1.17.01, 1990-083 Lisbon' },
    { name: 'Pestana Palace Lisboa', city: 'Lisbon', address: 'Rua Jau 54, 1300-314 Lisbon' },
    { name: 'InterContinental Porto', city: 'Porto', address: 'Praça da Liberdade 25, 4000-322 Porto' }
  ],
  'Belgium': [
    { name: 'Hotel des Galeries', city: 'Brussels', address: 'Rue des Bouchers 38, 1000 Brussels' },
    { name: 'Rocco Forte Hotel des Galeries', city: 'Brussels', address: 'Galerie du Roi 5, 1000 Brussels' },
    { name: 'Hotel Heritage', city: 'Bruges', address: 'Niklaas Desparsstraat 11, 8000 Bruges' },
    { name: 'The Hotel Brussels', city: 'Brussels', address: 'Boulevard de Waterloo 38, 1000 Brussels' },
    { name: 'Hilton Antwerp Old Town', city: 'Antwerp', address: 'Groenplaats 32, 2000 Antwerp' }
  ],
  'Netherlands': [
    { name: 'Waldorf Astoria Amsterdam', city: 'Amsterdam', address: 'Herengracht 542-556, 1017 CG Amsterdam' },
    { name: 'The Hoxton Amsterdam', city: 'Amsterdam', address: 'Herengracht 255, 1016 BJ Amsterdam' },
    { name: 'Conservatorium Hotel', city: 'Amsterdam', address: 'Van Baerlestraat 27, 1071 AN Amsterdam' },
    { name: 'Grand Hotel Amrâth Amsterdam', city: 'Amsterdam', address: 'Prins Hendrikkade 108, 1011 AK Amsterdam' },
    { name: 'Hotel New York Rotterdam', city: 'Rotterdam', address: 'Koninginnenhoofd 1, 3072 AD Rotterdam' }
  ],
  'Luxembourg': [
    { name: 'Hotel Le Royal', city: 'Luxembourg City', address: '12 Boulevard Royal, 2449 Luxembourg' },
    { name: 'Sofitel Luxembourg Europe', city: 'Luxembourg City', address: '4 Rue du Fort Niedergrünewald, 2226 Luxembourg' },
    { name: 'Grand Hotel Cravat', city: 'Luxembourg City', address: '29 Boulevard Franklin Delano Roosevelt, 2450 Luxembourg' },
    { name: 'Hotel Simoncini', city: 'Luxembourg City', address: '6 Rue Notre-Dame, 2240 Luxembourg' },
    { name: 'Novotel Luxembourg Centre', city: 'Luxembourg City', address: '35 Rue du Laboratoire, 1911 Luxembourg' }
  ],
  'Switzerland': [
    { name: 'The Dolder Grand', city: 'Zurich', address: 'Kurhausstrasse 65, 8032 Zurich' },
    { name: 'Baur Au Lac', city: 'Zurich', address: 'Talstrasse 1, 8001 Zurich' },
    { name: 'Hotel Schweizerhof Bern', city: 'Bern', address: 'Bahnhofplatz 11, 3001 Bern' },
    { name: 'Grand Hotel Les Trois Rois', city: 'Basel', address: 'Blumenrain 8, 4001 Basel' },
    { name: 'Hotel Bellevue Palace', city: 'Bern', address: 'Kochergasse 3-5, 3011 Bern' }
  ],
  'Austria': [
    { name: 'Hotel Sacher Wien', city: 'Vienna', address: 'Philharmoniker Str. 4, 1010 Vienna' },
    { name: 'The Ritz-Carlton Vienna', city: 'Vienna', address: 'Schubertring 5-7, 1010 Vienna' },
    { name: 'Hotel Goldener Hirsch', city: 'Salzburg', address: 'Getreidegasse 37, 5020 Salzburg' },
    { name: 'Grand Hotel Wien', city: 'Vienna', address: 'Kärntner Ring 9, 1010 Vienna' },
    { name: 'Hotel Bristol Vienna', city: 'Vienna', address: 'Kärntner Ring 1, 1015 Vienna' }
  ],
  'Denmark': [
    { name: 'Hotel d\'Angleterre', city: 'Copenhagen', address: 'Kongens Nytorv 34, 1050 Copenhagen' },
    { name: 'Nimb Hotel', city: 'Copenhagen', address: 'Bernstorffsgade 5, 1577 Copenhagen' },
    { name: 'The Standard', city: 'Copenhagen', address: 'Havnegade 44, 1058 Copenhagen' },
    { name: 'Radisson Collection Royal Hotel', city: 'Copenhagen', address: 'Hammerichsgade 1, 1611 Copenhagen' },
    { name: 'Hotel Sanders', city: 'Copenhagen', address: 'Tordenskjoldsgade 15, 1055 Copenhagen' }
  ],
  'Norway': [
    { name: 'Hotel Continental Oslo', city: 'Oslo', address: 'Stortingsgata 24/26, 0117 Oslo' },
    { name: 'The Thief', city: 'Oslo', address: 'Landgangen 1, 0252 Oslo' },
    { name: 'Britannia Hotel', city: 'Trondheim', address: 'Dronningens gate 5, 7011 Trondheim' },
    { name: 'Hotel Union Øye', city: 'Øye', address: '6210 Øye, Stranda' },
    { name: 'Radisson Blu Royal Hotel', city: 'Bergen', address: 'Bryggen, 5003 Bergen' }
  ],
  'Sweden': [
    { name: 'Grand Hôtel Stockholm', city: 'Stockholm', address: 'Södra Blasieholmshamnen 8, 103 27 Stockholm' },
    { name: 'Hotel Diplomat Stockholm', city: 'Stockholm', address: 'Strandvägen 7C, 114 56 Stockholm' },
    { name: 'At Six', city: 'Stockholm', address: 'Brunkebergstorg 6, 111 51 Stockholm' },
    { name: 'Elite Hotel Marina Tower', city: 'Stockholm', address: 'Saltsjöqvarn 25, 131 71 Nacka' },
    { name: 'Clarion Hotel Post', city: 'Gothenburg', address: 'Drottningtorget 10, 411 03 Gothenburg' }
  ],
  'Greece': [
    { name: 'Hotel Grande Bretagne', city: 'Athens', address: 'Vasileos Georgiou A\' 1, 105 64 Athens' },
    { name: 'King George Athens', city: 'Athens', address: '3 Vasileos Georgiou A, 105 64 Athens' },
    { name: 'Katikies Hotel', city: 'Santorini', address: 'Oia, 847 02 Santorini' },
    { name: 'Grace Hotel Santorini', city: 'Santorini', address: 'Imerovigli, 847 00 Santorini' },
    { name: 'Mykonos Grand Hotel & Resort', city: 'Mykonos', address: 'Ayios Yiannis, 846 00 Mykonos' }
  ],
  'Finland': [
    { name: 'Hotel Kämp', city: 'Helsinki', address: 'Pohjoisesplanadi 29, 00100 Helsinki' },
    { name: 'Hotel St. George', city: 'Helsinki', address: 'Yrjönkatu 13, 00120 Helsinki' },
    { name: 'Scandic Helsinki City', city: 'Helsinki', address: 'Mannerheiminaukio 1B, 00100 Helsinki' },
    { name: 'Hotel Levi Panorama', city: 'Levi', address: 'Panoramatielle 5, 99130 Levi' },
    { name: 'Hotel Arctic TreeHouse', city: 'Rovaniemi', address: 'Tarvantie 3, 96930 Vikajärvi' }
  ],
  'Iceland': [
    { name: 'Hotel Borg', city: 'Reykjavik', address: 'Pósthússtræti 11, 101 Reykjavík' },
    { name: 'Canopy by Hilton Reykjavik City Centre', city: 'Reykjavik', address: 'Smáralind, 201 Kópavogur' },
    { name: 'ION Adventure Hotel', city: 'Selfoss', address: 'Nesjavellir, 801 Selfoss' },
    { name: 'Hotel Ranga', city: 'Hella', address: 'Suðurlandsvegur, 851 Hella' },
    { name: 'The Retreat at Blue Lagoon', city: 'Grindavik', address: 'Nordurljosavegur 9, 240 Grindavík' }
  ],
  'France': [
    { name: 'The Ritz Paris', city: 'Paris', address: '15 Place Vendôme, 75001 Paris' },
    { name: 'Four Seasons Hotel George V', city: 'Paris', address: '31 Avenue George V, 75008 Paris' },
    { name: 'Le Bristol Paris', city: 'Paris', address: '112 Rue du Faubourg Saint-Honoré, 75008 Paris' },
    { name: 'Hotel Martinez', city: 'Cannes', address: '73 Boulevard de la Croisette, 06400 Cannes' },
    { name: 'InterContinental Carlton Cannes', city: 'Cannes', address: '58 Boulevard de la Croisette, 06414 Cannes' }
  ],
  'United Kingdom': [
    { name: 'The Savoy', city: 'London', address: 'Strand, London WC2R 0EU' },
    { name: 'Claridge\'s', city: 'London', address: 'Brook St, London W1K 4HR' },
    { name: 'The Ritz London', city: 'London', address: '150 Piccadilly, St. James\'s, London W1J 9BR' },
    { name: 'The Balmoral', city: 'Edinburgh', address: '1 Princes St, Edinburgh EH2 2EQ' },
    { name: 'The Midland', city: 'Manchester', address: '16 Peter St, Manchester M60 2DS' }
  ],
  'Turkey': [
    { name: 'Four Seasons Hotel Istanbul at Sultanahmet', city: 'Istanbul', address: 'Tevkifhane Sk. No:1, 34122 Sultanahmet' },
    { name: 'The Ritz-Carlton Istanbul', city: 'Istanbul', address: 'Suzer Plaza, Askerocagi Cd. No:15, 34367 Sisli' },
    { name: 'Ciragan Palace Kempinski', city: 'Istanbul', address: 'Çırağan Cd. No:32, 34349 Beşiktaş' },
    { name: 'Museum Hotel', city: 'Cappadocia', address: 'Tekelli Mah. No:1, 50240 Uchisar' },
    { name: 'Argos in Cappadocia', city: 'Cappadocia', address: 'Kayalar Mevkii, 50240 Uchisar' }
  ],
  'Thailand': [
    { name: 'The Oriental Bangkok', city: 'Bangkok', address: '48 Oriental Avenue, Bang Rak, Bangkok 10500' },
    { name: 'The Siam', city: 'Bangkok', address: '3/2 Thanon Khao, Vachirapayabal, Dusit, Bangkok 10300' },
    { name: 'Anantara Siam Bangkok Hotel', city: 'Bangkok', address: '155 Rajadamri Road, Lumpini, Pathumwan, Bangkok 10330' },
    { name: 'Rayavadee', city: 'Krabi', address: '214 Moo 2, Tambon Ao Nang, Krabi 81000' },
    { name: 'The Nai Harn', city: 'Phuket', address: '23/3 Viset Road, Rawai, Muang, Phuket 83130' }
  ],
  'Morocco': [
    { name: 'La Mamounia', city: 'Marrakech', address: 'Avenue Bab Jdid, Marrakech 40040' },
    { name: 'Royal Mansour Marrakech', city: 'Marrakech', address: 'Rue Abou Abbas El Sebti, Marrakech 40000' },
    { name: 'Four Seasons Resort Marrakech', city: 'Marrakech', address: '1 Boulevard de la Menara, Marrakech 40000' },
    { name: 'Hotel & Ryad Art Place Marrakech', city: 'Marrakech', address: '279 Rue Mohammed El Beqal, Marrakech 40000' },
    { name: 'Sofitel Rabat Jardin des Roses', city: 'Rabat', address: 'Quartier Aviation, BP 450, Rabat 10100' }
  ]
};

function getRandomElements<T>(array: T[], min: number, max: number): T[] {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateSmartPrice(): number {
  const min = 950;
  const max = 1400;
  
  // 50% chance for multiples of 20, 50% chance for ending in 95
  if (Math.random() < 0.5) {
    // Generate multiples of 20
    const minMultiple = Math.ceil(min / 20);
    const maxMultiple = Math.floor(max / 20);
    const randomMultiple = Math.floor(Math.random() * (maxMultiple - minMultiple + 1)) + minMultiple;
    return randomMultiple * 20;
  } else {
    // Generate numbers ending in 95
    const base = Math.floor(Math.random() * ((max - 95) / 100 - (min - 95) / 100 + 1)) + Math.floor((min - 95) / 100);
    return base * 100 + 95;
  }
}

function getRandomCountry(): string {
  return APPROVED_COUNTRIES[Math.floor(Math.random() * APPROVED_COUNTRIES.length)];
}

function getRandomHotel(country: string) {
  const hotels = REAL_HOTELS[country] || [];
  if (hotels.length === 0) {
    throw new Error(`No hotels available for country: ${country}`);
  }
  return hotels[Math.floor(Math.random() * hotels.length)];
}

function createHotelFeaturesObject(selectedFeatures: string[]): Record<string, boolean> {
  const features: Record<string, boolean> = {};
  selectedFeatures.forEach(feature => {
    features[feature] = true;
  });
  return features;
}

serve(async (req) => {
  console.log('Batch hotel creation request received');
  
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { count = 20, category } = await req.json();
    console.log(`Starting batch hotel creation: ${count} hotels, category ${category}`);

    const results = [];
    const errors = [];

    for (let i = 0; i < count; i++) {
      try {
        const country = getRandomCountry();
        const hotelData = getRandomHotel(country);
        const price = generateSmartPrice();
        
        // Generate random features within specified ranges
        const selectedHotelFeatures = getRandomElements(HOTEL_FEATURES, 12, 19);
        const selectedRoomFeatures = getRandomElements(ROOM_FEATURES, 7, 12);
        
        const hotel = {
          name: hotelData.name,
          description: `Experience luxury and comfort at ${hotelData.name}, a premium hotel offering exceptional service and modern amenities in the heart of ${hotelData.city}.`,
          country: country,
          city: hotelData.city,
          address: hotelData.address,
          price_per_month: price,
          category: category || Math.floor(Math.random() * 2) + 3, // 3-4 stars
          property_type: 'Hotel',
          style: 'Modern',
          ideal_guests: 'Business travelers, couples, and leisure guests seeking premium accommodations',
          atmosphere: 'Sophisticated and welcoming with contemporary design',
          perfect_location: `Ideally located in ${hotelData.city} with easy access to major attractions and business districts`,
          available_months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          stay_lengths: [32], // Only 32-day stays allowed
          meal_plans: ['breakfast', 'half-board'],
          features_hotel: createHotelFeaturesObject(selectedHotelFeatures),
          features_room: createHotelFeaturesObject(selectedRoomFeatures),
          status: 'approved',
          is_featured: Math.random() < 0.3,
          latitude: Math.random() * 180 - 90,
          longitude: Math.random() * 360 - 180,
          contact_name: `${hotelData.name} Manager`,
          contact_email: `info@${hotelData.name.toLowerCase().replace(/\s+/g, '')}.com`,
          contact_phone: '+1-555-0123',
          terms: 'Standard hotel terms and conditions apply. Check-in at 3 PM, check-out at 11 AM.'
        };

        const { data, error } = await supabase
          .from('hotels')
          .insert([hotel])
          .select()
          .single();

        if (error) {
          console.error(`Error creating hotel ${i + 1}:`, error);
          errors.push(`Hotel ${i + 1}: ${error.message}`);
        } else {
          console.log(`Created hotel: ${hotel.name} - €${price}/month`);
          results.push(data);
        }
      } catch (error) {
        console.error(`Error processing hotel ${i + 1}:`, error);
        errors.push(`Hotel ${i + 1}: ${error.message}`);
      }
    }

    console.log(`Batch creation completed. Created: ${results.length}, Errors: ${errors.length}`);

    return new Response(
      JSON.stringify({
        success: true,
        created: results.length,
        errors: errors.length,
        hotels: results,
        errorMessages: errors
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Batch creation error:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
