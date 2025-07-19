
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { MealPlanFilter } from "./MealPlanFilter";
import { HotelFeaturesFilter } from "./HotelFeaturesFilter"; 
import { RoomFeaturesFilter } from "./RoomFeaturesFilter";
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
  const { t } = useTranslation('filters');
  
  return (
    <div className="bg-gradient-to-br from-purple-950/90 to-purple-900/70 backdrop-blur-md border border-purple-600/30 p-6 shadow-2xl px-0 py-0 rounded-none my-0">
      {/* Reset Button */}
      <div className="mb-6">
        <button 
          onClick={onResetAllFilters} 
          className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm font-medium px-0 whitespace-nowrap"
        >
          {t('resetFilters')}
        </button>
      </div>

      {/* 1. PRECIO POR MES */}
      <div className="mb-6">
        <PriceRangeFilter 
          activePrice={activeFilters.maxPrice} 
          onChange={value => handleFilterChange('maxPrice', value)} 
        />
      </div>

      {/* 2. PAÍS */}
      <div className="mb-6">
        <CountryFilter 
          activeCountry={activeFilters.country} 
          onChange={value => handleFilterChange('country', value)} 
        />
      </div>

      {/* 3. LOCATION */}
      <div className="mb-6">
        <LocationFilter 
          activeLocation={activeFilters.location} 
          onChange={value => handleFilterChange('location', value)} 
        />
      </div>

      {/* 4. AFINIDADES */}
      <div className="mb-6">
        <ThemeFilter 
          activeTheme={activeFilters.theme} 
          onChange={value => handleFilterChange('theme', value)} 
        />
      </div>

      {/* 5. ACTIVIDADES */}
      <div className="mb-6">
        <ActivityFilter 
          activeActivities={activeFilters.activities} 
          onChange={(value, isChecked) => handleArrayFilterChange('activities', value, isChecked)} 
        />
      </div>

      {/* 6. DURACIÓN */}
      <div className="mb-6">
        <LengthOfStayFilter 
          activeLength={activeFilters.stayLengths} 
          onChange={value => handleFilterChange('stayLengths', value)} 
        />
      </div>

      {/* 7. MES */}
      <div className="mb-6">
        <MonthFilter 
          activeMonth={activeFilters.month} 
          onChange={value => handleFilterChange('month', value)} 
        />
      </div>

      {/* 8. COMIDAS */}
      <div className="mb-6">
        <MealPlanFilter 
          activeMealPlans={activeFilters.mealPlans} 
          onChange={(value, isChecked) => handleArrayFilterChange('mealPlans', value, isChecked)} 
        />
      </div>

      {/* 9. TIPO DE HOTEL */}
      <div className="mb-6">
        <PropertyTypeFilter 
          activePropertyType={activeFilters.propertyType} 
          onChange={value => handleFilterChange('propertyType', value)} 
        />
      </div>

      {/* 10. ESTILO DEL HOTEL */}
      <div className="mb-6">
        <PropertyStyleFilter 
          activePropertyStyle={activeFilters.propertyStyle} 
          onChange={value => handleFilterChange('propertyStyle', value)} 
        />
      </div>

      {/* 11. CATEGORÍA */}
      <div className="mb-6">
        <CategoryFilter 
          activeCategory={activeFilters.stars?.[0] || null} 
          onChange={value => handleArrayFilterChange('stars', value, true)} 
        />
      </div>


      {/* 12. SERVICIOS-HOTEL */}
      <div className="mb-6">
        <HotelFeaturesFilter 
          activeHotelFeatures={activeFilters.hotelFeatures} 
          onChange={(value, isChecked) => handleArrayFilterChange('hotelFeatures', value, isChecked)} 
        />
      </div>

      {/* 13. SERVICIOS-HABITACIÓN */}
      <div className="mb-6">
        <RoomFeaturesFilter 
          activeRoomFeatures={activeFilters.roomFeatures} 
          onChange={(value, isChecked) => handleArrayFilterChange('roomFeatures', value, isChecked)} 
        />
      </div>

      {/* Bottom Reset Button */}
      <div className="mt-6">
        <button 
          onClick={onResetAllFilters} 
          className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm font-medium whitespace-nowrap"
        >
          {t('resetFilters')}
        </button>
      </div>
    </div>
  );
}
