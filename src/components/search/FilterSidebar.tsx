
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
import { useTranslation } from '@/hooks/useTranslation';

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
  const { t } = useTranslation();

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

  const handlePriceRangeChange = (value: number | null) => {
    handleFilterChange('priceRange', value);
  };

  // Property Type options with database values and display labels
  const propertyTypeOptions = [
    { value: 'hotel', label: t('filters.propertyTypes.hotel') },
    { value: 'resort', label: t('filters.propertyTypes.resort') },
    { value: 'boutiqueHotel', label: t('filters.propertyTypes.boutiqueHotel') },
    { value: 'countryHouse', label: t('filters.propertyTypes.countryHouse') },
    { value: 'roadsideMotel', label: t('filters.propertyTypes.roadsideMotel') }
  ];

  // Property Style options with database values and display labels
  const propertyStyleOptions = [
    { value: 'classic', label: t('filters.propertyStyles.classic') },
    { value: 'classicElegant', label: t('filters.propertyStyles.classicElegant') },
    { value: 'modern', label: t('filters.propertyStyles.modern') },
    { value: 'fusion', label: t('filters.propertyStyles.fusion') },
    { value: 'urban', label: t('filters.propertyStyles.urban') },
    { value: 'rural', label: t('filters.propertyStyles.rural') },
    { value: 'minimalist', label: t('filters.propertyStyles.minimalist') },
    { value: 'luxury', label: t('filters.propertyStyles.luxury') }
  ];

  // Meal Plans options with database values and display labels
  const mealPlanOptions = [
    { value: 'breakfast', label: t('filters.breakfast') },
    { value: 'halfBoard', label: t('filters.halfBoard') },
    { value: 'fullBoard', label: t('filters.fullBoard') },
    { value: 'allInclusive', label: t('filters.allInclusive') },
    { value: 'laundryIncluded', label: t('filters.laundryIncluded') }
  ];

  // Room Types options with database values and display labels
  const roomTypeOptions = [
    { value: 'singleRoom', label: t('filters.roomTypeOptions.singleRoom') },
    { value: 'doubleRoom', label: t('filters.roomTypeOptions.doubleRoom') }
  ];

  // Room Features options with database values and display labels
  const roomFeatureOptions = [
    { value: 'airConditioning', label: t('filters.airConditioning') },
    { value: 'balcony', label: t('filters.balcony') },
    { value: 'kitchen', label: t('filters.kitchen') },
    { value: 'tv', label: t('filters.tv') },
    { value: 'minibar', label: t('filters.minibar') }
  ];

  // Hotel Features options with database values and display labels
  const hotelFeatureOptions = [
    { value: 'pool', label: t('filters.pool') },
    { value: 'spa', label: t('filters.spa') },
    { value: 'gym', label: t('filters.gym') },
    { value: 'restaurant', label: t('filters.restaurant') },
    { value: 'bar', label: t('filters.bar') },
    { value: 'wifi', label: t('filters.wifi') },
    { value: 'parking', label: t('filters.parking') }
  ];

  return (
    <div className="space-y-2">
      {/* Reset All Filters Button - Top */}
      <div className="pb-2">
        <button
          onClick={onResetAllFilters}
          className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
        >
          {t('filters.resetFilters')}
        </button>
      </div>

      {/* Price Range Filter */}
      <PriceRangeFilter
        activePrice={activeFilters.priceRange as number | null}
        onChange={handlePriceRangeChange}
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

      {/* Category/Atmosphere Filter */}
      <CategoryFilter
        activeCategory={activeFilters.atmosphere}
        onChange={handleCategoryChange}
      />

      {/* Activities Filter */}
      <ActivityFilter
        activeActivities={activeFilters.activities || []}
        onChange={handleArrayFilterChange.bind(null, 'activities')}
      />

      {/* Length of Stay Filter */}
      <LengthOfStayFilter
        activeLength={activeFilters.stayLengths}
        onChange={handleLengthChange}
      />

      {/* Month Filter */}
      <MonthFilter
        activeMonth={activeFilters.month}
        onChange={handleMonthChange}
      />

      {/* Meal Plans Filter */}
      <CheckboxFilter
        title={t('filters.mealPlan')}
        options={mealPlanOptions.map(option => option.label)}
        selectedOptions={activeFilters.mealPlans || []}
        onChange={handleArrayFilterChange.bind(null, 'mealPlans')}
      />

      {/* Property Type Filter */}
      <CheckboxFilter
        title={t('filters.propertyType')}
        options={propertyTypeOptions.map(option => option.label)}
        selectedOptions={activeFilters.propertyType ? [propertyTypeOptions.find(opt => opt.value === activeFilters.propertyType)?.label || ''] : []}
        onChange={(value, isChecked) => {
          const selectedOption = propertyTypeOptions.find(opt => opt.label === value);
          handlePropertyTypeChange(isChecked && selectedOption ? selectedOption.value : null);
        }}
      />

      {/* Property Style Filter */}
      <CheckboxFilter
        title={t('filters.propertyStyle')}
        options={propertyStyleOptions.map(option => option.label)}
        selectedOptions={activeFilters.propertyStyle ? [propertyStyleOptions.find(opt => opt.value === activeFilters.propertyStyle)?.label || ''] : []}
        onChange={(value, isChecked) => {
          const selectedOption = propertyStyleOptions.find(opt => opt.label === value);
          handlePropertyStyleChange(isChecked && selectedOption ? selectedOption.value : null);
        }}
      />

      {/* Room Types Filter */}
      <CheckboxFilter
        title={t('filters.roomTypes')}
        options={roomTypeOptions.map(option => option.label)}
        selectedOptions={activeFilters.roomTypes || []}
        onChange={handleArrayFilterChange.bind(null, 'roomTypes')}
      />

      {/* Room Features Filter */}
      <CheckboxFilter
        title={t('filters.roomFeatures')}
        options={roomFeatureOptions.map(option => option.label)}
        selectedOptions={activeFilters.roomFeatures || []}
        onChange={handleArrayFilterChange.bind(null, 'roomFeatures')}
      />

      {/* Hotel Features Filter */}
      <CheckboxFilter
        title={t('filters.hotelFeatures')}
        options={hotelFeatureOptions.map(option => option.label)}
        selectedOptions={activeFilters.hotelFeatures || []}
        onChange={handleArrayFilterChange.bind(null, 'hotelFeatures')}
      />

      {/* Reset All Filters Button - Bottom */}
      <div className="pt-4">
        <button
          onClick={onResetAllFilters}
          className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
        >
          {t('filters.resetFilters')}
        </button>
      </div>
    </div>
  );
}
