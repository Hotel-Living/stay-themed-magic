
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
      `);

    // Apply search term filter
    if (filters.searchTerm) {
      query = query.ilike('name', `%${filters.searchTerm}%`);
    }

    // Apply theme filter
    if (filters.theme && filters.theme.id) {
      query = query.or(`hotel_themes.theme_id.eq.${filters.theme.id},hotel_themes.themes.name.ilike.%${filters.theme.name}%`);
    }

    // Apply country filter - use case-insensitive matching
    if (filters.country) {
      query = query.ilike('country', filters.country);
    }

    // Apply month filter - check both available_months and hotel_availability
    if (filters.month) {
      const month = filters.month.toLowerCase();
      // This combines: 
      // 1. hotels.available_months contains the month 
      // 2. OR there exists hotel_availability with the same month
      query = query.or(
        `available_months.cs.{${month}},hotel_availability.availability_month.eq.${month}`
      );
    }

    // Apply city/location filter
    if (filters.location) {
      query = query.ilike('city', `%${filters.location}%`);
    }

    // Apply property type filter
    if (filters.propertyType) {
      query = query.eq('property_type', filters.propertyType);
    }

    // Apply minimum price filter
    if (filters.minPrice !== undefined || (filters.priceRange && typeof filters.priceRange === 'object' && filters.priceRange.min !== undefined)) {
      const minPrice = filters.minPrice || (typeof filters.priceRange === 'object' ? filters.priceRange.min : 0);
      query = query.gte('price_per_month', minPrice);
    }

    // Apply maximum price filter
    if (filters.maxPrice !== undefined || (filters.priceRange && typeof filters.priceRange === 'object' && filters.priceRange.max !== undefined)) {
      const maxPrice = filters.maxPrice || (typeof filters.priceRange === 'object' ? filters.priceRange.max : 1000);
      query = query.lte('price_per_month', maxPrice);
    }

    // Handle numeric priceRange (for dropdown selection)
    if (typeof filters.priceRange === 'number') {
      if (filters.priceRange > 2000) {
        query = query.gte('price_per_month', 2000);
      } else {
        query = query.lte('price_per_month', filters.priceRange);
      }
    }

    // Apply star rating filter - Convert string[] to number[] for category comparison
    if (filters.stars && filters.stars.length > 0) {
      const numericStars = filters.stars.map(star => parseInt(star)).filter(star => !isNaN(star));
      query = query.in('category', numericStars);
    }

    // Apply activities filter
    if (filters.activities && filters.activities.length > 0) {
      query = query.in('hotel_activities.activities.category', filters.activities);
    }

    // Include properties with approved status by default
    query = query.eq('status', 'approved');

    const { data, error } = await query;

    if (error) {
      console.error("Supabase query error:", error);
      throw new Error(`Failed to fetch hotels: ${error.message}`);
    }

    // Add debugging to see what's being returned
    console.log("Fetched hotels:", data?.length || 0, "hotels");
    if (data && data.length > 0) {
      console.log("Sample hotel data:", data[0]);
    }

    // Ensure we always return an array, even if empty
    return data?.filter(hotel => hotel !== null) || [];
  } catch (err: any) {
    console.error("Error in fetchHotelsWithFilters:", err);
    throw err;
  }
};

// Helper function to convert API fields to UI format
export const convertHotelToUIFormat = (hotel: any) => {
  if (!hotel) return null;
  
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
          : undefined,
    hotel_images: hotel.hotel_images || [],
    hotel_themes: hotel.hotel_themes || [],
    available_months: hotel.available_months || [],
    theme: hotel.hotel_themes && hotel.hotel_themes.length > 0 && hotel.hotel_themes[0].themes
      ? hotel.hotel_themes[0].themes.name
      : undefined,
  };
};
