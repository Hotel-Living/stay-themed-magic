
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboardLayout from "@/components/dashboard/admin/AdminDashboardLayout";
import AdminDashboard from "@/components/dashboard/admin/AdminDashboard";

export default function AdminAllRoutes() {
  return (
    <AdminDashboardLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/hotels" replace />} />
        <Route path="/hotels" element={<AdminDashboard />} />
        <Route path="/users" element={<AdminDashboard />} />
        <Route path="/bookings" element={<AdminDashboard />} />
        <Route path="/payments" element={<AdminDashboard />} />
        <Route path="/communications" element={<AdminDashboard />} />
        <Route path="/advertising" element={<AdminDashboard />} />
        <Route path="/affinities" element={<AdminDashboard />} />
        <Route path="/filters" element={<AdminDashboard />} />
        <Route path="/translations" element={<AdminDashboard />} />
        <Route path="/roles" element={<AdminDashboard />} />
        <Route path="/analytics" element={<AdminDashboard />} />
        <Route path="/settings" element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/admin/hotels" replace />} />
      </Routes>
    </AdminDashboardLayout>
  );
}
