
import { FilterState } from "@/components/filters/FilterTypes";

/**
 * Convert filter state to database filter parameters
 */
export const createFilterParams = (filters: FilterState): Record<string, any> => {
  const params: Record<string, any> = {};
  
  if (filters.country) {
    params.country = filters.country;
  }
  
  // Month filtering would likely be handled via a contains operation
  // in the actual database query, not as a direct parameter
  
  // Theme would be handled via a join or contains operation
  // for the actual database query
  
  // Price range would be handled via a range operation
  // in the actual database query
  
  return params;
};

/**
 * Create query parameters for API requests from filter state
 */
export const createQueryParams = (filters: FilterState): URLSearchParams => {
  const params = new URLSearchParams();
  
  if (filters.country) {
    params.append('country', filters.country);
  }
  
  if (filters.month) {
    params.append('month', filters.month);
  }
  
  if (filters.theme) {
    if (typeof filters.theme === 'string') {
      params.append('theme', filters.theme);
    } else {
      params.append('theme', filters.theme.id);
    }
  }
  
  if (filters.priceRange) {
    params.append('price', filters.priceRange.toString());
  }
  
  return params;
};
