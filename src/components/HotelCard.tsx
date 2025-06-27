
import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

  // Extract affinities from themes and hotel_themes
  const affinities = [
    ...themes.map(theme => theme.name),
    ...(hotel_themes?.map(ht => ht.themes?.name).filter(Boolean) || [])
  ].filter((value, index, self) => self.indexOf(value) === index);

  // Extract activities from hotel_activities
  const activities = (hotel_activities?.map(ha => ha.activities?.name).filter(Boolean) || [])
    .filter((value, index, self) => self.indexOf(value) === index);

  // Colors for tags
  const tagColors = [
    'bg-blue-100 text-blue-800 border-blue-200',
    'bg-green-100 text-green-800 border-green-200',
    'bg-purple-100 text-purple-800 border-purple-200',
    'bg-pink-100 text-pink-800 border-pink-200',
    'bg-indigo-100 text-indigo-800 border-indigo-200',
    'bg-teal-100 text-teal-800 border-teal-200',
    'bg-orange-100 text-orange-800 border-orange-200',
    'bg-cyan-100 text-cyan-800 border-cyan-200',
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const renderTags = (items: string[], startColorIndex: number = 0) => {
    if (!items || items.length === 0) return null;
    
    return (
      <div className="flex flex-wrap justify-center gap-1.5">
        {items.map((item, index) => (
          <span
            key={index}
            className={`px-2.5 py-1 rounded-full text-xs font-medium border shadow-sm ${
              tagColors[(startColorIndex + index) % tagColors.length]
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div
      className="relative cursor-pointer group w-full max-w-sm mx-auto"
      onClick={handleClick}
    >
      {/* Card with gradient background and shadows */}
      <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 overflow-hidden group-hover:scale-[1.02]">
        
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          
          {/* Heart Icon */}
          <button className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white shadow-md transition-colors">
            <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
          </button>
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-3">
          {/* Hotel Name */}
          <h3 className="font-bold text-lg text-gray-900 line-clamp-2 leading-tight">
            {name}
          </h3>

          {/* Location */}
          <div className="space-y-0.5">
            <p className="text-gray-700 font-medium text-sm">{city}</p>
            <p className="text-gray-600 text-sm">{country}</p>
          </div>

          {/* Duration and Price */}
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">32 days</span>
            <div className="text-right">
              <span className="text-lg font-bold text-gray-900">From {pricePerMonth}</span>
              <p className="text-xs text-gray-600">p/person</p>
            </div>
          </div>

          {/* Stars */}
          <div className="flex justify-center space-x-0.5">
            {renderStars(stars)}
          </div>

          {/* AFINIDADES Section */}
          {affinities.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-gray-700 text-center uppercase tracking-wide">
                AFINIDADES
              </h4>
              {renderTags(affinities, 0)}
            </div>
          )}

          {/* ACTIVIDADES Section */}
          {activities.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-gray-700 text-center uppercase tracking-wide">
                ACTIVIDADES
              </h4>
              {renderTags(activities, 4)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
