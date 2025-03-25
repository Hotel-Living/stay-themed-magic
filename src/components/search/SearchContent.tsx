
import { SearchResultsList } from "@/components/search/SearchResultsList";
import { SearchHeader } from "@/components/search/SearchHeader";
import { SearchPagination } from "@/components/search/SearchPagination";
import { SearchError } from "@/components/search/SearchError";
import { EmptySearch } from "@/components/search/EmptySearch";
import { SortOption, PaginationOptions } from "@/hooks/useHotels";

interface SearchContentProps {
  hotels: any[];
  isLoading: boolean;
  error: Error | null;
  pagination: PaginationOptions;
  onSortChange: (field: string, direction: 'asc' | 'desc') => void;
  onPageChange: (newPage: number) => void;
  onClearFilters: () => void;
}

export function SearchContent({
  hotels,
  isLoading,
  error,
  pagination,
  onSortChange,
  onPageChange,
  onClearFilters
}: SearchContentProps) {
  return (
    <div className="w-full md:w-2/3 lg:w-3/4">
      {/* Sorting controls */}
      <SearchHeader 
        isLoading={isLoading} 
        totalHotels={hotels.length}
        onSortChange={onSortChange} 
      />
      
      {/* Results list */}
      <SearchResultsList filteredHotels={hotels} isLoading={isLoading} />
      
      {/* Pagination */}
      {!isLoading && hotels.length > 0 && (
        <SearchPagination 
          page={pagination.page}
          hasMore={hotels.length >= pagination.limit}
          onPageChange={onPageChange}
        />
      )}
      
      {/* Error state */}
      {error && (
        <SearchError onRefresh={() => window.location.reload()} />
      )}
      
      {/* Empty state */}
      {!isLoading && hotels.length === 0 && !error && (
        <EmptySearch onClearFilters={onClearFilters} />
      )}
    </div>
  );
}
