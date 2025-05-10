
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AdminDashboardLayout from "./AdminDashboardLayout";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function AdminUsersPanel() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 10;
  const { toast } = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // First, get the total count for pagination
        const { count, error: countError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact' });

        if (countError) {
          throw countError;
        }

        setTotalCount(count || 0);

        // Then fetch the current page of users
        const from = (page - 1) * limit;
        const to = from + limit - 1;
        
        const { data, error } = await supabase
          .from('profiles')
          .select('*, hotels(name, city)')
          .range(from, to);

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
  }, [page]);

  const filteredUsers = users.filter(user => {
    // Global search across multiple fields
    const searchText = searchTerm.toLowerCase();
    const firstName = user.first_name?.toLowerCase() || "";
    const lastName = user.last_name?.toLowerCase() || "";
    const fullName = `${firstName} ${lastName}`.toLowerCase();
    const email = user.email?.toLowerCase() || "";
    const userId = user.id?.toLowerCase() || "";
    const userType = user.is_hotel_owner ? "hotel owner" : "user";
    const role = user.role?.toLowerCase() || "";

    // Check hotel-related fields if the user has hotels data
    let hotelMatches = false;
    if (user.hotels && Array.isArray(user.hotels)) {
      hotelMatches = user.hotels.some((hotel: any) => 
        (hotel.name?.toLowerCase() || "").includes(searchText) ||
        (hotel.city?.toLowerCase() || "").includes(searchText)
      );
    } else if (user.hotels) {
      // Single hotel object
      hotelMatches = 
        (user.hotels.name?.toLowerCase() || "").includes(searchText) ||
        (user.hotels.city?.toLowerCase() || "").includes(searchText);
    }

    // Combined search across all fields
    const matchesSearch = 
      searchTerm === "" || 
      firstName.includes(searchText) ||
      lastName.includes(searchText) ||
      fullName.includes(searchText) ||
      email.includes(searchText) ||
      userId.includes(searchText) ||
      userType.includes(searchText) ||
      role.includes(searchText) ||
      hotelMatches;

    // Apply role filter after search
    const matchesRole =
      roleFilter === "all" ||
      (roleFilter === "owner" && user.is_hotel_owner) ||
      (roleFilter === "guest" && !user.is_hotel_owner);

    return matchesSearch && matchesRole;
  });

  const totalPages = Math.ceil(totalCount / limit);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

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

        {/* Search and filter controls */}
        <div className="flex gap-4 mb-4">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Search by name, email, ID, role, hotel name or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="owner">Hotel Owners</SelectItem>
              <SelectItem value="guest">Regular Users</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="glass-card rounded-xl p-6 bg-white/5 backdrop-blur-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Hotel Owner?</TableHead>
                <TableHead>Active?</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map(user => (
                <TableRow key={user.id}>
                  <TableCell>{user.first_name || "-"}</TableCell>
                  <TableCell>{user.last_name || "-"}</TableCell>
                  <TableCell>{user.is_hotel_owner ? "Yes" : "No"}</TableCell>
                  <TableCell>{user.is_active ? "Yes" : "No"}</TableCell>
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
              {filteredUsers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">No users found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => handlePageChange(page - 1)} 
                    className={page === 1 ? "opacity-50 pointer-events-none" : "cursor-pointer"}
                  />
                </PaginationItem>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  // Show pages around the current page
                  let pageNumber;
                  if (totalPages <= 5) {
                    pageNumber = i + 1;
                  } else if (page <= 3) {
                    pageNumber = i + 1;
                  } else if (page >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i;
                  } else {
                    pageNumber = page - 2 + i;
                  }
                  
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink 
                        onClick={() => handlePageChange(pageNumber)}
                        isActive={pageNumber === page}
                        className="cursor-pointer"
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                
                {totalPages > 5 && page < totalPages - 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                
                {totalPages > 5 && page < totalPages - 2 && (
                  <PaginationItem>
                    <PaginationLink 
                      onClick={() => handlePageChange(totalPages)}
                      className="cursor-pointer"
                    >
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                )}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => handlePageChange(page + 1)}
                    className={page === totalPages ? "opacity-50 pointer-events-none" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
