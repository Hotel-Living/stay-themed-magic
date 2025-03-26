
import React from 'react';
import { useHotels } from "@/hooks/useHotels";
import { useSearchFilters } from "./context/SearchFiltersContext";
import { SearchContent } from "./SearchContent";
import type { Theme } from "@/integrations/supabase/types-custom";
import type { CountryType, MonthType } from "@/components/filters/FilterTypes";

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
    theme: filters.theme ? { id: filters.theme } as Theme : null,
    priceRange: filters.priceRange
  };

  // Fetch the hotels using the filters
  const { data: hotelsData = [], isLoading, error } = useHotels(
    searchFilters, 
    true, 
    pagination, 
    sortOption ? { field: sortOption, direction: 'asc' } : undefined
  );
  
  // Transform the data to match the HotelDetailProps type
  const hotels = React.useMemo(() => {
    return hotelsData.map(hotel => ({
      id: hotel.id,
      name: hotel.name,
      description: hotel.description,
      city: hotel.city,
      country: hotel.country,
      price_per_month: hotel.price_per_month,
      main_image_url: hotel.main_image_url,
      category: hotel.category,
      hotel_images: hotel.hotel_images.map(img => ({
        id: img.id || '',
        hotel_id: hotel.id,
        image_url: img.image_url,
        is_main: img.is_main,
        created_at: img.created_at || new Date().toISOString()
      })),
      hotel_themes: hotel.hotel_themes || []
    }));
  }, [hotelsData]);
  
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
