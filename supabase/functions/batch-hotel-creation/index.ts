
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BatchResult {
  success: boolean;
  message: string;
  stats: {
    totalCreated: number;
    errors: string[];
    hotelDetails: Array<{
      id: string;
      name: string;
      city: string;
      country: string;
    }>;
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { count } = await req.json();
    
    if (!count || count < 1 || count > 100) {
      throw new Error('Count must be between 1 and 100');
    }

    // Fetch real themes and activities from database
    const { data: themes } = await supabaseClient
      .from('themes')
      .select('id, name, category')
      .limit(50);

    const { data: activities } = await supabaseClient
      .from('activities')
      .select('id, name, category')
      .limit(50);

    // Authorized countries with ISO codes
    const authorizedCountries = [
      { name: "Poland", code: "PL", cities: ["Warsaw", "Krakow", "Gdansk", "Wroclaw", "Poznan"] },
      { name: "Hungary", code: "HU", cities: ["Budapest", "Debrecen", "Szeged", "Miskolc", "Pecs"] },
      { name: "Romania", code: "RO", cities: ["Bucharest", "Cluj-Napoca", "Timisoara", "Iasi", "Constanta"] },
      { name: "Canada", code: "CA", cities: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"] },
      { name: "Ireland", code: "IE", cities: ["Dublin", "Cork", "Galway", "Limerick", "Waterford"] },
      { name: "Germany", code: "DE", cities: ["Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne"] },
      { name: "Portugal", code: "PT", cities: ["Lisbon", "Porto", "Braga", "Coimbra", "Aveiro"] },
      { name: "Belgium", code: "BE", cities: ["Brussels", "Antwerp", "Ghent", "Bruges", "Leuven"] },
      { name: "Netherlands", code: "NL", cities: ["Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven"] },
      { name: "Luxembourg", code: "LU", cities: ["Luxembourg City", "Esch-sur-Alzette", "Differdange", "Dudelange"] },
      { name: "Switzerland", code: "CH", cities: ["Zurich", "Geneva", "Basel", "Bern", "Lausanne"] },
      { name: "Austria", code: "AT", cities: ["Vienna", "Salzburg", "Innsbruck", "Graz", "Linz"] },
      { name: "Denmark", code: "DK", cities: ["Copenhagen", "Aarhus", "Odense", "Aalborg", "Esbjerg"] },
      { name: "Norway", code: "NO", cities: ["Oslo", "Bergen", "Trondheim", "Stavanger", "Kristiansand"] },
      { name: "Sweden", code: "SE", cities: ["Stockholm", "Gothenburg", "Malmö", "Uppsala", "Linköping"] },
      { name: "Greece", code: "GR", cities: ["Athens", "Thessaloniki", "Patras", "Heraklion", "Rhodes"] },
      { name: "Finland", code: "FI", cities: ["Helsinki", "Espoo", "Tampere", "Turku", "Oulu"] },
      { name: "Iceland", code: "IS", cities: ["Reykjavik", "Akureyri", "Keflavik", "Hafnarfjordur"] },
      { name: "France", code: "FR", cities: ["Paris", "Lyon", "Marseille", "Toulouse", "Nice"] },
      { name: "United Kingdom", code: "GB", cities: ["London", "Manchester", "Birmingham", "Edinburgh", "Glasgow"] },
      { name: "Turkey", code: "TR", cities: ["Istanbul", "Ankara", "Izmir", "Bursa", "Antalya"] },
      { name: "Thailand", code: "TH", cities: ["Bangkok", "Chiang Mai", "Phuket", "Pattaya", "Hua Hin"] },
      { name: "Japan", code: "JP", cities: ["Tokyo", "Osaka", "Kyoto", "Nagoya", "Sapporo"] }
    ];

    // Mid-range hotel name patterns (no luxury terms)
    const hotelPrefixes = [
      "Hotel", "City Hotel", "Central Hotel", "Park Hotel", "Garden Hotel", 
      "River Hotel", "Bridge Hotel", "Station Hotel", "Market Hotel", "Town Hotel",
      "Holiday Inn", "Best Western", "Comfort Inn", "Quality Hotel", "Ibis",
      "Mercure", "Novotel", "Travelodge", "Premier Inn", "Holiday Express"
    ];

    const hotelSuffixes = [
      "Center", "Plaza", "Inn", "Suites", "Lodge", "Resort", "Hotel",
      "Business Hotel", "City Center", "Downtown", "Express", "Select"
    ];

    // Property types and styles from your filters
    const propertyTypes = ["Hotel", "Resort", "Boutique Hotel", "Motel", "Inn"];
    const propertyStyles = ["Classic", "Classic Elegant", "Modern", "Fusion", "Urban", "Minimalist"];

    // Hotel and room features from your system
    const hotelFeatures = [
      "WiFi Gratis", "Estacionamiento", "Restaurante", "Piscina", "Gimnasio", 
      "Recepción 24/7", "Servicio de Habitaciones", "Bar", "Salón", 
      "Centro de Negocios", "Servicio de Lavandería", "Conserjería", 
      "Traslado al Aeropuerto", "Jardín", "Terraza", "Centro de Fitness"
    ];

    const roomFeatures = [
      "Aire Acondicionado", "Baño Privado", "Televisor", "Caja Fuerte", "Mini Bar", 
      "Máquina de Café", "Hervidor de Agua", "Secador de Pelo", "Plancha", "Escritorio",
      "Balcón", "Internet de Alta Velocidad", "Cortinas Opacas", "Servicio de Habitaciones",
      "Teléfono", "Batas y Zapatillas", "Productos de Aseo Premium"
    ];

    const createdHotels = [];
    const errors = [];

    for (let i = 0; i < count; i++) {
      try {
        // Select random authorized country
        const country = authorizedCountries[Math.floor(Math.random() * authorizedCountries.length)];
        const city = country.cities[Math.floor(Math.random() * country.cities.length)];

        // Generate mid-range hotel name (avoiding luxury terms)
        const prefix = hotelPrefixes[Math.floor(Math.random() * hotelPrefixes.length)];
        const suffix = hotelSuffixes[Math.floor(Math.random() * hotelSuffixes.length)];
        const hotelName = Math.random() > 0.5 ? `${prefix} ${city}` : `${city} ${suffix}`;

        // Generate realistic address
        const streetNumbers = [1, 2, 3, 5, 8, 10, 12, 15, 18, 20, 25, 28, 30, 35, 40, 45, 50];
        const streetNames = [
          "Main Street", "High Street", "Church Street", "Market Street", "King Street",
          "Queen Street", "Victoria Street", "Park Avenue", "Oak Avenue", "Mill Road",
          "Station Road", "Castle Street", "Bridge Street", "Hill Street", "Garden Street"
        ];
        
        const streetNumber = streetNumbers[Math.floor(Math.random() * streetNumbers.length)];
        const streetName = streetNames[Math.floor(Math.random() * streetNames.length)];
        const address = `${streetNumber} ${streetName}`;

        // Generate postal code based on country
        let postalCode = "";
        switch (country.code) {
          case "DE":
            postalCode = `${Math.floor(Math.random() * 90000) + 10000}`;
            break;
          case "FR":
            postalCode = `${Math.floor(Math.random() * 90000) + 10000}`;
            break;
          case "GB":
            postalCode = `SW${Math.floor(Math.random() * 20) + 1} ${Math.floor(Math.random() * 9)}XX`;
            break;
          case "CA":
            postalCode = `K${Math.floor(Math.random() * 9)}${String.fromCharCode(65 + Math.floor(Math.random() * 26))} ${Math.floor(Math.random() * 9)}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 9)}`;
            break;
          default:
            postalCode = `${Math.floor(Math.random() * 90000) + 10000}`;
        }

        // Generate coordinates within country bounds (approximate)
        const coordRanges = {
          DE: { lat: [47.3, 55.1], lng: [5.9, 15.0] },
          FR: { lat: [41.3, 51.1], lng: [-5.2, 9.6] },
          GB: { lat: [49.9, 60.8], lng: [-8.2, 1.8] },
          PL: { lat: [49.0, 54.8], lng: [14.1, 24.1] },
          default: { lat: [45.0, 55.0], lng: [0.0, 10.0] }
        };
        
        const coords = coordRanges[country.code] || coordRanges.default;
        const latitude = coords.lat[0] + Math.random() * (coords.lat[1] - coords.lat[0]);
        const longitude = coords.lng[0] + Math.random() * (coords.lng[1] - coords.lng[0]);

        // Only 3-4 star category
        const category = Math.random() > 0.5 ? 3 : 4;

        // Random property type and style from allowed options
        const propertyType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
        const style = propertyStyles[Math.floor(Math.random() * propertyStyles.length)];

        // Price per person per month (€950-€1400)
        const basePrices = [950, 970, 995, 1020, 1040, 1095, 1120, 1140, 1195, 1220, 1240, 1295, 1320, 1340, 1395, 1400];
        const pricePerMonth = basePrices[Math.floor(Math.random() * basePrices.length)];

        // Generate hotel features (5-8 features)
        const selectedHotelFeatures = hotelFeatures
          .sort(() => 0.5 - Math.random())
          .slice(0, Math.floor(Math.random() * 4) + 5);
        
        const hotelFeaturesObj = {};
        selectedHotelFeatures.forEach(feature => {
          hotelFeaturesObj[feature] = true;
        });

        // Generate room features (8-12 features)
        const selectedRoomFeatures = roomFeatures
          .sort(() => 0.5 - Math.random())
          .slice(0, Math.floor(Math.random() * 5) + 8);
        
        const roomFeaturesObj = {};
        selectedRoomFeatures.forEach(feature => {
          roomFeaturesObj[feature] = true;
        });

        // Create hotel record
        const { data: hotel, error: hotelError } = await supabaseClient
          .from('hotels')
          .insert({
            name: hotelName,
            description: `A comfortable ${category}-star hotel located in the heart of ${city}. Perfect for business travelers and tourists alike, offering modern amenities and excellent service.`,
            country: country.code, // ISO code for form compatibility
            city: city,
            address: address,
            postal_code: postalCode,
            latitude: latitude,
            longitude: longitude,
            price_per_month: pricePerMonth,
            category: category,
            property_type: propertyType,
            style: style,
            ideal_guests: `Business travelers, couples, and tourists exploring ${city}`,
            atmosphere: `Comfortable and welcoming with a ${style.toLowerCase()} design`,
            perfect_location: `Central location in ${city} with easy access to main attractions and business district`,
            features_hotel: hotelFeaturesObj,
            features_room: roomFeaturesObj,
            meal_plans: ["Half Board"],
            stay_lengths: [32],
            available_months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            status: 'approved',
            is_featured: false,
            room_types: [{
              name: "Double Room",
              description: "Comfortable double room with modern amenities",
              maxOccupancy: 2,
              size: 25,
              roomCount: Math.floor(Math.random() * 20) + 10,
              basePrice: pricePerMonth,
              rates: {
                "32": pricePerMonth
              }
            }],
            rates: {
              "32": pricePerMonth
            },
            terms: "32-day minimum stay required. Half board meal plan included. Check-in on Mondays preferred.",
            preferredWeekday: "Monday"
          })
          .select('id, name, city, country')
          .single();

        if (hotelError) {
          console.error('Hotel creation error:', hotelError);
          errors.push(`Failed to create hotel ${hotelName}: ${hotelError.message}`);
          continue;
        }

        // Add themes (1-3 random themes)
        if (themes && themes.length > 0) {
          const selectedThemes = themes
            .sort(() => 0.5 - Math.random())
            .slice(0, Math.floor(Math.random() * 3) + 1);

          for (const theme of selectedThemes) {
            await supabaseClient
              .from('hotel_themes')
              .insert({
                hotel_id: hotel.id,
                theme_id: theme.id
              });
          }
        }

        // Add activities (1-3 random activities)
        if (activities && activities.length > 0) {
          const selectedActivities = activities
            .sort(() => 0.5 - Math.random())
            .slice(0, Math.floor(Math.random() * 3) + 1);

          for (const activity of selectedActivities) {
            await supabaseClient
              .from('hotel_activities')
              .insert({
                hotel_id: hotel.id,
                activity_id: activity.id
              });
          }
        }

        createdHotels.push({
          id: hotel.id,
          name: hotel.name,
          city: hotel.city,
          country: hotel.country
        });

        console.log(`Successfully created hotel: ${hotel.name} in ${city}, ${country.name}`);

      } catch (error) {
        console.error('Error creating hotel:', error);
        errors.push(`Hotel creation failed: ${error.message}`);
      }
    }

    const result: BatchResult = {
      success: createdHotels.length > 0,
      message: `Successfully created ${createdHotels.length} out of ${count} requested hotels`,
      stats: {
        totalCreated: createdHotels.length,
        errors: errors,
        hotelDetails: createdHotels
      }
    };

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error("Error in batch-hotel-creation function:", error);
    
    return new Response(JSON.stringify({ 
      success: false,
      message: "Failed to create hotels",
      stats: {
        totalCreated: 0,
        errors: [error.message],
        hotelDetails: []
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
