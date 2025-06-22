
import React from "react";
import { Check } from "lucide-react";

interface HotelFeaturesInfoProps {
  hotelFeatures: string[];
  roomFeatures: string[];
}

export function HotelFeaturesInfo({ hotelFeatures, roomFeatures }: HotelFeaturesInfoProps) {
  if (!hotelFeatures?.length && !roomFeatures?.length) return null;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-white">FEATURES & AMENITIES</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hotelFeatures?.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-3 text-white">Hotel Features</h3>
            <div className="space-y-2">
              {hotelFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-white">
                  <Check size={16} className="text-green-400 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {roomFeatures?.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-3 text-white">Room Features</h3>
            <div className="space-y-2">
              {roomFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-white">
                  <Check size={16} className="text-green-400 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
