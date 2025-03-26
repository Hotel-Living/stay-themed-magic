
import { supabase } from "@/integrations/supabase/client";
import type { FilterState } from "@/components/filters/FilterTypes";
import { PaginationOptions, SortOption } from "./types";
import { createFilterParams } from "./filterUtils";
import { buildBaseHotelQuery } from "./buildBaseHotelQuery";

/**
 * Applies filters to a hotel query
 */
export const applyFilters = (query: any, filters: FilterState) => {
  // Get filter parameters and apply them efficiently
  const filterParams = createFilterParams(filters);
  
  // Apply each filter parameter to the query
  Object.entries(filterParams).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      query = query.eq(key, value);
    }
  });
  
  return query;
};

/**
 * Applies sorting to a hotel query
 */
export const applySorting = (query: any, sortOption?: SortOption) => {
  if (sortOption) {
    return query.order(sortOption.field, { ascending: sortOption.direction === 'asc' });
  }
  
  // Default sorting by price
  return query.order('price_per_month', { ascending: true });
};

/**
 * Applies pagination to a hotel query
 */
export const applyPagination = (query: any, pagination?: PaginationOptions) => {
  if (pagination) {
    const { page, limit } = pagination;
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    return query.range(from, to);
  }
  
  return query;
};
