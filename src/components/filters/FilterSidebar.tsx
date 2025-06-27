
import React from "react";
import { FilterState } from "./FilterTypes";
import { FilterContainer } from "./FilterContainer";
import { useFilterState } from "./hooks/useFilterState";
import { CountryFilter } from "../search/CountryFilter";
import { ThemeFilter } from "../search/ThemeFilter";
import { CategoryFilter } from "../search/CategoryFilter";
import { PropertyStyleFilter } from "../search/PropertyStyleFilter";
import { ActivityFilter } from "../search/ActivityFilter";
import { CheckboxFilter } from "../search/CheckboxFilter";
import { PriceRangeFilter } from "../search/PriceRangeFilter";

interface FilterSidebarProps {
  onFilterChange: (filters: FilterState) => void;
  showSearchButton?: boolean;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ 
  onFilterChange, 
  showSearchButton = true 
}) => {
  const {
    filters,
    updateFilter,
    clearAllFilters,
    hasActiveFilters
  } = useFilterState(onFilterChange);

  const handleCountryChange = (country: string | null) => {
    updateFilter('country', country);
  };

  const handleThemeChange = (theme: any) => {
    updateFilter('theme', theme);
  };

  const handleCategoryChange = (category: string | null) => {
    updateFilter('propertyType', category);
  };

  const handlePropertyStyleChange = (style: string | null) => {
    updateFilter('propertyStyle', style);
  };

  const handleActivityChange = (activity: string, isChecked: boolean) => {
    const currentActivities = filters.activities || [];
    const updatedActivities = isChecked 
      ? [...currentActivities, activity]
      : currentActivities.filter(a => a !== activity);
    updateFilter('activities', updatedActivities);
  };

  const handleStarsChange = (star: string, isChecked: boolean) => {
    const currentStars = filters.stars || [];
    const updatedStars = isChecked 
      ? [...currentStars, star]
      : currentStars.filter(s => s !== star);
    updateFilter('stars', updatedStars);
  };

  const handleMealPlanChange = (mealPlan: string, isChecked: boolean) => {
    updateFilter('mealPlan', isChecked ? mealPlan : null);
  };

  return (
    <FilterContainer
      verticalLayout={true}
      expandedLayout={false}
      compactSpacing={false}
      formWrapperBgColor="bg-white/10"
    >
      <div className="space-y-4">
        <PriceRangeFilter 
          activePriceRange={filters.priceRange || [0, 5000]}
          onChange={(range) => updateFilter('priceRange', range)}
        />
        
        <CountryFilter 
          activeCountry={filters.country}
          onChange={handleCountryChange}
        />
        
        <ThemeFilter 
          activeTheme={filters.theme}
          onChange={handleThemeChange}
        />
        
        <CategoryFilter 
          activeCategory={filters.propertyType}
          onChange={handleCategoryChange}
        />
        
        <PropertyStyleFilter 
          activePropertyStyle={filters.propertyStyle}
          onChange={handlePropertyStyleChange}
        />
        
        <ActivityFilter 
          activeActivities={filters.activities || []}
          onChange={handleActivityChange}
        />
        
        <CheckboxFilter
          title="HOTEL CATEGORY"
          options={['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars']}
          selectedOptions={filters.stars || []}
          onChange={handleStarsChange}
        />
        
        <CheckboxFilter
          title="MEAL PLANS"
          options={['Breakfast included', 'Half board', 'Full board', 'All inclusive']}
          selectedOptions={filters.mealPlan ? [filters.mealPlan] : []}
          onChange={handleMealPlanChange}
        />
        
        {hasActiveFilters() && (
          <button 
            className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            onClick={clearAllFilters}
          >
            Clear All Filters
          </button>
        )}
        
        {showSearchButton && (
          <button 
            className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            onClick={() => onFilterChange(filters)}
          >
            Apply Filters
          </button>
        )}
      </div>
    </FilterContainer>
  );
};

export default FilterSidebar;
