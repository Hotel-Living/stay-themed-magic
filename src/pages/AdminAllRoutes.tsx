
import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "@/components/dashboard/admin/AdminDashboard";
import AdminUsersPanel from "@/components/dashboard/admin/AdminUsersPanel";
import AdminBookingsPanel from "@/components/dashboard/admin/AdminBookingsPanel";
import AdminPaymentsPanel from "@/components/dashboard/admin/AdminPaymentsPanel";
import AdminAffinitiesPanel from "@/components/dashboard/admin/AdminAffinitiesPanel";
import AdminFiltersPanel from "@/components/dashboard/admin/AdminFiltersPanel";

export default function AdminAllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/users" element={<AdminUsersPanel />} />
      <Route path="/bookings" element={<AdminBookingsPanel />} />
      <Route path="/payments" element={<AdminPaymentsPanel />} />
      <Route path="/affinities" element={<AdminAffinitiesPanel />} />
      <Route path="/filters" element={<AdminFiltersPanel />} />
    </Routes>
  );
}
