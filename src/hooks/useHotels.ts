
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { FilterState } from "@/components/FilterSection";
import { useCallback, useMemo } from "react";

// Types for pagination and sorting
export type SortOption = {
  field: string;
  direction: 'asc' | 'desc';
};

export type PaginationOptions = {
  page: number;
  limit: number;
};

// Memoized function to create filter parameters for Supabase queries
const createFilterParams = (filters: FilterState) => {
  const params: Record<string, any> = {};
  
  if (filters.country) {
    params.country = filters.country;
  }
  
  // Add more filters as needed
  
  return params;
};

// Function to fetch hotels with filters, pagination and sorting
export const fetchHotels = async (
  filters: FilterState,
  pagination?: PaginationOptions,
  sortOption?: SortOption
) => {
  // Create a base query
  let query = supabase
    .from('hotels')
    .select(`
      *,
      hotel_images(image_url, is_main),
      hotel_themes(theme_id, themes:themes(id, name))
    `);
  
  // Get filter parameters and apply them efficiently
  const filterParams = createFilterParams(filters);
  
  // Apply each filter parameter to the query
  Object.entries(filterParams).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      query = query.eq(key, value);
    }
  });
  
  // Apply sorting if provided
  if (sortOption) {
    query = query.order(sortOption.field, { ascending: sortOption.direction === 'asc' });
  } else {
    // Default sorting by price
    query = query.order('price_per_month', { ascending: true });
  }
  
  // Apply pagination if provided
  if (pagination) {
    const { page, limit } = pagination;
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);
  }
  
  const { data, error } = await query;
  
  if (error) {
    throw error;
  }
  
  return data || [];
};

// Hook to get hotels with filters, pagination and sorting
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
    cacheTime: 30 * 60 * 1000, // 30 minutes - keep in cache for 30 minutes
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
  });
}

// Helper function to fetch a single hotel by ID (for prefetching)
const fetchHotelById = async (id: string) => {
  const { data, error } = await supabase
    .from('hotels')
    .select(`
      *,
      hotel_images(image_url, is_main),
      hotel_themes(theme_id, themes:themes(id, name))
    `)
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};
