
import React from "react";
import AdminUserRolesForm from "@/components/dashboard/admin/AdminUserRolesForm";

export default function FernandoManageRoles() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Manage User Roles</h2>
      </div>
      
      <div className="rounded-xl p-6 bg-[#7a0486]">
        <AdminUserRolesForm />
      </div>
    </div>
  );
}
