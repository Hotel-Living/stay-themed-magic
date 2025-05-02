
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Theme } from "@/utils/theme-types";

// Function to get all themes from the database
const fetchThemesFromDB = async (): Promise<Theme[]> => {
  const { data, error } = await supabase
    .from('themes')
    .select('*')
    .order('name');

  if (error) {
    console.error("Error fetching themes:", error);
    throw error;
  }

  // Transform database themes to match the Theme interface
  return data.map(theme => ({
    id: theme.id,
    name: theme.name,
    category: theme.category || "",
    description: theme.description
  }));
};

// Custom hook to fetch themes
export const useThemes = () => {
  return useQuery({
    queryKey: ['themes'],
    queryFn: fetchThemesFromDB,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    refetchOnWindowFocus: false,
  });
};
