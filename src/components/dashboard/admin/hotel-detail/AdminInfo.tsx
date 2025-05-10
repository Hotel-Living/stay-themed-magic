
import React from "react";
import { Clock } from "lucide-react";
import { AdminHotelDetail } from "@/types/hotel";
import { useHotelOwners } from "./hooks/useHotelOwners";
import { useBookingsCount } from "./hooks/useBookingsCount";
import { OwnerSelector } from "./components/OwnerSelector";
import { StatusSelector } from "./components/StatusSelector";
import { AdminInfoDetails } from "./components/AdminInfoDetails";

interface AdminInfoProps {
  hotel: AdminHotelDetail;
  refetch?: () => Promise<void>; // Optional refetch function to update data
}

export function AdminInfo({ hotel, refetch }: AdminInfoProps) {
  const hotelOwners = useHotelOwners();
  const totalBookings = useBookingsCount(hotel.id);
  
  // Get the main hotel image or first image if no main image is set
  const mainImage = hotel.hotel_images?.find(img => img.is_main)?.image_url || 
                   hotel.hotel_images?.[0]?.image_url || 
                   hotel.main_image_url;

  return (
    <div className="rounded-xl p-6 bg-[#5d0083]">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700 flex items-center gap-2">
        <Clock className="w-5 h-5 text-purple-400" />
        Administrative Details
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mainImage && (
          <div className="md:col-span-2 flex justify-center mb-4">
            <img 
              src={mainImage} 
              alt={`${hotel.name} thumbnail`} 
              className="w-32 h-32 rounded shadow-md object-cover border-2 border-purple-400" 
            />
          </div>
        )}
        <div className="md:col-span-2">
          <p className="text-sm text-gray-400">Owner</p>
          <OwnerSelector
            hotelId={hotel.id}
            currentOwnerId={hotel.owner_id || null}
            hotelOwners={hotelOwners}
            onSuccess={refetch}
          />
        </div>
        <div className="md:col-span-2">
          <p className="text-sm text-gray-400">Status</p>
          <StatusSelector
            hotelId={hotel.id}
            currentStatus={hotel.status || "pending"} 
            onSuccess={refetch}
          />
        </div>
        <AdminInfoDetails hotel={hotel} totalBookings={totalBookings} />
      </div>
    </div>
  );
}
