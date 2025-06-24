
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PruebaLayout from "@/components/prueba/PruebaLayout";
import PruebaHotels from "@/components/prueba/PruebaHotels";
import PruebaUsers from "@/components/prueba/PruebaUsers";
import PruebaBookings from "@/components/prueba/PruebaBookings";
import PruebaPayments from "@/components/prueba/PruebaPayments";
import PruebaAffinities from "@/components/prueba/PruebaAffinities";
import PruebaFilters from "@/components/prueba/PruebaFilters";
import PruebaTranslations from "@/components/prueba/PruebaTranslations";
import PruebaCommunications from "@/components/prueba/PruebaCommunications";
import PruebaAdvertising from "@/components/prueba/PruebaAdvertising";
import PruebaStatistics from "@/components/prueba/PruebaStatistics";
import PruebaRoles from "@/components/prueba/PruebaRoles";

export default function Prueba() {
  return (
    <PruebaLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/prueba/hotels" replace />} />
        <Route path="/hotels" element={<PruebaHotels />} />
        <Route path="/users" element={<PruebaUsers />} />
        <Route path="/bookings" element={<PruebaBookings />} />
        <Route path="/payments" element={<PruebaPayments />} />
        <Route path="/affinities" element={<PruebaAffinities />} />
        <Route path="/filters" element={<PruebaFilters />} />
        <Route path="/translations" element={<PruebaTranslations />} />
        <Route path="/communications" element={<PruebaCommunications />} />
        <Route path="/advertising" element={<PruebaAdvertising />} />
        <Route path="/statistics" element={<PruebaStatistics />} />
        <Route path="/roles" element={<PruebaRoles />} />
        <Route path="*" element={<Navigate to="/prueba/hotels" replace />} />
      </Routes>
    </PruebaLayout>
  );
}
