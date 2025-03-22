
import { Link } from "react-router-dom";
import { Hotel } from "@/utils/data";
import { HotelThemes } from "./ThemeTag";
import { Star } from "lucide-react";

interface HotelCardProps {
  hotel: Hotel;
}

export function HotelCard({ hotel }: HotelCardProps) {
  return (
    <Link 
      to={`/hotel/${hotel.id}`} 
      className="group block animate-fade-in"
    >
      <div className="glass-card-hover overflow-hidden rounded-2xl transition-all duration-500 group-hover:shadow-[0_10px_30px_rgba(217,70,239,0.3)]">
        <div className="aspect-[4/3] overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10"></div>
          <img 
            src={hotel.images[0]} 
            alt={hotel.name}
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute top-3 left-3 rounded-full bg-black/40 backdrop-blur-md px-3 py-1 flex items-center gap-1 z-20">
            {Array.from({ length: hotel.stars }).map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-fuchsia-400 text-fuchsia-400" />
            ))}
          </div>
        </div>
        
        <div className="p-5">
          <div className="mb-2">
            <HotelThemes themes={hotel.themes.slice(0, 2)} size="sm" />
            {hotel.themes.length > 2 && (
              <span className="text-xs text-fuchsia-400 ml-2">+{hotel.themes.length - 2} more</span>
            )}
          </div>
          
          <h3 className="text-xl font-bold mb-1 group-hover:text-fuchsia-300 transition-colors">{hotel.name}</h3>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <span>{hotel.city}, {hotel.country}</span>
          </div>
          
          <p className="text-sm text-foreground/80 mb-4 line-clamp-2">{hotel.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-gradient">${hotel.pricePerMonth}/month</div>
            <span className="text-xs text-fuchsia-400 px-3 py-1 rounded-full bg-fuchsia-400/10 border border-fuchsia-400/20">
              Available
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
