
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { count } = await req.json();
    console.log(`Creating ${count} hotels`);

    // Authorized countries and cities
    const authorizedLocations = [
      { country: 'Germany', cities: ['Berlin', 'Munich', 'Hamburg', 'Cologne', 'Frankfurt'] },
      { country: 'France', cities: ['Paris', 'Lyon', 'Marseille', 'Nice', 'Toulouse'] },
      { country: 'Spain', cities: ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Bilbao'] },
      { country: 'Italy', cities: ['Rome', 'Milan', 'Naples', 'Turin', 'Florence'] },
      { country: 'United Kingdom', cities: ['London', 'Manchester', 'Birmingham', 'Liverpool', 'Leeds'] },
      { country: 'Netherlands', cities: ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht', 'Eindhoven'] },
      { country: 'Belgium', cities: ['Brussels', 'Antwerp', 'Ghent', 'Bruges', 'Leuven'] },
      { country: 'Austria', cities: ['Vienna', 'Salzburg', 'Innsbruck', 'Graz', 'Linz'] },
      { country: 'Switzerland', cities: ['Zurich', 'Geneva', 'Basel', 'Bern', 'Lausanne'] },
      { country: 'Portugal', cities: ['Lisbon', 'Porto', 'Coimbra', 'Braga', 'Aveiro'] },
      { country: 'Luxembourg', cities: ['Luxembourg City', 'Esch-sur-Alzette', 'Dudelange', 'Differdange', 'Petange'] },
      { country: 'Denmark', cities: ['Copenhagen', 'Aarhus', 'Odense', 'Aalborg', 'Esbjerg'] },
      { country: 'Sweden', cities: ['Stockholm', 'Gothenburg', 'Malmo', 'Uppsala', 'Linkoping'] },
      { country: 'Finland', cities: ['Helsinki', 'Espoo', 'Tampere', 'Vantaa', 'Turku'] },
      { country: 'Norway', cities: ['Oslo', 'Bergen', 'Trondheim', 'Stavanger', 'Drammen'] },
      { country: 'Iceland', cities: ['Reykjavik', 'Kopavogur', 'Hafnarfjordur', 'Akureyri', 'Gardabaer'] },
      { country: 'Ireland', cities: ['Dublin', 'Cork', 'Limerick', 'Galway', 'Waterford'] },
      { country: 'Czech Republic', cities: ['Prague', 'Brno', 'Ostrava', 'Plzen', 'Liberec'] },
      { country: 'Poland', cities: ['Warsaw', 'Krakow', 'Lodz', 'Wroclaw', 'Poznan'] },
      { country: 'Hungary', cities: ['Budapest', 'Debrecen', 'Szeged', 'Miskolc', 'Pecs'] },
      { country: 'Slovenia', cities: ['Ljubljana', 'Maribor', 'Celje', 'Kranj', 'Velenje'] },
      { country: 'Slovakia', cities: ['Bratislava', 'Kosice', 'Presov', 'Zilina', 'Banska Bystrica'] },
      { country: 'Estonia', cities: ['Tallinn', 'Tartu', 'Narva', 'Parnu', 'Kohtla-Jarve'] },
      { country: 'Latvia', cities: ['Riga', 'Daugavpils', 'Liepaja', 'Jelgava', 'Jurmala'] },
      { country: 'Lithuania', cities: ['Vilnius', 'Kaunas', 'Klaipeda', 'Siauliai', 'Panevezys'] },
      { country: 'Croatia', cities: ['Zagreb', 'Split', 'Rijeka', 'Osijek', 'Zadar'] },
      { country: 'Romania', cities: ['Bucharest', 'Cluj-Napoca', 'Timisoara', 'Iasi', 'Constanta'] },
      { country: 'Bulgaria', cities: ['Sofia', 'Plovdiv', 'Varna', 'Burgas', 'Ruse'] },
      { country: 'Greece', cities: ['Athens', 'Thessaloniki', 'Patras', 'Heraklion', 'Larissa'] },
      { country: 'Cyprus', cities: ['Nicosia', 'Limassol', 'Larnaca', 'Famagusta', 'Paphos'] },
      { country: 'Malta', cities: ['Valletta', 'Birkirkara', 'Mosta', 'Qormi', 'Zabbar'] },
      { country: 'Japan', cities: ['Tokyo', 'Osaka', 'Kyoto', 'Yokohama', 'Nagoya', 'Kobe', 'Fukuoka', 'Sapporo'] },
      { country: 'South Korea', cities: ['Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon'] },
      { country: 'Singapore', cities: ['Singapore'] },
      { country: 'Thailand', cities: ['Bangkok', 'Chiang Mai', 'Phuket', 'Pattaya', 'Krabi'] },
      { country: 'Malaysia', cities: ['Kuala Lumpur', 'George Town', 'Johor Bahru', 'Malacca', 'Ipoh'] },
      { country: 'Indonesia', cities: ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Semarang'] },
      { country: 'Philippines', cities: ['Manila', 'Cebu City', 'Davao', 'Quezon City', 'Makati'] },
      { country: 'Vietnam', cities: ['Ho Chi Minh City', 'Hanoi', 'Da Nang', 'Hai Phong', 'Can Tho'] },
      { country: 'Australia', cities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'] },
      { country: 'New Zealand', cities: ['Auckland', 'Wellington', 'Christchurch', 'Hamilton', 'Tauranga'] },
      { country: 'Canada', cities: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Ottawa'] },
      { country: 'United States', cities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'] }
    ];

    const hotelTypes = [
      'Continental Hotel', 'Express Hotel', 'Station Hotel', 
      'Garden Hotel', 'City Hotel', 'Comfort Hotel', 
      'International Hotel', 'Silver Hotel'
    ];

    const propertyTypes = ['Hotel', 'Boutique Hotel', 'Business Hotel'];
    const styles = ['Modern', 'Traditional', 'Contemporary', 'Classic'];
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    // Generate price per person per month (€950-€1400, multiples of 20 or ending in 95)
    const generatePrice = () => {
      const isMultipleOf20 = Math.random() < 0.7; // 70% chance for multiples of 20
      if (isMultipleOf20) {
        const multiples = [];
        for (let i = 960; i <= 1400; i += 20) {
          multiples.push(i);
        }
        return multiples[Math.floor(Math.random() * multiples.length)];
      } else {
        // Prices ending in 95
        const endingIn95 = [];
        for (let i = 995; i <= 1395; i += 100) {
          endingIn95.push(i);
        }
        return endingIn95[Math.floor(Math.random() * endingIn95.length)];
      }
    };

    const results = {
      success: false,
      message: "",
      stats: {
        totalCreated: 0,
        errors: [] as string[],
        hotelDetails: [] as any[]
      }
    };

    for (let i = 0; i < count; i++) {
      try {
        // Select random location
        const location = authorizedLocations[Math.floor(Math.random() * authorizedLocations.length)];
        const city = location.cities[Math.floor(Math.random() * location.cities.length)];
        const hotelType = hotelTypes[Math.floor(Math.random() * hotelTypes.length)];
        
        const hotelData = {
          name: `Hotel ${city} ${hotelType}`,
          description: `Experience authentic hospitality in ${city}. This ${hotelType.toLowerCase()} offers comfortable accommodations with modern amenities and excellent service. Perfect for extended stays with flexible monthly arrangements.`,
          country: location.country,
          city: city,
          address: `${Math.floor(Math.random() * 999) + 1} Main Street, ${city}`,
          latitude: (Math.random() * 180 - 90).toFixed(6),
          longitude: (Math.random() * 360 - 180).toFixed(6),
          price_per_month: generatePrice(),
          main_image_url: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000)}-${Math.random().toString(36).substr(2, 9)}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`,
          category: Math.random() < 0.5 ? 3 : 4, // Only 3 or 4 stars
          property_type: propertyTypes[Math.floor(Math.random() * propertyTypes.length)],
          style: styles[Math.floor(Math.random() * styles.length)],
          ideal_guests: "Business travelers, digital nomads, and professionals seeking comfortable extended stays",
          atmosphere: "Professional yet welcoming environment with modern conveniences",
          perfect_location: `Centrally located in ${city} with excellent transport connections`,
          is_featured: Math.random() < 0.1, // 10% chance
          status: 'approved',
          available_months: ['2025-01', '2025-02', '2025-03', '2025-04', '2025-05', '2025-06'],
          postal_code: Math.floor(Math.random() * 90000) + 10000,
          contact_name: `${city} Hotel Manager`,
          contact_email: `manager@${city.toLowerCase().replace(/\s+/g, '')}hotel.com`,
          contact_phone: `+${Math.floor(Math.random() * 9) + 1}${Math.floor(Math.random() * 900000000) + 100000000}`,
          features_hotel: {
            "wifi": true,
            "parking": true,
            "restaurant": true,
            "gym": Math.random() < 0.7,
            "spa": Math.random() < 0.3,
            "pool": Math.random() < 0.4,
            "business_center": true,
            "laundry": true
          },
          features_room: {
            "air_conditioning": true,
            "private_bathroom": true,
            "minibar": true,
            "safe": true,
            "tv": true,
            "desk": true,
            "balcony": Math.random() < 0.5,
            "kitchenette": Math.random() < 0.3
          },
          meal_plans: ['Half Board'],
          room_types: [{
            name: 'Double Room',
            description: 'Comfortable double room perfect for extended stays',
            maxOccupancy: 2,
            basePrice: generatePrice(),
            amenities: ['Private bathroom', 'Air conditioning', 'WiFi', 'TV', 'Desk']
          }],
          stay_lengths: [32],
          check_in_weekday: weekdays[Math.floor(Math.random() * weekdays.length)],
          owner_id: '786aefb8-bd6e-4955-8a0e-ec82efa0e608',
          terms: `Terms and conditions for ${city} hotel stays. Monthly bookings include utilities and weekly housekeeping service.`
        };

        console.log(`Creating hotel: ${hotelData.name} in ${hotelData.city}, ${hotelData.country}`);

        const { data, error } = await supabaseClient
          .from('hotels')
          .insert([hotelData])
          .select()
          .single();

        if (error) {
          console.error('Hotel creation error:', error);
          results.stats.errors.push(`${hotelData.name}: ${error.message}`);
        } else {
          results.stats.totalCreated++;
          results.stats.hotelDetails.push({
            id: data.id,
            name: data.name,
            city: data.city,
            country: data.country
          });
          console.log(`Successfully created hotel: ${data.name} (ID: ${data.id})`);
        }
      } catch (error) {
        console.error('Exception during hotel creation:', error);
        results.stats.errors.push(`Hotel creation exception: ${error.message}`);
      }
    }

    results.success = results.stats.totalCreated > 0;
    results.message = `Successfully created ${results.stats.totalCreated} hotels with correct pricing format`;

    console.log(`Batch creation completed:`, results);

    return new Response(JSON.stringify(results), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Batch creation error:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Failed to create hotels',
      stats: {
        totalCreated: 0,
        errors: [error.message],
        hotelDetails: []
      }
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
