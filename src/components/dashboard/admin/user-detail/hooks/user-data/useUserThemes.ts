
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useUserThemes = (id: string | undefined) => {
  const [themes, setThemes] = useState<any[]>([]);
  const [userPreferences, setUserPreferences] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserThemes = async () => {
      if (!id) return;
      
      try {
        // Fetch user preferences with themes
        const { data: prefsData, error: prefsError } = await supabase
          .from("user_preferences")
          .select("favorite_themes")
          .eq("user_id", id)
          .single();
        
        if (prefsError && prefsError.code !== 'PGRST116') { // PGRST116 is "no rows returned" error
          throw prefsError;
        }
        
        // Set preferences even if empty, for UI display
        setUserPreferences(prefsData || { favorite_themes: [] });

        if (prefsData && prefsData.favorite_themes && prefsData.favorite_themes.length > 0) {
          // Fetch theme names based on IDs
          const { data: themesData, error: themesError } = await supabase
            .from("themes")
            .select("id, name")
            .in("id", prefsData.favorite_themes);

          if (themesError) throw themesError;
          setThemes(themesData || []);
        }
      } catch (error: any) {
        console.error("Error fetching user themes:", error);
        toast({
          title: "Error",
          description: error.message || "Failed to fetch user themes",
          variant: "destructive"
        });
      }
    };

    fetchUserThemes();
  }, [id, toast]);

  return { themes, userPreferences };
};
