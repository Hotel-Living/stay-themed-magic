
import { supabase } from "@/integrations/supabase/client";
import { Hotel } from "@/integrations/supabase/types-custom";
import { FilterState } from "@/components/filters/FilterTypes";
import { PaginationOptions, SortOption } from "./types";
import { buildBaseHotelQuery, applyFilters, applySorting, applyPagination } from "./hotelQueries";

/**
 * Fetch hotels with filtering, sorting, and pagination
 */
export const fetchHotels = async (
  filters?: FilterState,
  sortOption?: SortOption,
  pagination?: PaginationOptions
): Promise<Hotel[]> => {
  try {
    // Build query with filters, sorting, and pagination
    let query = buildBaseHotelQuery();
    
    if (filters) {
      query = applyFilters(query, filters);
    }
    
    query = applySorting(query, sortOption);
    
    if (pagination) {
      query = applyPagination(query, pagination);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return [];
  }
};

/**
 * Fetch a single hotel by ID
 */
export const fetchHotelById = async (id: string): Promise<Hotel | null> => {
  try {
    const { data, error } = await supabase
      .from('hotels')
      .select(`
        *,
        hotel_images(*),
        hotel_themes(*, themes:themes(*))
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error(`Error fetching hotel with ID ${id}:`, error);
    return null;
  }
};
