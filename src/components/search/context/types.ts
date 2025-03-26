
// Define filter state types
export interface SearchFilterState {
  priceRange: [number, number] | null;
  propertyType: string | null;
  propertyStyle: string | null;
  roomTypes: string[];
  hotelFeatures: string[];
  roomFeatures: string[];
  meals: string[];
  lengthOfStay: string | null;
  activities: string[];
  location: string | null;
  category: string | null;
  country: string | null;
  month: string | null;
  theme: string | null;
  amenities: string[]; 
  distance: number | null;
  rating: number | null;
}

// Define pagination state type
export interface PaginationState {
  page: number;
  limit: number;
}

// Define the context type
export interface SearchFiltersContextType {
  filters: SearchFilterState;
  pagination: PaginationState;
  sortOption: string;
  handleFilterChange: (key: keyof SearchFilterState, value: any) => void;
  handleArrayFilterChange: (key: keyof SearchFilterState, value: string[]) => void;
  handlePageChange: (page: number) => void;
  handleSortChange: (option: string) => void;
  handleClearFilters: () => void;
}

// Default filter values
export const DEFAULT_FILTERS: SearchFilterState = {
  priceRange: null,
  propertyType: null,
  propertyStyle: null,
  roomTypes: [],
  hotelFeatures: [],
  roomFeatures: [],
  meals: [],
  lengthOfStay: null,
  activities: [],
  location: null,
  category: null,
  country: null,
  month: null,
  theme: null,
  amenities: [],
  distance: null,
  rating: null,
};
