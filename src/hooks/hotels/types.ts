
// Define types for pagination and sorting
export type SortOption = {
  field: string;
  direction: 'asc' | 'desc';
};

export type PaginationOptions = {
  page: number;
  limit: number;
};

// Types for fetching hotels
export interface FetchHotelsOptions {
  filters: import("@/components/filters/FilterTypes").FilterState;
  pagination?: PaginationOptions;
  sortOption?: SortOption;
}

// Re-export FilterState to avoid circular dependencies
import type { FilterState } from "@/components/filters/FilterTypes";
export type { FilterState };
