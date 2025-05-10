
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import AdminDashboardLayout from "./AdminDashboardLayout";
import { ThemeTable } from "./affinities/ThemeTable";
import { AddThemeDialog } from "./affinities/AddThemeDialog";
import { DeleteConfirmDialog } from "./filters/DeleteConfirmDialog";
import { SearchBar } from "./affinities/SearchBar";
import { useAffinities } from "./affinities/hooks/useAffinities";

export default function EditableAffinitiesPanel() {
  const [newThemeDialogOpen, setNewThemeDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  const {
    themes,
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
  } = useAffinities();

  const openDeleteDialog = (id: string, name: string) => {
    setThemeToDelete({ id, name });
    setDeleteDialogOpen(true);
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

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search affinities by name, category or description..."
        />

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
