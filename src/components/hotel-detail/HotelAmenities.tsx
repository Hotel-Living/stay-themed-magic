
import { Check } from "lucide-react";
import { HotelAmenitiesProps } from "@/types/hotel";
import { Skeleton } from "@/components/ui/skeleton";
import { Coffee } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function HotelAmenities({ 
  amenities,
  isLoading 
}: HotelAmenitiesProps & { isLoading?: boolean }) {
  const { t } = useLanguage();
  
  if (isLoading) {
    return (
      <div className="glass-card rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-5 w-5 rounded-full" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton className="w-5 h-5 rounded-full flex-shrink-0" />
              <Skeleton className="h-5 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  if (!amenities || amenities.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          {t("hotel.amenities")}
          <Coffee className="w-5 h-5 text-fuchsia-400" />
        </h2>
        <p className="text-foreground/60 italic">{t("hotel.noamenities")}</p>
      </div>
    );
  }
  
  return (
    <div className="glass-card rounded-2xl p-6 mb-8">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        {t("hotel.amenities")}
        <Coffee className="w-5 h-5 text-fuchsia-400" />
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {amenities.map((amenity, index) => (
          <div key={index} className="flex items-center gap-2 group">
            <span className="w-5 h-5 rounded-full bg-fuchsia-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-fuchsia-500/30 transition-colors">
              <Check className="w-3 h-3 text-fuchsia-400" />
            </span>
            <span className="group-hover:text-fuchsia-300 transition-colors">{amenity}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
