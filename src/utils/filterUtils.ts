
import { FilterState } from '@/components/filters/FilterTypes';

export const createDefaultFilters = (): FilterState => ({
  theme: null,
  country: null,
  month: null,
  priceRange: null,
  stars: [],
  location: null,
  propertyType: null,
  propertyStyle: null,
  activities: [],
  roomTypes: [],
  hotelServices: [],
  roomServices: [],
  mealPlan: null,
  dayRange: null
});

export const updateFiltersState = (
  currentFilters: FilterState,
  newFilters: Partial<FilterState>
): FilterState => {
  console.log("🔄 Updating filters from:", currentFilters, "to:", newFilters);
  return { ...currentFilters, ...newFilters };
};
