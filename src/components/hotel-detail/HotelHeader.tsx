
import React from "react";
import { MapPin, Heart } from "lucide-react";
import { HotelDetailProps } from "@/types/hotel";
import { useToast } from "@/hooks/use-toast";

interface HotelHeaderProps {
  hotel: HotelDetailProps;
  handleAddToFavorites: () => void;
}

export function HotelHeader({ hotel, handleAddToFavorites }: HotelHeaderProps) {
  return (
    <div className="flex justify-between items-start">
      <div className="w-full">
        <h1 className="text-4xl font-extrabold text-purple-100 mb-1">{hotel.name}</h1>
        <p className="italic text-purple-300 flex items-center gap-1">
          <MapPin size={16} /> {hotel.address || `${hotel.city}, ${hotel.country}`}
        </p>
      </div>
      <button 
        className="text-sm text-blue-300 hover:underline flex items-center gap-1 shrink-0"
        onClick={handleAddToFavorites}
      >
        <Heart size={16} /> Add to Favorites
      </button>
    </div>
  );
}
