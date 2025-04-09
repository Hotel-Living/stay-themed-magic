
import { useState } from "react";
import { FilterState } from "../FilterTypes";

export const useFilterState = (onFilterChange: (filters: FilterState) => void) => {
  const [filters, setFilters] = useState<FilterState>({
    themes: [],
    amenities: [],
    country: null,
    month: null,
    theme: null,
    priceRange: null
  });
  
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [themeQuery, setThemeQuery] = useState("");
  const [openThemeCategory, setOpenThemeCategory] = useState<string | null>(null);
  
  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };
  
  const toggleThemeCategory = (category: string) => {
    setOpenThemeCategory(openThemeCategory === category ? null : category);
  };
  
  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    onFilterChange(newFilters);
    
    setOpenDropdown(null);
  };
  
  const clearFilter = (key: keyof FilterState) => {
    const newFilters = { ...filters, [key]: null };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const clearAllFilters = () => {
    const clearedFilters = {
      country: null,
      month: null,
      theme: null,
      priceRange: null,
      themes: [],
      amenities: []
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };
  
  const hasActiveFilters = () => {
    return filters.country !== null || filters.month !== null || filters.theme !== null || filters.priceRange !== null;
  };

  return {
    filters,
    openDropdown,
    themeQuery,
    openThemeCategory,
    setThemeQuery,
    toggleDropdown,
    toggleThemeCategory,
    updateFilter,
    clearFilter,
    clearAllFilters,
    hasActiveFilters
  };
};
