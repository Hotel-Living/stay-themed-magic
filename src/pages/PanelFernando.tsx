
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PanelFernandoLayout from "@/components/panel-fernando/PanelFernandoLayout";
import FernandoHotels from "@/components/panel-fernando/FernandoHotels";
import FernandoBookings from "@/components/panel-fernando/FernandoBookings";
import FernandoPayments from "@/components/panel-fernando/FernandoPayments";
import FernandoStatistics from "@/components/panel-fernando/FernandoStatistics";
import FernandoCommunications from "@/components/panel-fernando/FernandoCommunications";
import FernandoAdvertising from "@/components/panel-fernando/FernandoAdvertising";
import FernandoAffinities from "@/components/panel-fernando/FernandoAffinities";
import FernandoFilters from "@/components/panel-fernando/FernandoFilters";
import FernandoUserRoles from "@/components/panel-fernando/FernandoUserRoles";
import FernandoAnalytics from "@/components/panel-fernando/FernandoAnalytics";
import FernandoTranslations from "@/components/panel-fernando/FernandoTranslations";
import FernandoBatches from "@/components/panel-fernando/FernandoBatches";
import Fernando32DayHotels from "@/components/panel-fernando/Fernando32DayHotels";

export default function PanelFernando() {
  return (
    <PanelFernandoLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/panel-fernando/hotels" replace />} />
        <Route path="/hotels" element={<FernandoHotels />} />
        <Route path="/bookings" element={<FernandoBookings />} />
        <Route path="/payments" element={<FernandoPayments />} />
        <Route path="/statistics" element={<FernandoStatistics />} />
        <Route path="/communications" element={<FernandoCommunications />} />
        <Route path="/advertising" element={<FernandoAdvertising />} />
        <Route path="/affinities" element={<FernandoAffinities />} />
        <Route path="/filters" element={<FernandoFilters />} />
        <Route path="/user-roles" element={<FernandoUserRoles />} />
        <Route path="/analytics" element={<FernandoAnalytics />} />
        <Route path="/translations" element={<FernandoTranslations />} />
        <Route path="/batches/*" element={<FernandoBatches />} />
        <Route path="/32-day-hotels" element={<Fernando32DayHotels />} />
        <Route path="*" element={<Navigate to="/panel-fernando/hotels" replace />} />
      </Routes>
    </PanelFernandoLayout>
  );
}
