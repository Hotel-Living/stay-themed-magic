
import { supabase } from "@/integrations/supabase/client";
import { FilterState } from "@/components/filters/FilterTypes";
import { PaginationOptions, SortOption } from "./types";
import { createFilterParams } from "./filterUtils";

/**
 * Fetches hotels with filters, pagination and sorting
 */
export const fetchHotels = async (
  filters: FilterState,
  pagination?: PaginationOptions,
  sortOption?: SortOption
) => {
  // Create a base query
  let query = supabase
    .from('hotels')
    .select(`
      *,
      hotel_images(image_url, is_main),
      hotel_themes(theme_id, themes:themes(id, name))
    `);
  
  // Get filter parameters and apply them efficiently
  const filterParams = createFilterParams(filters);
  
  // Apply each filter parameter to the query
  Object.entries(filterParams).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      query = query.eq(key, value);
    }
  });
  
  // Apply sorting if provided
  if (sortOption) {
    query = query.order(sortOption.field, { ascending: sortOption.direction === 'asc' });
  } else {
    // Default sorting by price
    query = query.order('price_per_month', { ascending: true });
  }
  
  // Apply pagination if provided
  if (pagination) {
    const { page, limit } = pagination;
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);
  }
  
  const { data, error } = await query;
  
  if (error) {
    throw error;
  }
  
  return data || [];
};

/**
 * Fetches a single hotel by ID
 */
export const fetchHotelById = async (id: string) => {
  const { data, error } = await supabase
    .from('hotels')
    .select(`
      *,
      hotel_images(image_url, is_main),
      hotel_themes(theme_id, themes:themes(id, name))
    `)
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};
