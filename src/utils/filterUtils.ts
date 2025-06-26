
import { FilterState } from '@/components/filters/FilterTypes';

export const createDefaultFilters = (): FilterState => ({
  searchTerm: '',
  theme: null,
  country: null,
  month: null,
  minPrice: 0,
  maxPrice: 10000, // Increased from 1000 to 10000 to not filter out higher-priced hotels
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
  console.log("🔄 Updating filters from:", currentFilters, "to:", newFilters);
  return { ...currentFilters, ...newFilters };
};
