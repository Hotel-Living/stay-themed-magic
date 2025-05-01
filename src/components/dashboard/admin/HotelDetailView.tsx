// RUTA: src/components/dashboard/admin/HotelDetailView.tsx

import React from "react";
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import AdminDashboardLayout from "./AdminDashboardLayout";
import PropertyDetailView from "@/components/dashboard/property-view/PropertyDetailView";
import { useHotelDetails } from "./hooks/useHotelDetails";
import HotelNotFound from "@/components/dashboard/admin/HotelNotFound";

export default function HotelDetailView() {
  const { id } = useParams();
  const { toast } = useToast();
  const { hotel, onApprove, onReject, isLoading } = useHotelDetails(id || "");

  if (!hotel) {
    return <HotelNotFound />;
  }

  return (
    <AdminDashboardLayout>
      <PropertyDetailView hotel={hotel} />
    </AdminDashboardLayout>
  );
}
