
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { FilterState } from "@/components/FilterSection";

// Function to fetch hotels with filters
export const fetchHotels = async (filters: FilterState) => {
  let query = supabase
    .from('hotels')
    .select(`
      *,
      hotel_images(image_url, is_main),
      hotel_themes(theme_id, themes:themes(id, name))
    `);
  
  // Apply filters efficiently
  if (filters.country) {
    query = query.eq('country', filters.country);
  }
  
  // Add more filters as needed

  const { data, error } = await query;
  
  if (error) {
    throw error;
  }
  
  return data || [];
};

// Hook to get hotels with filters
export function useHotels(filters: FilterState, enabled = true) {
  const queryClient = useQueryClient();
  
  // Create a stable filter key by stringifying the filters
  const filterKey = JSON.stringify(filters);
  
  return useQuery({
    queryKey: ['hotels', filterKey],
    queryFn: () => fetchHotels(filters),
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes - data won't refetch for 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes - keep in cache for 30 minutes
    onSuccess: (hotels) => {
      // Prefetch individual hotel details when hotel list is loaded
      hotels.forEach(hotel => {
        queryClient.prefetchQuery({
          queryKey: ['hotel', hotel.id],
          queryFn: () => fetchHotelById(hotel.id),
          staleTime: 5 * 60 * 1000 // 5 minutes
        });
      });
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
