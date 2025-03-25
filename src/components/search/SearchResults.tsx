
import { useHotels } from "@/hooks/useHotels";
import { useSearchFilters } from "./context/SearchFiltersContext";
import { SearchContent } from "./SearchContent";

export function SearchResults() {
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
    />
  );
}
