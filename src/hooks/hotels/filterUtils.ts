
import { FilterState } from "@/components/filters/FilterTypes";

// Check if any filters are active
export const hasActiveFilters = (filters: FilterState): boolean => {
  return (
    filters.country !== null ||
    filters.month !== null ||
    filters.theme !== null ||
    filters.priceRange !== null
  );
};

// Convert filter state to API query params
export const filtersToQueryParams = (filters: FilterState): Record<string, string> => {
  const params: Record<string, string> = {};
  
  if (filters.country) {
    params.country = filters.country;
  }
  
  if (filters.month) {
    params.month = filters.month;
  }
  
  if (filters.theme) {
    if (typeof filters.theme === 'string') {
      params.theme = filters.theme;
    } else {
      params.theme = filters.theme.id;
    }
  }
  
  if (filters.priceRange) {
    params.price = filters.priceRange.toString();
  }
  
  return params;
};

// Parse query params into filter state
export const queryParamsToFilters = (
  params: URLSearchParams
): FilterState => {
  const country = params.get('country');
  const month = params.get('month');
  const theme = params.get('theme');
  const price = params.get('price');
  
  return {
    country: country as any,
    month: month as any,
    theme: theme,
    priceRange: price ? parseInt(price) : null
  };
};
