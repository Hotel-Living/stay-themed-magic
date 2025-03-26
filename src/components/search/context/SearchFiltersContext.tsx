
import React, { createContext, useState, useContext, useCallback } from 'react';

// Extended filter state to include new filters
interface SearchFilterState {
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
  amenities: string[]; // New filter
  distance: number | null; // New filter
  rating: number | null; // New filter
}

interface PaginationState {
  page: number;
  limit: number;
}

interface SearchFiltersContextType {
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
const DEFAULT_FILTERS: SearchFilterState = {
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
  amenities: [], // New filter default
  distance: null, // New filter default
  rating: null, // New filter default
};

const SearchFiltersContext = createContext<SearchFiltersContextType | undefined>(undefined);

export function SearchFiltersProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<SearchFilterState>(DEFAULT_FILTERS);
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [sortOption, setSortOption] = useState('relevance');

  const handleFilterChange = useCallback((key: keyof SearchFilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    // Reset to page 1 when filters change
    setPagination(prev => ({ ...prev, page: 1 }));
  }, []);

  const handleArrayFilterChange = useCallback((key: keyof SearchFilterState, value: string[]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    // Reset to page 1 when filters change
    setPagination(prev => ({ ...prev, page: 1 }));
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setPagination(prev => ({ ...prev, page }));
  }, []);

  const handleSortChange = useCallback((option: string) => {
    setSortOption(option);
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setPagination(prev => ({ ...prev, page: 1 }));
  }, []);

  return (
    <SearchFiltersContext.Provider 
      value={{ 
        filters, 
        pagination, 
        sortOption, 
        handleFilterChange, 
        handleArrayFilterChange,
        handlePageChange,
        handleSortChange,
        handleClearFilters
      }}
    >
      {children}
    </SearchFiltersContext.Provider>
  );
}

export function useSearchFilters() {
  const context = useContext(SearchFiltersContext);
  if (context === undefined) {
    throw new Error('useSearchFilters must be used within a SearchFiltersProvider');
  }
  return context;
}
