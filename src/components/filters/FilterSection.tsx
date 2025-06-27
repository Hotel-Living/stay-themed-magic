
import React from "react";
import { PriceRangeFilter } from "@/components/search/PriceRangeFilter";
import { CountryFilter } from "@/components/search/CountryFilter";
import { CategoryFilter } from "@/components/search/CategoryFilter";
import { MonthFilter } from "@/components/search/MonthFilter";
import { DayRangeFilter } from "@/components/search/DayRangeFilter";
import { LocationFilter } from "@/components/search/LocationFilter";
import { MealPlanFilter } from "@/components/search/MealPlanFilter";
import { ActivityFilter } from "@/components/search/ActivityFilter";
import { LengthOfStayFilter } from "@/components/search/LengthOfStayFilter";
import { HotelServicesFilter } from "@/components/search/HotelServicesFilter";
import { FilterState } from "./FilterTypes";

interface FilterSectionProps {
  onFilterChange: (filters: Partial<FilterState>) => void;
  showSearchButton?: boolean;
  verticalLayout?: boolean;
  useCollapsibleThemes?: boolean;
  expandedLayout?: boolean;
  compactSpacing?: boolean;
  useBoldLabels?: boolean;
  usePurpleFilterBackground?: boolean;
  placeholders?: {
    country?: string;
    month?: string;
    theme?: string;
    priceRange?: string;
  };
  useLargerMobileText?: boolean;
}

export function FilterSection({
  onFilterChange,
  showSearchButton = false,
  verticalLayout = false,
  useCollapsibleThemes = true,
  expandedLayout = true,
  compactSpacing = false,
  useBoldLabels = true,
  usePurpleFilterBackground = true,
  placeholders = {},
  useLargerMobileText = true
}: FilterSectionProps) {
  const [filters, setFilters] = React.useState<FilterState>({
    priceRange: [0, 5000],
    country: null,
    category: null,
    month: null,
    dayRange: null,
    location: null,
    mealPlan: null,
    activities: [],
    lengthOfStay: null,
    hotelServices: []
  });

  const handleFilterUpdate = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="space-y-3">
      <PriceRangeFilter 
        activePriceRange={filters.priceRange || [0, 5000]}
        onChange={(range) => handleFilterUpdate({ priceRange: range })}
      />
      
      <CountryFilter 
        activeCountry={filters.country}
        onChange={(country) => handleFilterUpdate({ country })}
      />
      
      <CategoryFilter 
        activeCategory={filters.category}
        onChange={(category) => handleFilterUpdate({ category })}
      />
      
      <MonthFilter 
        activeMonth={filters.month}
        onChange={(month) => handleFilterUpdate({ month })}
      />
      
      <DayRangeFilter 
        activeDayRange={filters.dayRange}
        onChange={(dayRange) => handleFilterUpdate({ dayRange })}
      />
      
      <LocationFilter 
        activeLocation={filters.location}
        onChange={(location) => handleFilterUpdate({ location })}
      />
      
      <MealPlanFilter 
        activeMealPlan={filters.mealPlan}
        onChange={(mealPlan) => handleFilterUpdate({ mealPlan })}
      />
      
      <ActivityFilter 
        activeActivities={filters.activities}
        onChange={(activity, isChecked) => {
          const newActivities = isChecked 
            ? [...filters.activities, activity]
            : filters.activities.filter(a => a !== activity);
          handleFilterUpdate({ activities: newActivities });
        }}
      />
      
      <LengthOfStayFilter 
        activeLength={filters.lengthOfStay}
        onChange={(lengthOfStay) => handleFilterUpdate({ lengthOfStay })}
      />
      
      <HotelServicesFilter 
        activeHotelServices={filters.hotelServices}
        onChange={(service, isChecked) => {
          const newServices = isChecked 
            ? [...filters.hotelServices, service]
            : filters.hotelServices.filter(s => s !== service);
          handleFilterUpdate({ hotelServices: newServices });
        }}
      />
    </div>
  );
}
