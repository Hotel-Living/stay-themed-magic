
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.0";

// Define CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get user_id from request
    const { user_id } = await req.json();

    if (!user_id) {
      return new Response(
        JSON.stringify({ error: 'User ID is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get user's preferences
    const { data: preferences } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', user_id)
      .single();

    // Get user's browsing history (from favorites)
    const { data: favorites } = await supabase
      .from('favorites')
      .select('hotel_id')
      .eq('user_id', user_id);

    // Get user's booking history
    const { data: bookings } = await supabase
      .from('bookings')
      .select('hotel_id')
      .eq('user_id', user_id);

    // Extract favorite and booked hotel IDs
    const favoriteHotelIds = favorites?.map(fav => fav.hotel_id) || [];
    const bookedHotelIds = bookings?.map(booking => booking.hotel_id) || [];
    
    // Combine for history analysis
    const interactedHotelIds = [...new Set([...favoriteHotelIds, ...bookedHotelIds])];
    
    // Prepare query for recommendations
    let query = supabase.from('hotels').select(`
      *,
      hotel_images(image_url, is_main),
      hotel_themes(theme_id, themes:themes(id, name))
    `);
    
    // Apply recommendations logic based on user data
    if (preferences) {
      // Filter by preferred countries if available
      if (preferences.preferred_countries && preferences.preferred_countries.length > 0) {
        query = query.in('country', preferences.preferred_countries);
      }

      // Filter by price range if available
      if (preferences.price_range_min !== null && preferences.price_range_max !== null) {
        query = query
          .gte('price_per_month', preferences.price_range_min)
          .lte('price_per_month', preferences.price_range_max);
      }

      // Exclude hotels the user has already interacted with
      if (interactedHotelIds.length > 0) {
        query = query.not('id', 'in', interactedHotelIds);
      }
      
      // Limit results
      query = query.limit(5);
    } else {
      // Fallback to featured hotels if no preferences
      query = query.eq('is_featured', true).limit(5);
    }
    
    // Execute query
    const { data: recommendations, error } = await query;
    
    if (error) {
      console.error("Error fetching recommendations:", error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Add confidence score based on match with user preferences (simple algorithm)
    const scoredRecommendations = recommendations.map(hotel => {
      let score = 0.5; // Base score
      
      // Adjust score based on country match
      if (preferences?.preferred_countries?.includes(hotel.country)) {
        score += 0.2;
      }
      
      // Adjust score based on price match (closer to min = better)
      if (preferences?.price_range_min && preferences?.price_range_max) {
        const priceRange = preferences.price_range_max - preferences.price_range_min;
        const priceDifference = hotel.price_per_month - preferences.price_range_min;
        if (priceRange > 0) {
          const priceScore = 1 - (priceDifference / priceRange);
          score += priceScore * 0.2;
        }
      }
      
      // Adjust score based on theme match
      const hotelThemeIds = hotel.hotel_themes.map(ht => ht.theme_id);
      const matchingThemes = preferences?.favorite_themes?.filter(
        themeId => hotelThemeIds.includes(themeId)
      ) || [];
      
      if (matchingThemes.length > 0) {
        score += 0.1 * Math.min(matchingThemes.length, 3); // Up to 0.3 for theme matches
      }
      
      return {
        ...hotel,
        confidence: Math.min(Math.round(score * 100) / 100, 0.99) // Round to 2 decimals, cap at 0.99
      };
    });
    
    // Sort by confidence score
    scoredRecommendations.sort((a, b) => b.confidence - a.confidence);
    
    return new Response(
      JSON.stringify({ recommendations: scoredRecommendations }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error in get-recommendations function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
