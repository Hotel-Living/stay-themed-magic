
import { useState } from "react";
import { FilterState } from "../FilterTypes";

export const useFilterState = (onFilterChange: (filters: FilterState) => void) => {
  const [filters, setFilters] = useState<FilterState>({
    country: null,
    month: null,
    theme: null,
    priceRange: null,
    location: null,
    propertyType: null,
    propertyStyle: null,
    stars: [],
    activities: [],
    roomTypes: [],
    hotelServices: [],
    roomServices: [],
    mealPlan: null,
    dayRange: null
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
    const clearedFilters: FilterState = {
      country: null,
      month: null,
      theme: null,
      priceRange: null,
      location: null,
      propertyType: null,
      propertyStyle: null,
      stars: [],
      activities: [],
      roomTypes: [],
      hotelServices: [],
      roomServices: [],
      mealPlan: null,
      dayRange: null
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };
  
  const hasActiveFilters = () => {
    return filters.country !== null || 
           filters.month !== null || 
           filters.theme !== null || 
           filters.priceRange !== null ||
           filters.location !== null ||
           filters.propertyType !== null ||
           filters.propertyStyle !== null ||
           (filters.stars && filters.stars.length > 0) ||
           (filters.activities && filters.activities.length > 0) ||
           (filters.roomTypes && filters.roomTypes.length > 0) ||
           (filters.hotelServices && filters.hotelServices.length > 0) ||
           (filters.roomServices && filters.roomServices.length > 0) ||
           filters.mealPlan !== null ||
           filters.dayRange !== null;
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
