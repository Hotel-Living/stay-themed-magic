// RUTA: src/components/dashboard/property-view/HotelPropertyDetailView.tsx

import React from "react";
import PropertyDetailView from "./PropertyDetailView";
import { useHotelDetails } from "@/components/dashboard/admin/hooks/useHotelDetails";
import { useParams } from "react-router-dom";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function HotelPropertyDetailView() {
  const { id } = useParams();
  const { hotel, isLoading } = useHotelDetails(id || "");

  if (isLoading) return <LoadingSpinner />;
  if (!hotel) return <div className="text-center text-red-500">Hotel no encontrado.</div>;

  return <PropertyDetailView hotel={hotel} />;
}
