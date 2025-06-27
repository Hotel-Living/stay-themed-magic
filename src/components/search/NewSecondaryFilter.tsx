
import React, { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { FilterState } from "@/components/filters/FilterTypes";
import { CheckboxFilter } from "./CheckboxFilter";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useFilterData } from "@/hooks/useFilterData";

interface NewSecondaryFilterProps {
  activeFilters: FilterState;
  handleFilterChange: (key: keyof FilterState, value: any) => void;
  handleArrayFilterChange: (key: keyof FilterState, value: string, isSelected: boolean) => void;
  onResetAllFilters: () => void;
}

export function NewSecondaryFilter({
  activeFilters,
  handleFilterChange,
  handleArrayFilterChange,
  onResetAllFilters
}: NewSecondaryFilterProps) {
  const { t, language } = useTranslation();
  const { countries, cities, loading, error } = useFilterData();

  // Official property types as specified
  const propertyTypes = ['Hotel', 'Boutique', 'Resort', 'Rural'];
  
  // Property styles (these should be from database in real implementation)
  const propertyStyles = ['Modern', 'Classic', 'Luxury', 'Budget', 'Historic'];
  
  // Categories with stars
  const categories = [
    { value: '5-star', label: '★★★★★ (5 stars)' },
    { value: '4-star', label: '★★★★☆ (4 stars)' },
    { value: '3-star', label: '★★★☆☆ (3 stars)' },
    { value: 'budget', label: '★★☆☆☆ (Budget)' },
    { value: 'luxury', label: '★★★★★ (Luxury)' }
  ];
  
  // Room types
  const roomTypes = ['Single', 'Double', 'Suite', 'Apartment', 'Studio'];
  
  // Hotel features (from actual database usage)
  const hotelFeatures = ['Pool', 'Gym', 'Spa', 'Restaurant', 'Bar', 'WiFi', 'Parking', 'Beach Access'];
  
  // Room features (from actual database usage)
  const roomFeatures = ['Air Conditioning', 'Balcony', 'Kitchen', 'Workspace', 'TV', 'Minibar', 'Ocean View'];
  
  // Meal plans
  const mealPlans = ['Breakfast', 'Half Board', 'Full Board', 'All Inclusive'];
  
  // Months for 2-column layout
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  // Number of days options
  const stayLengths = ['7 days', '14 days', '30 days', '60 days', '90 days', '180 days', '365 days'];

  return (
    <div className="bg-[#2D0A50] p-4 rounded-lg space-y-4">
      {/* Reset Button at Top */}
      <div className="flex justify-center">
        <Button 
          onClick={onResetAllFilters}
          variant="outline" 
          size="sm"
          className="bg-transparent border-white/30 text-white hover:bg-white/10"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          {language === 'es' ? 'Restablecer Filtros' : 
           language === 'pt' ? 'Redefinir Filtros' : 
           language === 'ro' ? 'Resetează Filtrele' : 
           'Reset Filters'}
        </Button>
      </div>

      {/* 1. Price per Month */}
      <details className="bg-[#5d0083] rounded-sm">
        <summary className="bg-[#7607b2] px-2 py-1 rounded cursor-pointer text-white text-sm font-semibold">
          {language === 'es' ? 'PRECIO POR MES' : 
           language === 'pt' ? 'PREÇO POR MÊS' : 
           language === 'ro' ? 'PREȚ PE LUNĂ' : 
           'PRICE PER MONTH'}
        </summary>
        <div className="pt-1 pl-2 space-y-1">
          <div className="flex flex-col space-y-2 p-2">
            <input
              type="range"
              min="500"
              max="5000"
              step="100"
              value={activeFilters.maxPrice || 2500}
              onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-white text-sm">
              Up to ${activeFilters.maxPrice || 2500}/month
            </div>
          </div>
        </div>
      </details>

      {/* 2. Country */}
      <details className="bg-[#5d0083] rounded-sm">
        <summary className="bg-[#7607b2] px-2 py-1 rounded cursor-pointer text-white text-sm font-semibold">
          {language === 'es' ? 'PAÍS' : 
           language === 'pt' ? 'PAÍS' : 
           language === 'ro' ? 'ȚARĂ' : 
           'COUNTRY'}
        </summary>
        <div className="pt-1 pl-2 space-y-1">
          {loading ? (
            <div className="text-sm text-fuchsia-300/70 italic">Loading countries...</div>
          ) : (
            countries.map(country => (
              <label key={country.code} className="flex items-start cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
                <input 
                  type="checkbox" 
                  checked={activeFilters.country === country.code}
                  onChange={(e) => handleFilterChange('country', e.target.checked ? country.code : null)}
                  className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
                />
                <span className="text-sm flex items-center text-white">
                  {country.name}
                  <span className="ml-2">{country.flag}</span>
                </span>
              </label>
            ))
          )}
        </div>
      </details>

      {/* 3. Location */}
      <details className="bg-[#5d0083] rounded-sm">
        <summary className="bg-[#7607b2] px-2 py-1 rounded cursor-pointer text-white text-sm font-semibold">
          {language === 'es' ? 'UBICACIÓN' : 
           language === 'pt' ? 'LOCALIZAÇÃO' : 
           language === 'ro' ? 'LOCAȚIE' : 
           'LOCATION'}
        </summary>
        <div className="pt-1 pl-2 space-y-1">
          {cities.map(city => (
            <label key={city} className="flex items-start cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
              <input 
                type="checkbox" 
                checked={activeFilters.location === city}
                onChange={(e) => handleFilterChange('location', e.target.checked ? city : null)}
                className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
              />
              <span className="text-sm text-white">{city}</span>
            </label>
          ))}
        </div>
      </details>

      {/* 4. Affinities */}
      <details className="bg-[#5d0083] rounded-sm">
        <summary className="bg-[#7607b2] px-2 py-1 rounded cursor-pointer text-white text-sm font-semibold">
          {language === 'es' ? 'AFINIDADES' : 
           language === 'pt' ? 'AFINIDADES' : 
           language === 'ro' ? 'AFINITĂȚI' : 
           'AFFINITIES'}
        </summary>
        <div className="pt-1 pl-2 space-y-1">
          <div className="text-sm text-fuchsia-300/70 italic">Loading themes...</div>
        </div>
      </details>

      {/* 5. Activities */}
      <details className="bg-[#5d0083] rounded-sm">
        <summary className="bg-[#7607b2] px-2 py-1 rounded cursor-pointer text-white text-sm font-semibold">
          {language === 'es' ? 'ACTIVIDADES' : 
           language === 'pt' ? 'ATIVIDADES' : 
           language === 'ro' ? 'ACTIVITĂȚI' : 
           'ACTIVITIES'}
        </summary>
        <div className="pt-1 pl-2 space-y-1">
          <div className="text-sm text-fuchsia-300/70 italic">Loading activities...</div>
        </div>
      </details>

      {/* 6. Number of Days */}
      <CheckboxFilter
        title={language === 'es' ? 'NÚMERO DE DÍAS' : 
               language === 'pt' ? 'NÚMERO DE DIAS' : 
               language === 'ro' ? 'NUMĂRUL DE ZILE' : 
               'NUMBER OF DAYS'}
        options={stayLengths}
        selectedOptions={activeFilters.stayLengths ? [activeFilters.stayLengths] : []}
        onChange={(value, isChecked) => handleFilterChange('stayLengths', isChecked ? value : null)}
      />

      {/* 7. Month (2 columns) */}
      <details className="bg-[#5d0083] rounded-sm">
        <summary className="bg-[#7607b2] px-2 py-1 rounded cursor-pointer text-white text-sm font-semibold">
          {language === 'es' ? 'MES' : 
           language === 'pt' ? 'MÊS' : 
           language === 'ro' ? 'LUNA' : 
           'MONTH'}
        </summary>
        <div className="pt-1 pl-2 space-y-1">
          <div className="grid grid-cols-2 gap-1">
            {months.map(month => (
              <label key={month} className="flex items-start cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
                <input 
                  type="checkbox" 
                  checked={activeFilters.month === month.toLowerCase()}
                  onChange={(e) => handleFilterChange('month', e.target.checked ? month.toLowerCase() : null)}
                  className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
                />
                <span className="text-sm text-white">{month}</span>
              </label>
            ))}
          </div>
        </div>
      </details>

      {/* 8. Meal Plan */}
      <CheckboxFilter
        title={language === 'es' ? 'PLAN DE COMIDAS' : 
               language === 'pt' ? 'PLANO DE REFEIÇÕES' : 
               language === 'ro' ? 'PLAN DE MASĂ' : 
               'MEAL PLAN'}
        options={mealPlans}
        selectedOptions={activeFilters.mealPlans || []}
        onChange={(value, isChecked) => handleArrayFilterChange('mealPlans', value, isChecked)}
      />

      {/* 9. Property Type */}
      <CheckboxFilter
        title={language === 'es' ? 'TIPO DE PROPIEDAD' : 
               language === 'pt' ? 'TIPO DE PROPRIEDADE' : 
               language === 'ro' ? 'TIPUL PROPRIETĂȚII' : 
               'PROPERTY TYPE'}
        options={propertyTypes}
        selectedOptions={activeFilters.propertyType ? [activeFilters.propertyType] : []}
        onChange={(value, isChecked) => handleFilterChange('propertyType', isChecked ? value : null)}
      />

      {/* 10. Property Style */}
      <CheckboxFilter
        title={language === 'es' ? 'ESTILO DE PROPIEDAD' : 
               language === 'pt' ? 'ESTILO DE PROPRIEDADE' : 
               language === 'ro' ? 'STILUL PROPRIETĂȚII' : 
               'PROPERTY STYLE'}
        options={propertyStyles}
        selectedOptions={activeFilters.propertyStyle ? [activeFilters.propertyStyle] : []}
        onChange={(value, isChecked) => handleFilterChange('propertyStyle', isChecked ? value : null)}
      />

      {/* 11. Category (with stars) */}
      <CheckboxFilter
        title={language === 'es' ? 'CATEGORÍA' : 
               language === 'pt' ? 'CATEGORIA' : 
               language === 'ro' ? 'CATEGORIE' : 
               'CATEGORY'}
        options={categories}
        selectedOptions={activeFilters.stars || []}
        onChange={(value, isChecked) => handleArrayFilterChange('stars', value, isChecked)}
      />

      {/* 12. Room Type */}
      <CheckboxFilter
        title={language === 'es' ? 'TIPO DE HABITACIÓN' : 
               language === 'pt' ? 'TIPO DE QUARTO' : 
               language === 'ro' ? 'TIPUL CAMEREI' : 
               'ROOM TYPE'}
        options={roomTypes}
        selectedOptions={activeFilters.roomTypes || []}
        onChange={(value, isChecked) => handleArrayFilterChange('roomTypes', value, isChecked)}
      />

      {/* 13. Hotel Features */}
      <CheckboxFilter
        title={language === 'es' ? 'SERVICIOS DEL HOTEL' : 
               language === 'pt' ? 'RECURSOS DO HOTEL' : 
               language === 'ro' ? 'FACILITĂȚILE HOTELULUI' : 
               'HOTEL FEATURES'}
        options={hotelFeatures}
        selectedOptions={activeFilters.hotelFeatures || []}
        onChange={(value, isChecked) => handleArrayFilterChange('hotelFeatures', value, isChecked)}
      />

      {/* 14. Room Features */}
      <CheckboxFilter
        title={language === 'es' ? 'SERVICIOS DE LA HABITACIÓN' : 
               language === 'pt' ? 'RECURSOS DO QUARTO' : 
               language === 'ro' ? 'FACILITĂȚILE CAMEREI' : 
               'ROOM FEATURES'}
        options={roomFeatures}
        selectedOptions={activeFilters.roomFeatures || []}
        onChange={(value, isChecked) => handleArrayFilterChange('roomFeatures', value, isChecked)}
      />

      {/* Reset Button at Bottom */}
      <div className="flex justify-center pt-4">
        <Button 
          onClick={onResetAllFilters}
          variant="outline" 
          size="sm"
          className="bg-transparent border-white/30 text-white hover:bg-white/10"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          {language === 'es' ? 'Restablecer Filtros' : 
           language === 'pt' ? 'Redefinir Filtros' : 
           language === 'ro' ? 'Resetează Filtrele' : 
           'Reset Filters'}
        </Button>
      </div>
    </div>
  );
}
