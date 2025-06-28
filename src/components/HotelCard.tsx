
import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Star } from "lucide-react";

interface Theme {
  id: string;
  name: string;
}

interface Activity {
  name: string;
}

interface HotelCardProps {
  id: string;
  name: string;
  city: string;
  country: string;
  stars: number;
  pricePerMonth: number;
  themes: Theme[];
  image: string;
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
  main_image_url?: string;
  hotel_images?: Array<{
    id: string;
    image_url: string;
    is_main: boolean;
  }>;
}

export function HotelCard({
  id,
  name,
  city,
  country,
  stars = 0,
  pricePerMonth,
  themes = [],
  image,
  hotel_themes = [],
  hotel_activities = [],
  main_image_url,
  hotel_images = [],
  onClick
}: HotelCardProps) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/hotel/${id}`);
    }
  };

  // Determine the best image to display
  const getDisplayImage = () => {
    // Priority: main_image_url > first hotel_image > fallback image
    if (main_image_url) return main_image_url;
    if (hotel_images && hotel_images.length > 0) {
      const mainImage = hotel_images.find(img => img.is_main);
      return mainImage ? mainImage.image_url : hotel_images[0].image_url;
    }
    return image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070";
  };

  const displayImage = getDisplayImage();

  // Extract affinities from themes and hotel_themes
  const affinities = [...themes.map(theme => theme.name), ...(hotel_themes?.map(ht => ht.themes?.name).filter(Boolean) || [])].filter((value, index, self) => self.indexOf(value) === index);

  // Extract activities from hotel_activities
  const activities = (hotel_activities?.map(ha => ha.activities?.name).filter(Boolean) || []).filter((value, index, self) => self.indexOf(value) === index);
  
  const renderStars = (rating: number) => {
    return Array.from({
      length: 5
    }, (_, i) => <Star key={i} className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-white/30'}`} />);
  };

  return (
    <div className="relative cursor-pointer group w-full max-w-[320px] mx-auto" onClick={handleClick}>
      {/* Card with purple gradient background matching the reference */}
      <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-purple-500/20 overflow-hidden group-hover:scale-[1.02] text-white min-h-[500px] flex flex-col bg-[#061b24]/[0.98]">
        
        {/* Hotel Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={displayImage}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Heart button overlay */}
          <button 
            className="absolute top-3 right-3 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation();
              // Add favorite functionality here
            }}
          >
            <Heart className="w-4 h-4 text-white hover:text-red-400" />
          </button>

          {/* Image count indicator */}
          {hotel_images && hotel_images.length > 1 && (
            <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
              {hotel_images.length} photos
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6 flex-1 flex flex-col justify-between bg-[#7511ab]">
          {/* Header Section */}
          <div className="space-y-4">
            {/* Hotel Name and Stars */}
            <div className="space-y-2">
              <h3 className="font-bold text-xl text-white leading-tight">
                {name}
              </h3>
              
              {/* Stars */}
              <div className="flex space-x-1">
                {renderStars(stars)}
              </div>
            </div>

            {/* Location */}
            <div className="space-y-1">
              <p className="text-white font-medium text-lg">{city}</p>
              <p className="text-white/80 text-sm">{country}</p>
            </div>

            {/* Hotel Description */}
            <p className="text-white/90 text-sm leading-relaxed">
              Premium accommodation experience
            </p>

            {/* Type and Style Info */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-white/70">Type: </span>
                <span className="text-white font-medium">Hotel</span>
              </div>
              <div>
                <span className="text-white/70">Style: </span>
                <span className="text-white font-medium">Modern</span>
              </div>
            </div>

            {/* Duration and Meals */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-white/70">Duration: </span>
                <span className="text-white font-medium">32 days</span>
              </div>
              <div>
                <span className="text-white/70">Meals: </span>
                <span className="text-white font-medium">breakfast-only</span>
              </div>
            </div>

            {/* AFINIDADES Section */}
            {affinities.length > 0 && (
              <div className="space-y-3">
                <div className="text-center">
                  <span className="inline-block px-4 py-1 bg-white/20 rounded-full text-white font-semibold text-sm tracking-wide">
                    AFINIDADES
                  </span>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {affinities.slice(0, 3).map((affinity, index) => (
                    <span key={index} className="px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full text-white text-xs font-medium border border-white/20 hover:bg-white/25 transition-colors">
                      {affinity}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Section */}
          <div className="space-y-4 mt-6">
            {/* Price */}
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                ${pricePerMonth}
                <span className="text-lg font-normal text-white/80">/month</span>
              </div>
            </div>

            {/* Available Months */}
            <div className="text-center">
              <span className="text-white/70 text-sm">Available: Jan, Feb, Mar, Apr</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
