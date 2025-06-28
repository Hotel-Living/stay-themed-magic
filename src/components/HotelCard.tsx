import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Calendar, Users, Heart } from "lucide-react";
import { HotelCardBadges } from "./HotelCard/components/HotelCardBadges";
import { HotelCardPrice } from "./HotelCard/components/HotelCardPrice";
import { HotelCardStars } from "./HotelCard/components/HotelCardStars";
import { HotelCardFooter } from "./HotelCard/components/HotelCardFooter";

// Multiple fallback images instead of just one
const FALLBACK_IMAGES = ["https://images.unsplash.com/photo-1566073771259-6a8506099945", "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9", "https://images.unsplash.com/photo-1578944032637-f09897c5233d", "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb", "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4"];
interface HotelCardProps {
  id: string;
  name: string;
  city: string;
  country: string;
  stars: number;
  pricePerMonth: number;
  themes?: Array<{
    id: string;
    name: string;
  }>;
  image?: string;
  availableMonths?: string[];
  rates?: Record<string, number>;
  hotel_themes?: Array<{
    themes?: {
      name: string;
    };
  }>;
  hotel_activities?: Array<{
    activities?: {
      name: string;
    };
  }>;
  meal_plans?: string[];
  location?: string;
  thumbnail?: string;
  onClick?: () => void;
}
export function HotelCard({
  id,
  name,
  city,
  country,
  stars,
  pricePerMonth,
  themes = [],
  image,
  availableMonths = [],
  rates,
  hotel_themes = [],
  hotel_activities = [],
  meal_plans = [],
  location,
  thumbnail,
  onClick
}: HotelCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  // Get a deterministic fallback image based on hotel ID
  const getFallbackImage = () => {
    const index = parseInt(id.slice(-1), 16) % FALLBACK_IMAGES.length;
    return FALLBACK_IMAGES[index];
  };
  const displayImage = image || thumbnail || getFallbackImage();
  const handleImageError = () => {
    console.log(`Image failed to load for hotel ${name}:`, displayImage);
    setImageError(true);
    setIsImageLoading(false);
  };
  const handleImageLoad = () => {
    setIsImageLoading(false);
    setImageError(false);
  };

  // Extract themes from different formats
  const displayThemes = themes.length > 0 ? themes : hotel_themes?.filter(ht => ht.themes?.name).map(ht => ({
    id: ht.themes!.name,
    name: ht.themes!.name
  })) || [];
  return <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border border-purple-500/30 backdrop-blur-sm" onClick={onClick}>
      <div className="relative overflow-hidden">
        {isImageLoading && <div className="absolute inset-0 bg-purple-800/50 animate-pulse flex items-center justify-center">
            <div className="text-white text-sm">Loading...</div>
          </div>}
        
        <img src={displayImage} alt={name} className={`w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`} onError={handleImageError} onLoad={handleImageLoad} />
        
        {imageError && <div className="absolute inset-0 bg-gradient-to-br from-purple-800 to-indigo-800 flex items-center justify-center">
            <div className="text-center text-white p-4">
              <MapPin className="w-8 h-8 mx-auto mb-2 opacity-60" />
              <div className="text-sm opacity-80">Image unavailable</div>
            </div>
          </div>}

        <div className="absolute top-2 right-2">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
            <Heart className="w-4 h-4" />
          </Button>
        </div>

        <HotelCardBadges themes={displayThemes} availableMonths={availableMonths} />
      </div>

      <CardContent className="p-4 space-y-3 bg-[#7908aa]">
        <div>
          <h3 className="font-bold text-lg text-white mb-1 line-clamp-2 group-hover:text-purple-200 transition-colors">
            {name}
          </h3>
          <div className="flex items-center text-purple-200 text-sm mb-2">
            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="truncate">{city}, {country}</span>
          </div>
          <HotelCardStars stars={stars} />
        </div>

        <div className="flex flex-wrap gap-1">
          {displayThemes.slice(0, 2).map(theme => <Badge key={theme.id} variant="secondary" className="text-xs bg-purple-600/30 text-purple-200 border-purple-500/30">
              {theme.name}
            </Badge>)}
          {displayThemes.length > 2 && <Badge variant="secondary" className="text-xs bg-purple-600/30 text-purple-200 border-purple-500/30">
              +{displayThemes.length - 2}
            </Badge>}
        </div>

        <HotelCardPrice pricePerMonth={pricePerMonth} rates={rates} currency="EUR" />

        <HotelCardFooter availableMonths={availableMonths} activities={hotel_activities} mealPlans={meal_plans} />
      </CardContent>
    </Card>;
}