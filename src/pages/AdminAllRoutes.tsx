
import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "@/components/dashboard/admin/AdminDashboard";
import AdminUsersPanel from "@/components/dashboard/admin/AdminUsersPanel";
import AdminUserDetailView from "@/components/dashboard/admin/AdminUserDetailView";
import AdminBookingsPanel from "@/components/dashboard/admin/AdminBookingsPanel";
import AdminPaymentsPanel from "@/components/dashboard/admin/AdminPaymentsPanel";
import AdminAffinitiesPanel from "@/components/dashboard/admin/AdminAffinitiesPanel";
import AdminFiltersPanel from "@/components/dashboard/admin/AdminFiltersPanel";
import HotelDetailView from "@/components/dashboard/admin/HotelDetailView";
import { AdminRoute } from "@/components/auth/AdminRoute";

export default function AdminAllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/all" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/hotels" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/hotels/:id" element={<AdminRoute><HotelDetailView /></AdminRoute>} />
      <Route path="/users" element={<AdminRoute><AdminUsersPanel /></AdminRoute>} />
      <Route path="/users/:id" element={<AdminRoute><AdminUserDetailView /></AdminRoute>} />
      <Route path="/bookings" element={<AdminRoute><AdminBookingsPanel /></AdminRoute>} />
      <Route path="/payments" element={<AdminRoute><AdminPaymentsPanel /></AdminRoute>} />
      <Route path="/affinities" element={<AdminRoute><AdminAffinitiesPanel /></AdminRoute>} />
      <Route path="/filters" element={<AdminRoute><AdminFiltersPanel /></AdminRoute>} />
    </Routes>
  );
}
