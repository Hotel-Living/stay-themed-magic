
import { supabase } from '@/integrations/supabase/client';
import { FilterState } from '@/components/filters/FilterTypes';

export const fetchHotelsWithFilters = async (filters: FilterState) => {
  try {
    let query = supabase
      .from('hotels')
      .select(`
        *, 
        hotel_images(*), 
        hotel_themes(theme_id, themes:themes(*)),
        hotel_activities(activity_id, activities:activities(*)),
        hotel_availability(*)
      `)
      .eq('status', 'approved'); // Always filter for approved hotels

    console.log("HotelService - Applying filters:", filters);

    // Apply search term filter
    if (filters.searchTerm && filters.searchTerm.trim() !== '') {
      console.log("HotelService - Applying search term filter:", filters.searchTerm);
      query = query.ilike('name', `%${filters.searchTerm}%`);
    }

    // Apply theme filter - check both theme ID and name
    if (filters.theme && (filters.theme.id || filters.theme.name)) {
      console.log("HotelService - Applying theme filter:", filters.theme);
      // Create a subquery to find hotels with matching themes
      const themeConditions = [];
      if (filters.theme.id && filters.theme.id.trim() !== '') {
        themeConditions.push(`hotel_themes.theme_id.eq.${filters.theme.id}`);
      }
      if (filters.theme.name && filters.theme.name.trim() !== '') {
        themeConditions.push(`hotel_themes.themes.name.ilike.%${filters.theme.name}%`);
      }
      if (themeConditions.length > 0) {
        query = query.or(themeConditions.join(','));
      }
    }

    // Apply country filter
    if (filters.country && filters.country.trim() !== '') {
      console.log("HotelService - Applying country filter:", filters.country);
      query = query.eq('country', filters.country);
    }

    // Apply month filter
    if (filters.month && filters.month.trim() !== '') {
      console.log("HotelService - Applying month filter:", filters.month);
      const month = filters.month.toLowerCase();
      query = query.contains('available_months', [month]);
    }

    // Apply city/location filter
    if (filters.location && filters.location.trim() !== '') {
      console.log("HotelService - Applying location filter:", filters.location);
      query = query.ilike('city', `%${filters.location}%`);
    }

    // Apply property type filter
    if (filters.propertyType && filters.propertyType.trim() !== '') {
      console.log("HotelService - Applying property type filter:", filters.propertyType);
      query = query.eq('property_type', filters.propertyType);
    }

    // Apply property style filter
    if (filters.propertyStyle && filters.propertyStyle.trim() !== '') {
      console.log("HotelService - Applying property style filter:", filters.propertyStyle);
      query = query.eq('style', filters.propertyStyle);
    }

    // Apply atmosphere filter
    if (filters.atmosphere && filters.atmosphere.trim() !== '') {
      console.log("HotelService - Applying atmosphere filter:", filters.atmosphere);
      query = query.ilike('atmosphere', `%${filters.atmosphere}%`);
    }

    // Apply minimum price filter
    if ((filters.minPrice !== undefined && filters.minPrice > 0) || 
        (filters.priceRange && typeof filters.priceRange === 'object' && filters.priceRange.min !== undefined && filters.priceRange.min > 0)) {
      const minPrice = filters.minPrice || (typeof filters.priceRange === 'object' ? filters.priceRange.min : 0);
      console.log("HotelService - Applying min price filter:", minPrice);
      query = query.gte('price_per_month', minPrice);
    }

    // Apply maximum price filter
    if ((filters.maxPrice !== undefined && filters.maxPrice < 1000) || 
        (filters.priceRange && typeof filters.priceRange === 'object' && filters.priceRange.max !== undefined)) {
      const maxPrice = filters.maxPrice || (typeof filters.priceRange === 'object' ? filters.priceRange.max : 1000);
      console.log("HotelService - Applying max price filter:", maxPrice);
      query = query.lte('price_per_month', maxPrice);
    }

    // Handle numeric priceRange (for dropdown selection)
    if (typeof filters.priceRange === 'number' && filters.priceRange > 0) {
      console.log("HotelService - Applying numeric price range filter:", filters.priceRange);
      if (filters.priceRange > 2000) {
        query = query.gte('price_per_month', 2000);
      } else {
        query = query.lte('price_per_month', filters.priceRange);
      }
    }

    // Apply star rating filter
    if (filters.stars && filters.stars.length > 0) {
      const numericStars = filters.stars.map(star => parseInt(star)).filter(star => !isNaN(star));
      if (numericStars.length > 0) {
        console.log("HotelService - Applying stars filter:", numericStars);
        query = query.in('category', numericStars);
      }
    }

    // Apply activities filter - this needs to be handled differently
    if (filters.activities && filters.activities.length > 0) {
      console.log("HotelService - Applying activities filter:", filters.activities);
      // We need to check if the hotel has any of the selected activities
      const activityConditions = filters.activities.map(activity => 
        `hotel_activities.activities.name.ilike.%${activity}%`
      );
      if (activityConditions.length > 0) {
        query = query.or(activityConditions.join(','));
      }
    }

    // Apply hotel features filter
    if (filters.hotelFeatures && filters.hotelFeatures.length > 0) {
      console.log("HotelService - Applying hotel features filter:", filters.hotelFeatures);
      const featureConditions = filters.hotelFeatures.map(feature => 
        `features_hotel->${feature}.eq.true`
      );
      if (featureConditions.length > 0) {
        query = query.or(featureConditions.join(','));
      }
    }

    // Apply room features filter
    if (filters.roomFeatures && filters.roomFeatures.length > 0) {
      console.log("HotelService - Applying room features filter:", filters.roomFeatures);
      const featureConditions = filters.roomFeatures.map(feature => 
        `features_room->${feature}.eq.true`
      );
      if (featureConditions.length > 0) {
        query = query.or(featureConditions.join(','));
      }
    }

    // Apply meal plans filter - fix the mapping
    if (filters.mealPlans && filters.mealPlans.length > 0) {
      console.log("HotelService - Applying meal plans filter:", filters.mealPlans);
      // Map UI meal plan names to database values
      const mealPlanMapping = {
        'Breakfast Included': 'breakfast-included',
        'Half Board': 'half-board', 
        'Full Board': 'full-board',
        'All Inclusive': 'all-inclusive',
        'Laundry': 'laundry',
        'External Laundry Service Available': 'external-laundry'
      };
      
      const mappedMealPlans = filters.mealPlans.map(plan => mealPlanMapping[plan] || plan);
      const mealConditions = mappedMealPlans.map(plan => 
        `meal_plans.cs.{${plan}}`
      );
      if (mealConditions.length > 0) {
        query = query.or(mealConditions.join(','));
      }
    }

    // Apply stay lengths filter
    if (filters.stayLengths && filters.stayLengths.length > 0) {
      console.log("HotelService - Applying stay lengths filter:", filters.stayLengths);
      const lengthConditions = filters.stayLengths.map(length => 
        `stay_lengths.cs.{${length}}`
      );
      if (lengthConditions.length > 0) {
        query = query.or(lengthConditions.join(','));
      }
    }

    const { data, error } = await query;

    if (error) {
      console.error("HotelService - Supabase query error:", error);
      throw new Error(`Failed to fetch hotels: ${error.message}`);
    }

    console.log("HotelService - Raw data from Supabase:", data?.length || 0);
    if (data && data.length > 0) {
      console.log("HotelService - First hotel in results:", data[0].name, "Country:", data[0].country, "Status:", data[0].status);
      console.log("HotelService - Sample hotel themes:", data[0].hotel_themes);
      console.log("HotelService - Sample hotel activities:", data[0].hotel_activities);
    } else {
      console.log("HotelService - No hotels found with current filters:", filters);
    }

    return data?.filter(hotel => hotel !== null) || [];
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
