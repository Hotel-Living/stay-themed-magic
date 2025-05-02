
import React from "react";
import { Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/utils/dynamicPricing";

export interface HotelHeaderProps {
  name: string;
  stars: number;
  city: string;
  country: string;
  themes?: any[];
  rates?: Record<string, number>;
  currency?: string;
  isLoading?: boolean;
}

export function HotelHeader({ 
  name, 
  stars, 
  city, 
  country, 
  themes = [], 
  rates = {},
  currency = "USD",
  isLoading = false 
}: HotelHeaderProps) {
  
  // Helper function to display rates in the desired format
  const displayRates = () => {
    const stayLengths = ["8", "16", "24", "32"];
    const availableRates = stayLengths.filter(length => rates[length]);
    
    if (availableRates.length === 0) {
      return null; // No rates to display
    }
    
    if (availableRates.length === 1) {
      const length = availableRates[0];
      return (
        <div className="text-lg font-medium">
          {formatCurrency(rates[length], currency)} ({length} days)
        </div>
      );
    }
    
    return (
      <div>
        <div className="text-lg font-medium">
          From: {availableRates.map(length => 
            `${formatCurrency(rates[length], currency)} (${length} days)`
          ).join(" · ")}
        </div>
      </div>
    );
  };
  
  if (isLoading) {
    return (
      <div>
        <Skeleton className="h-10 w-3/4 mb-2" />
        <div className="flex items-center gap-2 mb-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-6 w-1/2" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">{name}</h1>
      <div className="flex items-center gap-2 mb-3">
        <div className="flex">
          {Array.from({ length: Math.min(stars, 5) }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <span className="text-sm">
          {city}, {country}
        </span>
      </div>
      
      {/* Price display */}
      {displayRates()}
      
      {themes && themes.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {themes.map(theme => (
            <span 
              key={theme.id} 
              className="px-3 py-1 bg-fuchsia-700/30 rounded-full text-sm"
            >
              {theme.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
