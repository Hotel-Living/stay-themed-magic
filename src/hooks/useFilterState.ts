
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FilterState } from '@/components/filters/FilterTypes';
import { Theme } from '@/utils/data';

interface UseFilterStateProps {
  onFilterChange: (filters: FilterState) => void;
}

export function useFilterState({ onFilterChange }: UseFilterStateProps) {
  const [filters, setFilters] = useState<FilterState>({
    country: null,
    month: null,
    theme: null,
    priceRange: null
  });
  
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  const countryRef = useRef<HTMLDivElement>(null);
  const monthRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  
  const navigate = useNavigate();
  
  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
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
      priceRange: null
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };
  
  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (filters.country) params.append("country", filters.country);
    if (filters.month) params.append("month", filters.month);
    
    if (filters.theme) {
      // Handle both string and object theme types
      const themeId = typeof filters.theme === 'string' ? filters.theme : filters.theme.id;
      params.append("theme", themeId);
    }
    
    if (filters.priceRange !== null) {
      params.append("price", filters.priceRange.toString());
    }
    
    navigate(`/search?${params.toString()}`);
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown === "country" && countryRef.current && !countryRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      } else if (openDropdown === "month" && monthRef.current && !monthRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      } else if (openDropdown === "theme" && themeRef.current && !themeRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      } else if (openDropdown === "price" && priceRef.current && !priceRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);
  
  const hasActiveFilters = () => {
    return Object.values(filters).some(value => value !== null);
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
}
