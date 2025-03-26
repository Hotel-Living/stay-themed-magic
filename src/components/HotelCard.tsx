import { useNavigate } from "react-router-dom";
import { Star, StarHalfIcon, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { LinkButton } from "@/components/ui/link-button";
import { Image } from "@/components/ui/image";
import { FavoriteButton } from "@/components/FavoriteButton";

export interface HotelCardProps {
  id: string;
  name: string;
  city: string;
  country: string;
  stars: number;
  pricePerMonth: number;
  image?: string;
  themes?: string[];
  category?: string;
  unavailable?: boolean;
  imageLoading?: 'lazy' | 'eager';
  availableMonths?: string[];
}

export function HotelCard({ 
  id, 
  name, 
  city, 
  country, 
  stars, 
  pricePerMonth, 
  image, 
  themes = [],
  category,
  unavailable = false,
  imageLoading = 'lazy',
  availableMonths = []
}: HotelCardProps) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (!unavailable) {
      navigate(`/hotel/${id}`);
    }
  };
  
  return (
    <div 
      className={cn(
        "glass-card rounded-xl overflow-hidden transition-all hover:shadow-2xl relative",
        unavailable ? "opacity-60 cursor-not-allowed" : "cursor-pointer hover:scale-[1.02]"
      )}
      onClick={handleClick}
    >
      {!unavailable && (
        <div className="absolute top-2 right-2 z-10">
          <FavoriteButton hotelId={id} />
        </div>
      )}

      <div className="h-48 relative">
        <Image
          src={image || "/images/placeholder-hotel.jpg"}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          loading={imageLoading}
        />
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent pt-12 pb-2 px-4">
          <div className="flex items-center">
            {[...Array(Math.floor(stars))].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            ))}
            {stars % 1 !== 0 && (
              <StarHalfIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            )}
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{name}</h3>
        <p className="text-white/70 text-sm mb-2">{city}, {country}</p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {themes.slice(0, 3).map((theme, index) => (
            <span 
              key={index}
              className="text-xs px-2 py-0.5 bg-fuchsia-500/20 rounded-full"
            >
              {theme}
            </span>
          ))}
          {themes.length > 3 && (
            <span className="text-xs px-2 py-0.5 bg-fuchsia-500/10 rounded-full">
              +{themes.length - 3} more
            </span>
          )}
        </div>
        
        <div className="flex justify-between items-center mt-2">
          <div>
            <span className="font-bold text-xl">${pricePerMonth}</span>
            <span className="text-white/70 text-sm"> /month</span>
          </div>
          <LinkButton className="text-xs">
            View Details
            <ChevronRight className="h-3 w-3" />
          </LinkButton>
        </div>
      </div>
    </div>
  );
}

export function HotelCardSkeleton() {
  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="h-48 bg-white/5 animate-pulse"></div>
      <div className="p-4 space-y-3">
        <div className="h-6 w-3/4 bg-white/10 rounded animate-pulse"></div>
        <div className="h-4 w-1/2 bg-white/10 rounded animate-pulse"></div>
        <div className="flex gap-2">
          <div className="h-5 w-16 bg-white/10 rounded-full animate-pulse"></div>
          <div className="h-5 w-16 bg-white/10 rounded-full animate-pulse"></div>
        </div>
        <div className="flex justify-between pt-2">
          <div className="h-5 w-20 bg-white/10 rounded animate-pulse"></div>
          <div className="h-4 w-16 bg-white/10 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
