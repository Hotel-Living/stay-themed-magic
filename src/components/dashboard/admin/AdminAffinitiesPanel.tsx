
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function AdminAffinitiesPanel() {
  const [themes, setThemes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
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

    fetchThemes();
  }, []);

  if (loading) {
    return <div className="p-4">Loading affinities...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Affinities Management</h2>
      </div>

      <div className="glass-card rounded-xl p-6 bg-white/5 backdrop-blur-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {themes.map(theme => (
              <TableRow key={theme.id}>
                <TableCell className="font-mono text-xs">{theme.id}</TableCell>
                <TableCell>{theme.name}</TableCell>
                <TableCell>{theme.description || "-"}</TableCell>
                <TableCell>{new Date(theme.created_at).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
            {themes.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">No affinities found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
