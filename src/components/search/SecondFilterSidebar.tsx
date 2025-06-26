
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { FilterState } from "@/components/filters/FilterTypes";
import { FilterItem } from "./FilterItem";
import { PriceRangeFilter } from "./PriceRangeFilter";
import { MonthFilter } from "./MonthFilter";
import { CountryFilter } from "./CountryFilter";
import { CategoryFilter } from "./CategoryFilter";
import { LengthOfStayFilter } from "./LengthOfStayFilter";
import { NewLengthOfStayFilter } from "./NewLengthOfStayFilter";
import { PropertyTypeFilter } from "./PropertyTypeFilter";
import { PropertyStyleFilter } from "./PropertyStyleFilter";
import { LocationFilter } from "./LocationFilter";
import { ThemeFilter } from "./ThemeFilter";
import { ActivityFilter } from "./ActivityFilter";
import { CheckboxFilter } from "./CheckboxFilter";

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
  const { t } = useTranslation();

  return (
    <div className="bg-gradient-to-br from-purple-950/90 to-purple-900/70 backdrop-blur-md border border-purple-600/30 rounded-2xl p-6 shadow-2xl">
      {/* Reset Button */}
      <div className="mb-6">
        <button
          onClick={onResetAllFilters}
          className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm font-medium"
        >
          {t('filters.resetFilters')}
        </button>
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <PriceRangeFilter
          activePrice={activeFilters.maxPrice}
          onChange={(value) => handleFilterChange('maxPrice', value)}
        />
      </div>

      {/* Month Filter */}
      <div className="mb-6">
        <MonthFilter
          activeMonth={activeFilters.month}
          onChange={(value) => handleFilterChange('month', value)}
        />
      </div>

      {/* Country Filter */}
      <div className="mb-6">
        <CountryFilter
          activeCountry={activeFilters.country}
          onChange={(value) => handleFilterChange('country', value)}
        />
      </div>

      {/* Location Filter */}
      <div className="mb-6">
        <LocationFilter
          activeLocation={activeFilters.location}
          onChange={(value) => handleFilterChange('location', value)}
        />
      </div>

      {/* Theme Filter */}
      <div className="mb-6">
        <ThemeFilter
          activeTheme={activeFilters.theme}
          onChange={(value) => handleFilterChange('theme', value)}
        />
      </div>

      {/* Activities Filter */}
      <div className="mb-6">
        <ActivityFilter
          activeActivities={activeFilters.activities}
          onChange={(value, isChecked) => handleArrayFilterChange('activities', value, isChecked)}
        />
      </div>

      {/* Original Length of Stay Filter */}
      <div className="mb-6">
        <LengthOfStayFilter
          activeLength={activeFilters.stayLengths?.[0]?.toString() || null}
          onChange={(value) => handleArrayFilterChange('stayLengths', value, true)}
        />
      </div>

      {/* NEW Length of Stay Filter - This is the new working one */}
      <div className="mb-6">
        <NewLengthOfStayFilter
          activeLength={activeFilters.stayLengths?.[0]?.toString() || null}
          onChange={(value) => handleArrayFilterChange('stayLengths', value, true)}
        />
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <CategoryFilter
          activeCategory={activeFilters.stars?.[0] || null}
          onChange={(value) => handleArrayFilterChange('stars', value, true)}
        />
      </div>

      {/* Property Type Filter */}
      <div className="mb-6">
        <PropertyTypeFilter
          activePropertyType={activeFilters.propertyType}
          onChange={(value) => handleFilterChange('propertyType', value)}
        />
      </div>

      {/* Property Style Filter */}
      <div className="mb-6">
        <PropertyStyleFilter
          activePropertyStyle={activeFilters.propertyStyle}
          onChange={(value) => handleFilterChange('propertyStyle', value)}
        />
      </div>

      {/* Room Types Filter */}
      <div className="mb-6">
        <CheckboxFilter
          title="ROOM TYPES"
          options={['Single', 'Double', 'Suite', 'Apartment']}
          selectedOptions={activeFilters.roomTypes}
          onChange={(value, isChecked) => handleArrayFilterChange('roomTypes', value, isChecked)}
        />
      </div>

      {/* Hotel Features Filter */}
      <div className="mb-6">
        <CheckboxFilter
          title="HOTEL FEATURES"
          options={['Pool', 'Gym', 'Spa', 'Restaurant', 'Bar', 'WiFi', 'Parking']}
          selectedOptions={activeFilters.hotelFeatures}
          onChange={(value, isChecked) => handleArrayFilterChange('hotelFeatures', value, isChecked)}
        />
      </div>

      {/* Room Features Filter */}
      <div className="mb-6">
        <CheckboxFilter
          title="ROOM FEATURES"
          options={['Air Conditioning', 'Balcony', 'Kitchen', 'Workspace', 'TV', 'Minibar']}
          selectedOptions={activeFilters.roomFeatures}
          onChange={(value, isChecked) => handleArrayFilterChange('roomFeatures', value, isChecked)}
        />
      </div>

      {/* Meal Plans Filter */}
      <div className="mb-6">
        <CheckboxFilter
          title="MEAL PLAN"
          options={['Breakfast', 'Half Board', 'Full Board', 'All Inclusive']}
          selectedOptions={activeFilters.mealPlans}
          onChange={(value, isChecked) => handleArrayFilterChange('mealPlans', value, isChecked)}
        />
      </div>

      {/* Bottom Reset Button */}
      <div className="mt-6">
        <button
          onClick={onResetAllFilters}
          className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm font-medium"
        >
          {t('filters.resetFilters')}
        </button>
      </div>
    </div>
  );
}
