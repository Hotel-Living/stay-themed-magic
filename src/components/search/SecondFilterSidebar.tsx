import React, { useState, useEffect } from "react";
import { CountryFilter } from "./CountryFilter";
import { LocationFilter } from "./LocationFilter";
import { LengthOfStayFilter } from "./LengthOfStayFilter";
import { CategoryFilter } from "./CategoryFilter";
import { MonthFilter } from "./MonthFilter";
import { PropertyTypeFilter } from "./PropertyTypeFilter";
import { PropertyStyleFilter } from "./PropertyStyleFilter";
import { PriceRangeFilter } from "./PriceRangeFilter";
import { HotelFeaturesFilter } from "./HotelFeaturesFilter";
import { RoomFeaturesFilter } from "./RoomFeaturesFilter";
import { FilterState } from "@/components/filters/FilterTypes";
import { useTranslation } from "react-i18next";

interface FilterSidebarProps {
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
}: FilterSidebarProps) {
  const { t, isReady } = useTranslation('filters');

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
    <div className="w-fit max-w-full bg-gradient-to-b from-[#460F54] to-[#300A38] p-4 space-y-4 overflow-y-auto max-h-screen">
      {/* RESET BUTTON */}
      <button
        onClick={onResetAllFilters}
        className="w-full py-2 px-4 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors mb-4"
      >
        {isReady ? t('resetFilters') : 'Reset Filters'}
      </button>

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

      {/* STAY LENGTH */}
      <LengthOfStayFilter
        activeLength={activeFilters.stayLengths}
        onChange={(value) => handleFilterChange('stayLengths', value)}
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

      {/* BOTTOM RESET BUTTON */}
      <button
        onClick={onResetAllFilters}
        className="w-full py-2 px-4 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors mt-4"
      >
        {isReady ? t('resetFilters') : 'Reset Filters'}
      </button>
    </div>
  );
}
