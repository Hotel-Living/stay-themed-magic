
import { Star, MapPin } from "lucide-react";
import { HotelThemes } from "@/components/ThemeTag";
import { HotelHeaderProps, HotelTheme } from "@/types/hotel";
import { Skeleton } from "@/components/ui/skeleton";

// Add activities prop type
interface HotelHeaderWithActivitiesProps extends HotelHeaderProps {
  activities?: string[];
  isLoading?: boolean;
}

export function HotelHeader({
  name,
  stars,
  city,
  country,
  themes,
  activities,
  isLoading
}: HotelHeaderWithActivitiesProps) {
  if (isLoading) {
    return (
      <div className="mb-8">
        <Skeleton className="h-10 w-3/4 mb-2" />
        <div className="flex items-center gap-3 mb-4">
          <Skeleton className="h-5 w-32" />
        </div>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-24 rounded-full" />
          ))}
        </div>
      </div>
    );
  }

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
      {/* Only city/country in first row */}
      <div className="flex items-center gap-3 text-muted-foreground mb-4">
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4 text-fuchsia-400" />
          <span>{city}, {country}</span>
        </div>
      </div>
      {/* Affinities (themes) & Activities in one line below */}
      <div className="flex flex-wrap items-center gap-2">
        <HotelThemes themes={themes} />
        {/* Activities chip style */}
        {activities && activities.length > 0 &&
          activities.map((activity, idx) => (
            <span key={activity + idx} className="px-2 py-1 text-xs rounded-full bg-emerald-900/60 text-white">{activity}</span>
          ))}
      </div>
    </div>
  );
}
