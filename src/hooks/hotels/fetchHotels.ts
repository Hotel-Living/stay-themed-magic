
import type { FilterState } from "@/components/filters/FilterTypes";
import { PaginationOptions, SortOption } from "./types";
import { 
  buildBaseHotelQuery, 
  applyFilters, 
  applySorting, 
  applyPagination 
} from "./hotelQueries";

/**
 * Fetches hotels with filters, pagination and sorting
 */
export const fetchHotels = async (
  filters: FilterState,
  pagination?: PaginationOptions,
  sortOption?: SortOption
) => {
  // Create a base query
  let query = buildBaseHotelQuery();
  
  // Apply filters
  query = applyFilters(query, filters);
  
  // Apply sorting
  query = applySorting(query, sortOption);
  
  // Apply pagination
  query = applyPagination(query, pagination);
  
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
  const { data, error } = await buildBaseHotelQuery()
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};
