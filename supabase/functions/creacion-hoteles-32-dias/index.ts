
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface CountryData {
  name: string;
  cities: string[];
}

const AUTHORIZED_COUNTRIES: CountryData[] = [
  { name: "Spain", cities: ["Madrid", "Barcelona", "Seville", "Valencia", "Bilbao", "Granada"] },
  { name: "France", cities: ["Paris", "Lyon", "Marseille", "Nice", "Bordeaux", "Toulouse"] },
  { name: "Italy", cities: ["Rome", "Milan", "Florence", "Venice", "Naples", "Turin"] },
  { name: "USA", cities: ["New York", "Los Angeles", "Chicago", "Miami", "Boston", "San Francisco"] },
  { name: "Egypt", cities: ["Cairo", "Alexandria", "Luxor", "Aswan", "Hurghada", "Sharm El Sheikh"] },
  { name: "Turkey", cities: ["Istanbul", "Ankara", "Izmir", "Antalya", "Bodrum", "Cappadocia"] },
  { name: "United Kingdom", cities: ["London", "Edinburgh", "Manchester", "Liverpool", "Bath", "York"] },
  { name: "Germany", cities: ["Berlin", "Munich", "Hamburg", "Frankfurt", "Dresden", "Cologne"] },
  { name: "Portugal", cities: ["Lisbon", "Porto", "Faro", "Coimbra", "Braga", "Évora"] },
  { name: "Greece", cities: ["Athens", "Thessaloniki", "Rhodes", "Mykonos", "Santorini", "Crete"] },
  { name: "Netherlands", cities: ["Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven", "Groningen"] },
  { name: "Belgium", cities: ["Brussels", "Antwerp", "Ghent", "Bruges", "Leuven", "Namur"] },
  { name: "Switzerland", cities: ["Zurich", "Geneva", "Basel", "Bern", "Lausanne", "Lucerne"] },
  { name: "Austria", cities: ["Vienna", "Salzburg", "Innsbruck", "Graz", "Linz", "Hallstatt"] },
  { name: "Czech Republic", cities: ["Prague", "Brno", "Ostrava", "Plzen", "Liberec", "Olomouc"] },
  { name: "Poland", cities: ["Warsaw", "Krakow", "Gdansk", "Wroclaw", "Poznan", "Lublin"] },
  { name: "Hungary", cities: ["Budapest", "Debrecen", "Szeged", "Miskolc", "Pécs", "Győr"] },
  { name: "Romania", cities: ["Bucharest", "Cluj-Napoca", "Timisoara", "Iasi", "Constanta", "Brasov"] },
  { name: "Croatia", cities: ["Zagreb", "Split", "Dubrovnik", "Rijeka", "Zadar", "Pula"] },
  { name: "Slovenia", cities: ["Ljubljana", "Maribor", "Celje", "Kranj", "Novo Mesto", "Koper"] },
  { name: "Slovakia", cities: ["Bratislava", "Kosice", "Presov", "Nitra", "Zilina", "Banska Bystrica"] },
  { name: "Denmark", cities: ["Copenhagen", "Aarhus", "Odense", "Aalborg", "Esbjerg", "Roskilde"] },
  { name: "Morocco", cities: ["Marrakech", "Casablanca", "Fes", "Rabat", "Tangier", "Agadir"] }
];

const PROPERTY_TYPES = ["Hotel", "Boutique Hotel", "City Hotel", "Business Hotel", "Historic Hotel"];
const PROPERTY_STYLES = ["Modern", "Traditional", "Contemporary", "Classic", "Urban", "Historic"];

const HOTEL_FEATURES = [
  "Free WiFi", "24-hour Front Desk", "Restaurant", "Bar/Lounge", "Business Center",
  "Meeting Rooms", "Laundry Service", "Concierge Service", "Airport Shuttle",
  "Fitness Center", "Spa Services", "Room Service", "Parking Available",
  "Air Conditioning", "Elevator", "Multilingual Staff", "Currency Exchange",
  "Tourist Information", "Luggage Storage", "Wake-up Service"
];

const ROOM_FEATURES = [
  "Private Bathroom", "Air Conditioning", "Free WiFi", "Flat-screen TV",
  "Mini Refrigerator", "Safe", "Telephone", "Desk", "Wardrobe",
  "Balcony", "City View", "Soundproof Windows", "Blackout Curtains",
  "Hair Dryer", "Complimentary Toiletries", "Daily Housekeeping"
];

const LUXURY_EXCLUSIONS = [
  "ritz", "carlton", "four seasons", "mandarin oriental", "peninsula",
  "shangri-la", "waldorf astoria", "st. regis", "edition", "luxury collection",
  "w hotel", "bulgari", "armani", "versace", "palazzo", "grand hotel",
  "intercontinental", "regent", "rosewood", "aman", "belmond", "dorchester"
];

// Generate realistic prices within range
function generatePrice(): number {
  const basePrice = 1100;
  const maxPrice = 1450;
  const step = 20;
  
  // Random choice between multiples of 20 or ending in 95
  if (Math.random() < 0.7) {
    // Multiples of 20
    const steps = Math.floor((maxPrice - basePrice) / step);
    return basePrice + (Math.floor(Math.random() * (steps + 1)) * step);
  } else {
    // Ending in 95
    const options = [1195, 1295, 1395];
    return options[Math.floor(Math.random() * options.length)];
  }
}

// Generate hotel name
function generateHotelName(city: string, country: string): string {
  const prefixes = ["Hotel", "City Hotel", "Central Hotel", "Plaza Hotel", "Grand Hotel"];
  const suffixes = [city, `${city} Center`, `${city} Plaza`, `${city} Inn`, `Downtown ${city}`];
  
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  
  const name = `${prefix} ${suffix}`;
  
  // Check against luxury exclusions
  const nameLower = name.toLowerCase();
  const hasLuxuryTerm = LUXURY_EXCLUSIONS.some(term => nameLower.includes(term));
  
  if (hasLuxuryTerm) {
    return `${city} Business Hotel`;
  }
  
  return name;
}

// Generate realistic coordinates for a city
function generateCoordinates(city: string, country: string): { lat: number; lng: number } {
  // Approximate coordinates for major cities (simplified for demo)
  const cityCoords: Record<string, { lat: number; lng: number }> = {
    "Madrid": { lat: 40.4168, lng: -3.7038 },
    "Barcelona": { lat: 41.3851, lng: 2.1734 },
    "Paris": { lat: 48.8566, lng: 2.3522 },
    "Rome": { lat: 41.9028, lng: 12.4964 },
    "London": { lat: 51.5074, lng: -0.1278 },
    "Berlin": { lat: 52.5200, lng: 13.4050 },
    "Amsterdam": { lat: 52.3676, lng: 4.9041 },
    "Lisbon": { lat: 38.7223, lng: -9.1393 },
    "Athens": { lat: 37.9838, lng: 23.7275 },
    "Prague": { lat: 50.0755, lng: 14.4378 },
    "Vienna": { lat: 48.2082, lng: 16.3738 },
    "Budapest": { lat: 47.4979, lng: 19.0402 },
    "Warsaw": { lat: 52.2297, lng: 21.0122 },
    "Copenhagen": { lat: 55.6761, lng: 12.5683 },
    "Marrakech": { lat: 31.6295, lng: -7.9811 }
  };

  const baseCoord = cityCoords[city] || { lat: 40.0, lng: 0.0 };
  
  // Add small random offset for realistic hotel location
  return {
    lat: baseCoord.lat + (Math.random() - 0.5) * 0.02,
    lng: baseCoord.lng + (Math.random() - 0.5) * 0.02
  };
}

// Generate address
function generateAddress(city: string, country: string): { address: string; postalCode: string } {
  const streets = [
    "Main Street", "Central Avenue", "First Street", "Park Avenue", "Market Street",
    "King Street", "Queen Street", "High Street", "Church Street", "Station Road"
  ];
  
  const streetNumber = Math.floor(Math.random() * 999) + 1;
  const street = streets[Math.floor(Math.random() * streets.length)];
  
  // Generate postal code based on country
  let postalCode = "00000";
  if (country === "Spain") postalCode = `${Math.floor(Math.random() * 90000) + 10000}`;
  else if (country === "France") postalCode = `${Math.floor(Math.random() * 90000) + 10000}`;
  else if (country === "United Kingdom") postalCode = `SW${Math.floor(Math.random() * 9) + 1} ${Math.floor(Math.random() * 9)}XX`;
  else postalCode = `${Math.floor(Math.random() * 90000) + 10000}`;
  
  return {
    address: `${streetNumber} ${street}`,
    postalCode
  };
}

// Select random items from array
function selectRandomItems<T>(items: T[], count: number): T[] {
  const shuffled = [...items].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Generate contact information
function generateContact(hotelName: string): { name: string; email: string; phone: string } {
  const firstNames = ["John", "Mary", "David", "Sarah", "Michael", "Emma", "James", "Lisa"];
  const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis"];
  
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const name = `${firstName} ${lastName}`;
  
  const domain = hotelName.toLowerCase().replace(/[^a-z0-9]/g, '') + ".com";
  const email = `info@${domain}`;
  
  const phone = `+${Math.floor(Math.random() * 99) + 1} ${Math.floor(Math.random() * 9000000000) + 1000000000}`;
  
  return { name, email, phone };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    console.log("Starting 32-day hotel batch creation...")

    // Fetch themes and activities for coherent relationships
    const { data: themes } = await supabase.from('themes').select('*')
    const { data: activities } = await supabase.from('activities').select('*')

    if (!themes || !activities) {
      throw new Error('Failed to fetch themes and activities')
    }

    console.log(`Fetched ${themes.length} themes and ${activities.length} activities`)

    const createdHotels = []

    // Create 3 hotels per country
    for (const countryData of AUTHORIZED_COUNTRIES) {
      for (let i = 0; i < 3; i++) {
        const city = countryData.cities[Math.floor(Math.random() * countryData.cities.length)]
        const hotelName = generateHotelName(city, countryData.name)
        const coordinates = generateCoordinates(city, countryData.name)
        const addressData = generateAddress(city, countryData.name)
        const contact = generateContact(hotelName)
        const price = generatePrice()
        const category = Math.random() < 0.6 ? 3 : 4 // 60% 3-star, 40% 4-star

        // Generate descriptions
        const description = `Welcome to ${hotelName}, a comfortable ${category}-star hotel located in the heart of ${city}, ${countryData.name}. Our hotel offers modern amenities and excellent service for business and leisure travelers seeking quality accommodation for extended stays.`
        
        const idealGuests = "Business travelers, digital nomads, and leisure guests seeking comfortable extended stays with modern amenities and convenient city center location."
        
        const atmosphere = "Professional yet welcoming atmosphere with modern facilities, comfortable common areas, and attentive service that caters to both business and leisure needs."
        
        const perfectLocation = `Perfectly situated in ${city}'s city center with easy access to business districts, cultural attractions, shopping areas, and public transportation, making it ideal for extended stays.`

        const hotelData = {
          name: hotelName,
          description,
          ideal_guests: idealGuests,
          atmosphere,
          perfect_location: perfectLocation,
          country: countryData.name,
          city,
          address: addressData.address,
          postal_code: addressData.postalCode,
          latitude: coordinates.lat,
          longitude: coordinates.lng,
          price_per_month: price,
          category,
          property_type: PROPERTY_TYPES[Math.floor(Math.random() * PROPERTY_TYPES.length)],
          style: PROPERTY_STYLES[Math.floor(Math.random() * PROPERTY_STYLES.length)],
          contact_name: contact.name,
          contact_email: contact.email,
          contact_phone: contact.phone,
          status: 'approved',
          stay_lengths: [32],
          meal_plans: ['Half Board'],
          available_months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          check_in_weekday: 'Monday',
          enable_price_increase: true,
          price_increase_cap: 20,
          features_hotel: selectRandomItems(HOTEL_FEATURES, 12).reduce((acc, feature) => {
            acc[feature] = true;
            return acc;
          }, {} as Record<string, boolean>),
          features_room: selectRandomItems(ROOM_FEATURES, 9).reduce((acc, feature) => {
            acc[feature] = true;
            return acc;
          }, {} as Record<string, boolean>),
          room_types: [{
            id: crypto.randomUUID(),
            name: "Double Room",
            description: "Comfortable double room with modern amenities, perfect for extended stays. Features include private bathroom, work desk, and all essential amenities for a comfortable 32-day stay.",
            maxOccupancy: 2,
            size: 25,
            roomCount: 20,
            basePrice: price,
            rates: { "32": price },
            images: [],
            availabilityDates: []
          }],
          rates: { "32": price },
          terms: "Terms and conditions apply. Minimum stay 32 days. Payment required in advance. Cancellation policy applies.",
          owner_id: null
        }

        // Insert hotel
        const { data: hotel, error: hotelError } = await supabase
          .from('hotels')
          .insert(hotelData)
          .select()
          .single()

        if (hotelError) {
          console.error(`Error creating hotel ${hotelName}:`, hotelError)
          continue
        }

        console.log(`Successfully created hotel: ${hotelName} in ${city}, ${countryData.name}`)

        // Add themes (1-3 random themes)
        const selectedThemes = selectRandomItems(themes, Math.floor(Math.random() * 3) + 1)
        for (const theme of selectedThemes) {
          await supabase.from('hotel_themes').insert({
            hotel_id: hotel.id,
            theme_id: theme.id
          })
        }
        console.log(`Added ${selectedThemes.length} themes to hotel ${hotelName}`)

        // Add activities (3-5 activities that relate to selected themes)
        const relatedActivities = activities.filter(activity => 
          selectedThemes.some(theme => 
            theme.category === activity.category || 
            theme.name.toLowerCase().includes(activity.name.toLowerCase().split(' ')[0])
          )
        )
        
        const selectedActivities = relatedActivities.length > 0 
          ? selectRandomItems(relatedActivities, Math.min(Math.floor(Math.random() * 3) + 3, relatedActivities.length))
          : selectRandomItems(activities, Math.floor(Math.random() * 3) + 3)

        for (const activity of selectedActivities) {
          await supabase.from('hotel_activities').insert({
            hotel_id: hotel.id,
            activity_id: activity.id
          })
        }
        console.log(`Added ${selectedActivities.length} activities to hotel ${hotelName}`)

        // Add availability for all months
        const currentYear = new Date().getFullYear()
        const months = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ]

        for (const month of months) {
          await supabase.from('hotel_availability').insert({
            hotel_id: hotel.id,
            availability_date: new Date(currentYear, months.indexOf(month), 1).toISOString().split('T')[0],
            availability_month: month,
            availability_year: currentYear,
            is_full_month: true,
            preferred_weekday: 'Monday'
          })
        }

        createdHotels.push({
          id: hotel.id,
          name: hotelName,
          city,
          country: countryData.name,
          price
        })
      }
    }

    console.log(`Completed processing: ${createdHotels.length} hotels created successfully`)

    return new Response(
      JSON.stringify({ 
        success: true, 
        created: createdHotels.length,
        message: `Successfully created ${createdHotels.length} hotels for 32-day stays`,
        hotels: createdHotels
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in creacion-hoteles-32-dias function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
