
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
  const displayRates = () => {
    const stayLengths = ["8", "16", "24", "32"];
    const availableRates = stayLengths.filter(length => rates[length]);
    
    if (availableRates.length === 0) {
      // If no rates defined in the new format, use the old pricePerMonth
      return pricePerMonth ? `From ${formatCurrency(pricePerMonth, currency)}` : "Price on request";
    }
    
    // Start with the lowest stay length that has a rate
    const lowestStayLength = availableRates.sort((a, b) => Number(a) - Number(b))[0];
    const lowestRate = rates[lowestStayLength];
    
    if (availableRates.length === 1) {
      return `From ${formatCurrency(lowestRate, currency)} (${lowestStayLength} days)`;
    }
    
    // Show the starting price with shortest duration
    return `From ${formatCurrency(lowestRate, currency)} (${lowestStayLength} days)`;
  };
  
  return (
    <Card 
      className="overflow-hidden transition-transform hover:scale-[1.02] cursor-pointer glass-card bg-[#5A0080]"
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
      <CardContent className="p-4 bg-[#5A0080]">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold line-clamp-1 text-white">{name}</h3>
          <div className="flex items-center">
            {Array.from({ length: Math.min(stars, 5) }).map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        </div>
        
        <div className="text-sm text-gray-300 mb-3">
          {city}, {country}
        </div>
        
        <div className="mt-3 pt-2 border-t border-gray-700/20 flex justify-between items-center">
          <div className="text-sm font-medium text-white">
            {displayRates()}
          </div>
          
          {availableMonths && availableMonths.length > 0 && (
            <div className="text-xs text-fuchsia-400">{availableMonths.length} months available</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
