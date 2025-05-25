
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
  room_types?: Array<{
    room_type?: string;
    name?: string;
    rates?: Record<string, number>;
  }>;
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
  onClick,
  room_types = []
}: HotelCardProps) => {
  // Helper function to display rates in the desired format
  const displayRates = (hotel: { room_types?: Array<{ room_type?: string; name?: string; rates?: Record<string, number> }> }): string | null => {
    if (!hotel?.room_types || hotel.room_types.length === 0) return null;

    const durations = ["32", "24", "16", "8"];

    for (const duration of durations) {
      const prices = hotel.room_types
        .filter(rt => rt.room_type?.toLowerCase().includes("double") || rt.name?.toLowerCase().includes("double"))
        .map(rt => rt.rates?.[duration])
        .filter(rate => typeof rate === "number");

      if (prices.length > 0) {
        const lowest = Math.min(...prices);
        return `from ${lowest} p/person`;
      }
    }

    return null;
  };

  // Use the actual hotel data from props
  const rateDisplay = displayRates({ room_types });
  
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
