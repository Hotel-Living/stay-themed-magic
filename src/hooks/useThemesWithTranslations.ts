
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "@/hooks/useTranslation";
import { Theme } from "@/utils/theme-types";

// Function to get all themes with translations from the database
const fetchThemesWithTranslations = async (locale: string): Promise<Theme[]> => {
  const { data, error } = await supabase
    .from('themes')
    .select(`
      id, 
      name, 
      description, 
      category, 
      level, 
      parent_id, 
      sort_order,
      theme_translations!inner(
        name,
        description,
        locale
      )
    `)
    .eq('theme_translations.locale', locale)
    .order('level', { ascending: true })
    .order('sort_order', { ascending: true })
    .order('name', { ascending: true });

  if (error) {
    console.error("Error fetching themes with translations:", error);
    
    // Fallback to English themes if translations fail
    const { data: fallbackData, error: fallbackError } = await supabase
      .from('themes')
      .select('id, name, description, category, level, parent_id, sort_order')
      .order('level', { ascending: true })
      .order('sort_order', { ascending: true })
      .order('name', { ascending: true });
    
    if (fallbackError) {
      throw fallbackError;
    }
    
    return fallbackData?.map(theme => ({
      ...theme,
      level: (theme.level as 1 | 2 | 3) || 1
    })) || [];
  }

  // Transform data to use translated names
  return data?.map(theme => ({
    id: theme.id,
    name: theme.theme_translations?.[0]?.name || theme.name,
    description: theme.theme_translations?.[0]?.description || theme.description || "",
    category: theme.category || "GENERAL",
    level: (theme.level as 1 | 2 | 3) || 1,
    parent_id: theme.parent_id,
    sort_order: theme.sort_order
  })) || [];
};

// Custom hook to fetch themes with translations
export const useThemesWithTranslations = () => {
  const { language } = useTranslation();
  
  return useQuery({
    queryKey: ['themes-with-translations', language],
    queryFn: () => fetchThemesWithTranslations(language),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    refetchOnWindowFocus: false,
  });
};
