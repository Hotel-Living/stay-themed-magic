import React from "react";
import { CountryFilter } from "@/components/search/CountryFilter";
import { MonthFilter } from "@/components/search/MonthFilter";
import { ThemeFilter } from "@/components/search/ThemeFilter";
import { PriceRangeFilter } from "@/components/search/PriceRangeFilter";
import { FilterState } from "@/components/filters/FilterTypes";
interface IndexPageFiltersProps {
  activeFilters: FilterState;
  onFilterChange: (key: keyof FilterState, value: any) => void;
}
export function IndexPageFilters({
  activeFilters,
  onFilterChange
}: IndexPageFiltersProps) {
  // Helper function to get price value as number for PriceRangeFilter
  const getPriceValue = (): number | null => {
    if (typeof activeFilters.priceRange === 'number') {
      return activeFilters.priceRange;
    }
    return null;
  };
  return <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 py-0 my-[8px] px-[8px]">
      {/* COUNTRY */}
      <div className="min-w-0">
        <CountryFilter activeCountry={activeFilters.country} onChange={value => onFilterChange('country', value)} />
      </div>

      {/* MONTH */}
      <div className="min-w-0">
        <MonthFilter activeMonth={activeFilters.month} onChange={value => onFilterChange('month', value)} />
      </div>

      {/* AFFINITIES */}
      <div className="min-w-0">
        <ThemeFilter activeTheme={activeFilters.theme} onChange={value => onFilterChange('theme', value)} />
      </div>

      {/* PRICE PER MONTH */}
      <div className="min-w-0">
        <PriceRangeFilter activePrice={getPriceValue()} onChange={value => onFilterChange('priceRange', value)} />
      </div>
    </div>;
}