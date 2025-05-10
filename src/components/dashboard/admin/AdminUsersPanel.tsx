
import React, { useState } from "react";
import AdminDashboardLayout from "./AdminDashboardLayout";
import { UserFilters } from "./users/UserFilters";
import { UserTable } from "./users/UserTable";
import { UserCard } from "./users/UserCard";
import { UserPagination } from "./users/UserPagination";
import { UserLoadingState } from "./users/UserLoadingState";
import { useUserData } from "./users/hooks/useUserData";
import { useUserFiltering } from "./users/hooks/useUserFiltering";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { utils, writeFile } from "xlsx";
import { Download } from "lucide-react";

export default function AdminUsersPanel() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { users, loading, totalCount } = useUserData(page, limit);
  const { 
    searchTerm, 
    setSearchTerm, 
    roleFilter, 
    setRoleFilter, 
    filteredUsers 
  } = useUserFiltering(users);
  const isMobile = useIsMobile();

  const totalPages = Math.ceil(totalCount / limit);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const exportUsers = () => {
    const dataToExport = filteredUsers.map(user => ({
      'First Name': user.first_name || '-',
      'Last Name': user.last_name || '-',
      'Email': user.email || '-',
      'User Type': user.is_hotel_owner ? "Hotel Owner" : "Regular User",
      'Status': user.is_active ? "Active" : "Inactive",
      'Hotel Name': user.hotels?.name || '-',
      'Hotel City': user.hotels?.city || '-',
      'Joined': new Date(user.created_at).toLocaleDateString()
    }));

    const ws = utils.json_to_sheet(dataToExport);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Users");
    writeFile(wb, "users_export.xlsx");
  };

  if (loading) {
    return (
      <AdminDashboardLayout>
        <UserLoadingState />
      </AdminDashboardLayout>
    );
  }

  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">User Management</h2>
          <Button 
            variant="outline" 
            onClick={exportUsers}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Export to Excel
          </Button>
        </div>

        {/* Search and filter controls */}
        <UserFilters 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
        />

        <div className="glass-card rounded-xl p-6 bg-white/5 backdrop-blur-sm">
          {isMobile ? (
            <div className="space-y-4">
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <UserCard key={user.id} user={user} />
                ))
              ) : (
                <div className="text-center py-8">No users found</div>
              )}
            </div>
          ) : (
            <UserTable users={filteredUsers} />
          )}

          {/* Pagination */}
          <UserPagination 
            page={page}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
