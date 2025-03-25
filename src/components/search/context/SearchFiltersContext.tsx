
import { createContext, ReactNode, useContext, useState, useEffect, useCallback } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { FilterState } from "@/components/filters/FilterTypes";
import { Theme } from "@/utils/data";
import { PaginationOptions, SortOption } from "@/hooks/useHotels";

interface SearchFiltersContextType {
  filters: FilterState;
  pagination: PaginationOptions;
  sortOption: SortOption;
  handleFilterChange: (filterType: keyof FilterState, value: any) => void;
  handleArrayFilterChange: (filterType: string, value: Theme | string, isChecked: boolean) => void;
  handlePageChange: (newPage: number) => void;
  handleSortChange: (field: string, direction: 'asc' | 'desc') => void;
  handleClearFilters: () => void;
}

const SearchFiltersContext = createContext<SearchFiltersContextType | undefined>(undefined);

export function useSearchFilters() {
  const context = useContext(SearchFiltersContext);
  if (context === undefined) {
    throw new Error("useSearchFilters must be used within a SearchFiltersProvider");
  }
  return context;
}

interface SearchFiltersProviderProps {
  children: ReactNode;
}

// Default initial state for filters
const DEFAULT_FILTERS: FilterState = {
  country: null,
  month: null,
  theme: null,
  priceRange: null
};

// Default pagination settings
const DEFAULT_PAGINATION: PaginationOptions = { 
  page: 1, 
  limit: 10 
};

// Default sort option
const DEFAULT_SORT: SortOption = { 
  field: 'price_per_month', 
  direction: 'asc' 
};

export function SearchFiltersProvider({ children }: SearchFiltersProviderProps) {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  // Parse initial filters from URL params
  const getInitialFiltersFromUrl = useCallback(() => {
    return {
      country: (searchParams.get("country") as FilterState["country"]) || null,
      month: (searchParams.get("month") as FilterState["month"]) || null,
      theme: null,
      priceRange: searchParams.get("price") ? Number(searchParams.get("price")) : null
    };
  }, [searchParams]);
  
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [pagination, setPagination] = useState<PaginationOptions>(DEFAULT_PAGINATION);
  const [sortOption, setSortOption] = useState<SortOption>(DEFAULT_SORT);
  
  const handleFilterChange = useCallback((filterType: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page when filters change
  }, []);
  
  // Handle array filters by converting Theme to the correct format
  const handleArrayFilterChange = useCallback((filterType: string, value: Theme | string, isChecked: boolean) => {
    if (filterType === 'theme') {
      handleFilterChange(filterType, isChecked ? value : null);
    }
  }, [handleFilterChange]);
  
  const handlePageChange = useCallback((newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  
  const handleSortChange = useCallback((field: string, direction: 'asc' | 'desc') => {
    setSortOption({ field, direction });
  }, []);
  
  const handleClearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);
  
  // Update filters when the URL changes
  useEffect(() => {
    setFilters(getInitialFiltersFromUrl());
    setPagination(DEFAULT_PAGINATION);
  }, [location.search, getInitialFiltersFromUrl]);
  
  const value = {
    filters,
    pagination,
    sortOption,
    handleFilterChange,
    handleArrayFilterChange,
    handlePageChange,
    handleSortChange,
    handleClearFilters
  };
  
  return (
    <SearchFiltersContext.Provider value={value}>
      {children}
    </SearchFiltersContext.Provider>
  );
}
