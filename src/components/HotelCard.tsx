
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/utils/dynamicPricing";
import { useFavorites } from "@/hooks/useFavorites";
import { HotelCardBadges } from "./HotelCard/components/HotelCardBadges";
import { HotelCardStars } from "./HotelCard/components/HotelCardStars";

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

  // Get themes from hotel_themes if available, otherwise use themes prop
  const displayThemes = hotel_themes?.map(ht => ht.themes?.name).filter(Boolean) || 
                      themes?.map(t => t.name) || [];

  // Get activities from hotel_activities
  const displayActivities = hotel_activities?.map(ha => ha.activities?.name).filter(Boolean) || [];

  // Calculate price display
  const getLowestPrice = () => {
    if (rates && Object.keys(rates).length > 0) {
      const prices = Object.values(rates);
      return Math.min(...prices);
    }
    return pricePerMonth || 0;
  };

  const lowestPrice = getLowestPrice();
  
  return (
    <Card 
      className="overflow-hidden transition-transform hover:scale-[1.02] cursor-pointer glass-card bg-gradient-to-b from-purple-900/90 to-purple-800/80 backdrop-blur-md border border-purple-600/30 rounded-2xl shadow-2xl w-[85%]"
      onClick={onClick}
    >
      <div className="aspect-[16/10] overflow-hidden relative">
        <img 
          src={image || "/placeholder.svg"} 
          alt={name} 
          className="object-cover w-full h-full"
        />
        {/* Theme badge overlay */}
        {displayThemes.length > 0 && (
          <div className="absolute top-3 left-3">
            <div className="bg-yellow-400/90 backdrop-blur-sm text-purple-900 px-3 py-1 rounded-full text-sm font-semibold uppercase">
              {displayThemes[0]}
            </div>
          </div>
        )}
        {/* Favorite button */}
        <div className="absolute bottom-3 right-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(id);
            }}
            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 p-2 rounded-full transition-colors"
          >
            <svg 
              className={`w-5 h-5 ${isFavorite(id) ? 'text-red-500 fill-current' : 'text-white'}`} 
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </button>
        </div>
      </div>
      
      <CardContent className="p-6 space-y-4">
        {/* Hotel name */}
        <h3 className="font-bold text-lg text-white uppercase tracking-wide">
          {name}
        </h3>
        
        {/* Location and duration/price */}
        <div className="flex justify-between items-center text-sm">
          <div className="text-gray-300">
            <div>{city}</div>
            <div>{country}</div>
          </div>
          <div className="text-right text-gray-300">
            <div>32 days</div>
            <div className="text-white font-semibold">
              From {lowestPrice} p/person
            </div>
          </div>
        </div>

        {/* Stars */}
        <div className="flex justify-center">
          <HotelCardStars stars={stars} />
        </div>

        {/* AFFINITIES Section */}
        {displayThemes.length > 0 && (
          <div className="text-center space-y-2">
            <div className="text-gray-300 text-sm font-semibold uppercase tracking-wider">AFFINITIES</div>
            <div className="flex flex-wrap justify-center gap-2">
              {displayThemes.slice(0, 4).map((theme, index) => (
                <span 
                  key={index}
                  className="bg-gradient-to-r from-purple-600/80 to-fuchsia-600/80 text-white px-3 py-1 rounded-full text-xs font-medium border border-white/20 backdrop-blur-sm"
                >
                  {theme}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ACTIVITIES Section */}
        {displayActivities.length > 0 && (
          <div className="text-center space-y-2">
            <div className="text-gray-300 text-sm font-semibold uppercase tracking-wider">ACTIVITIES</div>
            <div className="flex flex-wrap justify-center gap-2">
              {displayActivities.slice(0, 4).map((activity, index) => (
                <span 
                  key={index}
                  className="bg-gradient-to-r from-emerald-600/80 to-teal-600/80 text-white px-3 py-1 rounded-full text-xs font-medium border border-white/20 backdrop-blur-sm"
                >
                  {activity}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
