
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
          <p className="text-white">
            <span className="font-semibold">ES IDEAL PARA QUIENES DISFRUTAN DE</span> {idealGuests}
          </p>
        </div>
      )}
      
      {atmosphere && (
        <div>
          <p className="text-white">
            <span className="font-semibold">EL AMBIENTE ES</span> {atmosphere}
          </p>
        </div>
      )}
      
      {perfectLocation && (
        <div>
          <p className="text-white">
            <span className="font-semibold">LA UBICACIÓN ES PERFECTA PARA</span> {perfectLocation}
          </p>
        </div>
      )}
    </div>
  );
}
