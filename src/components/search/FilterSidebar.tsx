import { useEffect, useState } from "react";
import { CheckboxFilter } from "./CheckboxFilter";
import { PriceRangeFilter } from "./PriceRangeFilter";
import { Button } from "@/components/ui/button";
import { useSearch } from "@/hooks/useSearch";
import { useTranslation } from "@/hooks/useTranslation";
import { ActivityFilter } from "./ActivityFilter";
import { LengthOfStayFilter } from "./LengthOfStayFilter";

interface FilterSidebarProps {
  onClose: () => void;
}

export function FilterSidebar({ onClose }: FilterSidebarProps) {
  const { t } = useTranslation();
  const {
    activeCountries,
    activeMealPlans,
    activeRoomTypes,
    activeHotelFeatures,
    activeRoomFeatures,
    activeActivities,
    activeStayLengths,
    priceRange,
    onCountryChange,
    onMealPlanChange,
    onRoomTypeChange,
    onHotelFeatureChange,
    onRoomFeatureChange,
    onActivityChange,
    onStayLengthChange,
    onPriceRangeChange,
    resetFilters,
  } = useSearch();

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
        title={t('filters.price').toUpperCase()}
        priceRange={priceRange}
        onChange={onPriceRangeChange}
      />

      <CheckboxFilter
        title={t('filters.country').toUpperCase()}
        options={countryOptions}
        selectedOptions={activeCountries}
        onChange={onCountryChange}
      />

      <CheckboxFilter
        title={t('filters.mealPlans.title').toUpperCase()}
        options={mealPlanOptions}
        selectedOptions={activeMealPlans}
        onChange={onMealPlanChange}
      />

      <CheckboxFilter
        title={t('filters.roomTypes.title').toUpperCase()}
        options={roomTypeOptions}
        selectedOptions={activeRoomTypes}
        onChange={onRoomTypeChange}
      />

      <CheckboxFilter
        title={t('filters.hotelFeatures.title').toUpperCase()}
        options={hotelFeatureOptions}
        selectedOptions={activeHotelFeatures}
        onChange={handleHotelFeatureChange}
      />

      <CheckboxFilter
        title={t('filters.roomFeatures.title').toUpperCase()}
        options={roomFeatureOptions}
        selectedOptions={activeRoomFeatures}
        onChange={handleRoomFeatureChange}
      />

      <ActivityFilter
        activeActivities={activeActivities}
        onChange={onActivityChange}
      />

      <LengthOfStayFilter
        activeStayLengths={activeStayLengths}
        onChange={onStayLengthChange}
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
