
// Define types for pagination and sorting
export type SortOption = {
  field: string;
  direction: 'asc' | 'desc';
};

export type PaginationOptions = {
  page: number;
  limit: number;
};

// Filter parameters type
export type FilterParams = Record<string, any>;

// Types for fetching hotels
export interface FetchHotelsOptions {
  filters: FilterState;
  pagination?: PaginationOptions;
  sortOption?: SortOption;
}

// Re-export FilterState to avoid circular dependencies
import { FilterState } from "@/components/filters/FilterTypes";
export { FilterState };
