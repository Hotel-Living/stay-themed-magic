
import React from "react";
import { Coffee } from "lucide-react";

interface AmenitiesInfoProps {
  amenities: string[];
}

export function AmenitiesInfo({ amenities }: AmenitiesInfoProps) {
  return (
    <div className="rounded-xl p-6 bg-[#2A0F44]">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700 flex items-center gap-2">
        <Coffee className="w-5 h-5 text-purple-400" />
        Amenities
      </h3>
      {amenities.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {amenities.map((amenity, index) => (
            <div key={index} className="flex items-center gap-2 p-2 bg-purple-900/20 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-purple-400"></div>
              <span>{amenity}</span>
            </div>
          ))}
        </div>
      ) : (
        <p>No amenities specified for this hotel.</p>
      )}
    </div>
  );
}
