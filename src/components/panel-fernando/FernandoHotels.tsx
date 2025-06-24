
import React from "react";
import PendingHotelsTable from "@/components/dashboard/admin/PendingHotelsTable";

export default function FernandoHotels() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Hotel Management</h2>
      </div>
      
      <PendingHotelsTable />
    </div>
  );
}
