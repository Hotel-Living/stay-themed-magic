import React, { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { ChevronUp, ChevronDown, X } from "lucide-react";
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

interface SecondFilterSidebarProps {
  activeFilters: FilterState;
  handleFilterChange: (key: keyof FilterState, value: any) => void;
  handleArrayFilterChange: (key: keyof FilterState, value: string, isSelected: boolean) => void;
  onResetAllFilters: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export function SecondFilterSidebar({
  activeFilters,
  handleFilterChange,
  handleArrayFilterChange,
  onResetAllFilters,
  isOpen,
  onClose
}: SecondFilterSidebarProps) {
  const { t, isReady } = useTranslation('filters');
  const [expandedSections, setExpandedSections] = useState({
    country: false,
    location: false,
    stayLength: false,
    category: false,
    month: false,
    propertyType: false,
    propertyStyle: false,
    hotelFeatures: false,
    roomFeatures: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prevState => ({
      ...prevState,
      [section]: !prevState[section]
    }));
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
    <div className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-80 bg-gradient-to-b from-[#460F54] to-[#300A38] p-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onResetAllFilters}
            className="text-white text-sm underline hover:no-underline"
          >
            {isReady ? t('resetFilters') : 'Reset Filters'}
          </button>
          <button onClick={onClose} className="text-white">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          {/* PRICE PER MONTH */}
          <PriceRangeFilter
            activePrice={getPriceValue()}
            onChange={(value) => handleFilterChange('priceRange', value)}
          />

          {/* COUNTRY */}
          <div>
            <button
              onClick={() => toggleSection('country')}
              className="flex items-center justify-between w-full text-white text-sm font-medium mb-2"
            >
              {t('country')}
              {expandedSections.country ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            {expandedSections.country && (
              <CountryFilter
                activeCountry={activeFilters.country}
                onChange={(value) => handleFilterChange('country', value)}
              />
            )}
          </div>

          {/* LOCATION */}
          <div>
            <button
              onClick={() => toggleSection('location')}
              className="flex items-center justify-between w-full text-white text-sm font-medium mb-2"
            >
              {t('location')}
              {expandedSections.location ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            {expandedSections.location && (
              <LocationFilter
                activeLocation={activeFilters.location}
                onChange={(value) => handleFilterChange('location', value)}
              />
            )}
          </div>

          {/* STAY LENGTH */}
          <div>
            <button
              onClick={() => toggleSection('stayLength')}
              className="flex items-center justify-between w-full text-white text-sm font-medium mb-2"
            >
              {t('duration')}
              {expandedSections.stayLength ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            {expandedSections.stayLength && (
              <LengthOfStayFilter
                activeLength={activeFilters.stayLengths}
                onChange={(value) => handleFilterChange('stayLengths', value)}
              />
            )}
          </div>

          {/* CATEGORY */}
          <div>
            <button
              onClick={() => toggleSection('category')}
              className="flex items-center justify-between w-full text-white text-sm font-medium mb-2"
            >
              {t('category')}
              {expandedSections.category ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            {expandedSections.category && (
              <CategoryFilter
                activeCategory={activeFilters.atmosphere}
                onChange={(value) => handleFilterChange('atmosphere', value)}
              />
            )}
          </div>

          {/* MONTH */}
          <div>
            <button
              onClick={() => toggleSection('month')}
              className="flex items-center justify-between w-full text-white text-sm font-medium mb-2"
            >
              {t('month')}
              {expandedSections.month ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            {expandedSections.month && (
              <MonthFilter
                activeMonth={activeFilters.month}
                onChange={(value) => handleFilterChange('month', value)}
              />
            )}
          </div>

          {/* PROPERTY TYPE */}
          <div>
            <button
              onClick={() => toggleSection('propertyType')}
              className="flex items-center justify-between w-full text-white text-sm font-medium mb-2"
            >
              {t('propertyType')}
              {expandedSections.propertyType ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            {expandedSections.propertyType && (
              <PropertyTypeFilter
                activePropertyType={activeFilters.propertyType}
                onChange={(value) => handleFilterChange('propertyType', value)}
              />
            )}
          </div>

          {/* PROPERTY STYLE */}
          <div>
            <button
              onClick={() => toggleSection('propertyStyle')}
              className="flex items-center justify-between w-full text-white text-sm font-medium mb-2"
            >
              {t('propertyStyle')}
              {expandedSections.propertyStyle ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            {expandedSections.propertyStyle && (
              <PropertyStyleFilter
                activePropertyStyle={activeFilters.propertyStyle}
                onChange={(value) => handleFilterChange('propertyStyle', value)}
              />
            )}
          </div>

          {/* HOTEL FEATURES */}
          <div>
            <button
              onClick={() => toggleSection('hotelFeatures')}
              className="flex items-center justify-between w-full text-white text-sm font-medium mb-2"
            >
              {t('hotelFeatures')}
              {expandedSections.hotelFeatures ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            {expandedSections.hotelFeatures && (
              <HotelFeaturesFilter
                activeHotelFeatures={activeFilters.hotelFeatures || []}
                onChange={handleHotelFeaturesChange}
              />
            )}
          </div>

          {/* ROOM FEATURES */}
          <div>
            <button
              onClick={() => toggleSection('roomFeatures')}
              className="flex items-center justify-between w-full text-white text-sm font-medium mb-2"
            >
              {t('roomFeatures')}
              {expandedSections.roomFeatures ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            {expandedSections.roomFeatures && (
              <RoomFeaturesFilter
                activeRoomFeatures={activeFilters.roomFeatures || []}
                onChange={handleRoomFeaturesChange}
              />
            )}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/20">
          <button
            onClick={onResetAllFilters}
            className="w-full text-white text-sm underline hover:no-underline text-center"
          >
            {isReady ? t('resetFilters') : 'Reset Filters'}
          </button>
        </div>
      </div>
    </div>
  );
}
