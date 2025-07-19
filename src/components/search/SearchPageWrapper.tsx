import React, { useState } from 'react';
import { FilterState } from '@/components/filters/FilterTypes';
import SearchPage from '@/pages/Search';

export default function SearchPageWrapper() {
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    country: null,
    month: null,
    theme: null,
    priceRange: null,
    searchTerm: null,
    minPrice: undefined,
    maxPrice: undefined,
    stars: [],
    location: null,
    propertyType: null,
    propertyStyle: null,
    activities: [],
    roomTypes: [],
    hotelFeatures: [],
    roomFeatures: [],
    mealPlans: [],
    stayLengths: null,
    atmosphere: null,
  });

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setActiveFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleArrayFilterChange = (key: keyof FilterState, value: string, isSelected: boolean) => {
    setActiveFilters(prev => {
      const currentArray = prev[key] as string[] || [];
      
      if (isSelected) {
        return {
          ...prev,
          [key]: [...currentArray, value]
        };
      } else {
        return {
          ...prev,
          [key]: currentArray.filter(item => item !== value)
        };
      }
    });
  };

  const onResetAllFilters = () => {
    setActiveFilters({
      country: null,
      month: null,
      theme: null,
      priceRange: null,
      searchTerm: null,
      minPrice: undefined,
      maxPrice: undefined,
      stars: [],
      location: null,
      propertyType: null,
      propertyStyle: null,
      activities: [],
      roomTypes: [],
      hotelFeatures: [],
      roomFeatures: [],
      mealPlans: [],
      stayLengths: null,
      atmosphere: null,
    });
  };

  return (
    <SearchPage
      activeFilters={activeFilters}
      handleFilterChange={handleFilterChange}
      handleArrayFilterChange={handleArrayFilterChange}
      onResetAllFilters={onResetAllFilters}
    />
  );
}