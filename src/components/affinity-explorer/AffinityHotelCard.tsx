
import React from "react";
import { MapPin, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface Hotel {
  id: string;
  name: string;
  city: string;
  country: string;
  price_per_month: number;
  main_image_url: string;
  property_style?: string;
  themes: Array<{ id: string; name: string; category?: string }>;
}

interface AffinityHotelCardProps {
  hotel: Hotel;
}

export const AffinityHotelCard = ({ hotel }: AffinityHotelCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/hotel/${hotel.id}`);
  };

  return (
    <Card 
      className="w-80 flex-shrink-0 overflow-hidden transition-transform hover:scale-105 cursor-pointer bg-fuchsia-500/10 border-fuchsia-900/20 hover:bg-fuchsia-500/15"
      onClick={handleClick}
    >
      <div className="aspect-[16/10] overflow-hidden">
        <img 
          src={hotel.main_image_url || "/placeholder.svg"} 
          alt={hotel.name} 
          className="object-cover w-full h-full"
        />
      </div>
      
      <CardContent className="p-4">
        <div className="mb-3">
          <h3 className="font-bold text-lg text-white line-clamp-1 mb-1">
            {hotel.name}
          </h3>
          <div className="flex items-center text-fuchsia-200 text-sm mb-2">
            <MapPin className="w-3 h-3 mr-1" />
            <span>{hotel.city}, {hotel.country}</span>
          </div>
          {hotel.property_style && (
            <div className="text-xs text-fuchsia-300 mb-2">
              {hotel.property_style}
            </div>
          )}
        </div>
        
        {/* Affinities Tags */}
        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {hotel.themes.slice(0, 3).map((theme) => (
              <span 
                key={theme.id}
                className="text-xs bg-fuchsia-500/20 text-fuchsia-300 px-2 py-1 rounded-full"
              >
                {theme.name}
              </span>
            ))}
            {hotel.themes.length > 3 && (
              <span className="text-xs text-fuchsia-300">
                +{hotel.themes.length - 3} more
              </span>
            )}
          </div>
        </div>
        
        {/* Price */}
        <div className="text-lg font-bold text-white">
          From ${hotel.price_per_month}/month
        </div>
      </CardContent>
    </Card>
  );
};
