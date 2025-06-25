
import { useEffect, useState } from "react";
import { CheckboxFilter } from "./CheckboxFilter";
import { PriceRangeFilter } from "./PriceRangeFilter";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { ActivityFilter } from "./ActivityFilter";
import { LengthOfStayFilter } from "./LengthOfStayFilter";

interface FilterSidebarProps {
  onClose: () => void;
  activeFilters: any;
  handleFilterChange: (filterType: string, value: any) => void;
  handleArrayFilterChange: (filterType: string, value: string, isChecked: boolean) => void;
  resetFilters: () => void;
}

export function FilterSidebar({ 
  onClose, 
  activeFilters, 
  handleFilterChange, 
  handleArrayFilterChange, 
  resetFilters 
}: FilterSidebarProps) {
  const { t } = useTranslation();

  const countryOptions = Object.entries(t('filters.countries'))
    .map(([key, label]) => ({ value: key, label }));

  const mealPlanOptions = Object.entries(t('filters.mealPlans'))
    .filter(([key]) => key !== 'title')
    .map(([key, label]) => ({ value: key, label }));

  const roomTypeOptions = Object.entries(t('filters.roomTypes'))
    .filter(([key]) => key !== 'title')
    .map(([key, label]) => ({ value: key, label }));

  const hotelFeatureOptions = Object.entries(t('filters.hotelFeatures'))
    .filter(([key]) => key !== 'title')
    .map(([key, label]) => ({ value: key, label }));

  const roomFeatureOptions = Object.entries(t('filters.roomFeatures'))
    .filter(([key]) => key !== 'title')
    .map(([key, label]) => ({ value: key, label }));

  return (
    <div className="bg-fuchsia-950/80 backdrop-blur-sm text-white w-80 p-6 flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-4">{t('filters.all').toUpperCase()}</h2>

      <PriceRangeFilter
        priceRange={activeFilters.priceRange || [0, 1000]}
        onChange={(range) => handleFilterChange('priceRange', range)}
      />

      <CheckboxFilter
        title={t('filters.country').toUpperCase()}
        options={countryOptions}
        selectedOptions={activeFilters.country || []}
        onChange={(value, isChecked) => handleArrayFilterChange('country', value, isChecked)}
      />

      <CheckboxFilter
        title={t('filters.mealPlans.title').toUpperCase()}
        options={mealPlanOptions}
        selectedOptions={activeFilters.mealPlans || []}
        onChange={(value, isChecked) => handleArrayFilterChange('mealPlans', value, isChecked)}
      />

      <CheckboxFilter
        title={t('filters.roomTypes.title').toUpperCase()}
        options={roomTypeOptions}
        selectedOptions={activeFilters.roomTypes || []}
        onChange={(value, isChecked) => handleArrayFilterChange('roomTypes', value, isChecked)}
      />

      <CheckboxFilter
        title={t('filters.hotelFeatures.title').toUpperCase()}
        options={hotelFeatureOptions}
        selectedOptions={activeFilters.hotelFeatures || []}
        onChange={(value, isChecked) => handleArrayFilterChange('hotelFeatures', value, isChecked)}
      />

      <CheckboxFilter
        title={t('filters.roomFeatures.title').toUpperCase()}
        options={roomFeatureOptions}
        selectedOptions={activeFilters.roomFeatures || []}
        onChange={(value, isChecked) => handleArrayFilterChange('roomFeatures', value, isChecked)}
      />

      <ActivityFilter
        activeActivities={activeFilters.activities || []}
        onChange={(value, isChecked) => handleArrayFilterChange('activities', value, isChecked)}
      />

      <LengthOfStayFilter
        activeLength={activeFilters.stayLengths || []}
        onChange={(value, isChecked) => handleArrayFilterChange('stayLengths', value, isChecked)}
      />

      <div className="mt-auto flex justify-between">
        <Button variant="ghost" onClick={onClose}>
          {t('filters.clearAll').toUpperCase()}
        </Button>
        <Button onClick={() => { resetFilters(); onClose(); }}>
          {t('filters.resetAllFilters').toUpperCase()}
        </Button>
      </div>
    </div>
  );
}
