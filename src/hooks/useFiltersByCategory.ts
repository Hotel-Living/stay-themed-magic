import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface FilterOption {
  id: string;
  value: string;
  category: string;
  source_type: string;
  is_active: boolean;
}

export function useFiltersByCategory(category: string) {
  return useQuery({
    queryKey: ['filters', category],
    queryFn: async (): Promise<FilterOption[]> => {
      console.log(`🔍 Fetching filters for category: ${category}`);
      
      const { data, error } = await supabase
        .from('filters')
        .select('id, value, category, source_type, is_active')
        .eq('category', category)
        .eq('is_active', true)
        .order('value');

      if (error) {
        console.error(`❌ Error fetching filters for category ${category}:`, error);
        throw error;
      }

      console.log(`✅ Found ${data?.length || 0} filters for category ${category}:`, data);
      return data || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}