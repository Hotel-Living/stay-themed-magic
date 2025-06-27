
import React from "react";
import { FilterItem } from "./FilterItem";
import { CountryFilter } from "./CountryFilter.es";
import { MonthFilter } from "./MonthFilter.es";
import { ThemeFilter } from "./ThemeFilter.es";
import { PriceRangeFilter } from "./PriceRangeFilter.es";
import { PropertyTypeFilter } from "./PropertyTypeFilter.es";
import { PropertyStyleFilter } from "./PropertyStyleFilter.es";
import { CategoryFilter } from "./CategoryFilter.es";
import { LengthOfStayFilter } from "./LengthOfStayFilter.es";
import { LocationFilter } from "./LocationFilter.es";
import { ActivityFilter } from "./ActivityFilter.es";
import { FilterState } from "@/components/filters/FilterTypes";
import { Button } from "@/components/ui/button";

interface SecondaryFilterPanelProps {
  activeFilters: FilterState;
  handleFilterChange: (key: keyof FilterState, value: any) => void;
  handleArrayFilterChange: (key: keyof FilterState, value: string, isSelected: boolean) => void;
  onResetAllFilters: () => void;
}

export function SecondaryFilterPanel({
  activeFilters,
  handleFilterChange,
  handleArrayFilterChange,
  onResetAllFilters
}: SecondaryFilterPanelProps) {
  return (
    <div className="w-72 min-w-72 max-w-72 bg-[#5d0083] p-4 space-y-1 overflow-visible">
      <CountryFilter 
        activeCountry={activeFilters.country} 
        onChange={(value) => handleFilterChange('country', value)} 
      />
      
      <MonthFilter 
        activeMonth={activeFilters.month} 
        onChange={(value) => handleFilterChange('month', value)} 
      />
      
      <ThemeFilter 
        activeThemes={activeFilters.themes} 
        onChange={handleArrayFilterChange} 
      />
      
      <PriceRangeFilter 
        activePriceRange={activeFilters.priceRange} 
        onChange={(value) => handleFilterChange('priceRange', value)} 
      />

      <PropertyTypeFilter 
        activePropertyTypes={activeFilters.propertyTypes} 
        onChange={handleArrayFilterChange} 
      />

      <PropertyStyleFilter 
        activePropertyStyles={activeFilters.propertyStyles} 
        onChange={handleArrayFilterChange} 
      />

      <CategoryFilter 
        activeCategories={activeFilters.categories} 
        onChange={handleArrayFilterChange} 
      />

      <LengthOfStayFilter 
        activeLengthOfStay={activeFilters.lengthOfStay} 
        onChange={handleArrayFilterChange} 
      />

      <LocationFilter 
        activeLocation={activeFilters.location} 
        onChange={(value) => handleFilterChange('location', value)} 
      />

      <ActivityFilter 
        activeActivities={activeFilters.activities} 
        onChange={handleArrayFilterChange} 
      />

      <FilterItem title="COMIDAS">
        <div className="space-y-1">
          {[
            { key: "breakfast", label: "Desayuno" },
            { key: "halfBoard", label: "Media Pensión" },
            { key: "fullBoard", label: "Pensión Completa" },
            { key: "allInclusive", label: "Todo Incluido" },
            { key: "laundryIncluded", label: "Lavandería Incluída" }
          ].map(meal => (
            <label key={meal.key} className="flex items-start cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
              <input 
                type="checkbox" 
                checked={activeFilters.mealPlans?.includes(meal.key) || false}
                onChange={(e) => handleArrayFilterChange('mealPlans', meal.key, e.target.checked)}
                className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
              />
              <span className="text-sm text-white whitespace-nowrap">{meal.label}</span>
            </label>
          ))}
        </div>
      </FilterItem>

      <FilterItem title="TIPOS DE HABITACIÓN">
        <div className="space-y-1">
          {[
            { key: "single", label: "Individual" },
            { key: "double", label: "Doble" },
            { key: "suite", label: "Suite" },
            { key: "apartment", label: "Apartamento" }
          ].map(room => (
            <label key={room.key} className="flex items-start cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
              <input 
                type="checkbox" 
                checked={activeFilters.roomTypes?.includes(room.key) || false}
                onChange={(e) => handleArrayFilterChange('roomTypes', room.key, e.target.checked)}
                className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
              />
              <span className="text-sm text-white whitespace-nowrap">{room.label}</span>
            </label>
          ))}
        </div>
      </FilterItem>

      <FilterItem title="SERVICIOS-HOTEL">
        <div className="space-y-1">
          {[
            { key: "pool", label: "Piscina" },
            { key: "gym", label: "Gimnasio" },
            { key: "spa", label: "Spa" },
            { key: "restaurant", label: "Restaurante" },
            { key: "bar", label: "Bar" },
            { key: "wifi", label: "WiFi" },
            { key: "parking", label: "Aparcamiento" }
          ].map(feature => (
            <label key={feature.key} className="flex items-start cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
              <input 
                type="checkbox" 
                checked={activeFilters.hotelFeatures?.includes(feature.key) || false}
                onChange={(e) => handleArrayFilterChange('hotelFeatures', feature.key, e.target.checked)}
                className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
              />
              <span className="text-sm text-white whitespace-nowrap">{feature.label}</span>
            </label>
          ))}
        </div>
      </FilterItem>

      <FilterItem title="SERVICIOS-HABITACIÓN">
        <div className="space-y-1">
          {[
            { key: "airConditioning", label: "Aire Acondicionado" },
            { key: "balcony", label: "Balcón" },
            { key: "kitchen", label: "Cocina" },
            { key: "workspace", label: "Espacio de Trabajo" },
            { key: "tv", label: "TV" },
            { key: "minibar", label: "Minibar" }
          ].map(feature => (
            <label key={feature.key} className="flex items-start cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
              <input 
                type="checkbox" 
                checked={activeFilters.roomFeatures?.includes(feature.key) || false}
                onChange={(e) => handleArrayFilterChange('roomFeatures', feature.key, e.target.checked)}
                className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
              />
              <span className="text-sm text-white whitespace-nowrap">{feature.label}</span>
            </label>
          ))}
        </div>
      </FilterItem>

      <div className="pt-4">
        <Button 
          onClick={onResetAllFilters}
          variant="outline" 
          className="w-full bg-transparent border-fuchsia-300/50 text-fuchsia-200 hover:bg-fuchsia-800/30 hover:text-white text-sm whitespace-nowrap"
        >
          Restablecer Filtros
        </Button>
      </div>
    </div>
  );
}
