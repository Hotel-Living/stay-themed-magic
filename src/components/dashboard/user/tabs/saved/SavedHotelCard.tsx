
import React from "react";
import { SavedHotel } from "@/components/dashboard/hooks/useSavedHotels";
import SavedHotelContent from "./SavedHotelContent";
import SavedHotelActions from "./SavedHotelActions";

interface SavedHotelCardProps {
  hotel: SavedHotel;
  onRemove: (id: string) => Promise<void>;
}

export default function SavedHotelCard({ hotel, onRemove }: SavedHotelCardProps) {
  if (!hotel.hotels) {
    return null; // Don't render anything if the hotel data is missing
  }

  return (
    <div className="border border-fuchsia-900/20 rounded-lg overflow-hidden bg-fuchsia-500/5">
      <div className="aspect-[4/3]">
        <img 
          src={hotel.hotels.main_image_url || "/placeholder.svg"} 
          alt={hotel.hotels.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <SavedHotelContent 
        name={hotel.hotels.name}
        city={hotel.hotels.city}
        country={hotel.hotels.country}
        description={hotel.hotels.description}
        price={hotel.hotels.price_per_month}
      />
      
      <SavedHotelActions 
        hotelId={hotel.hotels.id}
        favoriteId={hotel.id}
        onRemove={onRemove}
      />
    </div>
  );
}
