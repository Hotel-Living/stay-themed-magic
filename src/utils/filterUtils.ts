
import { FilterState } from '@/components/filters/FilterTypes';

export const createDefaultFilters = (): FilterState => ({
  theme: null,
  country: null,
  month: null,
  priceRange: [0, 5000], // Fixed: proper tuple type
  stars: [],
  location: null,
  propertyType: null,
  propertyStyle: null,
  activities: [],
  roomTypes: [],
  hotelServices: [],
  roomServices: [],
  mealPlan: null,
  dayRange: null,
  category: null, // Added missing property
  lengthOfStay: null // Added missing property
});

export const updateFiltersState = (
  currentFilters: FilterState,
  newFilters: Partial<FilterState>
): FilterState => {
  console.log("🔄 Updating filters from:", currentFilters, "to:", newFilters);
  return { ...currentFilters, ...newFilters };
};
