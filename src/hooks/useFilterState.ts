
import { useState, useRef } from "react";
import { FilterState } from "@/components/filters/FilterTypes";
import { Theme } from "@/utils/data";

type FilterKey = keyof FilterState;

type DropdownType = FilterKey | null;

interface UseFilterStateProps {
  onFilterChange: (filters: FilterState) => void;
  initialFilters?: Partial<FilterState>;
}

export const useFilterState = ({ 
  onFilterChange, 
  initialFilters = {}
}: UseFilterStateProps) => {
  const [filters, setFilters] = useState<FilterState>({
    country: initialFilters.country || null,
    month: initialFilters.month || null,
    theme: initialFilters.theme || null,
    priceRange: initialFilters.priceRange || null
  });
  
  const [openDropdown, setOpenDropdown] = useState<DropdownType>(null);
  
  const countryRef = useRef<HTMLDivElement>(null);
  const monthRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  
  const toggleDropdown = (dropdown: DropdownType) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };
  
  const updateFilter = (key: FilterKey, value: string | number | Theme) => {
    const newFilters = { 
      ...filters,
      [key]: value 
    };
    
    setFilters(newFilters);
    onFilterChange(newFilters);
    setOpenDropdown(null);
  };
  
  const clearFilter = (key: FilterKey) => {
    const newFilters = { 
      ...filters,
      [key]: null 
    };
    
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const clearAllFilters = () => {
    const emptyFilters: FilterState = {
      country: null,
      month: null,
      theme: null,
      priceRange: null
    };
    
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };
  
  const handleSearch = () => {
    // Trigger search with current filters
    onFilterChange(filters);
  };
  
  const hasActiveFilters = (): boolean => {
    return Object.values(filters).some(filter => filter !== null);
  };
  
  return {
    filters,
    openDropdown,
    countryRef,
    monthRef,
    themeRef,
    priceRef,
    toggleDropdown,
    updateFilter,
    clearFilter,
    clearAllFilters,
    handleSearch,
    hasActiveFilters
  };
};
