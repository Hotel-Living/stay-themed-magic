
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Trash2, Plus, Check, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";

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

  if (loading) {
    return <div className="p-4">Loading affinities...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Affinities Management</h2>
        <Button onClick={() => setNewThemeDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" /> Add New Affinity
        </Button>
      </div>

      <div className="glass-card rounded-xl p-6 bg-white/5 backdrop-blur-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {themes.map(theme => (
              <TableRow key={theme.id}>
                <TableCell className="font-mono text-xs">{theme.id}</TableCell>
                <TableCell>
                  {editingTheme && editingTheme.id === theme.id && editingTheme.field === 'name' ? (
                    <div className="flex items-center gap-2">
                      <Input 
                        value={editingTheme.value} 
                        onChange={(e) => setEditingTheme({...editingTheme, value: e.target.value})}
                        className="min-w-[150px]"
                      />
                      <Button onClick={handleSaveEdit} size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button onClick={handleCancelEdit} size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      {theme.name}
                      <Button 
                        onClick={() => handleEdit(theme.id, 'name', theme.name)} 
                        size="sm" 
                        variant="ghost" 
                        className="h-6 w-6 p-0"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {editingTheme && editingTheme.id === theme.id && editingTheme.field === 'description' ? (
                    <div className="flex items-center gap-2">
                      <Textarea 
                        value={editingTheme.value} 
                        onChange={(e) => setEditingTheme({...editingTheme, value: e.target.value})}
                        className="min-w-[200px]"
                      />
                      <div className="flex flex-col gap-1">
                        <Button onClick={handleSaveEdit} size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button onClick={handleCancelEdit} size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      {theme.description || "-"}
                      <Button 
                        onClick={() => handleEdit(theme.id, 'description', theme.description || '')} 
                        size="sm" 
                        variant="ghost" 
                        className="h-6 w-6 p-0"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </TableCell>
                <TableCell>{new Date(theme.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button 
                    onClick={() => openDeleteDialog(theme.id, theme.name)} 
                    variant="destructive" 
                    size="sm"
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {themes.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">No affinities found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add New Theme Dialog */}
      <Dialog open={newThemeDialogOpen} onOpenChange={setNewThemeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Affinity</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
              <Input
                id="name"
                value={newTheme.name}
                onChange={(e) => setNewTheme({...newTheme, name: e.target.value})}
                placeholder="Enter affinity name"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                id="description"
                value={newTheme.description}
                onChange={(e) => setNewTheme({...newTheme, description: e.target.value})}
                placeholder="Enter affinity description"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewThemeDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddNewTheme} disabled={!newTheme.name.trim()}>
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the affinity "{themeToDelete?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
