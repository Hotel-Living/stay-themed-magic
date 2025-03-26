
import React from 'react';
import { useHotels } from "@/hooks/useHotels";
import { useSearchFilters } from "./context/SearchFiltersContext";
import { SearchContent } from "./SearchContent";
import { CountryType, MonthType } from "@/components/filters/FilterTypes";

export const SearchResults = React.memo(() => {
  const { 
    filters, 
    pagination, 
    sortOption, 
    handleSortChange, 
    handlePageChange, 
    handleClearFilters 
  } = useSearchFilters();

  // Create a type-compatible filter object for the useHotels hook
  const searchFilters = {
    country: filters.country as CountryType,
    month: filters.month as MonthType,
    theme: filters.theme ? filters.theme.id : null,
    priceRange: filters.priceRange ? (Array.isArray(filters.priceRange) ? filters.priceRange[0] : filters.priceRange) : null
  };

  // Fetch the hotels using the filters
  const { data: hotels = [], isLoading, error } = useHotels(
    searchFilters, 
    true, 
    pagination, 
    sortOption ? { field: sortOption, direction: 'asc' } : undefined
  );
  
  return (
    <SearchContent 
      hotels={hotels}
      isLoading={isLoading}
      error={error}
      pagination={pagination}
      onSortChange={handleSortChange}
      onPageChange={handlePageChange}
      onClearFilters={handleClearFilters}
      activeFilters={filters}
    />
  );
});

SearchResults.displayName = 'SearchResults';
