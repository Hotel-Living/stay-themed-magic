
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
    if (filters.theme) {
      query = query.contains('themes', [filters.theme]);
    }

    // Apply country filter
    if (filters.country) {
      query = query.eq('country', filters.country);
    }

    // Apply month filter - enhanced to check both full months and specific dates
    if (filters.month) {
      const month = filters.month.toLowerCase();
      // This is a more complex filter that needs to check:
      // 1. If the month is in the available_months array (full month availability)
      // 2. OR if there are any availability dates in the hotel_availability table for this month
      query = query.or(
        `available_months.cs.{${month}},hotel_availability.availability_month.eq.${month}`
      );
    }

    // Apply city/location filter
    if (filters.location) {
      query = query.eq('city', filters.location);
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

    const { data, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch hotels: ${error.message}`);
    }

    return data || [];
  } catch (err: any) {
    console.error("Error in fetchHotelsWithFilters:", err);
    throw err;
  }
};
