
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Edit, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import AdminDashboardLayout from "./AdminDashboardLayout";
import { useFilters, FilterItem } from "@/hooks/filters";
import { Skeleton } from "@/components/ui/skeleton";

export default function EditableFiltersPanel() {
  const [activeTab, setActiveTab] = useState("countries");
  const [editingItem, setEditingItem] = useState<{ id: string, value: string } | null>(null);
  const [newItemDialogOpen, setNewItemDialogOpen] = useState(false);
  const [newItemValue, setNewItemValue] = useState("");
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  
  const { 
    filters, 
    loading, 
    addFilter, 
    updateFilter, 
    deleteFilter 
  } = useFilters();

  const handleSaveEdit = async () => {
    if (!editingItem) return;
    
    const success = await updateFilter(activeTab, editingItem.id, editingItem.value);
    if (success) {
      setEditingItem(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  const handleStartEdit = (id: string, value: string) => {
    setEditingItem({ id, value });
  };

  const handleAddNew = async () => {
    if (!newItemValue.trim()) return;
    
    const success = await addFilter(activeTab, newItemValue);
    if (success) {
      setNewItemValue("");
      setNewItemDialogOpen(false);
    }
  };

  const confirmDelete = (id: string) => {
    setItemToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;
    
    const success = await deleteFilter(activeTab, itemToDelete);
    if (success) {
      setDeleteConfirmOpen(false);
      setItemToDelete(null);
    }
  };

  const renderFilterItems = (category: string) => {
    if (loading) {
      return Array(6).fill(0).map((_, index) => (
        <div key={`skeleton-${index}`} className="flex items-center gap-2 p-3 border rounded-lg justify-between">
          <Skeleton className="h-6 w-40" />
          <div className="flex gap-1">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
      ));
    }

    const categoryItems = filters[category] || [];
    
    return categoryItems.map((item: FilterItem) => {
      const isEditing = editingItem?.id === item.id;
      
      return (
        <div key={item.id} className="flex items-center gap-2 p-3 border rounded-lg justify-between">
          {isEditing ? (
            <Input 
              value={editingItem.value}
              onChange={(e) => setEditingItem({ ...editingItem, value: e.target.value })}
              className="flex-grow"
            />
          ) : (
            <span>{item.value}</span>
          )}
          <div className="flex gap-1">
            {isEditing ? (
              <>
                <Button onClick={handleSaveEdit} size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <Check className="h-4 w-4" />
                </Button>
                <Button onClick={handleCancelEdit} size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <X className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => handleStartEdit(item.id, item.value)} size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button onClick={() => confirmDelete(item.id)} size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-500">
                  <X className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      );
    });
  };

  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Filter Management</h2>
        </div>

        <div className="glass-card rounded-xl p-6 bg-white/5 backdrop-blur-sm">
          <Tabs defaultValue="countries" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="countries">Countries</TabsTrigger>
                <TabsTrigger value="months">Months</TabsTrigger>
                <TabsTrigger value="price">Price Ranges</TabsTrigger>
                <TabsTrigger value="stars">Star Ratings</TabsTrigger>
                <TabsTrigger value="property">Property Types</TabsTrigger>
              </TabsList>
              <Button onClick={() => setNewItemDialogOpen(true)}>Add New</Button>
            </div>
            
            <TabsContent value="countries" className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {renderFilterItems("countries")}
              </div>
            </TabsContent>
            
            <TabsContent value="months" className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {renderFilterItems("months")}
              </div>
            </TabsContent>
            
            <TabsContent value="price" className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {renderFilterItems("price")}
              </div>
            </TabsContent>
            
            <TabsContent value="stars" className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {renderFilterItems("stars")}
              </div>
            </TabsContent>
            
            <TabsContent value="property" className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderFilterItems("property")}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Add New Item Dialog */}
        <Dialog open={newItemDialogOpen} onOpenChange={setNewItemDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New {activeTab.charAt(0).toUpperCase() + activeTab.slice(1, -1)}</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <Input
                value={newItemValue}
                onChange={(e) => setNewItemValue(e.target.value)}
                placeholder={`Enter new ${activeTab.slice(0, -1)}...`}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setNewItemDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddNew}>
                Add
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              Are you sure you want to delete this item? This action cannot be undone.
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteConfirmOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminDashboardLayout>
  );
}
