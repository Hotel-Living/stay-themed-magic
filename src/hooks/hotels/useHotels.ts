
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchHotels, fetchHotelById } from "./fetchHotels";
import type { FilterState } from "@/components/filters/FilterTypes";
import { PaginationOptions, SortOption } from "./types";
import { useCallback, useMemo } from "react";
import { adaptHotelData } from "./hotelAdapter";

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
  
  // Memoize the onSuccess callback
  const onSuccessCallback = useCallback((hotels: any[]) => {
    // Use requestIdleCallback for non-critical prefetching when browser is idle
    if (window.requestIdleCallback) {
      const idleCallbackId = window.requestIdleCallback(() => {
        hotels.forEach(hotel => {
          prefetchHotelDetails(hotel.id);
        });
      });
      
      // Return cleanup function to cancel idle callback if component unmounts
      return () => window.cancelIdleCallback(idleCallbackId);
    } else {
      // Fallback for browsers that don't support requestIdleCallback
      const timeoutId = setTimeout(() => {
        hotels.forEach(hotel => {
          prefetchHotelDetails(hotel.id);
        });
      }, 200);
      
      // Return cleanup function to cancel timeout if component unmounts
      return () => clearTimeout(timeoutId);
    }
  }, [prefetchHotelDetails]);
  
  return useQuery({
    queryKey,
    queryFn: async () => {
      const data = await fetchHotels(filters, sortOption, pagination);
      return adaptHotelData(data);
    },
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes - data won't refetch for 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes - keep in cache for 30 minutes (renamed from cacheTime)
    meta: {
      onSuccess: onSuccessCallback
    }
  });
}

// Re-export fetchHotelById for direct use
export { fetchHotelById };
