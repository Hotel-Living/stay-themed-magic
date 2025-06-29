
import React from 'react';
import { LengthOfStayFilter } from './LengthOfStayFilter';
import { CategoryFilter } from './CategoryFilter';
import { CountryFilter } from './CountryFilter';
import { LocationFilter } from './LocationFilter';
import { MonthFilter } from './MonthFilter';
import { ActivityFilter } from './ActivityFilter';
import { PriceRangeFilter } from './PriceRangeFilter';
import { CheckboxFilter } from './CheckboxFilter';
import { FilterState } from '@/components/filters/FilterTypes';

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
  const handleLengthChange = (value: string | null) => {
    handleFilterChange('stayLengths', value);
  };

  const handleCategoryChange = (value: string | null) => {
    handleFilterChange('atmosphere', value);
  };

  const handleCountryChange = (value: string | null) => {
    handleFilterChange('country', value);
  };

  const handleLocationChange = (value: string | null) => {
    handleFilterChange('location', value);
  };

  const handleMonthChange = (value: string | null) => {
    handleFilterChange('month', value);
  };

  const handlePropertyTypeChange = (value: string | null) => {
    handleFilterChange('propertyType', value);
  };

  const handlePropertyStyleChange = (value: string | null) => {
    handleFilterChange('propertyStyle', value);
  };

  const handlePriceRangeChange = (value: number | { min: number; max: number } | null) => {
    handleFilterChange('priceRange', value);
  };

  return (
    <div className="space-y-2">
      {/* Length of Stay Filter */}
      <LengthOfStayFilter
        activeLength={activeFilters.stayLengths}
        onChange={handleLengthChange}
      />

      {/* Category/Atmosphere Filter */}
      <CategoryFilter
        activeCategory={activeFilters.atmosphere}
        onChange={handleCategoryChange}
      />

      {/* Country Filter */}
      <CountryFilter
        activeCountry={activeFilters.country}
        onChange={handleCountryChange}
      />

      {/* Location Filter */}
      <LocationFilter
        activeLocation={activeFilters.location}
        onChange={handleLocationChange}
      />

      {/* Month Filter */}
      <MonthFilter
        activeMonth={activeFilters.month}
        onChange={handleMonthChange}
      />

      {/* Price Range Filter */}
      <PriceRangeFilter
        activePriceRange={activeFilters.priceRange}
        onChange={handlePriceRangeChange}
      />

      {/* Property Type Filter */}
      <CheckboxFilter
        title="PROPERTY TYPE"
        options={['Hotel', 'Resort', 'Boutique', 'Apartment', 'Villa']}
        selectedOptions={activeFilters.propertyType ? [activeFilters.propertyType] : []}
        onChange={(value, isChecked) => {
          handlePropertyTypeChange(isChecked ? value : null);
        }}
      />

      {/* Property Style Filter */}
      <CheckboxFilter
        title="PROPERTY STYLE"
        options={['Modern', 'Traditional', 'Luxury', 'Budget', 'Eco-friendly']}
        selectedOptions={activeFilters.propertyStyle ? [activeFilters.propertyStyle] : []}
        onChange={(value, isChecked) => {
          handlePropertyStyleChange(isChecked ? value : null);
        }}
      />

      {/* Stars Filter */}
      <CheckboxFilter
        title="STARS"
        options={['5 stars', '4 stars', '3 stars', '2 stars', '1 star']}
        selectedOptions={activeFilters.stars || []}
        onChange={handleArrayFilterChange.bind(null, 'stars')}
      />

      {/* Activities Filter */}
      <ActivityFilter
        activeActivities={activeFilters.activities || []}
        onChange={handleArrayFilterChange.bind(null, 'activities')}
      />

      {/* Room Types Filter */}
      <CheckboxFilter
        title="ROOM TYPES"
        options={['Single', 'Double', 'Suite', 'Family', 'Deluxe']}
        selectedOptions={activeFilters.roomTypes || []}
        onChange={handleArrayFilterChange.bind(null, 'roomTypes')}
      />

      {/* Hotel Features Filter */}
      <CheckboxFilter
        title="HOTEL FEATURES"
        options={['Pool', 'Spa', 'Gym', 'Restaurant', 'Bar', 'WiFi', 'Parking']}
        selectedOptions={activeFilters.hotelFeatures || []}
        onChange={handleArrayFilterChange.bind(null, 'hotelFeatures')}
      />

      {/* Room Features Filter */}
      <CheckboxFilter
        title="ROOM FEATURES"
        options={['Air Conditioning', 'Balcony', 'Kitchen', 'TV', 'Mini Bar']}
        selectedOptions={activeFilters.roomFeatures || []}
        onChange={handleArrayFilterChange.bind(null, 'roomFeatures')}
      />

      {/* Meal Plans Filter */}
      <CheckboxFilter
        title="MEAL PLANS"
        options={['Breakfast', 'Half Board', 'Full Board', 'All Inclusive']}
        selectedOptions={activeFilters.mealPlans || []}
        onChange={handleArrayFilterChange.bind(null, 'mealPlans')}
      />

      {/* Reset All Filters Button */}
      <div className="pt-4">
        <button
          onClick={onResetAllFilters}
          className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
        >
          Reset All Filters
        </button>
      </div>
    </div>
  );
}
