import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "@/hooks/useTranslation";

interface ActivityOption {
  id: string;
  name: string;
  category?: string;
}

export function useActivitiesDataWithLanguage() {
  const { language, t } = useTranslation();
  
  return useQuery({
    queryKey: ['activities-with-language', language],
    queryFn: async (): Promise<ActivityOption[]> => {
      console.log(`🎯 Fetching activities for language: ${language}`);
      
      try {
        // Always use the filters table as the single source of truth
        console.log(`🎯 Using filters table for all languages`);
        const { data, error } = await supabase
          .from('filters')
          .select('id, value, category')
          .eq('category', 'activities')
          .eq('is_active', true)
          .order('value');

        if (error) {
          console.error('🎯 Error fetching from filters:', error);
          throw error;
        }

        console.log(`🎯 Filters data:`, data);
        
        // Transform data with translations
        return data?.map(item => {
          let translatedName = item.value;
          
          // Apply translations for non-Spanish languages
          if (language !== 'es') {
            try {
              // Try to get translation from activities.json using the Spanish value as key
              translatedName = t(item.value, { ns: 'activities' }) || item.value;
              // If translation returns the same key, use the original value
              if (translatedName === item.value || translatedName.startsWith('activities.')) {
                translatedName = item.value;
              }
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
        console.error('🎯 Error in useActivitiesDataWithLanguage:', error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}