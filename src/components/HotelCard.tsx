
import { Link } from "react-router-dom";
import { ThemeTag } from "./ThemeTag";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { FavoriteButton } from "./FavoriteButton";

interface HotelCardProps {
  id: string;
  name: string;
  city: string;
  country: string;
  stars: number;
  pricePerMonth: number;
  themes: string[];
  image: string;
}

export function HotelCard({
  id,
  name,
  city,
  country,
  stars,
  pricePerMonth,
  themes,
  image,
}: HotelCardProps) {
  return (
    <div className="group relative glass-card overflow-hidden rounded-xl flex flex-col">
      {/* Favorite button */}
      <div className="absolute top-2 right-2 z-10">
        <FavoriteButton hotelId={id} />
      </div>
      
      {/* Image container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        {/* Location indicator */}
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
          <div className="text-white text-sm">
            {city}, {country}
          </div>
          
          {/* Stars */}
          <div className="flex items-center space-x-1 bg-black/30 py-1 px-2 rounded-lg">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span className="text-white text-xs font-medium">{stars}</span>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 p-4">
        <Link to={`/hotel/${id}`} className="group-hover:text-fuchsia-400 transition-colors">
          <h3 className="font-bold text-lg mb-2 line-clamp-1">{name}</h3>
        </Link>
        
        {/* Theme tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {themes.slice(0, 3).map((theme) => (
            <ThemeTag key={theme} theme={theme} small />
          ))}
          {themes.length > 3 && (
            <span className="text-white/70 text-xs px-1.5">+{themes.length - 3}</span>
          )}
        </div>
        
        {/* Price */}
        <div className="mt-auto">
          <div className="flex justify-between items-baseline">
            <div className="text-fuchsia-400 font-semibold">${pricePerMonth.toLocaleString()}</div>
            <div className="text-white/70 text-sm">per month</div>
          </div>
        </div>
      </div>
      
      {/* Link */}
      <Link
        to={`/hotel/${id}`}
        className={cn(
          "absolute inset-0 z-10",
          // Make the favorite button still clickable by adding negative margin/padding to this link
          "ml-12 mt-12"
        )}
        aria-label={`View details for ${name}`}
      ></Link>
    </div>
  );
}
