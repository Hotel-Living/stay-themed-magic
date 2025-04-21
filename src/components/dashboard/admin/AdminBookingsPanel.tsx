
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import AdminDashboardLayout from "./AdminDashboardLayout";

export default function AdminBookingsPanel() {
  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Bookings Management</h2>
        </div>
        
        <div className="glass-card rounded-xl p-6 bg-white/5 backdrop-blur-sm">
          <p className="text-center py-20 text-muted-foreground">
            Bookings management features coming soon.
          </p>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
