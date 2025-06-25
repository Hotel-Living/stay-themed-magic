
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { FilterState } from "@/components/filters/FilterTypes";
import { FilterItem } from "./FilterItem";
import { PriceRangeFilter } from "./PriceRangeFilter";
import { MonthFilter } from "./MonthFilter";
import { CountryFilter } from "./CountryFilter";
import { CategoryFilter } from "./CategoryFilter";
import { LengthOfStayFilter } from "./LengthOfStayFilter";
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
    <div className="bg-gradient-to-br from-purple-950/90 to-purple-900/70 backdrop-blur-md border border-purple-600/30 p-4 shadow-2xl w-full max-w-xs px-0 py-0 rounded-lg">
      {/* Reset Button */}
      <div className="mb-4">
        <button 
          onClick={onResetAllFilters} 
          className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm font-medium px-0"
        >
          {t('filters.resetFilters')}
        </button>
      </div>

      {/* Country Filter */}
      <div className="mb-4">
        <CountryFilter 
          activeCountry={activeFilters.country} 
          onChange={value => handleFilterChange('country', value)} 
        />
      </div>

      {/* Location Filter */}
      <div className="mb-4">
        <LocationFilter 
          activeLocation={activeFilters.location} 
          onChange={value => handleFilterChange('location', value)} 
        />
      </div>

      {/* Theme Filter (Affinities) */}
      <div className="mb-4">
        <ThemeFilter 
          activeTheme={activeFilters.theme} 
          onChange={value => handleFilterChange('theme', value)} 
        />
      </div>

      {/* Activities Filter */}
      <div className="mb-4">
        <ActivityFilter 
          activeActivities={activeFilters.activities} 
          onChange={(value, isChecked) => handleArrayFilterChange('activities', value, isChecked)} 
        />
      </div>

      {/* Length of Stay Filter */}
      <div className="mb-4">
        <LengthOfStayFilter 
          activeLength={activeFilters.stayLengths?.[0]?.toString() || null} 
          onChange={value => handleArrayFilterChange('stayLengths', value, true)} 
        />
      </div>

      {/* Price Filter */}
      <div className="mb-4">
        <PriceRangeFilter 
          activePrice={activeFilters.maxPrice} 
          onChange={value => handleFilterChange('maxPrice', value)} 
        />
      </div>

      {/* Month Filter */}
      <div className="mb-4">
        <MonthFilter 
          activeMonth={activeFilters.month} 
          onChange={value => handleFilterChange('month', value)} 
        />
      </div>

      {/* Meal Plans Filter */}
      <div className="mb-4">
        <CheckboxFilter 
          title="PLAN DE COMIDAS" 
          options={['Desayuno', 'Media Pensión', 'Pensión Completa', 'Todo Incluido']} 
          selectedOptions={activeFilters.mealPlans} 
          onChange={(value, isChecked) => handleArrayFilterChange('mealPlans', value, isChecked)} 
        />
      </div>

      {/* Property Type Filter */}
      <div className="mb-4">
        <PropertyTypeFilter 
          activePropertyType={activeFilters.propertyType} 
          onChange={value => handleFilterChange('propertyType', value)} 
        />
      </div>

      {/* Property Style Filter */}
      <div className="mb-4">
        <PropertyStyleFilter 
          activePropertyStyle={activeFilters.propertyStyle} 
          onChange={value => handleFilterChange('propertyStyle', value)} 
        />
      </div>

      {/* Category Filter */}
      <div className="mb-4">
        <CategoryFilter 
          activeCategory={activeFilters.stars?.[0] || null} 
          onChange={value => handleArrayFilterChange('stars', value, true)} 
        />
      </div>

      {/* Room Types Filter */}
      <div className="mb-4">
        <CheckboxFilter 
          title="TIPO DE HABITACIÓN" 
          options={['Individual', 'Doble', 'Suite', 'Apartamento']} 
          selectedOptions={activeFilters.roomTypes} 
          onChange={(value, isChecked) => handleArrayFilterChange('roomTypes', value, isChecked)} 
        />
      </div>

      {/* Hotel Features Filter */}
      <div className="mb-4">
        <CheckboxFilter 
          title="SERVICIOS DEL HOTEL" 
          options={['Piscina', 'Gimnasio', 'Spa', 'Restaurante', 'Bar', 'WiFi', 'Aparcamiento']} 
          selectedOptions={activeFilters.hotelFeatures} 
          onChange={(value, isChecked) => handleArrayFilterChange('hotelFeatures', value, isChecked)} 
        />
      </div>

      {/* Room Features Filter */}
      <div className="mb-4">
        <CheckboxFilter 
          title="SERVICIOS DE LA HABITACIÓN" 
          options={['Aire Acondicionado', 'Balcón', 'Cocina', 'Espacio de Trabajo', 'TV', 'Minibar']} 
          selectedOptions={activeFilters.roomFeatures} 
          onChange={(value, isChecked) => handleArrayFilterChange('roomFeatures', value, isChecked)} 
        />
      </div>

      {/* Bottom Reset Button */}
      <div className="mt-4">
        <button 
          onClick={onResetAllFilters} 
          className="w-full py-2 px-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm font-medium"
        >
          {t('filters.resetFilters')}
        </button>
      </div>
    </div>
  );
}
