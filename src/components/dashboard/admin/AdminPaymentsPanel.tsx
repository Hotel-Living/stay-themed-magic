
import React from "react";
import AdminDashboardLayout from "./AdminDashboardLayout";

export default function AdminPaymentsPanel() {
  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Payment Management</h2>
        </div>

        <div className="glass-card rounded-xl p-6 bg-white/5 backdrop-blur-sm">
          <div className="text-center py-10">
            <p className="text-lg">Payment management system is under development.</p>
            <p className="text-sm text-muted-foreground mt-2">
              Real payment data will be integrated soon.
            </p>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
