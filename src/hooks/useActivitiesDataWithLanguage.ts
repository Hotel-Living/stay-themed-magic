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
      console.log(`🎯 Fetching activities for language: ${language}`);
      
      // Spanish activities are stored in filters table, English in activities table
      if (language === 'es') {
        const { data, error } = await supabase
          .from('filters')
          .select('id, value, category')
          .eq('category', 'activities')
          .eq('is_active', true)
          .order('value');

        if (error) {
          console.error(`❌ Error fetching Spanish activities:`, error);
          throw error;
        }

        if (!data) {
          console.log(`✅ No Spanish activities found`);
          return [];
        }

        // Transform filters data to ActivityOption format
        const activities = data.map(filter => ({
          id: filter.id,
          name: filter.value,
          category: 'activities',
          level: 1
        }));

        console.log(`✅ Found ${activities.length} Spanish activities:`, activities);
        return activities;
      } else {
        // For English and other languages, use activities table
        const { data, error } = await supabase
          .from('activities')
          .select('id, name, category, level')
          .order('name');

        if (error) {
          console.error(`❌ Error fetching English activities:`, error);
          throw error;
        }

        if (!data) {
          console.log(`✅ No English activities found`);
          return [];
        }

        console.log(`✅ Found ${data.length} English activities:`, data);
        return data;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}