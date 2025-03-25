
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Function to fetch a specific hotel by ID
export const fetchHotelById = async (id: string) => {
  if (!id) return null;
  
  const { data, error } = await supabase
    .from('hotels')
    .select(`
      *,
      hotel_images(image_url, is_main),
      hotel_themes(theme_id, themes:themes(id, name))
    `)
    .eq('id', id)
    .single();
  
  if (error) {
    throw error;
  }
  
  return data;
};

// Hook to get a specific hotel by ID
export function useHotelDetail(id: string | undefined, enabled = true) {
  return useQuery({
    queryKey: ['hotel', id],
    queryFn: () => id ? fetchHotelById(id) : null,
    enabled: !!id && enabled
  });
}
