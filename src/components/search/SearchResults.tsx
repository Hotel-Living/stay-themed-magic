
import React from 'react';
import { useHotels } from "@/hooks/useHotels";
import { useSearchFilters } from "./context/SearchFiltersContext";
import { SearchContent } from "./SearchContent";

export const SearchResults = React.memo(() => {
  const { 
    filters, 
    pagination, 
    sortOption, 
    handleSortChange, 
    handlePageChange, 
    handleClearFilters 
  } = useSearchFilters();

  // Fetch the hotels using the filters
  const { data: hotels = [], isLoading, error } = useHotels(
    filters, 
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
