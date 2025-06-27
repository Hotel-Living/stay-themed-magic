
import { supabase } from "@/integrations/supabase/client";
import { FilterState } from "@/components/filters/FilterTypes";
import { Hotel } from "@/components/hotels/HotelTypes";

export const fetchHotelsWithFilters = async (filters: FilterState): Promise<Hotel[]> => {
  console.log("🔍 Fetching hotels with filters:", filters);

  let query = supabase
    .from('hotels')
    .select(`
      *,
      hotel_images(
        id,
        image_url,
        is_main
      ),
      hotel_themes(
        theme_id,
        themes(
          id,
          name,
          description
        )
      ),
      hotel_activities(
        activity_id,
        activities(
          id,
          name,
          category
        )
      )
    `)
    .eq('status', 'approved');

  // Apply filters
  if (filters.country) {
    query = query.eq('country', filters.country);
  }

  if (filters.theme) {
    // For theme filtering, we need to use a different approach since we're dealing with nested data
    if (typeof filters.theme === 'object' && filters.theme.name) {
      // We'll handle theme filtering in post-processing since nested filtering is complex
      console.log("Theme filter will be applied in post-processing:", filters.theme.name);
    } else if (typeof filters.theme === 'string') {
      console.log("Theme filter will be applied in post-processing:", filters.theme);
    }
  }

  if (filters.priceRange) {
    // Handle priceRange properly - it could be a single number or array
    if (Array.isArray(filters.priceRange)) {
      const [min, max] = filters.priceRange;
      query = query.gte('price_per_month', min).lte('price_per_month', max);
    } else {
      query = query.lte('price_per_month', filters.priceRange);
    }
  }

  if (filters.stars && filters.stars.length > 0) {
    // Convert string stars to numbers for the category field
    const starNumbers = filters.stars.map(star => parseInt(star, 10)).filter(num => !isNaN(num));
    if (starNumbers.length > 0) {
      query = query.in('category', starNumbers);
    }
  }

  if (filters.propertyType) {
    query = query.eq('property_type', filters.propertyType);
  }

  if (filters.propertyStyle) {
    query = query.eq('style', filters.propertyStyle);
  }

  if (filters.activities && filters.activities.length > 0) {
    // Filter by hotel activities - this will be handled in post-processing
    console.log("Activities filter will be applied in post-processing:", filters.activities);
  }

  if (filters.roomTypes && filters.roomTypes.length > 0) {
    // This would need to be implemented based on your room_types structure
    console.log("Room types filter not yet implemented for:", filters.roomTypes);
  }

  if (filters.mealPlan) {
    query = query.contains('meal_plans', [filters.mealPlan]);
  }

  if (filters.month) {
    // Handle available months filtering with proper type checking
    console.log("Filtering by month:", filters.month);
  }

  if (filters.dayRange) {
    query = query.contains('stay_lengths', [filters.dayRange]);
  }

  try {
    const { data, error } = await query;

    if (error) {
      console.error("❌ Supabase query error:", error);
      throw new Error(`Database query failed: ${error.message}`);
    }

    if (!data) {
      console.log("⚠️ No data returned from query");
      return [];
    }

    console.log(`✅ Successfully fetched ${data.length} hotels from database`);
    
    // Convert the data to match our Hotel interface and apply post-processing filters
    let convertedHotels = data.map(hotel => {
      // Handle available_months conversion safely
      let availableMonths: string[] = [];
      if (hotel.available_months) {
        if (Array.isArray(hotel.available_months)) {
          availableMonths = hotel.available_months.filter((m): m is string => typeof m === 'string');
        }
      }

      return {
        ...hotel,
        available_months: availableMonths,
        // Ensure proper typing for features
        features_hotel: hotel.features_hotel || {},
        features_room: hotel.features_room || {},
        // Ensure arrays are properly handled
        hotel_images: hotel.hotel_images || [],
        hotel_themes: hotel.hotel_themes || [],
        hotel_activities: hotel.hotel_activities || [],
        meal_plans: hotel.meal_plans || [],
        stay_lengths: hotel.stay_lengths || [],
        room_types: hotel.room_types || []
      };
    });

    // Apply post-processing filters
    if (filters.theme) {
      const themeName = typeof filters.theme === 'object' ? filters.theme.name : filters.theme;
      convertedHotels = convertedHotels.filter(hotel => 
        hotel.hotel_themes?.some(ht => ht.themes?.name === themeName)
      );
    }

    if (filters.activities && filters.activities.length > 0) {
      convertedHotels = convertedHotels.filter(hotel => 
        hotel.hotel_activities?.some(ha => 
          filters.activities?.includes(ha.activities?.name || '')
        )
      );
    }

    return convertedHotels;
  } catch (error) {
    console.error("❌ Error in fetchHotelsWithFilters:", error);
    throw error;
  }
};

// Helper function to convert hotel data for UI display (if needed)
export const convertHotelToUIFormat = (hotel: any) => {
  return {
    id: hotel.id,
    name: hotel.name,
    location: `${hotel.city || ''}, ${hotel.country || ''}`.replace(/^,\s*|,\s*$/g, ''),
    price_per_month: hotel.price_per_month || 0,
    thumbnail: hotel.main_image_url || hotel.hotel_images?.[0]?.image_url,
    theme: hotel.hotel_themes?.[0]?.themes?.name,
    category: hotel.category,
    hotel_images: hotel.hotel_images || [],
    hotel_themes: hotel.hotel_themes || [],
    hotel_activities: hotel.hotel_activities || [],
    available_months: Array.isArray(hotel.available_months) ? hotel.available_months : [],
    features_hotel: hotel.features_hotel || {},
    features_room: hotel.features_room || {},
    meal_plans: hotel.meal_plans || [],
    stay_lengths: hotel.stay_lengths || [],
    atmosphere: hotel.atmosphere,
    property_type: hotel.property_type,
    style: hotel.style,
  };
};
