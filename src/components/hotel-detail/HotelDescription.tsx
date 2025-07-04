
import React from "react";

interface HotelDescriptionProps {
  description: string | null;
  idealGuests?: string | null;
  atmosphere?: string | null;
  perfectLocation?: string | null;
}

export function HotelDescriptionSection({
  description,
  idealGuests,
  atmosphere,
  perfectLocation
}: HotelDescriptionProps) {
  if (!description && !idealGuests && !atmosphere && !perfectLocation) return null;

  return (
    <div className="mb-8 space-y-4">
      {description && (
        <div>
          <h2 className="text-xl font-semibold mb-2 text-white text-left">THE HOTEL AT A GLANCE...</h2>
          <p className="text-white">
            {description}
          </p>
        </div>
      )}
      
      {idealGuests && (
        <div>
          <h3 className="text-lg font-semibold mb-2 text-white text-left">IDEAL FOR</h3>
          <p className="text-white">
            {idealGuests}
          </p>
        </div>
      )}
      
      {atmosphere && (
        <div>
          <h3 className="text-lg font-semibold mb-2 text-white text-left">ATMOSPHERE</h3>
          <p className="text-white">
            {atmosphere}
          </p>
        </div>
      )}
      
      {perfectLocation && (
        <div>
          <h3 className="text-lg font-semibold mb-2 text-white text-left">PERFECT LOCATION</h3>
          <p className="text-white">
            {perfectLocation}
          </p>
        </div>
      )}
    </div>
  );
}
