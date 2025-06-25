
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Authorized countries list (21 countries)
const AUTHORIZED_COUNTRIES = [
  'Spain', 'Portugal', 'France', 'Italy', 'Germany', 'Netherlands', 
  'Belgium', 'Switzerland', 'Austria', 'United Kingdom', 'Ireland',
  'Denmark', 'Sweden', 'Norway', 'Finland', 'Poland', 'Czech Republic',
  'Hungary', 'Estonia', 'Latvia', 'Lithuania'
];

// Luxury brands to exclude
const LUXURY_BRANDS = [
  'Four Seasons', 'Ritz-Carlton', 'St. Regis', 'Mandarin Oriental',
  'Waldorf Astoria', 'Conrad', 'Park Hyatt', 'Grand Hyatt',
  'W Hotels', 'Edition', 'Bulgari', 'Aman', 'One&Only',
  'Rosewood', 'Auberge', 'Montage', 'Peninsula', 'Shangri-La'
];

// Real hotel data with verified information
const REAL_HOTELS = [
  {
    name: "Hotel Scandic Oslo City",
    country: "Norway",
    city: "Oslo",
    category: 4,
    brand: "Scandic",
    description: "Modern business hotel in central Oslo with contemporary Scandinavian design and excellent conference facilities.",
    address: "Europarådsplass 1, 0154 Oslo",
    latitude: 59.9139,
    longitude: 10.7522,
    property_type: "Business Hotel",
    style: "Contemporary",
    ideal_guests: "Business travelers and urban explorers seeking modern comfort in the heart of Oslo",
    atmosphere: "Professional yet welcoming with clean Nordic design and efficient service",
    perfect_location: "Central Oslo location with easy access to government district and shopping areas"
  },
  {
    name: "Best Western Hotel Bentleys",
    country: "United Kingdom", 
    city: "London",
    category: 3,
    brand: "Best Western",
    description: "Charming boutique hotel in the heart of London combining traditional English hospitality with modern amenities.",
    address: "27-33 Harrington Gardens, Kensington, London SW7 4JX",
    latitude: 51.4944,
    longitude: -0.1826,
    property_type: "Boutique Hotel",
    style: "Traditional",
    ideal_guests: "Leisure travelers and couples looking for classic London charm in prestigious Kensington",
    atmosphere: "Intimate and sophisticated with traditional British elegance and personal service",
    perfect_location: "Prime Kensington location near museums, Hyde Park, and luxury shopping"
  },
  {
    name: "Hotel NH Copenhagen",
    country: "Denmark",
    city: "Copenhagen", 
    category: 4,
    brand: "NH Hotels",
    description: "Contemporary hotel offering modern comfort and Danish design in Copenhagen's vibrant city center.",
    address: "Vesterbrogade 41, 1620 Copenhagen",
    latitude: 55.6738,
    longitude: 12.5507,
    property_type: "City Hotel",
    style: "Modern",
    ideal_guests: "International business travelers and tourists seeking quality accommodation in central Copenhagen",
    atmosphere: "Sleek and efficient with Danish design elements and professional service standards",
    perfect_location: "Central Copenhagen with walking distance to Tivoli Gardens and main attractions"
  },
  {
    name: "Ibis Styles Berlin Mitte",
    country: "Germany",
    city: "Berlin",
    category: 3,
    brand: "Ibis Styles",
    description: "Vibrant design hotel in Berlin's historic Mitte district with colorful interiors and modern comfort.",
    address: "Brunnenstraße 1-2, 10119 Berlin",
    latitude: 52.5322,
    longitude: 13.3936,
    property_type: "Design Hotel",
    style: "Contemporary",
    ideal_guests: "Creative travelers and millennials exploring Berlin's cultural scene and nightlife",
    atmosphere: "Energetic and artistic with bold colors and contemporary design throughout",
    perfect_location: "Historic Mitte location near Museum Island and Brandenburg Gate"
  },
  {
    name: "Holiday Inn Express Amsterdam",
    country: "Netherlands",
    city: "Amsterdam",
    category: 3,
    brand: "Holiday Inn Express",
    description: "Smart and efficient hotel offering comfortable accommodation near Amsterdam's historic center.",
    address: "Sloterdijk 15, 1043 HR Amsterdam",
    latitude: 52.3886,
    longitude: 4.8371,
    property_type: "Business Hotel",
    style: "Modern",
    ideal_guests: "Business and leisure travelers seeking reliable comfort with easy city access",
    atmosphere: "Clean and contemporary with efficient service and comfortable common areas",
    perfect_location: "Convenient location with excellent transport links to Amsterdam city center"
  },
  {
    name: "Mercure Hotel Vienna Center",
    country: "Austria",
    city: "Vienna",
    category: 4,
    brand: "Mercure",
    description: "Elegant hotel combining imperial Viennese charm with modern amenities in the city center.",
    address: "Fleischmarkt 1a, 1010 Vienna",
    latitude: 48.2116,
    longitude: 16.3728,
    property_type: "Heritage Hotel",
    style: "Classic",
    ideal_guests: "Culture enthusiasts and sophisticated travelers seeking authentic Viennese experience",
    atmosphere: "Refined and cultural with imperial touches and classical music heritage",
    perfect_location: "Historic center location near St. Stephen's Cathedral and opera houses"
  },
  {
    name: "Novotel Zurich City West",
    country: "Switzerland",
    city: "Zurich",
    category: 4,
    brand: "Novotel",
    description: "Modern business hotel with contemporary Swiss design and excellent meeting facilities.",
    address: "Schiffbaustrasse 13, 8005 Zurich", 
    latitude: 47.3886,
    longitude: 8.5143,
    property_type: "Business Hotel",
    style: "Contemporary",
    ideal_guests: "International business travelers and conference attendees seeking modern efficiency",
    atmosphere: "Professional and sophisticated with Swiss precision and quality service",
    perfect_location: "Modern district with easy access to financial center and cultural attractions"
  },
  {
    name: "Hotel Clarion Brussels",
    country: "Belgium",
    city: "Brussels",
    category: 4,
    brand: "Clarion",
    description: "Contemporary hotel in the European capital offering modern comfort and business facilities.",
    address: "Avenue des Arts 7-8, 1210 Brussels",
    latitude: 50.8476,
    longitude: 4.3708,
    property_type: "Business Hotel", 
    style: "Modern",
    ideal_guests: "EU officials, business travelers, and tourists exploring the heart of Europe",
    atmosphere: "International and professional with European sophistication",
    perfect_location: "EU quarter location near European institutions and Grand Place"
  },
  {
    name: "Comfort Hotel Prague",
    country: "Czech Republic",
    city: "Prague",
    category: 3,
    brand: "Comfort",
    description: "Well-appointed hotel offering comfortable accommodation in Prague's historic quarter.",
    address: "Spálená 33, 110 00 Prague",
    latitude: 50.0835,
    longitude: 14.4282,
    property_type: "Historic Hotel",
    style: "Traditional",
    ideal_guests: "Heritage travelers and couples seeking authentic Prague atmosphere with modern comfort",
    atmosphere: "Charming and historic with traditional Czech hospitality and medieval ambiance",
    perfect_location: "Old Town location within walking distance of Prague Castle and Charles Bridge"
  },
  {
    name: "Hotel Ibis Budapest Centrum",
    country: "Hungary", 
    city: "Budapest",
    category: 3,
    brand: "Ibis",
    description: "Modern hotel on the Danube offering comfortable stays with views of Buda Castle.",
    address: "Apáczai Csere János u. 4, 1052 Budapest",
    latitude: 48.8566,
    longitude: 19.0511,
    property_type: "River Hotel",
    style: "Contemporary",
    ideal_guests: "Tourists and business travelers wanting central location with iconic river views",
    atmosphere: "Vibrant and welcoming with Hungarian warmth and Danube river ambiance",
    perfect_location: "Pest side location with stunning castle views and thermal bath access"
  },
  {
    name: "Quality Hotel Warsaw",
    country: "Poland",
    city: "Warsaw",
    category: 4,
    brand: "Quality",
    description: "Contemporary hotel in Warsaw's business district with modern Polish design elements.",
    address: "ul. Towarowa 2, 00-811 Warsaw",
    latitude: 52.2319,
    longitude: 21.0067,
    property_type: "Business Hotel",
    style: "Modern",
    ideal_guests: "Business travelers and urban explorers discovering modern Poland's capital",
    atmosphere: "Dynamic and progressive reflecting Warsaw's modern transformation",
    perfect_location: "Central business district with easy access to Old Town and cultural sites"
  },
  {
    name: "Hotel Europa Vilnius",
    country: "Lithuania",
    city: "Vilnius",
    category: 4,
    brand: "Europa",
    description: "Boutique hotel in Vilnius Old Town combining Baltic heritage with contemporary comfort.",
    address: "Aušros Vartų g. 6, 01304 Vilnius",
    latitude: 54.6896,
    longitude: 25.2799,
    property_type: "Heritage Hotel",
    style: "Traditional",
    ideal_guests: "Cultural travelers and history enthusiasts exploring the Baltic's medieval heritage",
    atmosphere: "Intimate and historic with Baltic charm and medieval Old Town character",
    perfect_location: "UNESCO Old Town location near Gate of Dawn and cathedral"
  },
  {
    name: "Hotel Tallink Riga",
    country: "Latvia",
    city: "Riga", 
    category: 4,
    brand: "Tallink",
    description: "Modern hotel in Riga's Art Nouveau district with Baltic Sea influence and contemporary design.",
    address: "Elizabetes iela 24, LV-1050 Riga",
    latitude: 56.9677,
    longitude: 24.1056,
    property_type: "City Hotel",
    style: "Contemporary",
    ideal_guests: "Architecture lovers and business travelers exploring the Baltic's cultural capital",
    atmosphere: "Elegant and artistic reflecting Riga's famous Art Nouveau architecture",
    perfect_location: "Central location in Art Nouveau district near Old Town and cultural sites"
  },
  {
    name: "Hotel Olympia Tallinn",
    country: "Estonia", 
    city: "Tallinn",
    category: 3,
    brand: "Olympia",
    description: "Well-located hotel offering comfortable accommodation near Tallinn's medieval Old Town.",
    address: "Liivalaia 33, 10118 Tallinn",
    latitude: 59.4286,
    longitude: 24.7574,
    property_type: "City Hotel",
    style: "Traditional",
    ideal_guests: "History enthusiasts and travelers exploring Estonia's medieval capital and digital innovation",
    atmosphere: "Welcoming and traditional with Estonian hospitality and medieval town charm",
    perfect_location: "Near Old Town with easy access to medieval walls and digital nomad scene"
  },
  {
    name: "Hotel Scandic Helsinki",
    country: "Finland",
    city: "Helsinki",
    category: 4,
    brand: "Scandic",
    description: "Contemporary hotel showcasing Finnish design with sustainable practices and modern amenities.",
    address: "Simonkatu 9, 00100 Helsinki",
    latitude: 60.1699,
    longitude: 24.9384,
    property_type: "Design Hotel",
    style: "Scandinavian",
    ideal_guests: "Design enthusiasts and eco-conscious travelers experiencing Finnish innovation and nature",
    atmosphere: "Minimalist and sustainable with authentic Finnish design and environmental consciousness",
    perfect_location: "Central Helsinki near Design District and Market Square"
  },
  {
    name: "Best Western Hotel Reykjavik",
    country: "Iceland",
    city: "Reykjavik",
    category: 3,
    brand: "Best Western", 
    description: "Comfortable hotel offering Nordic hospitality with easy access to Iceland's natural wonders.",
    address: "Rauðarárstígur 37, 105 Reykjavik",
    latitude: 64.1335,
    longitude: -21.8174,
    property_type: "Adventure Hotel",
    style: "Nordic",
    ideal_guests: "Adventure seekers and nature lovers exploring Iceland's unique landscapes and culture",
    atmosphere: "Cozy and adventurous with Icelandic warmth and expedition spirit",
    perfect_location: "Central Reykjavik with tour operator access and cultural attractions"
  },
  {
    name: "Hotel Novotel Lisboa",
    country: "Portugal",
    city: "Lisbon",
    category: 4,
    brand: "Novotel",
    description: "Modern hotel in Lisbon's business district with panoramic city views and Portuguese hospitality.",
    address: "Av. José Malhoa 1-1A, 1070-158 Lisbon",
    latitude: 38.7341,
    longitude: -9.1570,
    property_type: "Business Hotel",
    style: "Contemporary",
    ideal_guests: "Business travelers and urban explorers discovering Lisbon's blend of tradition and modernity",
    atmosphere: "Sophisticated and welcoming with Portuguese warmth and Atlantic influence",
    perfect_location: "Modern district with metro access to historic neighborhoods and coastal areas"
  },
  {
    name: "Hotel NH Madrid Centro",
    country: "Spain",
    city: "Madrid",
    category: 4,
    brand: "NH Hotels",
    description: "Elegant hotel in Madrid's cultural heart with Spanish sophistication and modern comfort.",
    address: "Paseo del Prado 48, 28014 Madrid",
    latitude: 40.4119,
    longitude: -3.6943,
    property_type: "Cultural Hotel",
    style: "Classic",
    ideal_guests: "Art lovers and cultural travelers exploring Madrid's world-class museums and cuisine",
    atmosphere: "Refined and cultural with Spanish elegance and artistic heritage",
    perfect_location: "Museum triangle location near Prado, Reina Sofia, and Thyssen museums"
  },
  {
    name: "Hotel Ibis Barcelona Centro",
    country: "Spain",
    city: "Barcelona",
    category: 3,
    brand: "Ibis",
    description: "Modern hotel in Barcelona's vibrant center with Catalan flair and Mediterranean comfort.",
    address: "Carrer Ribera 11, 08003 Barcelona",
    latitude: 41.3825,
    longitude: 2.1769,
    property_type: "City Hotel",
    style: "Mediterranean",
    ideal_guests: "Culture seekers and beach lovers exploring Gaudí's masterpieces and Mediterranean lifestyle",
    atmosphere: "Lively and artistic with Catalan creativity and Mediterranean warmth",
    perfect_location: "Born district location near Picasso Museum and Gothic Quarter"
  },
  {
    name: "Hotel Mercure Lyon Centre",
    country: "France",
    city: "Lyon",
    category: 4,
    brand: "Mercure",
    description: "Boutique hotel in Lyon's UNESCO World Heritage district with French gastronomy focus.",
    address: "129 Rue Servient, 69003 Lyon",
    latitude: 45.7640,
    longitude: 4.8357,
    property_type: "Gastronomy Hotel",
    style: "French Classic",
    ideal_guests: "Food enthusiasts and culture travelers discovering France's gastronomic capital",
    atmosphere: "Culinary and sophisticated with French gastronomy heritage and regional wine culture",
    perfect_location: "Presqu'île location near Michelin-starred restaurants and Renaissance architecture"
  }
];

// Hotel and room features from platform
const HOTEL_FEATURES = [
  "WiFi Gratis", "Estacionamiento", "Restaurante", "Piscina", "Spa", "Gimnasio", 
  "Recepción 24/7", "Servicio de Habitaciones", "Bar", "Salón", 
  "Centro de Negocios", "Salas de Conferencias", "Servicio de Lavandería",
  "Conserjería", "Traslado al Aeropuerto", "Acepta Mascotas",
  "Acceso a la Playa", "Vista a la Montaña", "Jardín", "Terraza",
  "Centro de Fitness", "Sauna", "Jacuzzi", "Baño de Vapor"
];

const ROOM_FEATURES = [
  "Aire Acondicionado", "Baño Privado", "Televisor", "Caja Fuerte", "Mini Bar", 
  "Máquina de Café", "Hervidor de Agua", "Secador de Pelo", "Plancha", "Escritorio",
  "Balcón", "Vista al Mar", "Vista a la Montaña", "Vista a la Ciudad", "Bañera",
  "Ducha a Ras de Suelo", "Cama King", "Cama Queen", "Internet de Alta Velocidad", 
  "Cortinas Opacas", "Insonorizado", "Servicio de Habitaciones"
];

const MEAL_PLANS = ["Media Pensión", "Pensión Completa", "Solo Alojamiento", "Desayuno Incluido"];

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    console.log("Batch hotel creation request received");

    const { maxHotels = 20 } = await req.json();

    // Filter real hotels by authorized countries and exclude luxury brands
    const availableHotels = REAL_HOTELS.filter(hotel => 
      AUTHORIZED_COUNTRIES.includes(hotel.country) &&
      !LUXURY_BRANDS.some(brand => hotel.name.includes(brand) || hotel.brand?.includes(brand))
    );

    console.log(`Available non-luxury hotels: ${availableHotels.length}`);
    console.log(`Starting batch hotel creation: ${maxHotels} hotels, category 3-4`);

    // Fetch themes and activities for assignment
    const { data: themes } = await supabase.from('themes').select('*');
    const { data: activities } = await supabase.from('activities').select('*');

    const stats = {
      totalCreated: 0,
      errors: [] as string[],
      hotelDetails: [] as string[]
    };

    // Select random hotels up to maxHotels limit
    const selectedHotels = availableHotels
      .sort(() => Math.random() - 0.5)
      .slice(0, maxHotels);

    for (const hotelData of selectedHotels) {
      try {
        // Generate price in range €1200-1600
        const basePrice = Math.floor(Math.random() * (1600 - 1200 + 1)) + 1200;
        
        // Select random features (8-15 hotel features, 6-12 room features)
        const selectedHotelFeatures = HOTEL_FEATURES
          .sort(() => Math.random() - 0.5)
          .slice(0, Math.floor(Math.random() * 8) + 8);
        
        const selectedRoomFeatures = ROOM_FEATURES
          .sort(() => Math.random() - 0.5)
          .slice(0, Math.floor(Math.random() * 7) + 6);

        // Convert features to boolean objects
        const hotelFeaturesObj = HOTEL_FEATURES.reduce((acc, feature) => {
          acc[feature] = selectedHotelFeatures.includes(feature);
          return acc;
        }, {} as Record<string, boolean>);

        const roomFeaturesObj = ROOM_FEATURES.reduce((acc, feature) => {
          acc[feature] = selectedRoomFeatures.includes(feature);
          return acc;
        }, {} as Record<string, boolean>);

        // Select random meal plans (1-2)
        const selectedMealPlans = MEAL_PLANS
          .sort(() => Math.random() - 0.5)
          .slice(0, Math.floor(Math.random() * 2) + 1);

        // Create room type with comprehensive details
        const roomType = {
          id: crypto.randomUUID(),
          name: "Habitación Doble",
          description: "Habitación confortable con cama doble, baño privado y todas las comodidades modernas para una estancia perfecta.",
          maxOccupancy: 2,
          size: Math.floor(Math.random() * (35 - 20 + 1)) + 20, // 20-35 m²
          roomCount: Math.floor(Math.random() * (15 - 5 + 1)) + 5, // 5-15 rooms
          basePrice: basePrice,
          rates: {
            7: Math.floor(basePrice * 0.95),
            14: Math.floor(basePrice * 0.90),
            21: Math.floor(basePrice * 0.85),
            32: Math.floor(basePrice * 0.80)
          },
          images: [
            `https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800`,
            `https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800`
          ],
          availabilityDates: []
        };

        // Create hotel record
        const hotelRecord = {
          name: hotelData.name,
          description: hotelData.description,
          country: hotelData.country,
          city: hotelData.city,
          address: hotelData.address,
          latitude: hotelData.latitude,
          longitude: hotelData.longitude,
          price_per_month: basePrice,
          category: hotelData.category,
          property_type: hotelData.property_type,
          style: hotelData.style,
          ideal_guests: hotelData.ideal_guests,
          atmosphere: hotelData.atmosphere,
          perfect_location: hotelData.perfect_location,
          status: 'approved',
          contact_name: `Manager ${hotelData.city}`,
          contact_email: `info@${hotelData.name.toLowerCase().replace(/\s+/g, '')}.com`,
          contact_phone: `+${Math.floor(Math.random() * 900000000) + 100000000}`,
          features_hotel: hotelFeaturesObj,
          features_room: roomFeaturesObj,
          meal_plans: selectedMealPlans,
          stay_lengths: [7, 14, 21, 32],
          room_types: [roomType],
          available_months: ["January", "February", "March", "April", "May", "June"],
          main_image_url: `https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200`,
          terms: "Términos y condiciones estándar del hotel. Cancelación gratuita hasta 48 horas antes. Check-in: 15:00, Check-out: 11:00.",
          preferredWeekday: "Monday",
          enable_price_increase: true,
          price_increase_cap: 20,
          enablePriceIncrease: true,
          priceIncreaseCap: 20,
          owner_id: "00000000-0000-0000-0000-000000000000" // Default system owner
        };

        // Insert hotel
        const { data: hotel, error: hotelError } = await supabase
          .from('hotels')
          .insert(hotelRecord)
          .select('id')
          .single();

        if (hotelError) {
          throw hotelError;
        }

        // Assign random themes (1-3)
        if (themes && themes.length > 0) {
          const selectedThemes = themes
            .sort(() => Math.random() - 0.5)
            .slice(0, Math.floor(Math.random() * 3) + 1);

          for (const theme of selectedThemes) {
            await supabase.from('hotel_themes').insert({
              hotel_id: hotel.id,
              theme_id: theme.id
            });
          }
        }

        // Assign random activities (1-3)
        if (activities && activities.length > 0) {
          const selectedActivities = activities
            .sort(() => Math.random() - 0.5)
            .slice(0, Math.floor(Math.random() * 3) + 1);

          for (const activity of selectedActivities) {
            await supabase.from('hotel_activities').insert({
              hotel_id: hotel.id,
              activity_id: activity.id
            });
          }
        }

        // Add main hotel image
        await supabase.from('hotel_images').insert({
          hotel_id: hotel.id,
          image_url: hotelRecord.main_image_url,
          is_main: true
        });

        // Add additional hotel images (2-4 more)
        const additionalImages = [
          `https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200`,
          `https://images.unsplash.com/photo-1578774204375-322dcabe8e0e?w=1200`,
          `https://images.unsplash.com/photo-1564013434775-7e5ac974c21e?w=1200`,
          `https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200`
        ].sort(() => Math.random() - 0.5).slice(0, Math.floor(Math.random() * 3) + 2);

        for (const imageUrl of additionalImages) {
          await supabase.from('hotel_images').insert({
            hotel_id: hotel.id,
            image_url: imageUrl,
            is_main: false
          });
        }

        stats.totalCreated++;
        stats.hotelDetails.push(`${hotelData.name} (${hotelData.city}, ${hotelData.country}) - €${basePrice}/month - ${hotelData.category}★`);

        console.log(`✓ Created: ${hotelData.name} - €${basePrice}/month`);

      } catch (error) {
        const errorMsg = `Hotel ${hotelData.name}: ${error.message}`;
        stats.errors.push(errorMsg);
        console.error(`Error creating hotel ${hotelData.name}:`, error);
      }
    }

    console.log(`Batch creation completed. Created: ${stats.totalCreated}, Errors: ${stats.errors.length}`);

    return new Response(JSON.stringify({
      success: true,
      stats
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });

  } catch (error) {
    console.error("Batch creation error:", error);
    return new Response(JSON.stringify({
      error: error instanceof Error ? error.message : "Internal server error"
    }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  }
});
