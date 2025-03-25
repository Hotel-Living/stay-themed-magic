
import { useQuery } from "@tanstack/react-query";
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
  
  // Apply filters
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
  return useQuery({
    queryKey: ['hotels', filters],
    queryFn: () => fetchHotels(filters),
    enabled
  });
}
