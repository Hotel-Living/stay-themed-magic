
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PanelFernandoLayout from "@/components/panel-fernando/PanelFernandoLayout";
import FernandoHotels from "@/components/panel-fernando/FernandoHotels";
import FernandoUsers from "@/components/panel-fernando/FernandoUsers";
import FernandoBookings from "@/components/panel-fernando/FernandoBookings";
import FernandoPayments from "@/components/panel-fernando/FernandoPayments";
import FernandoStatistics from "@/components/panel-fernando/FernandoStatistics";
import FernandoCommunications from "@/components/panel-fernando/FernandoCommunications";
import FernandoAdvertising from "@/components/panel-fernando/FernandoAdvertising";
import FernandoAffinities from "@/components/panel-fernando/FernandoAffinities";
import FernandoFilters from "@/components/panel-fernando/FernandoFilters";
import FernandoTranslations from "@/components/panel-fernando/FernandoTranslations";
import FernandoManageRoles from "@/components/panel-fernando/FernandoManageRoles";

export default function PanelFernando() {
  return (
    <PanelFernandoLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/panel-fernando/hotels" replace />} />
        <Route path="/hotels" element={<FernandoHotels />} />
        <Route path="/users" element={<FernandoUsers />} />
        <Route path="/bookings" element={<FernandoBookings />} />
        <Route path="/payments" element={<FernandoPayments />} />
        <Route path="/communications" element={<FernandoCommunications />} />
        <Route path="/advertising" element={<FernandoAdvertising />} />
        <Route path="/affinities" element={<FernandoAffinities />} />
        <Route path="/filters" element={<FernandoFilters />} />
        <Route path="/translations" element={<FernandoTranslations />} />
        <Route path="/statistics" element={<FernandoStatistics />} />
        <Route path="/manage-roles" element={<FernandoManageRoles />} />
        <Route path="*" element={<Navigate to="/panel-fernando/hotels" replace />} />
      </Routes>
    </PanelFernandoLayout>
  );
}
