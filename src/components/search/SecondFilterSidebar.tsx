
import React from "react";
import { FilterItem } from "./FilterItem";
import { CountryFilter } from "./CountryFilter";
import { LocationFilter } from "./LocationFilter";
import { ThemeFilter } from "./ThemeFilter";
import { ActivityFilter } from "./ActivityFilter";
import { LengthOfStayFilter } from "./LengthOfStayFilter";
import { PriceRangeFilter } from "./PriceRangeFilter";
import { MonthFilter } from "./MonthFilter";
import { CheckboxFilter } from "./CheckboxFilter";
import { RadioFilter } from "./RadioFilter";
import { useTranslation } from "@/hooks/useTranslation";
import { FilterState } from "@/components/filters/FilterTypes";

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

  const propertyTypes = [
    { value: "hotel", label: "Hotel" },
    { value: "resort", label: "Resort" },
    { value: "boutiqueHotel", label: "Boutique Hotel" },
    { value: "motel", label: "Motel" },
    { value: "inn", label: "Inn" }
  ];

  const propertyStyles = [
    { value: "classic", label: "Classic" },
    { value: "classicElegant", label: "Classic Elegant" },
    { value: "modern", label: "Modern" },
    { value: "fusion", label: "Fusion" },
    { value: "urban", label: "Urban" },
    { value: "minimalist", label: "Minimalist" },
    { value: "luxury", label: "Luxury" }
  ];

  const categories = [
    { value: "1star", label: "1 Star" },
    { value: "2stars", label: "2 Stars" },
    { value: "3stars", label: "3 Stars" },
    { value: "4stars", label: "4 Stars" },
    { value: "5stars", label: "5 Stars" }
  ];

  const roomTypes = [
    { value: "single", label: "Single" },
    { value: "double", label: "Double" },
    { value: "suite", label: "Suite" },
    { value: "studio", label: "Studio" },
    { value: "penthouse", label: "Penthouse" },
    { value: "familyRoom", label: "Family Room" }
  ];

  const hotelFeatures = [
    { value: "wifi", label: "Free WiFi" },
    { value: "parking", label: "Parking" },
    { value: "pool", label: "Swimming Pool" },
    { value: "gym", label: "Fitness Center" },
    { value: "spa", label: "Spa" },
    { value: "restaurant", label: "Restaurant" },
    { value: "bar", label: "Bar" },
    { value: "businessCenter", label: "Business Center" },
    { value: "petFriendly", label: "Pet Friendly" },
    { value: "airConditioning", label: "Air Conditioning" }
  ];

  const roomFeatures = [
    { value: "balcony", label: "Balcony" },
    { value: "kitchenette", label: "Kitchenette" },
    { value: "minibar", label: "Minibar" },
    { value: "safebox", label: "Safe Box" },
    { value: "tv", label: "TV" },
    { value: "hairdryer", label: "Hair Dryer" },
    { value: "bathrobes", label: "Bathrobes" },
    { value: "roomService", label: "Room Service" },
    { value: "seaView", label: "Sea View" },
    { value: "cityView", label: "City View" }
  ];

  const mealPlans = [
    { value: "breakfastIncluded", label: "Breakfast Included" },
    { value: "halfBoard", label: "Half Board" },
    { value: "fullBoard", label: "Full Board" },
    { value: "allInclusive", label: "All Inclusive" }
  ];

  return (
    <div className="glass-card rounded-lg p-4 space-y-6" style={{ backgroundColor: '#8e069b' }}>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white uppercase">FILTER MENU</h2>
        <button
          onClick={onResetAllFilters}
          className="text-sm text-white/80 hover:text-white underline uppercase"
        >
          {t('filters.resetFilters')}
        </button>
      </div>

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

      {/* AFFINITIES (Theme Filter) */}
      <ThemeFilter
        activeTheme={activeFilters.theme}
        onChange={(value) => handleFilterChange('theme', value)}
      />

      {/* ACTIVITIES */}
      <ActivityFilter
        activeActivities={activeFilters.activities || []}
        onChange={handleArrayFilterChange}
      />

      {/* LENGTH OF STAY */}
      <LengthOfStayFilter
        activeLength={activeFilters.stayLengths?.[0]?.toString() || null}
        onChange={(value) => handleFilterChange('stayLengths', [parseInt(value)])}
      />

      {/* PRICE PER MONTH */}
      <PriceRangeFilter
        activePrice={typeof activeFilters.priceRange === 'number' ? activeFilters.priceRange : null}
        onChange={(value) => handleFilterChange('priceRange', value)}
      />

      {/* MONTHS */}
      <MonthFilter
        activeMonth={activeFilters.month}
        onChange={(value) => handleFilterChange('month', value)}
      />

      {/* MEAL PLAN */}
      <CheckboxFilter
        title="MEAL PLAN"
        options={mealPlans}
        selectedOptions={activeFilters.mealPlans || []}
        onChange={(value, isChecked) => handleArrayFilterChange('mealPlans', value, isChecked)}
      />

      {/* PROPERTY TYPE */}
      <RadioFilter
        title="PROPERTY TYPE"
        options={propertyTypes}
        selectedOption={activeFilters.propertyType}
        onChange={(value) => handleFilterChange('propertyType', value)}
      />

      {/* PROPERTY STYLE */}
      <RadioFilter
        title="PROPERTY STYLE"
        options={propertyStyles}
        selectedOption={activeFilters.propertyStyle}
        onChange={(value) => handleFilterChange('propertyStyle', value)}
      />

      {/* CATEGORY */}
      <CheckboxFilter
        title="CATEGORY"
        options={categories}
        selectedOptions={activeFilters.stars || []}
        onChange={(value, isChecked) => handleArrayFilterChange('stars', value, isChecked)}
      />

      {/* ROOM TYPES */}
      <CheckboxFilter
        title="ROOM TYPES"
        options={roomTypes}
        selectedOptions={activeFilters.roomTypes || []}
        onChange={(value, isChecked) => handleArrayFilterChange('roomTypes', value, isChecked)}
      />

      {/* HOTEL FEATURES */}
      <CheckboxFilter
        title="HOTEL FEATURES"
        options={hotelFeatures}
        selectedOptions={activeFilters.hotelFeatures || []}
        onChange={(value, isChecked) => handleArrayFilterChange('hotelFeatures', value, isChecked)}
      />

      {/* ROOM FEATURES */}
      <CheckboxFilter
        title="ROOM FEATURES"
        options={roomFeatures}
        selectedOptions={activeFilters.roomFeatures || []}
        onChange={(value, isChecked) => handleArrayFilterChange('roomFeatures', value, isChecked)}
      />

      <div className="pt-4 border-t border-white/20">
        <button
          onClick={onResetAllFilters}
          className="w-full text-center text-white/80 hover:text-white underline text-sm uppercase"
        >
          {t('filters.resetFilters')}
        </button>
      </div>
    </div>
  );
}
