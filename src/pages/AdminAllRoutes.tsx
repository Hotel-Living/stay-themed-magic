
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HotelStarfield } from "@/components/hotels/HotelStarfield";
import AdminDashboard from "@/components/dashboard/admin/AdminDashboard";

export default function AdminAllRoutes() {
  return (
    <div className="min-h-screen flex flex-col">
      <HotelStarfield />
      <Navbar />
      
      <main className="flex-1 pt-16">
        <Routes>
          <Route path="/" element={<Navigate to="/admin/hotels" replace />} />
          <Route path="/hotels" element={<AdminDashboard />} />
          <Route path="/users" element={<AdminDashboard />} />
          <Route path="/bookings" element={<AdminDashboard />} />
          <Route path="/analytics" element={<AdminDashboard />} />
          <Route path="/settings" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/admin/hotels" replace />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}
