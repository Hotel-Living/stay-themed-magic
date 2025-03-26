
import { useState, useRef, useCallback, useEffect } from "react";
import { FilterState } from "@/components/filters/FilterTypes";
import { useNavigate } from "react-router-dom";

type DropdownType = "country" | "month" | "theme" | "price" | null;

interface UseFilterStateProps {
  onFilterChange: (filters: FilterState) => void;
  initialFilters?: FilterState;
}

export const useFilterState = ({ 
  onFilterChange, 
  initialFilters = { country: null, month: null, theme: null, priceRange: null } 
}: UseFilterStateProps) => {
  // State for filters
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  
  // State for active dropdown
  const [openDropdown, setOpenDropdown] = useState<DropdownType>(null);
  
  // Refs for dropdown elements
  const countryRef = useRef<HTMLDivElement>(null);
  const monthRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  
  const navigate = useNavigate();
  
  // Toggle dropdown visibility
  const toggleDropdown = useCallback((dropdown: DropdownType) => {
    setOpenDropdown(prev => prev === dropdown ? null : dropdown);
  }, []);
  
  // Update filter value
  const updateFilter = useCallback((
    key: keyof FilterState, 
    value: string | number | null
  ) => {
    setFilters(prev => {
      const newFilters = { ...prev, [key]: value };
      onFilterChange(newFilters);
      return newFilters;
    });
    setOpenDropdown(null);
  }, [onFilterChange]);
  
  // Clear specific filter
  const clearFilter = useCallback((key: keyof FilterState) => {
    setFilters(prev => {
      const newFilters = { ...prev, [key]: null };
      onFilterChange(newFilters);
      return newFilters;
    });
  }, [onFilterChange]);
  
  // Clear all filters
  const clearAllFilters = useCallback(() => {
    const resetFilters = { 
      country: null, 
      month: null, 
      theme: null, 
      priceRange: null 
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  }, [onFilterChange]);
  
  // Handle search button action
  const handleSearch = useCallback(() => {
    // Construct query parameters
    const queryParams = new URLSearchParams();
    
    if (filters.country) {
      queryParams.append("country", filters.country);
    }
    if (filters.month) {
      queryParams.append("month", filters.month);
    }
    if (filters.theme) {
      if (typeof filters.theme === 'string') {
        queryParams.append("theme", filters.theme);
      } else {
        queryParams.append("theme", filters.theme.id);
      }
    }
    if (filters.priceRange) {
      queryParams.append("price", filters.priceRange.toString());
    }
    
    // Navigate to search page with params
    navigate({
      pathname: "/search",
      search: queryParams.toString()
    });
  }, [filters, navigate]);
  
  // Check if any filters are active
  const hasActiveFilters = useCallback(() => {
    return Object.values(filters).some(value => value !== null);
  }, [filters]);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openDropdown === "country" && 
        countryRef.current && 
        !countryRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      } else if (
        openDropdown === "month" && 
        monthRef.current && 
        !monthRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      } else if (
        openDropdown === "theme" && 
        themeRef.current && 
        !themeRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      } else if (
        openDropdown === "price" && 
        priceRef.current && 
        !priceRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);
  
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
