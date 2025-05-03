
import React from "react";
import { Badge } from "@/components/ui/badge";
import { HotelFeaturesInfoProps } from "@/types/hotel";

export function HotelFeaturesInfo({ hotelFeatures, roomFeatures }: HotelFeaturesInfoProps) {
  // Function to format feature name for display (convert snake_case to Title Case)
  const formatFeatureName = (feature: string): string => {
    return feature
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if ((!hotelFeatures || hotelFeatures.length === 0) && (!roomFeatures || roomFeatures.length === 0)) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      {hotelFeatures && hotelFeatures.length > 0 && (
        <div>
          <h3 className="font-semibold text-white mb-2">Hotel features</h3>
          <div className="flex flex-wrap gap-2">
            {hotelFeatures.map((feature) => (
              <Badge 
                key={feature} 
                className="hover:scale-105 transition-all duration-200"
              >
                {formatFeatureName(feature)}
              </Badge>
            ))}
          </div>
        </div>
      )}
      
      {roomFeatures && roomFeatures.length > 0 && (
        <div>
          <h3 className="font-semibold text-white mb-2">Room features</h3>
          <div className="flex flex-wrap gap-2">
            {roomFeatures.map((feature) => (
              <Badge 
                key={feature} 
                className="hover:scale-105 transition-all duration-200"
              >
                {formatFeatureName(feature)}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
