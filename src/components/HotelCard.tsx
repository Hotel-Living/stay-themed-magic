
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/utils/dynamicPricing";
import { useFavorites } from "@/hooks/useFavorites";
import { ComparisonCheckbox } from "@/components/comparison/ComparisonCheckbox";
import { HotelCardBadges } from "./HotelCard/components/HotelCardBadges";
import { HotelCardStars } from "./HotelCard/components/HotelCardStars";
import { HotelCardFooter } from "./HotelCard/components/HotelCardFooter";

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
  // Add hotel data for comparison
  hotel_themes?: Array<{ themes?: { name: string } }>;
  hotel_activities?: Array<{ activities?: { name: string } }>;
  meal_plans?: string[];
  location?: string;
  thumbnail?: string;
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
  hotel_themes,
  hotel_activities,
  meal_plans,
  location,
  thumbnail
}: HotelCardProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  // Prepare hotel data for comparison
  const hotelForComparison = {
    id,
    name,
    location: location || `${city}, ${country}`,
    city,
    country,
    price_per_month: pricePerMonth,
    hotel_themes,
    hotel_activities,
    meal_plans,
    available_months: availableMonths,
    rates,
    thumbnail: thumbnail || image
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
        <HotelCardBadges 
          themes={themes}
          isFavorite={isFavorite(id)}
          onToggleFavorite={() => toggleFavorite(id)}
        />
        {/* Add comparison checkbox */}
        <div className="absolute bottom-2 left-2">
          <ComparisonCheckbox hotel={hotelForComparison} />
        </div>
      </div>
      <CardContent className="p-4 bg-[#5A0080]">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold line-clamp-1 text-white">{name}</h3>
          <HotelCardStars stars={stars} />
        </div>
        
        <div className="text-sm text-gray-300 mb-3">
          {city}, {country}
        </div>
        
        <HotelCardFooter 
          rates={rates}
          pricePerMonth={pricePerMonth}
          currency={currency}
          availableMonths={availableMonths}
        />
      </CardContent>
    </Card>
  );
};
