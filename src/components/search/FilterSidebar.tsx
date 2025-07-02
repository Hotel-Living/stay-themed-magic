
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
import { MealPlanFilter } from "./MealPlanFilter";
import { RoomTypesFilter } from "./RoomTypesFilter";
import { HotelFeaturesFilter } from "./HotelFeaturesFilter";
import { RoomFeaturesFilter } from "./RoomFeaturesFilter";
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

  const handleActivityChange = (value: string, isChecked: boolean) => {
    handleArrayFilterChange('activities', value, isChecked);
  };

  const handleMealPlanChange = (value: string, isChecked: boolean) => {
    handleArrayFilterChange('mealPlans', value, isChecked);
  };

  const handleRoomTypesChange = (value: string, isChecked: boolean) => {
    handleArrayFilterChange('roomTypes', value, isChecked);
  };

  const handleHotelFeaturesChange = (value: string, isChecked: boolean) => {
    handleArrayFilterChange('hotelFeatures', value, isChecked);
  };

  const handleRoomFeaturesChange = (value: string, isChecked: boolean) => {
    handleArrayFilterChange('roomFeatures', value, isChecked);
  };

  // Helper function to get price value as number for PriceRangeFilter
  const getPriceValue = (): number | null => {
    if (typeof activeFilters.priceRange === 'number') {
      return activeFilters.priceRange;
    }
    return null;
  };

  return (
    <div className="w-72 bg-gradient-to-b from-[#460F54] to-[#300A38] p-4 space-y-4 overflow-y-auto max-h-screen">
      {/* PRICE PER MONTH */}
      <PriceRangeFilter
        activePrice={getPriceValue()}
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

      {/* MEAL PLAN */}
      <MealPlanFilter
        activeMealPlans={activeFilters.mealPlans || []}
        onChange={handleMealPlanChange}
      />

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

      {/* ROOM TYPES */}
      <RoomTypesFilter
        activeRoomTypes={activeFilters.roomTypes || []}
        onChange={handleRoomTypesChange}
      />

      {/* HOTEL FEATURES */}
      <HotelFeaturesFilter
        activeHotelFeatures={activeFilters.hotelFeatures || []}
        onChange={handleHotelFeaturesChange}
      />

      {/* ROOM FEATURES */}
      <RoomFeaturesFilter
        activeRoomFeatures={activeFilters.roomFeatures || []}
        onChange={handleRoomFeaturesChange}
      />
    </div>
  );
}
