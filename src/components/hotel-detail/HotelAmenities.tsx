
import { Check } from "lucide-react";
import { HotelAmenitiesProps } from "@/types/hotel";
import { Skeleton } from "@/components/ui/skeleton";
import { Coffee } from "lucide-react";

export function HotelAmenities({ 
  features_hotel,
  features_room,
  isLoading 
}: HotelAmenitiesProps & { isLoading?: boolean }) {
  if (isLoading) {
    return (
      <div className="bg-[#5C088F] rounded-lg p-6 mb-8">
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
  
  // Process hotel features
  const hotelFeatures: string[] = [];
  if (features_hotel && typeof features_hotel === 'object') {
    Object.entries(features_hotel).forEach(([key, value]) => {
      if (value === true) {
        hotelFeatures.push(key.replace(/_/g, ' '));
      }
    });
  }
  
  // Process room features
  const roomFeatures: string[] = [];
  if (features_room && typeof features_room === 'object') {
    Object.entries(features_room).forEach(([key, value]) => {
      if (value === true) {
        roomFeatures.push(key.replace(/_/g, ' '));
      }
    });
  }
  
  // Combine all features
  const allFeatures = [...hotelFeatures, ...roomFeatures];
  const validFeatures = allFeatures.filter(feature => feature);
  
  if (validFeatures.length === 0) {
    return (
      <div className="bg-[#5C088F] rounded-lg p-6 mb-8">
        <p className="text-foreground/60 italic">No features listed for this property.</p>
      </div>
    );
  }
  
  return (
    <div className="bg-[#5C088F] rounded-lg p-6 mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {validFeatures.map((feature, index) => (
          <div key={index} className="flex items-center gap-2 group">
            <span className="w-5 h-5 rounded-full bg-fuchsia-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-fuchsia-500/30 transition-colors">
              <Check className="w-3 h-3 text-fuchsia-400" />
            </span>
            <span className="capitalize group-hover:text-fuchsia-300 transition-colors">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
