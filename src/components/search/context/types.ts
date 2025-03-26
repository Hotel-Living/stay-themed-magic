
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

export interface SearchContextProps {
  filters: SearchFiltersState;
  pagination: PaginationState;
  sortOption: string | null;
  handleFilterChange: (key: string, value: any) => void;
  handleArrayFilterChange: (key: string, value: string[]) => void;
  handleClearFilters: () => void;
  handleSortChange: (option: string) => void;
  handlePageChange: (page: number) => void;
}
