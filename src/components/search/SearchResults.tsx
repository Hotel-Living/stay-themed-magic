
import React from 'react';
import { useHotels } from "@/hooks/useHotels";
import { useSearchFilters } from "./context/SearchFiltersContext";
import { SearchContent } from "./SearchContent";
import type { Theme } from "@/integrations/supabase/types-custom";

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
    country: filters.country,
    month: filters.month,
    theme: filters.theme ? { id: filters.theme } as Theme : null,
    priceRange: filters.priceRange
  };

  // Fetch the hotels using the filters
  const { data: hotels = [], isLoading, error } = useHotels(
    searchFilters, 
    true, 
    pagination, 
    sortOption
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
