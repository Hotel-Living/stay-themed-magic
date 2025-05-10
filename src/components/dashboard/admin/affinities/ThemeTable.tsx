
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Trash2, Check, X } from "lucide-react";

interface ThemeTableProps {
  themes: any[];
  editingTheme: { id: string, field: string, value: string } | null;
  handleEdit: (id: string, field: string, value: string) => void;
  handleSaveEdit: () => void;
  handleCancelEdit: () => void;
  openDeleteDialog: (id: string, name: string) => void;
  setEditingTheme: React.Dispatch<React.SetStateAction<{ id: string, field: string, value: string } | null>>;
}

export const ThemeTable: React.FC<ThemeTableProps> = ({
  themes,
  editingTheme,
  handleEdit,
  handleSaveEdit,
  handleCancelEdit,
  openDeleteDialog,
  setEditingTheme
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {themes.map(theme => (
          <TableRow key={theme.id}>
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
            <TableCell colSpan={4} className="text-center py-4">No affinities found</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
