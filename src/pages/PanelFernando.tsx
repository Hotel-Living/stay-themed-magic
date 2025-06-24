
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PanelFernandoLayout from "@/components/panel-fernando/PanelFernandoLayout";
import FernandoHotels from "@/components/panel-fernando/FernandoHotels";
import FernandoBookings from "@/components/panel-fernando/FernandoBookings";
import FernandoPayments from "@/components/panel-fernando/FernandoPayments";
import FernandoStatistics from "@/components/panel-fernando/FernandoStatistics";
import FernandoCommunications from "@/components/panel-fernando/FernandoCommunications";
import FernandoAdvertising from "@/components/panel-fernando/FernandoAdvertising";

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
        <Route path="*" element={<Navigate to="/panel-fernando/hotels" replace />} />
      </Routes>
    </PanelFernandoLayout>
  );
}
