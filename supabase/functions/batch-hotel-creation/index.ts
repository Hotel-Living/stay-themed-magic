
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { action, maxHotels, categoryRange, excludeLuxuryBrands, requireAllFields } = await req.json()

    if (action !== 'create_hotels') {
      throw new Error('Invalid action')
    }

    console.log(`Starting batch hotel creation: ${maxHotels} hotels, category ${categoryRange.min}-${categoryRange.max}`)

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Generate smart pricing according to user requirements
    const generateSmartPrice = (): number => {
      const minPrice = 950;
      const maxPrice = 1400;
      
      // 50% chance for multiples of 20, 50% chance for ending in 95
      if (Math.random() < 0.5) {
        // Generate multiples of 20
        const minMultiple = Math.ceil(minPrice / 20);
        const maxMultiple = Math.floor(maxPrice / 20);
        const randomMultiple = Math.floor(Math.random() * (maxMultiple - minMultiple + 1)) + minMultiple;
        return randomMultiple * 20;
      } else {
        // Generate prices ending in 95
        const basePrice = Math.floor(Math.random() * (maxPrice - minPrice - 95) / 100) * 100 + Math.floor(minPrice / 100) * 100;
        return basePrice + 95;
      }
    };

    // Hotel data templates for 3-4 star mid-range properties
    const hotelTemplates = [
      {
        name: "Hotel Europa Central",
        city: "Barcelona",
        country: "Spain",
        description: "Comfortable mid-range hotel in the heart of Barcelona with modern amenities and excellent location.",
        category: 3,
        property_type: "Hotel",
        style: "Contemporary"
      },
      {
        name: "Grand Hotel Milano",
        city: "Milan",
        country: "Italy", 
        description: "Elegant 4-star hotel offering superior comfort and convenient access to Milan's main attractions.",
        category: 4,
        property_type: "Hotel",
        style: "Classic"
      },
      {
        name: "Hotel Residence Paris",
        city: "Paris",
        country: "France",
        description: "Modern hotel residence with spacious rooms and excellent facilities in central Paris.",
        category: 3,
        property_type: "Hotel",
        style: "Modern"
      },
      {
        name: "Berlin City Hotel",
        city: "Berlin",
        country: "Germany",
        description: "Contemporary 4-star hotel with excellent amenities and perfect location for business and leisure.",
        category: 4,
        property_type: "Hotel", 
        style: "Contemporary"
      },
      {
        name: "Hotel Amsterdam Central",
        city: "Amsterdam",
        country: "Netherlands",
        description: "Comfortable 3-star hotel with modern facilities and great location near Amsterdam's attractions.",
        category: 3,
        property_type: "Hotel",
        style: "Modern"
      },
      {
        name: "Vienna Grand Hotel",
        city: "Vienna",
        country: "Austria",
        description: "Classic 4-star hotel offering superior comfort and traditional Austrian hospitality.",
        category: 4,
        property_type: "Hotel",
        style: "Classic"
      },
      {
        name: "Hotel Lisboa Centro",
        city: "Lisbon",
        country: "Portugal",
        description: "Modern 3-star hotel with excellent amenities in the heart of Lisbon's historic center.",
        category: 3,
        property_type: "Hotel",
        style: "Contemporary"
      },
      {
        name: "Brussels Business Hotel",
        city: "Brussels",
        country: "Belgium",
        description: "Professional 4-star hotel perfect for business travelers with modern facilities and services.",
        category: 4,
        property_type: "Hotel",
        style: "Modern"
      },
      {
        name: "Hotel Roma Centrale",
        city: "Rome",
        country: "Italy",
        description: "Comfortable 3-star hotel with classic Italian hospitality and convenient location.",
        category: 3,
        property_type: "Hotel",
        style: "Classic"
      },
      {
        name: "Madrid Plaza Hotel",
        city: "Madrid",
        country: "Spain",
        description: "Contemporary 4-star hotel with excellent facilities near Madrid's main plaza and attractions.",
        category: 4,
        property_type: "Hotel",
        style: "Contemporary"
      }
    ];

    const stats = {
      totalCreated: 0,
      errors: [] as string[],
      hotelDetails: [] as string[]
    };

    // Create owner profile for the hotels (using first admin user if exists)
    const { data: adminUsers } = await supabase
      .from('admin_users')
      .select('id')
      .limit(1);

    let ownerId = adminUsers?.[0]?.id;
    
    if (!ownerId) {
      // Create a default owner profile
      const { data: newProfile, error: profileError } = await supabase
        .from('profiles')
        .insert({
          first_name: 'Hotel',
          last_name: 'Manager',
          is_hotel_owner: true
        })
        .select()
        .single();

      if (profileError) {
        console.error('Error creating owner profile:', profileError);
        ownerId = null;
      } else {
        ownerId = newProfile.id;
      }
    }

    // Create hotels
    const hotelsToCreate = Math.min(maxHotels || 20, hotelTemplates.length);
    
    for (let i = 0; i < hotelsToCreate; i++) {
      try {
        const template = hotelTemplates[i];
        const price = generateSmartPrice();
        
        const hotelData = {
          owner_id: ownerId,
          name: template.name,
          description: template.description,
          country: template.country,
          city: template.city,
          address: `${Math.floor(Math.random() * 999) + 1} Main Street`,
          price_per_month: price,
          category: template.category,
          property_type: template.property_type,
          style: template.style,
          ideal_guests: "Business travelers and tourists seeking comfortable accommodation",
          atmosphere: "Professional and welcoming environment with modern amenities",
          perfect_location: `Excellent location in ${template.city} with easy access to attractions and transport`,
          status: 'approved',
          available_months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          features_hotel: {
            "WiFi": true,
            "Air Conditioning": true,
            "Reception 24h": true,
            "Restaurant": true,
            "Bar": true,
            "Gym": true
          },
          features_room: {
            "Private Bathroom": true,
            "TV": true,
            "Minibar": true,
            "Safe": true,
            "Desk": true,
            "Wardrobe": true
          },
          meal_plans: ['Breakfast', 'Half Board'],
          stay_lengths: [8, 16, 24, 32],
          contact_name: 'Hotel Manager',
          contact_email: `manager@${template.name.toLowerCase().replace(/\s+/g, '')}.com`,
          contact_phone: `+${Math.floor(Math.random() * 99) + 10}${Math.floor(Math.random() * 900000000) + 100000000}`
        };

        const { data: hotel, error: hotelError } = await supabase
          .from('hotels')
          .insert(hotelData)
          .select()
          .single();

        if (hotelError) {
          console.error(`Error creating hotel ${template.name}:`, hotelError);
          stats.errors.push(`Failed to create ${template.name}: ${hotelError.message}`);
        } else {
          stats.totalCreated++;
          stats.hotelDetails.push(`${hotel.name} - ${hotel.city}, ${hotel.country} (${hotel.category}⭐) - €${hotel.price_per_month}/month`);
          console.log(`Created hotel: ${hotel.name} - €${hotel.price_per_month}/month`);
        }
      } catch (error) {
        console.error(`Error processing hotel ${i + 1}:`, error);
        stats.errors.push(`Error processing hotel ${i + 1}: ${error.message}`);
      }
    }

    console.log(`Batch creation completed. Created: ${stats.totalCreated}, Errors: ${stats.errors.length}`);

    return new Response(
      JSON.stringify({ 
        success: true,
        stats: stats
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in batch-hotel-creation function:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        stats: {
          totalCreated: 0,
          errors: [error.message],
          hotelDetails: []
        }
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
