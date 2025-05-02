
import { Star, MapPin } from "lucide-react";
import { HotelThemes } from "@/components/ThemeTag";
import { HotelHeaderProps, HotelTheme } from "@/types/hotel";
import { Skeleton } from "@/components/ui/skeleton";

interface HotelHeaderWithActivitiesProps extends HotelHeaderProps {
  activities?: string[];
  address?: string | null;
  isLoading?: boolean;
}

// Formats affinities with Oxford-comma and "and".
function formatAffinities(themes: HotelTheme[]): string {
  if (!themes || themes.length === 0) return "";
  const names = themes.map((theme) => theme.name).filter(Boolean);
  if (names.length === 0) return "";
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return names.slice(0, -1).join(", ") + " and " + names[names.length - 1];
}

export function HotelHeader({
  name,
  stars,
  city,
  country,
  address,
  themes,
  activities,
  isLoading
}: HotelHeaderWithActivitiesProps) {
  if (isLoading) {
    return (
      <div className="mb-8 bg-[#5C088F] rounded-lg p-6">
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

  // Compose city, country, and address in a single line
  const addressParts = [city, country, address].filter(Boolean);
  const showAddressLine = addressParts.join(", ");

  // Friendly affinity text
  const affinityText = formatAffinities(themes);

  return (
    <div className="mb-8 bg-[#5C088F] rounded-lg p-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3 text-white">
        {name}
        <div className="flex items-center">
          {Array.from({ length: stars }).map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-fuchsia-400 text-fuchsia-400" />
          ))}
        </div>
      </h1>
      <div className="flex items-center gap-1 text-fuchsia-300 mb-2">
        <MapPin className="w-4 h-4 text-fuchsia-300" />
        <span>{showAddressLine}</span>
      </div>
      {/* Affinity/Welcome Line, blank if none */}
      <div className="mb-2 text-white min-h-[1.5em]">
        {affinityText
          ? <>A warm welcome to all who share a passion for {affinityText}</>
          : <>&nbsp;</>
        }
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <HotelThemes themes={themes} />
        {activities && activities.length > 0 &&
          activities.map((activity, idx) => (
            <span key={activity + idx} className="px-2 py-1 text-xs rounded-full bg-emerald-900/60 text-white">{activity}</span>
          ))}
      </div>
    </div>
  );
}

