
import React from 'react';
import { SearchHeader } from './SearchHeader';
import { SearchResultsList } from './SearchResultsList';
import { SearchError } from './SearchError';
import { EmptySearch } from './EmptySearch';
import { SearchPagination } from './SearchPagination';
import type { HotelDetailProps } from '@/types/hotel';

interface SearchContentProps {
  hotels: HotelDetailProps[];
  isLoading: boolean;
  error: Error | null;
  pagination: { page: number; limit: number };
  onSortChange: (option: string) => void;
  onPageChange: (page: number) => void;
  onClearFilters: () => void;
  activeFilters?: Record<string, any>;
}

export function SearchContent({
  hotels,
  isLoading,
  error,
  pagination,
  onSortChange,
  onPageChange,
  onClearFilters,
  activeFilters
}: SearchContentProps) {
  // Count active advanced filters
  const countAdvancedFilters = () => {
    if (!activeFilters) return 0;
    
    let count = 0;
    if (activeFilters.amenities?.length) count++;
    if (activeFilters.distance) count++;
    if (activeFilters.rating) count++;
    if (activeFilters.roomTypes?.length) count++;
    if (activeFilters.hotelFeatures?.length) count++;
    if (activeFilters.roomFeatures?.length) count++;
    if (activeFilters.meals?.length) count++;
    if (activeFilters.activities?.length) count++;
    
    return count;
  };
  
  const advancedFilterCount = countAdvancedFilters();
  
  if (error) {
    return <SearchError message={error.message} onClearFilters={onClearFilters} />;
  }

  return (
    <div className="flex-1">
      <SearchHeader 
        count={hotels.length} 
        isLoading={isLoading}
        onSortChange={onSortChange} 
      />
      
      {advancedFilterCount > 0 && (
        <div className="mb-4 p-3 bg-fuchsia-900/30 rounded-lg text-sm">
          <p className="text-fuchsia-200">
            <span className="font-semibold">{advancedFilterCount} advanced filter{advancedFilterCount !== 1 ? 's' : ''}</span> applied, 
            refining your search results to match your specific preferences.
          </p>
        </div>
      )}
      
      {!isLoading && hotels.length === 0 ? (
        <EmptySearch onClearFilters={onClearFilters} />
      ) : (
        <>
          <SearchResultsList items={hotels} isLoading={isLoading} />
          
          {!isLoading && hotels.length > 0 && (
            <div className="mt-6">
              <SearchPagination 
                page={pagination.page} 
                total={50} // This would ideally come from an API
                pageSize={pagination.limit}
                onChange={onPageChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
