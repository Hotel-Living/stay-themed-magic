
import React from "react";
import { FilterState } from "@/components/filters/FilterTypes";
import { CountryFilter } from "./CountryFilter";
import { LocationFilter } from "./LocationFilter";
import { PropertyTypeFilter } from "./PropertyTypeFilter";
import { CategoryFilter } from "./CategoryFilter";
import { PriceRangeFilter } from "./PriceRangeFilter";
import { PropertyStyleFilter } from "./PropertyStyleFilter";
import { ThemeFilter } from "./ThemeFilter";
import { ActivityFilter } from "./ActivityFilter";

interface SecondFilterSidebarProps {
  activeFilters: FilterState;
  handleFilterChange: (key: keyof FilterState, value: any) => void;
  handleArrayFilterChange: (key: keyof FilterState, value: string, isSelected: boolean) => void;
  onResetAllFilters: () => void;
}

export function SecondFilterSidebar({ 
  activeFilters, 
  handleFilterChange, 
  handleArrayFilterChange,
  onResetAllFilters 
}: SecondFilterSidebarProps) {
  return (
    <div className="w-full bg-[#460F54]/90 backdrop-blur-sm rounded-lg p-4 border border-fuchsia-400/20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-white">Filters</h2>
        <button 
          onClick={onResetAllFilters}
          className="text-xs text-fuchsia-300 hover:text-white transition-colors underline"
        >
          Reset All
        </button>
      </div>
      
      <div className="space-y-3">
        <CountryFilter 
          activeCountry={activeFilters.country || null}
          onChange={(value) => handleFilterChange('country', value)}
        />
        
        <LocationFilter 
          activeLocation={activeFilters.location || null}
          onChange={(value) => handleFilterChange('location', value)}
        />
        
        <PropertyTypeFilter 
          activePropertyType={activeFilters.propertyType || null}
          onChange={(value) => handleFilterChange('propertyType', value)}
        />
        
        <CategoryFilter 
          activeCategory={activeFilters.stars?.[0] || null}
          onChange={(value) => handleFilterChange('stars', value ? [value] : [])}
        />
        
        <PriceRangeFilter 
          activePrice={typeof activeFilters.priceRange === 'number' ? activeFilters.priceRange : null}
          onChange={(value) => handleFilterChange('priceRange', value)}
        />
        
        <PropertyStyleFilter 
          activePropertyStyle={activeFilters.propertyStyle || null}
          onChange={(value) => handleFilterChange('propertyStyle', value)}
        />
        
        <ThemeFilter 
          activeTheme={activeFilters.theme || null}
          onChange={(value) => handleFilterChange('theme', value)}
        />
        
        <ActivityFilter 
          activeActivities={activeFilters.activities || []}
          onChange={(value, isChecked) => handleArrayFilterChange('activities', value, isChecked)}
        />
      </div>
    </div>
  );
}
