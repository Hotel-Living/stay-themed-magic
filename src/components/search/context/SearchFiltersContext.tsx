
import { createContext, ReactNode, useContext, useState, useEffect } from "react";
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

export function SearchFiltersProvider({ children }: SearchFiltersProviderProps) {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  // Parse initial filters from URL params, ensuring they match the expected types
  const initialFilters: FilterState = {
    country: (searchParams.get("country") as FilterState["country"]) || null,
    month: (searchParams.get("month") as FilterState["month"]) || null,
    theme: null,
    priceRange: searchParams.get("price") ? Number(searchParams.get("price")) : null
  };
  
  const [filters, setFilters] = useState<FilterState>({
    country: null,
    month: null,
    theme: null,
    priceRange: null
  });
  
  const [pagination, setPagination] = useState<PaginationOptions>({ page: 1, limit: 10 });
  const [sortOption, setSortOption] = useState<SortOption>({ field: 'price_per_month', direction: 'asc' });
  
  const handleFilterChange = (filterType: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };
  
  // Handle array filters by converting Theme to the correct format
  const handleArrayFilterChange = (filterType: string, value: Theme | string, isChecked: boolean) => {
    if (filterType === 'theme') {
      handleFilterChange(filterType, isChecked ? value : null);
    }
  };
  
  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleSortChange = (field: string, direction: 'asc' | 'desc') => {
    setSortOption({ field, direction });
  };
  
  const handleClearFilters = () => {
    setFilters({
      country: null,
      month: null,
      theme: null,
      priceRange: null
    });
  };
  
  useEffect(() => {
    const newFilters: FilterState = {
      country: searchParams.get("country") as FilterState["country"] || null,
      month: searchParams.get("month") as FilterState["month"] || null,
      theme: null,
      priceRange: searchParams.get("price") ? Number(searchParams.get("price")) : null
    };
    
    setFilters(newFilters);
    setPagination({ page: 1, limit: 10 });
  }, [location.search, searchParams]);
  
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
