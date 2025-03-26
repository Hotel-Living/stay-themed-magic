
import { Theme } from "@/utils/data";

export interface SearchFiltersState {
  priceRange: number | null;
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
  theme: string | Theme | null;
  amenities: string[];
  distance: number | null;
  rating: number | null;
}

export interface PaginationState {
  page: number;
  limit: number;
}

export interface SearchFiltersContextType {
  filters: SearchFiltersState;
  pagination: PaginationState;
  sortOption: string | null;
  handleFilterChange: (key: string, value: any) => void;
  handleArrayFilterChange: (key: string, value: string[]) => void;
  handleClearFilters: () => void;
  handleSortChange: (option: string) => void;
  handlePageChange: (page: number) => void;
}

// Default filter values
export const DEFAULT_FILTERS: SearchFiltersState = {
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

// Renamed to align with new type name but kept for backward compatibility
export type SearchFilterState = SearchFiltersState;
export type SearchContextProps = SearchFiltersContextType;
