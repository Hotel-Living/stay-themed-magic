
import React, { useState } from "react";
import AdminDashboardLayout from "../AdminDashboardLayout";
import { SearchBar } from "./SearchBar";
import { useAffinities } from "./hooks/useAffinities";
import { AffinityHeader } from "./AffinityHeader";
import { AffinityContent } from "./AffinityContent";
import { AffinityDialogs } from "./AffinityDialogs";

export default function AffinitiesPanel() {
  const [newThemeDialogOpen, setNewThemeDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  const {
    themes,
    loading,
    editingTheme,
    newTheme,
    themeToDelete,
    searchTerm,
    pagination,
    setSearchTerm,
    setEditingTheme,
    setNewTheme,
    setThemeToDelete,
    handlePageChange,
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

  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        <AffinityHeader 
          openNewThemeDialog={() => setNewThemeDialogOpen(true)} 
        />

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search affinities by name, category or description..."
        />

        <div className="rounded-xl p-6 bg-[#7a0486]">
          <AffinityContent
            themes={themes}
            editingTheme={editingTheme}
            pagination={pagination}
            handlePageChange={handlePageChange}
            handleEdit={handleEdit}
            handleSaveEdit={handleSaveEdit}
            handleCancelEdit={handleCancelEdit}
            openDeleteDialog={openDeleteDialog}
            setEditingTheme={setEditingTheme}
            loading={loading}
          />
        </div>

        <AffinityDialogs 
          newThemeDialogOpen={newThemeDialogOpen}
          setNewThemeDialogOpen={setNewThemeDialogOpen}
          deleteDialogOpen={deleteDialogOpen}
          setDeleteDialogOpen={setDeleteDialogOpen}
          newTheme={newTheme}
          setNewTheme={setNewTheme}
          handleAddNewTheme={handleAddNewTheme}
          themeToDelete={themeToDelete}
          handleDelete={handleDelete}
        />
      </div>
    </AdminDashboardLayout>
  );
}
