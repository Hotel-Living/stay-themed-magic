
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import AdminDashboardLayout from "./AdminDashboardLayout";
import { ThemeTable } from "./affinities/ThemeTable";
import { AddThemeDialog } from "./affinities/AddThemeDialog";
import { DeleteConfirmDialog } from "./filters/DeleteConfirmDialog";

export default function EditableAffinitiesPanel() {
  const [themes, setThemes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTheme, setEditingTheme] = useState<null | { id: string, field: string, value: string }>(null);
  const [newThemeDialogOpen, setNewThemeDialogOpen] = useState(false);
  const [newTheme, setNewTheme] = useState({ name: "", description: "" });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [themeToDelete, setThemeToDelete] = useState<null | { id: string, name: string }>(null);
  
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
    try {
      const { data, error } = await supabase
        .from('themes')
        .insert([{ 
          name: newTheme.name,
          description: newTheme.description
        }])
        .select();
        
      if (error) throw error;
      
      setThemes(prev => [...prev, ...(data || [])]);
      
      toast({
        title: "Success",
        description: "New affinity added successfully"
      });
      
      setNewTheme({ name: "", description: "" });
      setNewThemeDialogOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add new affinity",
        variant: "destructive"
      });
    }
  };

  const openDeleteDialog = (id: string, name: string) => {
    setThemeToDelete({ id, name });
    setDeleteDialogOpen(true);
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
      setDeleteDialogOpen(false);
    }
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  if (loading) {
    return (
      <AdminDashboardLayout>
        <div className="p-4">Loading affinities...</div>
      </AdminDashboardLayout>
    );
  }

  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Affinities Management</h2>
          <Button onClick={() => setNewThemeDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" /> Add New Affinity
          </Button>
        </div>

        <div className="glass-card rounded-xl p-6 bg-white/5 backdrop-blur-sm">
          <ThemeTable 
            themes={themes}
            editingTheme={editingTheme}
            handleEdit={handleEdit}
            handleSaveEdit={handleSaveEdit}
            handleCancelEdit={handleCancelEdit}
            openDeleteDialog={openDeleteDialog}
            setEditingTheme={setEditingTheme}
          />
        </div>

        {/* Add New Theme Dialog */}
        <Dialog open={newThemeDialogOpen} onOpenChange={setNewThemeDialogOpen}>
          <AddThemeDialog 
            newTheme={newTheme}
            setNewTheme={setNewTheme}
            handleAddNewTheme={handleAddNewTheme}
            closeDialog={() => setNewThemeDialogOpen(false)}
          />
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DeleteConfirmDialog
            handleDelete={handleDelete}
            closeDialog={closeDeleteDialog}
          />
        </Dialog>
      </div>
    </AdminDashboardLayout>
  );
}
