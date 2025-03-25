
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchHotels, fetchHotelById } from "./fetchHotels";
import type { FilterState } from "@/components/filters/FilterTypes";
import { PaginationOptions, SortOption } from "./types";
import { useCallback, useMemo } from "react";

/**
 * Hook to get hotels with filters, pagination and sorting
 */
export function useHotels(
  filters: FilterState, 
  enabled = true,
  pagination?: PaginationOptions,
  sortOption?: SortOption
) {
  const queryClient = useQueryClient();
  
  // Create a stable filter key by stringifying the filters and pagination options
  const queryKey = useMemo(() => {
    return [
      'hotels',
      JSON.stringify(filters),
      pagination ? `page:${pagination.page},limit:${pagination.limit}` : 'all',
      sortOption ? `sort:${sortOption.field},${sortOption.direction}` : 'default'
    ];
  }, [filters, pagination, sortOption]);
  
  // Memoize the prefetch function to avoid recreating it on each render
  const prefetchHotelDetails = useCallback((hotelId: string) => {
    queryClient.prefetchQuery({
      queryKey: ['hotel', hotelId],
      queryFn: () => fetchHotelById(hotelId),
      staleTime: 5 * 60 * 1000 // 5 minutes
    });
  }, [queryClient]);
  
  return useQuery({
    queryKey,
    queryFn: () => fetchHotels(filters, pagination, sortOption),
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes - data won't refetch for 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes - keep in cache for 30 minutes (renamed from cacheTime)
    meta: {
      onSuccess: (hotels) => {
        // Prefetch individual hotel details when hotel list is loaded
        // Use window.requestIdleCallback or setTimeout to defer non-critical prefetching
        if (window.requestIdleCallback) {
          window.requestIdleCallback(() => {
            hotels.forEach(hotel => {
              prefetchHotelDetails(hotel.id);
            });
          });
        } else {
          // Fallback for browsers that don't support requestIdleCallback
          setTimeout(() => {
            hotels.forEach(hotel => {
              prefetchHotelDetails(hotel.id);
            });
          }, 200);
        }
      }
    }
  });
}

// Re-export fetchHotelById for direct use
export { fetchHotelById };
