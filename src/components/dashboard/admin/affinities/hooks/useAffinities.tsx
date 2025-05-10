
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Theme, EditingTheme, NewTheme, ThemeToDelete } from "../types";

export function useAffinities() {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTheme, setEditingTheme] = useState<null | EditingTheme>(null);
  const [newTheme, setNewTheme] = useState<NewTheme>({ name: "", description: "", category: "" });
  const [themeToDelete, setThemeToDelete] = useState<null | ThemeToDelete>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  const { toast } = useToast();

  useEffect(() => {
    fetchThemes();
  }, []);

  const fetchThemes = async () => {
    try {
      const { data, error } = await supabase
        .from('themes')
        .select('*');

      if (error) {
        throw error;
      }

      setThemes(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch affinities",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id: string, field: string, value: string) => {
    setEditingTheme({ id, field, value });
  };

  const handleSaveEdit = async () => {
    if (!editingTheme) return;
    
    // Validate empty name
    if (editingTheme.field === 'name' && !editingTheme.value.trim()) {
      toast({
        title: "Invalid input",
        description: "Affinity name cannot be empty",
        variant: "destructive"
      });
      return;
    }
    
    // Validate duplicate name
    if (editingTheme.field === 'name') {
      const isDuplicate = themes.some(theme => 
        theme.id !== editingTheme.id && 
        theme.name.toLowerCase() === editingTheme.value.toLowerCase()
      );
      
      if (isDuplicate) {
        toast({
          title: "Duplicate name",
          description: "An affinity with this name already exists",
          variant: "destructive"
        });
        return;
      }
    }
    
    try {
      const { error } = await supabase
        .from('themes')
        .update({ [editingTheme.field]: editingTheme.value })
        .eq('id', editingTheme.id);
        
      if (error) throw error;
      
      setThemes(prev => prev.map(theme => 
        theme.id === editingTheme.id 
          ? { ...theme, [editingTheme.field]: editingTheme.value } 
          : theme
      ));
      
      toast({
        title: "Success",
        description: "Affinity updated successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update affinity",
        variant: "destructive"
      });
    } finally {
      setEditingTheme(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingTheme(null);
  };

  const handleAddNewTheme = async () => {
    // Validate empty name
    if (!newTheme.name.trim()) {
      toast({
        title: "Invalid input",
        description: "Affinity name cannot be empty",
        variant: "destructive"
      });
      return;
    }
    
    // Validate duplicate name
    const isDuplicate = themes.some(theme => 
      theme.name.toLowerCase() === newTheme.name.toLowerCase()
    );
    
    if (isDuplicate) {
      toast({
        title: "Duplicate name",
        description: "An affinity with this name already exists",
        variant: "destructive"
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

      const { data, error } = await supabase
        .from('themes')
        .insert([themeData])
        .select();
        
      if (error) throw error;
      
      setThemes(prev => [...prev, ...(data || [])]);
      
      toast({
        title: "Success",
        description: "New affinity added successfully"
      });
      
      setNewTheme({ name: "", description: "", category: "" });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add new affinity",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async () => {
    if (!themeToDelete) return;
    
    try {
      const { error } = await supabase
        .from('themes')
        .delete()
        .eq('id', themeToDelete.id);
        
      if (error) throw error;
      
      setThemes(prev => prev.filter(theme => theme.id !== themeToDelete.id));
      
      toast({
        title: "Success",
        description: "Affinity deleted successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete affinity",
        variant: "destructive"
      });
    } finally {
      setThemeToDelete(null);
    }
  };

  const filteredThemes = themes.filter(theme => 
    theme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (theme.description && theme.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (theme.category && theme.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return {
    themes: filteredThemes,
    loading,
    editingTheme,
    newTheme,
    themeToDelete,
    searchTerm,
    setSearchTerm,
    setEditingTheme,
    setNewTheme,
    setThemeToDelete,
    handleEdit,
    handleSaveEdit,
    handleCancelEdit,
    handleAddNewTheme,
    handleDelete
  };
}
