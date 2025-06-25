
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface Database {
  public: {
    Tables: {
      hotels: {
        Row: any
        Insert: any
        Update: any
      }
    }
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient<Database>(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { count } = await req.json()
    console.log(`Creating ${count} hotels...`)

    // Updated authorized locations with ISO country codes
    const authorizedLocations = [
      { country: "ES", countryName: "Spain", cities: ["Madrid", "Barcelona", "Valencia", "Seville", "Bilbao"] },
      { country: "FR", countryName: "France", cities: ["Paris", "Lyon", "Marseille", "Nice", "Toulouse"] },
      { country: "IT", countryName: "Italy", cities: ["Rome", "Milan", "Naples", "Turin", "Florence"] },
      { country: "DE", countryName: "Germany", cities: ["Berlin", "Munich", "Hamburg", "Cologne", "Frankfurt"] },
      { country: "PT", countryName: "Portugal", cities: ["Lisbon", "Porto", "Coimbra", "Braga", "Aveiro"] },
      { country: "GB", countryName: "United Kingdom", cities: ["London", "Manchester", "Birmingham", "Liverpool", "Leeds"] },
      { country: "GR", countryName: "Greece", cities: ["Athens", "Thessaloniki", "Patras", "Rhodes", "Crete"] },
      { country: "TR", countryName: "Turkey", cities: ["Istanbul", "Ankara", "Izmir", "Bodrum", "Antalya"] },
      { country: "AT", countryName: "Austria", cities: ["Vienna", "Salzburg", "Innsbruck", "Graz", "Linz"] },
      { country: "HU", countryName: "Hungary", cities: ["Budapest", "Debrecen", "Szeged", "Miskolc", "Pecs"] },
      { country: "FI", countryName: "Finland", cities: ["Helsinki", "Tampere", "Turku", "Oulu", "Espoo"] },
      { country: "SE", countryName: "Sweden", cities: ["Stockholm", "Gothenburg", "Malmö", "Uppsala", "Västerås"] },
      { country: "LU", countryName: "Luxembourg", cities: ["Luxembourg City", "Esch-sur-Alzette", "Differdange", "Dudelange", "Ettelbruck"] },
      { country: "MT", countryName: "Malta", cities: ["Valletta", "Birkirkara", "Mosta", "Qormi", "Zabbar"] },
      { country: "CY", countryName: "Cyprus", cities: ["Nicosia", "Limassol", "Larnaca", "Famagusta", "Paphos"] },
      { country: "MY", countryName: "Malaysia", cities: ["Kuala Lumpur", "George Town", "Ipoh", "Shah Alam", "Petaling Jaya"] },
      { country: "CA", countryName: "Canada", cities: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"] }
    ];

    const hotelTypes = ['Hotel', 'Boutique Hotel', 'Resort', 'Villa', 'Apartment'];
    const propertyStyles = ['Modern', 'Classic', 'Luxury', 'Boutique', 'Historic'];

    const generateStreetAddress = (city: string, country: string) => {
      const streetNames = [
        'Main Street', 'High Street', 'Church Street', 'Park Avenue', 'Oak Street',
        'First Street', 'Second Street', 'Elm Street', 'Maple Avenue', 'Cedar Lane'
      ];
      const streetNumbers = Math.floor(Math.random() * 999) + 1;
      const streetName = streetNames[Math.floor(Math.random() * streetNames.length)];
      return `${streetNumbers} ${streetName}`;
    };

    const generatePostalCode = (countryCode: string) => {
      const postalPatterns: { [key: string]: () => string } = {
        'ES': () => String(Math.floor(Math.random() * 90000) + 10000), // 5 digits
        'FR': () => String(Math.floor(Math.random() * 90000) + 10000), // 5 digits
        'IT': () => String(Math.floor(Math.random() * 90000) + 10000), // 5 digits
        'DE': () => String(Math.floor(Math.random() * 90000) + 10000), // 5 digits
        'PT': () => `${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 900) + 100}`, // 4-3 format
        'GB': () => {
          const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
          const first = letters[Math.floor(Math.random() * letters.length)];
          const second = letters[Math.floor(Math.random() * letters.length)];
          const num1 = Math.floor(Math.random() * 9) + 1;
          const num2 = Math.floor(Math.random() * 9);
          const third = letters[Math.floor(Math.random() * letters.length)];
          const fourth = letters[Math.floor(Math.random() * letters.length)];
          return `${first}${second}${num1} ${num2}${third}${fourth}`;
        },
        'GR': () => String(Math.floor(Math.random() * 90000) + 10000), // 5 digits
        'TR': () => String(Math.floor(Math.random() * 90000) + 10000), // 5 digits
        'AT': () => String(Math.floor(Math.random() * 9000) + 1000), // 4 digits
        'HU': () => String(Math.floor(Math.random() * 9000) + 1000), // 4 digits
        'FI': () => String(Math.floor(Math.random() * 90000) + 10000), // 5 digits
        'SE': () => `${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 90) + 10}`, // 3 2 format
        'LU': () => `L-${Math.floor(Math.random() * 9000) + 1000}`, // L-4 digits
        'MT': () => `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))} ${Math.floor(Math.random() * 9000) + 1000}`, // 3 letters + 4 digits
        'CY': () => String(Math.floor(Math.random() * 9000) + 1000), // 4 digits
        'MY': () => String(Math.floor(Math.random() * 90000) + 10000), // 5 digits
        'CA': () => {
          const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
          const l1 = letters[Math.floor(Math.random() * letters.length)];
          const n1 = Math.floor(Math.random() * 10);
          const l2 = letters[Math.floor(Math.random() * letters.length)];
          const l3 = letters[Math.floor(Math.random() * letters.length)];
          const n2 = Math.floor(Math.random() * 10);
          const l4 = letters[Math.floor(Math.random() * letters.length)];
          return `${l1}${n1}${l2} ${l3}${n2}${l4}`;
        }
      };
      
      return postalPatterns[countryCode] ? postalPatterns[countryCode]() : String(Math.floor(Math.random() * 90000) + 10000);
    };

    const generateCoordinates = () => {
      // Generate realistic European coordinates
      const lat = (Math.random() * (71.0 - 35.0) + 35.0).toFixed(6);
      const lng = (Math.random() * (40.0 - (-10.0)) + (-10.0)).toFixed(6);
      return { latitude: lat, longitude: lng };
    };

    const hotels = [];
    const errors = [];

    for (let i = 0; i < count; i++) {
      try {
        const location = authorizedLocations[Math.floor(Math.random() * authorizedLocations.length)];
        const city = location.cities[Math.floor(Math.random() * location.cities.length)];
        const hotelType = hotelTypes[Math.floor(Math.random() * hotelTypes.length)];
        const style = propertyStyles[Math.floor(Math.random() * propertyStyles.length)];
        const coordinates = generateCoordinates();
        const address = generateStreetAddress(city, location.country);
        const postalCode = generatePostalCode(location.country);

        const hotelName = `Hotel ${city} ${hotelType === 'Hotel' ? ['Grand', 'Royal', 'Imperial', 'Palace', 'Plaza'][Math.floor(Math.random() * 5)] + ' Hotel' : hotelType}`;
        
        const hotelData = {
          name: hotelName,
          description: `Experience luxury at ${hotelName}, a premium ${style.toLowerCase()} ${hotelType.toLowerCase()} located in the heart of ${city}, ${location.countryName}. This exceptional property offers world-class amenities and unparalleled service.`,
          address: address, // Street address
          city: city,
          country: location.country, // Now using ISO code instead of full name
          postal_code: postalCode,
          latitude: parseFloat(coordinates.latitude),
          longitude: parseFloat(coordinates.longitude),
          property_type: hotelType,
          style: style,
          category: Math.floor(Math.random() * 5) + 1,
          price_per_month: Math.floor(Math.random() * 2000) + 1000,
          status: 'approved',
          check_in_weekday: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][Math.floor(Math.random() * 7)],
          rates: JSON.stringify({
            "1": { price: Math.floor(Math.random() * 500) + 800 },
            "3": { price: Math.floor(Math.random() * 400) + 700 },
            "6": { price: Math.floor(Math.random() * 300) + 600 },
            "12": { price: Math.floor(Math.random() * 200) + 500 }
          }),
          stay_lengths: [1, 3, 6, 12],
          available_months: ['January', 'February', 'March', 'April', 'May', 'June'],
          atmosphere: `${style} and welcoming atmosphere perfect for discerning travelers`,
          ideal_guests: `Business travelers, couples, and leisure guests seeking ${style.toLowerCase()} accommodation`,
          perfect_location: `Ideally located in ${city} with easy access to major attractions and business districts`,
          features_hotel: JSON.stringify({
            wifi: true,
            parking: true,
            restaurant: true,
            gym: true,
            spa: Math.random() > 0.5,
            pool: Math.random() > 0.6
          }),
          meal_plans: ['Breakfast included', 'Half board', 'Full board'][Math.floor(Math.random() * 3)]
        };

        const { data, error } = await supabaseClient
          .from('hotels')
          .insert([hotelData])
          .select()
          .single();

        if (error) {
          console.error(`Error creating hotel ${i + 1}:`, error);
          errors.push(`Hotel ${i + 1}: ${error.message}`);
        } else {
          console.log(`Successfully created hotel: ${hotelName}`);
          hotels.push({
            id: data.id,
            name: data.name,
            city: data.city,
            country: location.countryName // Return full name for display
          });
        }
      } catch (error) {
        console.error(`Exception creating hotel ${i + 1}:`, error);
        errors.push(`Hotel ${i + 1}: ${error.message}`);
      }
    }

    const result = {
      success: errors.length < count,
      message: errors.length === 0 
        ? `Successfully created ${hotels.length} hotels`
        : `Created ${hotels.length} hotels with ${errors.length} errors`,
      stats: {
        totalCreated: hotels.length,
        errors: errors,
        hotelDetails: hotels
      }
    };

    console.log('Batch creation completed:', result);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Fatal error in batch-hotel-creation:', error);
    
    return new Response(JSON.stringify({
      success: false,
      message: 'Fatal error during batch creation',
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
