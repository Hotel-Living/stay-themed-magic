
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { HotelCardStars } from "./HotelCard/components/HotelCardStars";
import { HotelCardPrice } from "./HotelCard/components/HotelCardPrice";
import { Heart } from "lucide-react";

interface Theme {
  id: string;
  name: string;
}

interface Activity {
  activities?: {
    name: string;
  };
}

interface HotelCardProps {
  id: string;
  name: string;
  city?: string;
  country?: string;
  stars?: number;
  pricePerMonth?: number;
  themes?: Theme[];
  image?: string;
  availableMonths?: string[];
  rates?: Record<string, number>;
  hotel_themes?: Array<{
    themes?: {
      name: string;
    };
  }>;
  hotel_activities?: Activity[];
  meal_plans?: string[];
  location?: string;
  thumbnail?: string;
  onClick?: () => void;
}

export const HotelCard: React.FC<HotelCardProps> = ({
  id,
  name,
  city,
  country,
  stars = 0,
  pricePerMonth,
  themes = [],
  image,
  rates,
  hotel_themes = [],
  hotel_activities = [],
  onClick
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/hotel/${id}`);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Handle favorite functionality here
  };

  // Get affinities from hotel themes
  const affinities = hotel_themes
    ?.map(ht => ht.themes?.name)
    .filter(Boolean)
    .slice(0, 3) || [];

  // Get activities from hotel activities
  const activities = hotel_activities
    ?.map(ha => ha.activities?.name)
    .filter(Boolean)
    .slice(0, 3) || [];

  return (
    <Card 
      className="bg-gradient-to-b from-purple-800 to-purple-900 text-white cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col"
      onClick={handleClick}
    >
      {/* Hotel Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="w-full h-full object-cover"
        />
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 bg-black/20 hover:bg-black/40 rounded-full transition-colors"
        >
          <Heart className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Card Content */}
      <CardContent className="p-4 flex-1 flex flex-col">
        {/* Hotel Name - Centered */}
        <h3 className="text-xl font-bold mb-2 text-center line-clamp-2">
          {name}
        </h3>

        {/* Location - Centered */}
        <p className="text-white/80 text-sm mb-3 text-center">
          {city && country ? `${city}, ${country}` : city || country || "Location not specified"}
        </p>

        {/* Stars - Centered */}
        <div className="flex justify-center mb-4">
          <HotelCardStars stars={stars} />
        </div>

        {/* Affinities Section */}
        {affinities.length > 0 && (
          <div className="mb-4 text-center">
            <p className="text-sm text-white/90 mb-2">
              🟣 <span className="font-medium">Ideal for those who enjoy:</span>
            </p>
            <div className="flex flex-wrap justify-center gap-1">
              {affinities.map((affinity, index) => (
                <span
                  key={index}
                  className="bg-purple-600/50 text-xs px-2 py-1 rounded-full text-white"
                >
                  {affinity}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Activities Section */}
        {activities.length > 0 && (
          <div className="mb-4 text-center">
            <p className="text-sm text-white/90 mb-2">
              🟠 <span className="font-medium">Experiences you can enjoy:</span>
            </p>
            <div className="flex flex-wrap justify-center gap-1">
              {activities.map((activity, index) => (
                <span
                  key={index}
                  className="bg-orange-600/50 text-xs px-2 py-1 rounded-full text-white"
                >
                  {activity}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Price - Centered with Increased Font Size */}
        <div className="mt-auto text-center">
          <HotelCardPrice 
            rates={rates} 
            pricePerMonth={pricePerMonth} 
            currency="EUR"
          />
        </div>
      </CardContent>
    </Card>
  );
};
