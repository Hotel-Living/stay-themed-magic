
import { supabase } from '@/integrations/supabase/client';
import { FilterState } from '@/components/filters/FilterTypes';

export const fetchHotelsWithFilters = async (filters: FilterState) => {
  try {
    // First, get all approved hotels with their relationships
    let query = supabase
      .from('hotels')
      .select(`
        *, 
        hotel_images(*), 
        hotel_themes(theme_id, themes:themes(*)),
        hotel_activities(activity_id, activities:activities(*)),
        hotel_availability(*)
      `)
      .eq('status', 'approved');

    console.log("HotelService - Applying basic filters:", filters);

    // Apply simple filters directly in the query for better performance
    if (filters.searchTerm && filters.searchTerm.trim() !== '') {
      console.log("HotelService - Applying search term filter:", filters.searchTerm);
      query = query.ilike('name', `%${filters.searchTerm}%`);
    }

    if (filters.country && filters.country.trim() !== '') {
      console.log("HotelService - Applying country filter:", filters.country);
      query = query.eq('country', filters.country);
    }

    if (filters.location && filters.location.trim() !== '') {
      console.log("HotelService - Applying location filter:", filters.location);
      query = query.ilike('city', `%${filters.location}%`);
    }

    if (filters.propertyType && filters.propertyType.trim() !== '') {
      console.log("HotelService - Applying property type filter:", filters.propertyType);
      query = query.eq('property_type', filters.propertyType);
    }

    if (filters.propertyStyle && filters.propertyStyle.trim() !== '') {
      console.log("HotelService - Applying property style filter:", filters.propertyStyle);
      query = query.eq('style', filters.propertyStyle);
    }

    if (filters.atmosphere && filters.atmosphere.trim() !== '') {
      console.log("HotelService - Applying atmosphere filter:", filters.atmosphere);
      query = query.ilike('atmosphere', `%${filters.atmosphere}%`);
    }

    // Apply price filters
    if ((filters.minPrice !== undefined && filters.minPrice > 0) || 
        (filters.priceRange && typeof filters.priceRange === 'object' && filters.priceRange.min !== undefined && filters.priceRange.min > 0)) {
      const minPrice = filters.minPrice || (typeof filters.priceRange === 'object' ? filters.priceRange.min : 0);
      console.log("HotelService - Applying min price filter:", minPrice);
      query = query.gte('price_per_month', minPrice);
    }

    if ((filters.maxPrice !== undefined && filters.maxPrice < 1000) || 
        (filters.priceRange && typeof filters.priceRange === 'object' && filters.priceRange.max !== undefined)) {
      const maxPrice = filters.maxPrice || (typeof filters.priceRange === 'object' ? filters.priceRange.max : 1000);
      console.log("HotelService - Applying max price filter:", maxPrice);
      query = query.lte('price_per_month', maxPrice);
    }

    if (typeof filters.priceRange === 'number' && filters.priceRange > 0) {
      console.log("HotelService - Applying numeric price range filter:", filters.priceRange);
      if (filters.priceRange > 2000) {
        query = query.gte('price_per_month', 2000);
      } else {
        query = query.lte('price_per_month', filters.priceRange);
      }
    }

    if (filters.stars && filters.stars.length > 0) {
      const numericStars = filters.stars.map(star => parseInt(star)).filter(star => !isNaN(star));
      if (numericStars.length > 0) {
        console.log("HotelService - Applying stars filter:", numericStars);
        query = query.in('category', numericStars);
      }
    }

    const { data, error } = await query;

    if (error) {
      console.error("HotelService - Supabase query error:", error);
      throw new Error(`Failed to fetch hotels: ${error.message}`);
    }

    console.log("HotelService - Raw data from Supabase:", data?.length || 0);
    
    if (!data) {
      return [];
    }

    // Now apply complex filters in JavaScript
    let filteredData = data.filter(hotel => hotel !== null);

    // Theme filter (JavaScript filtering)
    if (filters.theme && (filters.theme.id || filters.theme.name)) {
      console.log("HotelService - Applying theme filter in JS:", filters.theme);
      filteredData = filteredData.filter(hotel => {
        if (!hotel.hotel_themes || hotel.hotel_themes.length === 0) return false;
        
        return hotel.hotel_themes.some((hotelTheme: any) => {
          if (!hotelTheme.themes) return false;
          
          const themeName = hotelTheme.themes.name?.toLowerCase() || '';
          const themeId = hotelTheme.theme_id || '';
          
          const filterThemeName = filters.theme?.name?.toLowerCase() || '';
          const filterThemeId = filters.theme?.id || '';
          
          return themeName.includes(filterThemeName) || 
                 themeId === filterThemeId ||
                 (filterThemeId && themeName.includes(filterThemeId.toLowerCase()));
        });
      });
    }

    // Activities filter (JavaScript filtering)
    if (filters.activities && filters.activities.length > 0) {
      console.log("HotelService - Applying activities filter in JS:", filters.activities);
      filteredData = filteredData.filter(hotel => {
        if (!hotel.hotel_activities || hotel.hotel_activities.length === 0) return false;
        
        return filters.activities!.some(filterActivity => {
          return hotel.hotel_activities.some((hotelActivity: any) => {
            if (!hotelActivity.activities) return false;
            const activityName = hotelActivity.activities.name?.toLowerCase() || '';
            return activityName.includes(filterActivity.toLowerCase());
          });
        });
      });
    }

    // Month filter (JavaScript filtering)
    if (filters.month && filters.month.trim() !== '') {
      console.log("HotelService - Applying month filter in JS:", filters.month);
      const month = filters.month.toLowerCase();
      filteredData = filteredData.filter(hotel => {
        return hotel.available_months && hotel.available_months.includes(month);
      });
    }

    // Hotel features filter (JavaScript filtering)
    if (filters.hotelFeatures && filters.hotelFeatures.length > 0) {
      console.log("HotelService - Applying hotel features filter in JS:", filters.hotelFeatures);
      filteredData = filteredData.filter(hotel => {
        if (!hotel.features_hotel) return false;
        return filters.hotelFeatures!.some(feature => hotel.features_hotel[feature] === true);
      });
    }

    // Room features filter (JavaScript filtering)
    if (filters.roomFeatures && filters.roomFeatures.length > 0) {
      console.log("HotelService - Applying room features filter in JS:", filters.roomFeatures);
      filteredData = filteredData.filter(hotel => {
        if (!hotel.features_room) return false;
        return filters.roomFeatures!.some(feature => hotel.features_room[feature] === true);
      });
    }

    // Meal plans filter (JavaScript filtering)
    if (filters.mealPlans && filters.mealPlans.length > 0) {
      console.log("HotelService - Applying meal plans filter in JS:", filters.mealPlans);
      const mealPlanMapping = {
        'Breakfast Included': 'breakfast-included',
        'Half Board': 'half-board', 
        'Full Board': 'full-board',
        'All Inclusive': 'all-inclusive',
        'Laundry': 'laundry',
        'External Laundry Service Available': 'external-laundry'
      };
      
      const mappedMealPlans = filters.mealPlans.map(plan => mealPlanMapping[plan as keyof typeof mealPlanMapping] || plan);
      
      filteredData = filteredData.filter(hotel => {
        if (!hotel.meal_plans || hotel.meal_plans.length === 0) return false;
        return mappedMealPlans.some(plan => hotel.meal_plans.includes(plan));
      });
    }

    // Stay lengths filter (JavaScript filtering)
    if (filters.stayLengths && filters.stayLengths.length > 0) {
      console.log("HotelService - Applying stay lengths filter in JS:", filters.stayLengths);
      filteredData = filteredData.filter(hotel => {
        if (!hotel.stay_lengths || hotel.stay_lengths.length === 0) return false;
        return filters.stayLengths!.some(length => hotel.stay_lengths.includes(length));
      });
    }

    console.log("HotelService - Filtered data count:", filteredData.length);
    if (filteredData.length > 0) {
      console.log("HotelService - First filtered hotel:", filteredData[0].name, "Country:", filteredData[0].country);
    } else {
      console.log("HotelService - No hotels found after filtering with:", filters);
    }

    return filteredData;
  } catch (err: any) {
    console.error("HotelService - Error in fetchHotelsWithFilters:", err);
    throw err;
  }
};

// Helper function to convert API fields to UI format
export const convertHotelToUIFormat = (hotel: any) => {
  if (!hotel) return null;
  
  // Process room_types properly from the database
  const processedRoomTypes = hotel.room_types && Array.isArray(hotel.room_types) 
    ? hotel.room_types.map((room: any) => ({
        id: room.id || `room-${Math.random().toString(36).substr(2, 9)}`,
        name: room.name || 'Unnamed Room',
        description: room.description,
        maxOccupancy: room.maxOccupancy,
        size: room.size,
        roomCount: room.roomCount,
        baseRate: room.baseRate || room.basePrice,
        basePrice: room.basePrice || room.baseRate,
        rates: room.rates || {},
        images: room.images || [],
        availabilityDates: room.availabilityDates || []
      }))
    : [];
  
  return {
    id: hotel.id,
    name: hotel.name,
    location: hotel.city || 'Unknown location',
    city: hotel.city,
    country: hotel.country,
    category: hotel.category,
    price_per_month: hotel.price_per_month || 0,
    thumbnail: 
      hotel.main_image_url 
        ? hotel.main_image_url 
        : hotel.hotel_images && hotel.hotel_images.length > 0
          ? hotel.hotel_images[0].image_url
          : null,
    hotel_images: hotel.hotel_images || [],
    hotel_themes: hotel.hotel_themes || [],
    hotel_activities: hotel.hotel_activities || [],
    available_months: hotel.available_months || [],
    theme: hotel.hotel_themes && hotel.hotel_themes.length > 0 && hotel.hotel_themes[0].themes
      ? hotel.hotel_themes[0].themes.name
      : undefined,
    features_hotel: hotel.features_hotel || {},
    features_room: hotel.features_room || {},
    meal_plans: hotel.meal_plans || [],
    stay_lengths: hotel.stay_lengths || [],
    atmosphere: hotel.atmosphere,
    property_type: hotel.property_type,
    style: hotel.style,
    room_types: processedRoomTypes,
    rates: hotel.rates || {},
    pricingMatrix: hotel.pricingMatrix || hotel.pricingmatrix || []
  };
};
