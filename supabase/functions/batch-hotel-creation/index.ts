
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    const { count = 20 } = await req.json()

    // Country-city mappings with coordinates
    const countryData = {
      'Poland': {
        cities: ['Warsaw', 'Krakow', 'Gdansk', 'Wroclaw', 'Poznan', 'Lodz'],
        coordinates: { lat: 52.2297, lng: 21.0122 }
      },
      'Hungary': {
        cities: ['Budapest', 'Debrecen', 'Szeged', 'Miskolc', 'Pecs'],
        coordinates: { lat: 47.4979, lng: 19.0402 }
      },
      'Romania': {
        cities: ['Bucharest', 'Cluj-Napoca', 'Timisoara', 'Iasi', 'Constanta'],
        coordinates: { lat: 44.4268, lng: 26.1025 }
      },
      'Canada': {
        cities: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa', 'Edmonton'],
        coordinates: { lat: 45.4215, lng: -75.6972 }
      },
      'Ireland': {
        cities: ['Dublin', 'Cork', 'Galway', 'Limerick', 'Waterford'],
        coordinates: { lat: 53.3498, lng: -6.2603 }
      },
      'Germany': {
        cities: ['Berlin', 'Munich', 'Hamburg', 'Cologne', 'Frankfurt', 'Stuttgart'],
        coordinates: { lat: 52.5200, lng: 13.4050 }
      },
      'Portugal': {
        cities: ['Lisbon', 'Porto', 'Braga', 'Coimbra', 'Aveiro'],
        coordinates: { lat: 38.7223, lng: -9.1393 }
      },
      'Belgium': {
        cities: ['Brussels', 'Antwerp', 'Ghent', 'Bruges', 'Leuven'],
        coordinates: { lat: 50.8503, lng: 4.3517 }
      },
      'Netherlands': {
        cities: ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht', 'Eindhoven'],
        coordinates: { lat: 52.3676, lng: 4.9041 }
      },
      'Luxembourg': {
        cities: ['Luxembourg City', 'Esch-sur-Alzette', 'Dudelange', 'Schifflange'],
        coordinates: { lat: 49.6116, lng: 6.1319 }
      },
      'Switzerland': {
        cities: ['Zurich', 'Geneva', 'Basel', 'Bern', 'Lausanne'],
        coordinates: { lat: 46.8182, lng: 8.2275 }
      },
      'Austria': {
        cities: ['Vienna', 'Salzburg', 'Innsbruck', 'Graz', 'Linz'],
        coordinates: { lat: 48.2082, lng: 16.3738 }
      },
      'Denmark': {
        cities: ['Copenhagen', 'Aarhus', 'Odense', 'Aalborg', 'Esbjerg'],
        coordinates: { lat: 55.6761, lng: 12.5683 }
      },
      'Norway': {
        cities: ['Oslo', 'Bergen', 'Trondheim', 'Stavanger', 'Drammen'],
        coordinates: { lat: 59.9139, lng: 10.7522 }
      },
      'Sweden': {
        cities: ['Stockholm', 'Gothenburg', 'Malmo', 'Uppsala', 'Linkoping'],
        coordinates: { lat: 59.3293, lng: 18.0686 }
      },
      'Greece': {
        cities: ['Athens', 'Thessaloniki', 'Patras', 'Heraklion', 'Larissa'],
        coordinates: { lat: 37.9838, lng: 23.7275 }
      },
      'Finland': {
        cities: ['Helsinki', 'Espoo', 'Tampere', 'Vantaa', 'Turku'],
        coordinates: { lat: 60.1699, lng: 24.9384 }
      },
      'Iceland': {
        cities: ['Reykjavik', 'Kopavogur', 'Hafnarfjordur', 'Akureyri'],
        coordinates: { lat: 64.1466, lng: -21.9426 }
      },
      'France': {
        cities: ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Nantes'],
        coordinates: { lat: 48.8566, lng: 2.3522 }
      },
      'United Kingdom': {
        cities: ['London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow', 'Liverpool'],
        coordinates: { lat: 51.5074, lng: -0.1278 }
      },
      'Turkey': {
        cities: ['Istanbul', 'Ankara', 'Izmir', 'Bursa', 'Antalya'],
        coordinates: { lat: 39.9334, lng: 32.8597 }
      },
      'Thailand': {
        cities: ['Bangkok', 'Chiang Mai', 'Phuket', 'Pattaya', 'Krabi'],
        coordinates: { lat: 13.7563, lng: 100.5018 }
      },
      'Japan': {
        cities: ['Tokyo', 'Osaka', 'Kyoto', 'Nagoya', 'Sapporo', 'Fukuoka'],
        coordinates: { lat: 35.6762, lng: 139.6503 }
      }
    }

    const hotelTypes = ['Hotel', 'International Hotel', 'City Hotel', 'Garden Hotel', 'Comfort Hotel', 'Express Hotel', 'Station Hotel', 'Metropolitan Hotel', 'Continental Hotel', 'Silver Hotel']
    const propertyTypes = ['Hotel', 'Boutique Hotel', 'Inn']
    const propertyStyles = ['Classic', 'Classic Elegant', 'Modern', 'Fusion', 'Urban', 'Minimalist']
    
    // Hotel features from your system
    const hotelFeatures = [
      'Free WiFi', 'Parking', 'Restaurant', 'Bar', 'Gym', 'Business Center',
      'Meeting Rooms', 'Laundry Service', '24/7 Reception', 'Room Service',
      'Concierge', 'Airport Shuttle', 'Pet Friendly', 'Outdoor Pool',
      'Indoor Pool', 'Spa', 'Garden', 'Terrace', 'Air Conditioning', 'Heating'
    ]

    // Room features from your system
    const roomFeatures = [
      'Private Bathroom', 'Air Conditioning', 'Heating', 'Free WiFi',
      'TV', 'Minibar', 'Safe', 'Work Desk', 'Balcony', 'City View',
      'Sea View', 'Garden View', 'Mountain View', 'Soundproofing',
      'Room Service', 'Daily Housekeeping', 'Telephone', 'Hair Dryer'
    ]

    const createdHotels = []
    const errors = []

    // Generate price per person per month (€950-€1400, multiples of 20 or ending in 95)
    const generatePrice = () => {
      const prices = []
      // Multiples of 20 between 950-1400
      for (let price = 960; price <= 1400; price += 20) {
        prices.push(price)
      }
      // Prices ending in 95 between 950-1400
      for (let price = 995; price <= 1395; price += 100) {
        prices.push(price)
      }
      return prices[Math.floor(Math.random() * prices.length)]
    }

    for (let i = 0; i < count; i++) {
      try {
        const countries = Object.keys(countryData)
        const selectedCountry = countries[Math.floor(Math.random() * countries.length)]
        const countryInfo = countryData[selectedCountry]
        const selectedCity = countryInfo.cities[Math.floor(Math.random() * countryInfo.cities.length)]
        
        const hotelType = hotelTypes[Math.floor(Math.random() * hotelTypes.length)]
        const hotelName = `${selectedCity} ${hotelType}`
        
        // Generate price per person per month
        const pricePerMonth = generatePrice()
        
        // Create hotel data
        const hotelData = {
          name: hotelName,
          city: selectedCity,
          country: selectedCountry,
          latitude: countryInfo.coordinates.lat + (Math.random() - 0.5) * 0.1,
          longitude: countryInfo.coordinates.lng + (Math.random() - 0.5) * 0.1,
          address: `${Math.floor(Math.random() * 999) + 1} Main Street, ${selectedCity}`,
          postal_code: `${Math.floor(Math.random() * 90000) + 10000}`,
          category: Math.random() > 0.5 ? 3 : 4, // Only 3 or 4 stars
          property_type: propertyTypes[Math.floor(Math.random() * propertyTypes.length)],
          property_style: propertyStyles[Math.floor(Math.random() * propertyStyles.length)],
          description: `A comfortable ${Math.random() > 0.5 ? '3' : '4'}-star hotel located in the heart of ${selectedCity}. Perfect for business and leisure travelers seeking quality accommodation with modern amenities and excellent service.`,
          price_per_month: pricePerMonth,
          available_months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          check_in_time: '15:00',
          check_out_time: '11:00',
          status: 'active',
          currency: 'EUR',
          // Set rates for 32-day stays with half board
          rates: {
            '32': pricePerMonth
          }
        }

        // Insert hotel
        const { data: hotel, error: hotelError } = await supabase
          .from('hotels')
          .insert(hotelData)
          .select()
          .single()

        if (hotelError) {
          console.error('Hotel creation error:', hotelError)
          errors.push(`Hotel ${hotelName}: ${hotelError.message}`)
          continue
        }

        // Add room types (only double rooms)
        const roomTypeData = {
          hotel_id: hotel.id,
          name: 'double',
          description: 'Comfortable double room with modern amenities',
          max_occupancy: 2,
          size: Math.floor(Math.random() * 10) + 20, // 20-30 sqm
          room_count: Math.floor(Math.random() * 20) + 10, // 10-30 rooms
          base_price: pricePerMonth,
          rates: {
            '32': pricePerMonth
          }
        }

        const { error: roomError } = await supabase
          .from('room_types')
          .insert(roomTypeData)

        if (roomError) {
          console.error('Room type creation error:', roomError)
          errors.push(`Room type for ${hotelName}: ${roomError.message}`)
        }

        // Add hotel features
        const selectedHotelFeatures = hotelFeatures
          .sort(() => 0.5 - Math.random())
          .slice(0, Math.floor(Math.random() * 8) + 5) // 5-12 features

        for (const feature of selectedHotelFeatures) {
          await supabase
            .from('hotel_features')
            .insert({
              hotel_id: hotel.id,
              feature: feature
            })
        }

        // Add room features
        const selectedRoomFeatures = roomFeatures
          .sort(() => 0.5 - Math.random())
          .slice(0, Math.floor(Math.random() * 6) + 4) // 4-9 features

        for (const feature of selectedRoomFeatures) {
          await supabase
            .from('room_features')
            .insert({
              hotel_id: hotel.id,
              feature: feature
            })
        }

        // Add stay lengths (only 32 days)
        await supabase
          .from('hotel_stay_lengths')
          .insert({
            hotel_id: hotel.id,
            stay_length: 32
          })

        // Add meal plans (only half board)
        await supabase
          .from('hotel_meal_plans')
          .insert({
            hotel_id: hotel.id,
            meal_plan: 'half-board'
          })

        createdHotels.push({
          id: hotel.id,
          name: hotel.name,
          city: hotel.city,
          country: hotel.country,
          price_per_month: hotel.price_per_month
        })

        console.log(`Successfully created hotel: ${hotel.name} in ${hotel.city}, ${hotel.country} - €${hotel.price_per_month} per person/month`)

      } catch (error) {
        console.error('Error creating hotel:', error)
        errors.push(`Hotel creation failed: ${error.message}`)
      }
    }

    const response = {
      success: createdHotels.length > 0,
      message: `Successfully created ${createdHotels.length} hotels with correct pricing format`,
      stats: {
        totalCreated: createdHotels.length,
        errors: errors,
        hotelDetails: createdHotels
      }
    }

    console.log('Batch creation completed:', response)

    return new Response(
      JSON.stringify(response),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Batch creation failed:', error)
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Batch creation failed',
        error: error.message,
        stats: {
          totalCreated: 0,
          errors: [error.message],
          hotelDetails: []
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
