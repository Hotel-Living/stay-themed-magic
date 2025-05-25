
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/utils/dynamicPricing";

interface HotelCardProps {
  id: string;
  name: string;
  city: string;
  country: string;
  stars: number;
  pricePerMonth?: number;
  themes?: Array<{ id: string; name: string }>;
  image: string;
  availableMonths?: string[];
  rates?: Record<string, number>;
  currency?: string;
  onClick?: () => void;
}

export const HotelCard = ({
  id,
  name,
  city,
  country,
  stars,
  pricePerMonth,
  themes = [],
  image,
  availableMonths = [],
  rates = {},
  currency = "USD",
  onClick
}: HotelCardProps) => {
  // Helper function to display rates in the desired format
  const displayRates = (hotel: any): string | null => {
    if (!hotel?.room_types || hotel.room_types.length === 0) return null;

    // Consider only double rooms
    const doubleRooms = hotel.room_types.filter((rt: any) =>
      rt.room_type?.toLowerCase().includes("double")
    );

    if (doubleRooms.length === 0) return null;

    const validDurations = ["8", "16", "24", "32"];

    // Find longest stay that has valid pricing
    for (const duration of validDurations.slice().reverse()) {
      const pricesForDuration = doubleRooms
        .map((room: any) => room.rates?.[duration])
        .filter((rate: any) => typeof rate === "number");

      if (pricesForDuration.length > 0) {
        const lowest = Math.min(...pricesForDuration);
        return `From ${lowest} p/person`;
      }
    }

    return null;
  };

  // Use the hotel data passed as props to calculate rates
  const hotelData = {
    room_types: rates ? Object.keys(rates).map(key => ({
      room_type: "double", // Assuming double room for now
      rates: rates
    })) : []
  };

  const rateDisplay = displayRates(hotelData);
  
  return (
    <Card 
      className="overflow-hidden transition-transform hover:scale-[1.02] cursor-pointer glass-card"
      onClick={onClick}
    >
      <div className="aspect-[16/9] overflow-hidden relative">
        <img 
          src={image || "/placeholder.svg"} 
          alt={name} 
          className="object-cover w-full h-full"
        />
        {themes.length > 0 && (
          <div className="absolute top-2 left-2">
            <Badge variant="secondary" className="bg-white/70 backdrop-blur-sm text-purple-900 hover:bg-white/80">
              {themes[0].name}
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold line-clamp-1">{name}</h3>
          <div className="flex items-center">
            {Array.from({ length: Math.min(stars, 5) }).map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground mb-3">
          {city}, {country}
        </div>
        
        <div className="mt-3 pt-2 border-t border-gray-700/20 flex justify-between items-center">
          <div className="text-sm font-medium">
            {rateDisplay || (pricePerMonth ? `From ${formatCurrency(pricePerMonth, currency)}` : "")}
          </div>
          
          {availableMonths && availableMonths.length > 0 && (
            <div className="text-xs text-fuchsia-400">{availableMonths.length} months available</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
