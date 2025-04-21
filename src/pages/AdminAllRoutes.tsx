
import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "@/components/dashboard/admin/AdminDashboard";

export default function AdminAllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/all" element={<AdminDashboard />} />
      <Route path="/users" element={<AdminDashboard />} />
      <Route path="/bookings" element={<AdminDashboard />} />
      <Route path="/payments" element={<AdminDashboard />} />
      <Route path="/affinities" element={<AdminDashboard />} />
      <Route path="/filters" element={<AdminDashboard />} />
    </Routes>
  );
}
