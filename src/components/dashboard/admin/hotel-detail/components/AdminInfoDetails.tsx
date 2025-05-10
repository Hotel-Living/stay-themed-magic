
import React from "react";
import { AdminHotelDetail } from "@/types/hotel";

interface AdminInfoDetailsProps {
  hotel: AdminHotelDetail;
  totalBookings: number;
}

export function AdminInfoDetails({ hotel, totalBookings }: AdminInfoDetailsProps) {
  // Calculate total rooms from the hotel's room types
  const totalRooms = hotel.room_types?.reduce((sum, room) => sum + (room.roomCount || 0), 0) || 0;
  
  return (
    <>
      <div>
        <p className="text-sm text-gray-400">Hotel ID</p>
        <p className="font-medium font-mono text-xs">{hotel.id}</p>
      </div>
      <div>
        <p className="text-sm text-gray-400">Published</p>
        <p className="font-medium">{hotel.status === 'approved' ? "Yes" : "No"}</p>
      </div>
      <div>
        <p className="text-sm text-gray-400">Total Bookings</p>
        <p className="font-medium">{totalBookings}</p>
      </div>
      <div>
        <p className="text-sm text-gray-400">Total Rooms</p>
        <p className="font-medium">{totalRooms}</p>
      </div>
      <div>
        <p className="text-sm text-gray-400">Created At</p>
        <p className="font-medium">{new Date(hotel.created_at).toLocaleString()}</p>
      </div>
      <div>
        <p className="text-sm text-gray-400">Last Updated</p>
        <p className="font-medium">{new Date(hotel.updated_at).toLocaleString()}</p>
      </div>
      {hotel.rejection_reason && (
        <div className="md:col-span-2">
          <p className="text-sm text-gray-400">Rejection Reason</p>
          <p className="font-medium text-red-400">{hotel.rejection_reason}</p>
        </div>
      )}
    </>
  );
}
