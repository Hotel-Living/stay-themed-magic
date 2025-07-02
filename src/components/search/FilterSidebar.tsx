
import React from "react";
import { CountryFilter } from "./CountryFilter";
import { LocationFilter } from "./LocationFilter";
import { ThemeFilter } from "./ThemeFilter";
import { ActivityFilter } from "./ActivityFilter";
import { LengthOfStayFilter } from "./LengthOfStayFilter";
import { CategoryFilter } from "./CategoryFilter";
import { MonthFilter } from "./MonthFilter";
import { PropertyTypeFilter } from "./PropertyTypeFilter";
import { PropertyStyleFilter } from "./PropertyStyleFilter";
import { PriceRangeFilter } from "./PriceRangeFilter";
import { FilterState } from "@/components/filters/FilterTypes";
import { Theme } from "@/utils/themes";

interface FilterSidebarProps {
  activeFilters: FilterState;
  handleFilterChange: (key: keyof FilterState, value: any) => void;
  handleArrayFilterChange: (key: keyof FilterState, value: string, isSelected: boolean) => void;
  onResetAllFilters: () => void;
}

export function FilterSidebar({
  activeFilters,
  handleFilterChange,
  handleArrayFilterChange,
  onResetAllFilters
}: FilterSidebarProps) {
  const handleThemeChange = (theme: Theme | null) => {
    handleFilterChange('theme', theme);
  };

  const handleActivityChange = (value: string, isSelected: boolean) => {
    handleArrayFilterChange('activities', value, isSelected);
  };

  return (
    <div className="w-72 bg-gradient-to-b from-[#460F54] to-[#300A38] p-4 space-y-4 overflow-y-auto max-h-screen">
      {/* PRICE PER MONTH */}
      <PriceRangeFilter
        activePrice={activeFilters.priceRange}
        onChange={(value) => handleFilterChange('priceRange', value)}
      />

      {/* COUNTRY */}
      <CountryFilter
        activeCountry={activeFilters.country}
        onChange={(value) => handleFilterChange('country', value)}
      />

      {/* LOCATION */}
      <LocationFilter
        activeLocation={activeFilters.location}
        onChange={(value) => handleFilterChange('location', value)}
      />

      {/* AFFINITIES */}
      <ThemeFilter
        activeTheme={activeFilters.theme}
        onChange={handleThemeChange}
      />

      {/* ACTIVITIES */}
      <ActivityFilter
        activeActivities={activeFilters.activities || []}
        onChange={handleActivityChange}
      />

      {/* STAY LENGTH */}
      <LengthOfStayFilter
        activeLength={activeFilters.stayLengths}
        onChange={(value) => handleFilterChange('stayLengths', value)}
      />

      {/* MEAL PLAN - TODO: Create MealPlanFilter component */}

      {/* CATEGORY */}
      <CategoryFilter
        activeCategory={activeFilters.atmosphere}
        onChange={(value) => handleFilterChange('atmosphere', value)}
      />

      {/* MONTH */}
      <MonthFilter
        activeMonth={activeFilters.month}
        onChange={(value) => handleFilterChange('month', value)}
      />

      {/* PROPERTY TYPE */}
      <PropertyTypeFilter
        activePropertyType={activeFilters.propertyType}
        onChange={(value) => handleFilterChange('propertyType', value)}
      />

      {/* PROPERTY STYLE */}
      <PropertyStyleFilter
        activePropertyStyle={activeFilters.propertyStyle}
        onChange={(value) => handleFilterChange('propertyStyle', value)}
      />

      {/* ROOM TYPES - TODO: Create RoomTypesFilter component */}

      {/* HOTEL FEATURES - TODO: Create HotelFeaturesFilter component */}

      {/* ROOM FEATURES - TODO: Create RoomFeaturesFilter component */}
    </div>
  );
}
