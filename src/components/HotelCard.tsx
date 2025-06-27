
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/utils/dynamicPricing";
import { useFavorites } from "@/hooks/useFavorites";
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
  
  // Soft color palette for tags
  const tagColors = [
    'bg-blue-100 text-blue-700 border-blue-200',
    'bg-emerald-100 text-emerald-700 border-emerald-200',
    'bg-purple-100 text-purple-700 border-purple-200',
    'bg-pink-100 text-pink-700 border-pink-200',
    'bg-amber-100 text-amber-700 border-amber-200',
    'bg-indigo-100 text-indigo-700 border-indigo-200',
    'bg-rose-100 text-rose-700 border-rose-200',
    'bg-teal-100 text-teal-700 border-teal-200',
    'bg-cyan-100 text-cyan-700 border-cyan-200',
    'bg-violet-100 text-violet-700 border-violet-200'
  ];
  
  return (
    <Card 
      className="overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer 
                 bg-gradient-to-br from-white via-gray-50 to-purple-50/30 
                 border border-gray-200/60 rounded-2xl shadow-lg 
                 w-[85%] backdrop-blur-sm"
      onClick={onClick}
    >
      <div className="aspect-[16/10] overflow-hidden relative">
        <img 
          src={image || "/placeholder.svg"} 
          alt={name} 
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
        {/* Theme badge overlay */}
        {displayThemes.length > 0 && (
          <div className="absolute top-3 left-3">
            <div className="bg-white/95 backdrop-blur-sm text-purple-800 px-3 py-1 rounded-full text-sm font-semibold shadow-md border border-purple-200/50">
              {displayThemes[0]}
            </div>
          </div>
        )}
        {/* Favorite button */}
        <div className="absolute top-3 right-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(id);
            }}
            className="bg-white/90 backdrop-blur-sm hover:bg-white p-2 rounded-full transition-all duration-200 shadow-md border border-gray-200/50"
          >
            <svg 
              className={`w-5 h-5 transition-colors ${isFavorite(id) ? 'text-red-500 fill-current' : 'text-gray-600'}`} 
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </button>
        </div>
      </div>
      
      <CardContent className="p-6 space-y-4">
        {/* Hotel name */}
        <h3 className="font-bold text-xl text-gray-800 uppercase tracking-wide leading-tight">
          {name}
        </h3>
        
        {/* Location and duration/price */}
        <div className="flex justify-between items-start">
          <div className="text-gray-600 space-y-1">
            <div className="font-medium">{city}</div>
            <div className="text-sm">{country}</div>
          </div>
          <div className="text-right text-gray-600">
            <div className="text-sm">32 days</div>
            <div className="text-gray-800 font-bold text-lg">
              From {lowestPrice} p/person
            </div>
          </div>
        </div>

        {/* Stars */}
        <div className="flex justify-center py-2">
          <HotelCardStars stars={stars} />
        </div>

        {/* AFINIDADES Section */}
        {displayThemes.length > 0 && (
          <div className="text-center space-y-3 py-2">
            <div className="text-gray-700 text-sm font-bold uppercase tracking-wider">
              AFINIDADES
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {displayThemes.slice(0, 6).map((theme, index) => (
                <span 
                  key={theme}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border shadow-sm transition-all duration-200 hover:shadow-md ${tagColors[index % tagColors.length]}`}
                >
                  {theme}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ACTIVIDADES Section */}
        {displayActivities.length > 0 && (
          <div className="text-center space-y-3 py-2">
            <div className="text-gray-700 text-sm font-bold uppercase tracking-wider">
              ACTIVIDADES
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {displayActivities.slice(0, 6).map((activity, index) => (
                <span 
                  key={activity}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border shadow-sm transition-all duration-200 hover:shadow-md ${tagColors[(index + 6) % tagColors.length]}`}
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
