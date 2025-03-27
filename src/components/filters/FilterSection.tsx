import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, Search, X } from "lucide-react";
import { useFilterState } from "@/hooks/useFilterState";
import { CountryDropdown } from "./CountryDropdown";
import { MonthDropdown } from "./MonthDropdown";
import { ThemeDropdown } from "./ThemeDropdown";
import { PriceDropdown } from "./PriceDropdown";
import { FilterActions } from "./FilterActions";
import { FilterState, DropdownType } from "./FilterTypes";
import { Button } from "@/components/ui/button";
import { Theme } from "@/utils/data";

interface FilterSectionProps {
  onFilterChange: (filters: FilterState) => void;
  showSearchButton?: boolean;
  placeholders?: {
    country?: string;
    month?: string;
    theme?: string;
    priceRange?: string;
  };
  useCollapsibleThemes?: boolean;
  expandedLayout?: boolean;
  compactSpacing?: boolean;
  useBoldLabels?: boolean;
  usePurpleFilterBackground?: boolean;
  availableThemes?: Theme[];
  initialFilters?: Partial<FilterState>;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  onFilterChange,
  showSearchButton = false,
  placeholders = {},
  useCollapsibleThemes = false,
  expandedLayout = false,
  compactSpacing = false,
  useBoldLabels = false,
  usePurpleFilterBackground = false,
  availableThemes = [],
  initialFilters = {}
}) => {
  const {
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
  } = useFilterState({ onFilterChange, initialFilters });
  
  const navigate = useNavigate();
  
  const dropdownButtonClasses = (isActive: boolean) => {
    return `
      flex items-center justify-between w-full py-2 px-4 rounded-md
      text-sm font-medium text-white
      focus:outline-none focus:ring-2 focus:ring-fuchsia-500
      ${usePurpleFilterBackground ? 'bg-fuchsia-900/40 hover:bg-fuchsia-900/60' : 'bg-secondary hover:bg-secondary-hover'}
      ${compactSpacing ? 'py-1 px-2' : ''}
      ${isActive ? 'ring-2 ring-fuchsia-500' : ''}
    `;
  };
  
  const dropdownLabelClasses = () => {
    return `
      ${useBoldLabels ? 'font-bold' : ''}
    `;
  };
  
  const dropdownIconClasses = () => {
    return `
      h-4 w-4 text-white
    `;
  };
  
  const filterSectionClasses = () => {
    return `
      grid gap-4 ${expandedLayout ? 'grid-cols-1 md:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4'}
    `;
  };
  
  const handleSearchClick = () => {
    handleSearch();
    navigate("/search");
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !countryRef.current?.contains(event.target as Node) &&
        !monthRef.current?.contains(event.target as Node) &&
        !themeRef.current?.contains(event.target as Node) &&
        !priceRef.current?.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  return (
    <section className="text-white">
      <div className={filterSectionClasses()}>
        {/* Country Filter */}
        <div className="relative" ref={countryRef}>
          <button 
            className={dropdownButtonClasses(openDropdown === 'country')}
            onClick={() => toggleDropdown('country')}
          >
            <span className={dropdownLabelClasses()}>
              {filters.country || placeholders.country || 'Country'}
            </span>
            {openDropdown === 'country' ? (
              <ChevronUp className={dropdownIconClasses()} />
            ) : (
              <ChevronDown className={dropdownIconClasses()} />
            )}
          </button>
          {openDropdown === 'country' && (
            <CountryDropdown
              onSelect={(value) => updateFilter('country', value)}
              onClear={() => clearFilter('country')}
              closeDropdown={() => setOpenDropdown(null)}
            />
          )}
        </div>
        
        {/* Month Filter */}
        <div className="relative" ref={monthRef}>
          <button
            className={dropdownButtonClasses(openDropdown === 'month')}
            onClick={() => toggleDropdown('month')}
          >
            <span className={dropdownLabelClasses()}>
              {filters.month || placeholders.month || 'Month'}
            </span>
            {openDropdown === 'month' ? (
              <ChevronUp className={dropdownIconClasses()} />
            ) : (
              <ChevronDown className={dropdownIconClasses()} />
            )}
          </button>
          {openDropdown === 'month' && (
            <MonthDropdown
              onSelect={(value) => updateFilter('month', value)}
              onClear={() => clearFilter('month')}
              closeDropdown={() => setOpenDropdown(null)}
            />
          )}
        </div>
        
        {/* Theme Filter */}
        <div className="relative" ref={themeRef}>
          <button
            className={dropdownButtonClasses(openDropdown === 'theme')}
            onClick={() => toggleDropdown('theme')}
          >
            <span className={dropdownLabelClasses()}>
              {filters.theme?.name || placeholders.theme || 'Theme'}
            </span>
            {openDropdown === 'theme' ? (
              <ChevronUp className={dropdownIconClasses()} />
            ) : (
              <ChevronDown className={dropdownIconClasses()} />
            )}
          </button>
          {openDropdown === 'theme' && (
            <ThemeDropdown
              onSelect={(value) => updateFilter('theme', value)}
              onClear={() => clearFilter('theme')}
              closeDropdown={() => setOpenDropdown(null)}
              useCollapsible={useCollapsibleThemes}
              availableThemes={availableThemes}
            />
          )}
        </div>
        
        {/* Price Filter */}
        <div className="relative" ref={priceRef}>
          <button
            className={dropdownButtonClasses(openDropdown === 'priceRange')}
            onClick={() => toggleDropdown('priceRange')}
          >
            <span className={dropdownLabelClasses()}>
              {filters.priceRange || placeholders.priceRange || 'Price per Month'}
            </span>
            {openDropdown === 'priceRange' ? (
              <ChevronUp className={dropdownIconClasses()} />
            ) : (
              <ChevronDown className={dropdownIconClasses()} />
            )}
          </button>
          {openDropdown === 'priceRange' && (
            <PriceDropdown
              onSelect={(value) => updateFilter('priceRange', value)}
              onClear={() => clearFilter('priceRange')}
              closeDropdown={() => setOpenDropdown(null)}
            />
          )}
        </div>
      </div>
      
      {/* Filter Actions */}
      <FilterActions 
        onClearAll={clearAllFilters} 
        hasActiveFilters={hasActiveFilters()} 
      />
      
      {/* Search Button */}
      {showSearchButton && (
        <Button 
          onClick={handleSearchClick}
          className="w-full mt-4 bg-fuchsia-500 hover:bg-fuchsia-400 text-white"
        >
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      )}
    </section>
  );
};

export type { FilterState } from "./FilterTypes";
