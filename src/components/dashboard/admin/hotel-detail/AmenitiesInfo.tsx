
import React from "react";
import { Coffee } from "lucide-react";

interface AmenitiesInfoProps {
  features_hotel: any;
  features_room: any;
}

export function AmenitiesInfo({ features_hotel, features_room }: AmenitiesInfoProps) {
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
  
  return (
    <div className="rounded-xl p-6 bg-[#2A0F44]">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700 flex items-center gap-2">
        <Coffee className="w-5 h-5 text-purple-400" />
        Hotel & Room Features
      </h3>
      {validFeatures && validFeatures.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {validFeatures.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 p-2 bg-purple-900/20 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-purple-400"></div>
              <span className="capitalize">{feature}</span>
            </div>
          ))}
        </div>
      ) : (
        <p>No features specified for this hotel.</p>
      )}
    </div>
  );
}
