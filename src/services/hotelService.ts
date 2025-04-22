
import { supabase } from '@/integrations/supabase/client';
import { FilterState } from '@/components/filters/FilterTypes';

export const fetchHotelsWithFilters = async (filters: FilterState) => {
  try {
    console.log("Fetching hotels with filters:", filters);
    
    let query = supabase
      .from('hotels')
      .select(`
        *, 
        hotel_images(*), 
        hotel_themes(theme_id, themes:themes(*)),
        hotel_activities(activity_id, activities:activities(*)),
        hotel_availability(*)
      `)
      .eq('status', 'approved'); // Only show approved hotels
    
    // Apply search term filter
    if (filters.searchTerm) {
      query = query.ilike('name', `%${filters.searchTerm}%`);
    }

    // Apply theme filter
    if (filters.theme && filters.theme.id) {
      query = query.eq('hotel_themes.theme_id', filters.theme.id);
    }

    // Apply country filter
    if (filters.country) {
      query = query.ilike('country', `%${filters.country}%`);
    }

    // Apply month filter
    if (filters.month) {
      const month = filters.month.toLowerCase();
      query = query.contains('available_months', [month]);
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

    // Apply star rating filter
    if (filters.stars && filters.stars.length > 0) {
      const numericStars = filters.stars.map(star => parseInt(star)).filter(star => !isNaN(star));
      query = query.in('category', numericStars);
    }

    // Log SQL (visible in network tab for debugging)
    const { data, error, count } = await query;

    if (error) {
      console.error("Supabase query error:", error);
      throw new Error(`Failed to fetch hotels: ${error.message}`);
    }

    console.log("Fetched hotels:", data?.length || 0, "hotels");
    
    // Process the data to match the expected format for the SearchResultsList component
    const processedData = data?.map(hotel => {
      // Find main image
      const mainImage = hotel.hotel_images?.find((img: any) => img.is_main)?.image_url || 
                      hotel.hotel_images?.[0]?.image_url ||
                      hotel.main_image_url;
      
      // Process themes
      const themes = hotel.hotel_themes?.map((theme: any) => theme.themes?.name).filter(Boolean);
      
      return {
        id: hotel.id,
        name: hotel.name,
        location: `${hotel.city}, ${hotel.country}`,
        price_per_month: hotel.price_per_month,
        thumbnail: mainImage,
        theme: themes?.length > 0 ? themes[0] : undefined
      };
    });

    return processedData || [];
  } catch (err: any) {
    console.error("Error in fetchHotelsWithFilters:", err);
    throw err;
  }
};
