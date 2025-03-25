
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Function to fetch themes
export const fetchThemes = async () => {
  const { data, error } = await supabase
    .from('themes')
    .select('*');
  
  if (error) {
    throw error;
  }
  
  return data || [];
};

// Hook to get themes
export function useThemes() {
  return useQuery({
    queryKey: ['themes'],
    queryFn: fetchThemes
  });
}
