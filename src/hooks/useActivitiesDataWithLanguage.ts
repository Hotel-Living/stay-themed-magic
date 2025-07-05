import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "@/hooks/useTranslation";

interface ActivityOption {
  id: string;
  name: string;
  category?: string;
  level?: number;
}

export function useActivitiesDataWithLanguage() {
  const { language } = useTranslation();
  
  return useQuery({
    queryKey: ['activities', language],
    queryFn: async (): Promise<ActivityOption[]> => {
      console.log(`🎯 Fetching activities from database for language: ${language}`);
      
      const { data, error } = await supabase
        .from('activities')
        .select('id, name, category, level')
        .order('name');

      if (error) {
        console.error(`❌ Error fetching activities:`, error);
        throw error;
      }

      if (!data) {
        console.log(`✅ No activities found`);
        return [];
      }

      // Return all activities since there's no proper translation system yet
      // TODO: Implement proper activity translations similar to themes
      console.log(`✅ Found ${data.length} activities (language-agnostic until translations added):`, data);
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}