
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
  
  // Add month filtering logic if implemented in the future
  // if (filters.month) {
  //   params.available_months = filters.month;
  // }
  
  // Add price range filtering logic if implemented in the future
  // if (filters.priceRange) {
  //   params.price_range = filters.priceRange;
  // }
  
  return params;
};
