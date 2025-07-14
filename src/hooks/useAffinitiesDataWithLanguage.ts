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
          let translatedName = item.value;
          
          // Apply translations for non-Spanish languages
          if (language !== 'es') {
            try {
              // Try to get translation from affinities.json
              translatedName = t(`affinities.${item.value}`, { ns: 'affinities' }) || item.value;
            } catch (err) {
              console.warn(`🎯 Translation not found for: ${item.value}`);
              translatedName = item.value; // Fallback to original
            }
          }
          
          return {
            id: item.id,
            name: translatedName,
            category: item.category
          };
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