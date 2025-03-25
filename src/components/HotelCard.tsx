
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { HotelThemes } from "./ThemeTag";
import { Theme } from "@/utils/data";

// Define the props interface that matches how the component is being used
export interface HotelCardProps {
  id: string;
  name: string;
  city: string;
  country: string;
  stars: number;
  pricePerMonth: number;
  themes: string[] | Theme[];
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
  image 
}: HotelCardProps) {
  // Convert string themes to Theme objects if needed
  const themeObjects = themes.map(theme => {
    if (typeof theme === 'string') {
      return { id: theme, name: theme, category: 'Unknown' } as Theme;
    }
    return theme;
  });

  return (
    <Link 
      to={`/hotel/${id}`} 
      className="group block animate-fade-in"
    >
      <div className="glass-card-hover overflow-hidden rounded-2xl transition-all duration-500 group-hover:shadow-[0_10px_30px_rgba(217,70,239,0.3)]">
        <div className="aspect-[4/3] overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10"></div>
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute top-3 left-3 rounded-full bg-black/40 backdrop-blur-md px-3 py-1 flex items-center gap-1 z-20">
            {Array.from({ length: stars }).map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-fuchsia-400 text-fuchsia-400" />
            ))}
          </div>
        </div>
        
        <div className="p-5">
          <div className="mb-2">
            <HotelThemes themes={themeObjects.slice(0, 2)} size="sm" />
            {themeObjects.length > 2 && (
              <span className="text-xs text-fuchsia-400 ml-2">+{themeObjects.length - 2} more</span>
            )}
          </div>
          
          <h3 className="text-xl font-bold mb-1 group-hover:text-fuchsia-300 transition-colors">{name}</h3>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <span>{city}, {country}</span>
          </div>
          
          <p className="text-sm text-foreground/80 mb-4 line-clamp-2"></p>
          
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-gradient">${pricePerMonth}/month</div>
            <span className="text-xs text-fuchsia-400 px-3 py-1 rounded-full bg-fuchsia-400/10 border border-fuchsia-400/20">
              Available
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
