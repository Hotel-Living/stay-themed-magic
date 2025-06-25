
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { count = 20 } = await req.json();
    
    console.log(`=== BATCH HOTEL CREATION STARTED ===`);
    console.log(`Creating ${count} hotels`);

    // Fetch themes and activities from database
    const { data: themes } = await supabaseClient
      .from('themes')
      .select('id, name')
      .limit(50);
    
    const { data: activities } = await supabaseClient
      .from('activities')  
      .select('id, name')
      .limit(50);

    if (!themes || !activities) {
      throw new Error('Failed to fetch themes or activities');
    }

    const hotelNames = [
      'Ocean Breeze Resort',
      'Mountain View Lodge', 
      'Urban Loft Boutique',
      'Countryside Villa',
      'Coastal Retreat House'
    ];

    const countries = ['Spain', 'Portugal', 'France', 'Italy', 'Greece'];
    const cities = ['Barcelona', 'Lisbon', 'Paris', 'Rome', 'Athens'];
    const propertyTypes = ['hotel', 'resort', 'boutique', 'villa', 'lodge'];
    const styles = ['modern', 'classic', 'luxury', 'minimalist', 'rustic'];

    const createdHotels = [];
    const errors = [];

    for (let i = 1; i <= count; i++) {
      try {
        console.log(`Creating hotel ${i}/${count}`);
        
        const hotelName = `${hotelNames[Math.floor(Math.random() * hotelNames.length)]} ${i}`;
        const country = countries[Math.floor(Math.random() * countries.length)];
        const city = cities[Math.floor(Math.random() * cities.length)];
        
        const hotelData = {
          name: hotelName,
          description: `A beautiful ${propertyTypes[Math.floor(Math.random() * propertyTypes.length)]} located in ${city}, ${country}. Perfect for travelers seeking comfort and quality.`,
          country: country,
          city: city,
          address: `${Math.floor(Math.random() * 999) + 1} Main Street, ${city}`,
          property_type: propertyTypes[Math.floor(Math.random() * propertyTypes.length)],
          style: styles[Math.floor(Math.random() * styles.length)],
          price_per_month: Math.floor(Math.random() * 2000) + 800,
          category: Math.floor(Math.random() * 5) + 1,
          latitude: Math.random() * 10 + 40,
          longitude: Math.random() * 10 + 0,
          status: 'approved'
        };

        console.log(`Generated hotel data: ${hotelData.name}`);

        // Insert hotel
        const { data: hotel, error: hotelError } = await supabaseClient
          .from('hotels')
          .insert(hotelData)
          .select()
          .single();

        if (hotelError) throw hotelError;
        
        console.log(`Hotel created with ID: ${hotel.id}`);

        // Add random themes (2-4 themes per hotel)
        const randomThemes = themes
          .sort(() => 0.5 - Math.random())
          .slice(0, Math.floor(Math.random() * 3) + 2);

        const themeInserts = randomThemes.map(theme => ({
          hotel_id: hotel.id,
          theme_id: theme.id
        }));

        const { error: themesError } = await supabaseClient
          .from('hotel_themes')
          .insert(themeInserts);

        if (themesError) throw themesError;
        console.log(`Added ${randomThemes.length} themes to hotel ${hotel.id}`);

        // Add random activities (2-5 activities per hotel)
        const randomActivities = activities
          .sort(() => 0.5 - Math.random())
          .slice(0, Math.floor(Math.random() * 4) + 2);

        const activityInserts = randomActivities.map(activity => ({
          hotel_id: hotel.id,
          activity_id: activity.id
        }));

        const { error: activitiesError } = await supabaseClient
          .from('hotel_activities')
          .insert(activityInserts);

        if (activitiesError) throw activitiesError;
        console.log(`Added ${randomActivities.length} activities to hotel ${hotel.id}`);

        createdHotels.push({
          id: hotel.id,
          name: hotel.name,
          city: hotel.city,
          country: hotel.country
        });

      } catch (error) {
        console.error(`Error creating hotel ${i}:`, error);
        errors.push(`Hotel ${i}: ${error.message}`);
      }
    }

    console.log(`=== BATCH HOTEL CREATION COMPLETED ===`);
    console.log(`Successfully created: ${createdHotels.length}/${count} hotels`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully created ${createdHotels.length} hotels`,
        stats: {
          totalCreated: createdHotels.length,
          errors: errors,
          hotelDetails: createdHotels
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Batch hotel creation failed:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        message: 'An error occurred during batch hotel creation',
        stats: {
          totalCreated: 0,
          errors: [error.message],
          hotelDetails: []
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
