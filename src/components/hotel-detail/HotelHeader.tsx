
import { Star, MapPin, Calendar } from "lucide-react";
import { HotelThemesDisplay } from "@/components/HotelThemes";

interface HotelHeaderProps {
  name: string;
  stars: number;
  city: string;
  country: string;
  availableMonthsCount: number;
  themes: any[];
}

export function HotelHeader({ 
  name, 
  stars, 
  city, 
  country, 
  availableMonthsCount, 
  themes 
}: HotelHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
        {name}
        <div className="flex items-center">
          {Array.from({ length: stars }).map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-fuchsia-400 text-fuchsia-400" />
          ))}
        </div>
      </h1>
      
      <div className="flex items-center gap-3 text-muted-foreground mb-4">
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4 text-fuchsia-400" />
          <span>{city}, {country}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4 text-fuchsia-400" />
          <span>{availableMonthsCount} available months</span>
        </div>
      </div>
      
      <HotelThemesDisplay themes={themes} />
    </div>
  );
}
