
import React, { useState } from "react";
import AdminDashboardLayout from "./AdminDashboardLayout";
import { UserFilters } from "./users/UserFilters";
import { UserTable } from "./users/UserTable";
import { UserPagination } from "./users/UserPagination";
import { UserLoadingState } from "./users/UserLoadingState";
import { useUserData } from "./users/hooks/useUserData";
import { useUserFiltering } from "./users/hooks/useUserFiltering";

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

  const totalPages = Math.ceil(totalCount / limit);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
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
        </div>

        {/* Search and filter controls */}
        <UserFilters 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
        />

        <div className="glass-card rounded-xl p-6 bg-white/5 backdrop-blur-sm">
          <UserTable users={filteredUsers} />

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
