
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card className="overflow-hidden">
      <CardHeader className="bg-fuchsia-950/40 pb-4">
        <CardTitle className="text-xl font-bold">Hotel Features</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {hotelFeatures && hotelFeatures.length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-3">Property Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {hotelFeatures.map((feature) => (
                  <span 
                    key={feature} 
                    className="px-3 py-1 bg-fuchsia-900/20 rounded-full text-sm"
                  >
                    {formatFeatureName(feature)}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {roomFeatures && roomFeatures.length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-3">Room Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {roomFeatures.map((feature) => (
                  <span 
                    key={feature} 
                    className="px-3 py-1 bg-fuchsia-900/20 rounded-full text-sm"
                  >
                    {formatFeatureName(feature)}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
