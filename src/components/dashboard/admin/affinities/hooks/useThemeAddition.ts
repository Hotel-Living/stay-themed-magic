
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Theme, NewTheme } from "../types";

export function useThemeAddition(themes: Theme[], fetchThemes: () => Promise<{count: number}>) {
  const [newTheme, setNewTheme] = useState<NewTheme>({ name: "", description: "", category: "" });
  const { toast } = useToast();

  const handleAddNewTheme = async () => {
    // Validate empty name
    if (!newTheme.name.trim()) {
      toast.error("Invalid input", {
        description: "Affinity name cannot be empty"
      });
      return;
    }
    
    // Validate duplicate name
    const isDuplicate = themes.some(theme => 
      theme.name.toLowerCase() === newTheme.name.toLowerCase()
    );
    
    if (isDuplicate) {
      toast.error("Duplicate name", {
        description: "An affinity with this name already exists"
      });
      return;
    }
    
    try {
      // Prepare the data - omit empty category
      const themeData = {
        name: newTheme.name,
        description: newTheme.description,
        ...(newTheme.category ? { category: newTheme.category } : {})
      };

      const { error } = await supabase
        .from('themes')
        .insert([themeData]);
        
      if (error) throw error;
      
      // Refresh the themes list
      await fetchThemes();
      
      toast.success("New affinity added successfully");
      
      setNewTheme({ name: "", description: "", category: "" });
    } catch (error: any) {
      toast.error("Failed to add new affinity", {
        description: error.message || "An unexpected error occurred"
      });
    }
  };

  return {
    newTheme,
    setNewTheme,
    handleAddNewTheme
  };
}
