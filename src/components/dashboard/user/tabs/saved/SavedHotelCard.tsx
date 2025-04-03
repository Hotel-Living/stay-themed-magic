
import React from "react";
import { MapPin, Star, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { SavedHotel } from "@/components/dashboard/hooks/useSavedHotels";

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
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{hotel.hotels.name || 'Unknown Hotel'}</h3>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span>
            {hotel.hotels ? `${hotel.hotels.city}, ${hotel.hotels.country}` : 'Unknown Location'}
          </span>
        </div>
        <div className="flex mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <p className="text-sm line-clamp-2 text-muted-foreground mb-3">
          {hotel.hotels.description || 'No description available'}
        </p>
        
        <div className="flex justify-between items-center mt-4">
          <div>
            <span className="block text-lg font-bold">
              ${hotel.hotels.price_per_month || 0}
            </span>
            <span className="text-xs text-muted-foreground">per month</span>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => onRemove(hotel.id)}
              className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-200 text-sm rounded"
            >
              Remove
            </button>
            
            <Link 
              to={`/hotel/${hotel.hotels.id}`} 
              className="px-3 py-1 bg-fuchsia-500/20 hover:bg-fuchsia-500/30 text-fuchsia-200 text-sm rounded flex items-center"
            >
              View <ExternalLink className="w-3 h-3 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
