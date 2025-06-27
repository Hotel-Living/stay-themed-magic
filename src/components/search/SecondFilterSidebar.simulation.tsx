
import React from "react";
import { FilterState } from "@/components/filters/FilterTypes";
import { PriceRangeFilter } from "./PriceRangeFilter";
import { CountryFilter } from "./CountryFilter";
import { LocationFilter } from "./LocationFilter";
import { ThemeFilterSimulation } from "./ThemeFilter.simulation";
import { ActivityFilterSimulation } from "./ActivityFilter.simulation";
import { DayRangeFilter } from "./DayRangeFilter";
import { MonthFilter } from "./MonthFilter";
import { MealPlanFilter } from "./MealPlanFilter";
import { PropertyTypeFilter } from "./PropertyTypeFilter";
import { PropertyStyleFilter } from "./PropertyStyleFilter";
import { CategoryFilter } from "./CategoryFilter";
import { RoomTypesFilter } from "./RoomTypesFilter";
import { HotelServicesFilter } from "./HotelServicesFilter";
import { RoomServicesFilter } from "./RoomServicesFilter";

interface SecondFilterSidebarSimulationProps {
  activeFilters: FilterState;
  handleFilterChange: (key: keyof FilterState, value: any) => void;
  handleArrayFilterChange: (key: keyof FilterState, value: string, isSelected: boolean) => void;
  onResetAllFilters: () => void;
}

export function SecondFilterSidebarSimulation({ 
  activeFilters, 
  handleFilterChange, 
  handleArrayFilterChange,
  onResetAllFilters 
}: SecondFilterSidebarSimulationProps) {
  return (
    <div className="w-full bg-[#460F54]/90 backdrop-blur-sm rounded-lg p-4 border border-fuchsia-400/20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-white">Filters</h2>
        <button 
          onClick={onResetAllFilters}
          className="text-xs text-fuchsia-300 hover:text-white transition-colors underline"
        >
          Reset All
        </button>
      </div>
      
      <div className="space-y-3">
        {/* 1. Precio por mes */}
        <PriceRangeFilter 
          activePrice={typeof activeFilters.priceRange === 'number' ? activeFilters.priceRange : null}
          onChange={(value) => handleFilterChange('priceRange', value)}
        />
        
        {/* 2. País */}
        <CountryFilter 
          activeCountry={activeFilters.country || null}
          onChange={(value) => handleFilterChange('country', value)}
        />
        
        {/* 3. Ubicación */}
        <LocationFilter 
          activeLocation={activeFilters.location || null}
          onChange={(value) => handleFilterChange('location', value)}
        />
        
        {/* 4. Afinidad - Use simulation version */}
        <ThemeFilterSimulation 
          activeTheme={activeFilters.theme || null}
          onChange={(value) => handleFilterChange('theme', value)}
        />
        
        {/* 5. Actividades - Use simulation version */}
        <ActivityFilterSimulation 
          activeActivities={activeFilters.activities || []}
          onChange={(value, isChecked) => handleArrayFilterChange('activities', value, isChecked)}
        />
        
        {/* 6. Número de días */}
        <DayRangeFilter 
          activeDayRange={activeFilters.dayRange || null}
          onChange={(value) => handleFilterChange('dayRange', value)}
        />
        
        {/* 7. Mes */}
        <MonthFilter 
          activeMonth={activeFilters.month || null}
          onChange={(value) => handleFilterChange('month', value)}
        />
        
        {/* 8. Plan de comidas */}
        <MealPlanFilter 
          activeMealPlan={activeFilters.mealPlan || null}
          onChange={(value) => handleFilterChange('mealPlan', value)}
        />
        
        {/* 9. Tipo de propiedad */}
        <PropertyTypeFilter 
          activePropertyType={activeFilters.propertyType || null}
          onChange={(value) => handleFilterChange('propertyType', value)}
        />
        
        {/* 10. Estilo de propiedad */}
        <PropertyStyleFilter 
          activePropertyStyle={activeFilters.propertyStyle || null}
          onChange={(value) => handleFilterChange('propertyStyle', value)}
        />
        
        {/* 11. Categoría */}
        <CategoryFilter 
          activeCategory={activeFilters.stars?.[0] || null}
          onChange={(value) => handleFilterChange('stars', value ? [value] : [])}
        />
        
        {/* 12. Tipos de habitación */}
        <RoomTypesFilter 
          activeRoomTypes={activeFilters.roomTypes || []}
          onChange={(value, isChecked) => handleArrayFilterChange('roomTypes', value, isChecked)}
        />
        
        {/* 13. Servicios del hotel */}
        <HotelServicesFilter 
          activeHotelServices={activeFilters.hotelServices || []}
          onChange={(value, isChecked) => handleArrayFilterChange('hotelServices', value, isChecked)}
        />
        
        {/* 14. Servicios de la habitación */}
        <RoomServicesFilter 
          activeRoomServices={activeFilters.roomServices || []}
          onChange={(value, isChecked) => handleArrayFilterChange('roomServices', value, isChecked)}
        />
      </div>
      
      <div className="mt-6 pt-4 border-t border-fuchsia-400/20">
        <button 
          onClick={onResetAllFilters}
          className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white py-2 px-4 rounded transition-colors text-sm font-bold"
        >
          Reset All Filters
        </button>
      </div>
    </div>
  );
}
