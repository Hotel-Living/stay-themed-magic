
import type { FilterState } from "@/components/filters/FilterTypes";

/**
 * Creates filter parameters for Supabase queries based on the provided filters
 */
export const createFilterParams = (filters: FilterState): Record<string, any> => {
  const params: Record<string, any> = {};
  
  if (filters.country) {
    params.country = filters.country;
  }
  
  if (filters.theme?.id) {
    params.theme_id = filters.theme.id;
  }
  
  if (filters.priceRange) {
    // Create price range filter based on the price range value
    switch (filters.priceRange) {
      case 1000:
        params.max_price = 1000;
        break;
      case 1500:
        params.min_price = 1000;
        params.max_price = 1500;
        break;
      case 2000:
        params.min_price = 1500;
        params.max_price = 2000;
        break;
      case 3000:
        params.min_price = 2000;
        break;
      default:
        // No specific range, apply exact price filter
        params.exact_price = filters.priceRange;
    }
  }
  
  // Add month filtering logic if implemented in the future
  if (filters.month) {
    params.available_month = filters.month;
  }
  
  return params;
};

/**
 * Utility function to check if filters are active
 */
export const hasActiveFilters = (filters: FilterState): boolean => {
  return Object.values(filters).some(value => value !== null);
};

/**
 * Apply the filters to a base URL
 */
export const applyFiltersToUrl = (baseUrl: string, filters: FilterState): string => {
  const params = new URLSearchParams();
  
  if (filters.country) params.append("country", filters.country);
  if (filters.month) params.append("month", filters.month);
  if (filters.theme) params.append("theme", filters.theme.id);
  if (filters.priceRange) params.append("price", filters.priceRange.toString());
  
  const queryString = params.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};
