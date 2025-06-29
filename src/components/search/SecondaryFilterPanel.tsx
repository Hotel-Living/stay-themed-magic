import React from "react";
import { FilterState } from "@/components/filters/FilterTypes";
import { LengthOfStayFilterEN } from "./LengthOfStayFilter.en";
import { LengthOfStayFilterES } from "./LengthOfStayFilter.es";
import { LengthOfStayFilterPT } from "./LengthOfStayFilter.pt";
import { LengthOfStayFilterRO } from "./LengthOfStayFilter.ro";
import { ThemeFilterEN } from "./ThemeFilter.en";
import { ThemeFilterES } from "./ThemeFilter.es";
import { ThemeFilterPT } from "./ThemeFilter.pt";
import { ThemeFilterRO } from "./ThemeFilter.ro";
import { CountryFilterEN } from "./CountryFilter.en";
import { CountryFilterES } from "./CountryFilter.es";
import { CountryFilterPT } from "./CountryFilter.pt";
import { CountryFilterRO } from "./CountryFilter.ro";
import { MonthFilterEN } from "./MonthFilter.en";
import { MonthFilterES } from "./MonthFilter.es";
import { MonthFilterPT } from "./MonthFilter.pt";
import { MonthFilterRO } from "./MonthFilter.ro";
import { PriceRangeFilterEN } from "./PriceRangeFilter.en";
import { PriceRangeFilterES } from "./PriceRangeFilter.es";
import { PriceRangeFilterPT } from "./PriceRangeFilter.pt";
import { PriceRangeFilterRO } from "./PriceRangeFilter.ro";
import { PropertyTypeFilterEN } from "./PropertyTypeFilter.en";
import { PropertyTypeFilterES } from "./PropertyTypeFilter.es";
import { PropertyTypeFilterPT } from "./PropertyTypeFilter.pt";
import { PropertyTypeFilterRO } from "./PropertyTypeFilter.ro";
import { PropertyStyleFilterEN } from "./PropertyStyleFilter.en";
import { PropertyStyleFilterES } from "./PropertyStyleFilter.es";
import { PropertyStyleFilterPT } from "./PropertyStyleFilter.pt";
import { PropertyStyleFilterRO } from "./PropertyStyleFilter.ro";
import { ActivityFilterEN } from "./ActivityFilter.en";
import { ActivityFilterES } from "./ActivityFilter.es";
import { ActivityFilterPT } from "./ActivityFilter.pt";
import { ActivityFilterRO } from "./ActivityFilter.ro";
import { LocationFilterEN } from "./LocationFilter.en";
import { LocationFilterES } from "./LocationFilter.es";
import { LocationFilterPT } from "./LocationFilter.pt";
import { LocationFilterRO } from "./LocationFilter.ro";
import { CategoryFilterEN } from "./CategoryFilter.en";
import { CategoryFilterES } from "./CategoryFilter.es";
import { CategoryFilterPT } from "./CategoryFilter.pt";
import { CategoryFilterRO } from "./CategoryFilter.ro";
import { useTranslation } from "@/hooks/useTranslation";
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
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  return (
    <div className="bg-fuchsia-950/30 p-4 rounded-lg space-y-4 border border-fuchsia-800/30">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Filters</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onResetAllFilters}
          className="text-fuchsia-300 hover:text-white hover:bg-fuchsia-800/30"
        >
          Clear All
        </Button>
      </div>

      {currentLanguage === 'es' ? (
        <>
          <LengthOfStayFilterES
            activeLength={activeFilters.stayLengths}
            onChange={(value) => handleFilterChange('stayLengths', value)}
          />
          <ThemeFilterES
            activeTheme={activeFilters.theme}
            onChange={(value) => handleFilterChange('theme', value)}
          />
          <CountryFilterES
            activeCountry={activeFilters.country}
            onChange={(value) => handleFilterChange('country', value)}
          />
          <MonthFilterES
            activeMonth={activeFilters.month}
            onChange={(value) => handleFilterChange('month', value)}
          />
          <PriceRangeFilterES
            minPrice={activeFilters.minPrice}
            maxPrice={activeFilters.maxPrice}
            onChange={(min, max) => {
              handleFilterChange('minPrice', min);
              handleFilterChange('maxPrice', max);
            }}
          />
          <PropertyTypeFilterES
            activePropertyType={activeFilters.propertyType}
            onChange={(value) => handleFilterChange('propertyType', value)}
          />
          <PropertyStyleFilterES
            activePropertyStyle={activeFilters.propertyStyle}
            onChange={(value) => handleFilterChange('propertyStyle', value)}
          />
          <ActivityFilterES
            activeActivities={activeFilters.activities || []}
            onChange={(value, isSelected) => handleArrayFilterChange('activities', value, isSelected)}
          />
          <LocationFilterES
            activeLocation={activeFilters.location}
            onChange={(value) => handleFilterChange('location', value)}
          />
          <CategoryFilterES
            activeAtmosphere={activeFilters.atmosphere}
            onChange={(value) => handleFilterChange('atmosphere', value)}
          />
        </>
      ) : currentLanguage === 'pt' ? (
        <>
          <LengthOfStayFilterPT
            activeLength={activeFilters.stayLengths}
            onChange={(value) => handleFilterChange('stayLengths', value)}
          />
          <ThemeFilterPT
            activeTheme={activeFilters.theme}
            onChange={(value) => handleFilterChange('theme', value)}
          />
          <CountryFilterPT
            activeCountry={activeFilters.country}
            onChange={(value) => handleFilterChange('country', value)}
          />
          <MonthFilterPT
            activeMonth={activeFilters.month}
            onChange={(value) => handleFilterChange('month', value)}
          />
          <PriceRangeFilterPT
            minPrice={activeFilters.minPrice}
            maxPrice={activeFilters.maxPrice}
            onChange={(min, max) => {
              handleFilterChange('minPrice', min);
              handleFilterChange('maxPrice', max);
            }}
          />
          <PropertyTypeFilterPT
            activePropertyType={activeFilters.propertyType}
            onChange={(value) => handleFilterChange('propertyType', value)}
          />
          <PropertyStyleFilterPT
            activePropertyStyle={activeFilters.propertyStyle}
            onChange={(value) => handleFilterChange('propertyStyle', value)}
          />
          <ActivityFilterPT
            activeActivities={activeFilters.activities || []}
            onChange={(value, isSelected) => handleArrayFilterChange('activities', value, isSelected)}
          />
          <LocationFilterPT
            activeLocation={activeFilters.location}
            onChange={(value) => handleFilterChange('location', value)}
          />
          <CategoryFilterPT
            activeAtmosphere={activeFilters.atmosphere}
            onChange={(value) => handleFilterChange('atmosphere', value)}
          />
        </>
      ) : currentLanguage === 'ro' ? (
        <>
          <LengthOfStayFilterRO
            activeLength={activeFilters.stayLengths}
            onChange={(value) => handleFilterChange('stayLengths', value)}
          />
          <ThemeFilterRO
            activeTheme={activeFilters.theme}
            onChange={(value) => handleFilterChange('theme', value)}
          />
          <CountryFilterRO
            activeCountry={activeFilters.country}
            onChange={(value) => handleFilterChange('country', value)}
          />
          <MonthFilterRO
            activeMonth={activeFilters.month}
            onChange={(value) => handleFilterChange('month', value)}
          />
          <PriceRangeFilterRO
            minPrice={activeFilters.minPrice}
            maxPrice={activeFilters.maxPrice}
            onChange={(min, max) => {
              handleFilterChange('minPrice', min);
              handleFilterChange('maxPrice', max);
            }}
          />
          <PropertyTypeFilterRO
            activePropertyType={activeFilters.propertyType}
            onChange={(value) => handleFilterChange('propertyType', value)}
          />
          <PropertyStyleFilterRO
            activePropertyStyle={activeFilters.propertyStyle}
            onChange={(value) => handleFilterChange('propertyStyle', value)}
          />
          <ActivityFilterRO
            activeActivities={activeFilters.activities || []}
            onChange={(value, isSelected) => handleArrayFilterChange('activities', value, isSelected)}
          />
          <LocationFilterRO
            activeLocation={activeFilters.location}
            onChange={(value) => handleFilterChange('location', value)}
          />
          <CategoryFilterRO
            activeAtmosphere={activeFilters.atmosphere}
            onChange={(value) => handleFilterChange('atmosphere', value)}
          />
        </>
      ) : (
        <>
          <LengthOfStayFilterEN
            activeLength={activeFilters.stayLengths}
            onChange={(value) => handleFilterChange('stayLengths', value)}
          />
          <ThemeFilterEN
            activeTheme={activeFilters.theme}
            onChange={(value) => handleFilterChange('theme', value)}
          />
          <CountryFilterEN
            activeCountry={activeFilters.country}
            onChange={(value) => handleFilterChange('country', value)}
          />
          <MonthFilterEN
            activeMonth={activeFilters.month}
            onChange={(value) => handleFilterChange('month', value)}
          />
          <PriceRangeFilterEN
            minPrice={activeFilters.minPrice}
            maxPrice={activeFilters.maxPrice}
            onChange={(min, max) => {
              handleFilterChange('minPrice', min);
              handleFilterChange('maxPrice', max);
            }}
          />
          <PropertyTypeFilterEN
            activePropertyType={activeFilters.propertyType}
            onChange={(value) => handleFilterChange('propertyType', value)}
          />
          <PropertyStyleFilterEN
            activePropertyStyle={activeFilters.propertyStyle}
            onChange={(value) => handleFilterChange('propertyStyle', value)}
          />
          <ActivityFilterEN
            activeActivities={activeFilters.activities || []}
            onChange={(value, isSelected) => handleArrayFilterChange('activities', value, isSelected)}
          />
          <LocationFilterEN
            activeLocation={activeFilters.location}
            onChange={(value) => handleFilterChange('location', value)}
          />
          <CategoryFilterEN
            activeAtmosphere={activeFilters.atmosphere}
            onChange={(value) => handleFilterChange('atmosphere', value)}
          />
        </>
      )}
    </div>
  );
}
