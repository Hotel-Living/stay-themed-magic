
import React from "react";
import { FilterState } from "@/components/filters/FilterTypes";
import { Button } from "@/components/ui/button";
import { CountryFilterES } from "./CountryFilter.es";
import { MonthFilterES } from "./MonthFilter.es";
import { ThemeFilter } from "./ThemeFilter";
import { PriceRangeFilterES } from "./PriceRangeFilter.es";
import { PropertyTypeFilterES } from "./PropertyTypeFilter.es";
import { PropertyStyleFilterES } from "./PropertyStyleFilter.es";
import { CategoryFilterES } from "./CategoryFilter.es";
import { LengthOfStayFilterES } from "./LengthOfStayFilter.es";
import { LocationFilterES } from "./LocationFilter.es";
import { ActivityFilterES } from "./ActivityFilter.es";

interface SecondaryFilterPanelProps {
  activeFilters: FilterState;
  handleFilterChange: (key: keyof FilterState, value: any) => void;
  handleArrayFilterChange: (key: keyof FilterState, value: string, isSelected: boolean) => void;
  onResetAllFilters: () => void;
}

export function SecondaryFilterPanel({
  activeFilters,
  handleFilterChange,
  handleArrayFilterChange,
  onResetAllFilters
}: SecondaryFilterPanelProps) {
  return (
    <div className="w-72 bg-gradient-to-b from-purple-900 to-purple-950 p-4 space-y-4 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white font-bold text-lg">Filtros</h2>
        <Button 
          onClick={onResetAllFilters}
          variant="outline" 
          size="sm"
          className="text-purple-300 border-purple-300 hover:bg-purple-800 text-xs"
        >
          Restablecer
        </Button>
      </div>

      <CountryFilterES 
        activeCountry={activeFilters.country} 
        onChange={(value) => handleFilterChange('country', value)} 
      />
      
      <MonthFilterES 
        activeMonth={activeFilters.month} 
        onChange={(value) => handleFilterChange('month', value)} 
      />
      
      <ThemeFilter 
        activeTheme={activeFilters.theme} 
        onChange={(value) => handleFilterChange('theme', value)} 
      />
      
      <PriceRangeFilterES 
        activePrice={typeof activeFilters.priceRange === 'number' ? activeFilters.priceRange : null} 
        onChange={(value) => handleFilterChange('priceRange', value)} 
      />
      
      <PropertyTypeFilterES 
        activePropertyType={activeFilters.propertyType} 
        onChange={(value) => handleFilterChange('propertyType', value)} 
      />
      
      <PropertyStyleFilterES 
        activePropertyStyle={activeFilters.propertyStyle} 
        onChange={(value) => handleFilterChange('propertyStyle', value)} 
      />
      
      <CategoryFilterES 
        activeCategory={(activeFilters.stars && activeFilters.stars.length > 0) ? activeFilters.stars[0] : null} 
        onChange={(value) => handleFilterChange('stars', value ? [value] : [])} 
      />
      
      <LengthOfStayFilterES 
        activeLength={activeFilters.stayLengths} 
        onChange={(value) => handleFilterChange('stayLengths', value)} 
      />
      
      <LocationFilterES 
        activeLocation={activeFilters.location} 
        onChange={(value) => handleFilterChange('location', value)} 
      />
      
      <ActivityFilterES 
        activeActivities={activeFilters.activities || []} 
        onChange={(value, isChecked) => handleArrayFilterChange('activities', value, isChecked)} 
      />
    </div>
  );
}
