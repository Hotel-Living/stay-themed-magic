
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import AdminDashboardLayout from "./AdminDashboardLayout";

export default function AdminUsersPanel() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*');

        if (error) {
          throw error;
        }

        setUsers(data || []);
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to fetch users",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <AdminDashboardLayout>
        <div className="p-4">Loading users...</div>
      </AdminDashboardLayout>
    );
  }

  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">User Management</h2>
        </div>

        <div className="glass-card rounded-xl p-6 bg-white/5 backdrop-blur-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Hotel Owner?</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.id}>
                  <TableCell>{user.first_name || "-"}</TableCell>
                  <TableCell>{user.last_name || "-"}</TableCell>
                  <TableCell>{user.is_hotel_owner ? "Yes" : "No"}</TableCell>
                  <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => window.location.href = `/admin/users/${user.id}`}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {users.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">No users found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}

