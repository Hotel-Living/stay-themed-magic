
import { FilterState } from '@/components/filters/FilterTypes';

export const createDefaultFilters = (): FilterState => ({
  searchTerm: '',
  theme: null,
  country: null,
  month: null,
  minPrice: 0,
  maxPrice: 1000,
  stars: [],
  location: null,
  propertyType: null,
  propertyStyle: null,
  activities: [],
  roomTypes: [],
  hotelFeatures: [],
  roomFeatures: [],
  mealPlans: [],
  stayLengths: null, // Single string, not array
  atmosphere: null
});

export const updateFiltersState = (
  currentFilters: FilterState,
  newFilters: Partial<FilterState>
): FilterState => {
  return { ...currentFilters, ...newFilters };
};
