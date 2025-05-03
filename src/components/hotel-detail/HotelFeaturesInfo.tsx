
import React from "react";

interface HotelFeaturesInfoProps {
  hotelFeatures: string[];
  roomFeatures: string[];
}

export function HotelFeaturesInfo({ hotelFeatures, roomFeatures }: HotelFeaturesInfoProps) {
  return (
    <div className="my-6 p-4 bg-fuchsia-900/20 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-4 text-white">HOTEL FEATURES</h3>
          <div className="grid grid-cols-2 gap-2">
            {hotelFeatures && hotelFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4 text-white">ROOM FEATURES</h3>
          <div className="grid grid-cols-2 gap-2">
            {roomFeatures && roomFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
