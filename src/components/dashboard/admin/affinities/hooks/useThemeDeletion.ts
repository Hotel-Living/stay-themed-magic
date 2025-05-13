
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ThemeToDelete } from "../types";

export function useThemeDeletion(fetchThemes: () => Promise<{count: number}>) {
  const [themeToDelete, setThemeToDelete] = useState<null | ThemeToDelete>(null);
  const { toast } = useToast();

  const handleDelete = async () => {
    if (!themeToDelete) return;
    
    try {
      const { error } = await supabase
        .from('themes')
        .delete()
        .eq('id', themeToDelete.id);
        
      if (error) throw error;
      
      // Refresh themes after deletion
      await fetchThemes();
      
      toast.success("Affinity deleted successfully");
    } catch (error: any) {
      toast.error("Failed to delete affinity", {
        description: error.message || "An unexpected error occurred"
      });
    } finally {
      setThemeToDelete(null);
    }
  };

  return {
    themeToDelete,
    setThemeToDelete,
    handleDelete
  };
}
