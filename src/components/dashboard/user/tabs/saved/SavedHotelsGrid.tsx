
import React from "react";
import { SavedHotel } from "@/components/dashboard/hooks/useSavedHotels";
import SavedHotelCard from "./SavedHotelCard";
import NoSavedHotels from "./NoSavedHotels";

interface SavedHotelsGridProps {
  hotels: SavedHotel[];
  onRemove: (id: string) => Promise<void>;
}

export default function SavedHotelsGrid({ hotels, onRemove }: SavedHotelsGridProps) {
  if (hotels.length === 0) {
    return <NoSavedHotels />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {hotels.map((hotel) => (
        <SavedHotelCard key={hotel.id} hotel={hotel} onRemove={onRemove} />
      ))}
    </div>
  );
}
