import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "./useTranslation";

interface AffinityOption {
  id: string;
  name: string;
  category?: string;
}

export function useAffinitiesDataWithLanguage(): ReturnType<typeof useQuery> {
  const { language, t } = useTranslation();
  
  return useQuery({
    queryKey: ['affinities-with-language', language],
    queryFn: async (): Promise<AffinityOption[]> => {
      console.log(`🎯 Fetching affinities for language: ${language}`);
      
      try {
        // Always use the filters table as the single source of truth
        console.log(`🎯 Using filters table for all languages`);
        const { data, error } = await supabase
          .from('filters')
          .select('id, value, category')
          .eq('category', 'affinities')
          .eq('is_active', true)
          .order('value');

        if (error) {
          console.error('🎯 Error fetching from filters:', error);
          throw error;
        }

        console.log(`🎯 Affinities data:`, data);
        
        // Transform data with translations
        return data?.map(item => {
          try {
            // Use the translation system with affinities namespace
            const translatedName = t(item.value, { ns: 'affinities' });
            
            return {
              id: item.id,
              name: translatedName,
              category: item.category
            };
          } catch (err) {
            console.warn(`🎯 Translation error for: ${item.value}`, err);
            return {
              id: item.id,
              name: item.value, // Fallback to original
              category: item.category
            };
          }
        }) || [];
      } catch (error) {
        console.error('🎯 Error in useAffinitiesDataWithLanguage:', error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}