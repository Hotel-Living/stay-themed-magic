// RUTA: src/components/hotel-detail/HotelHeader.tsx

import React from "react";
import { HotelDetailProps } from "@/types/hotel";
import { Star } from "lucide-react";

interface Props {
  hotel: HotelDetailProps;
}

export const HotelHeader: React.FC<Props> = ({ hotel }) => {
  const stars = Array.from({ length: hotel.category || 0 });

  return (
    <div className="space-y-2">
      {/* Hotel Name + Stars */}
      <h1 className="text-2xl font-semibold flex items-center gap-2">
        {hotel.name}
        <span className="flex gap-1 text-yellow-500">
          {stars.map((_, i) => (
            <Star key={i} size={18} fill="currentColor" />
          ))}
        </span>
      </h1>

      {/* Address */}
      {hotel.address && (
        <p className="text-sm text-gray-600">{hotel.address}</p>
      )}

      {/* Affinities */}
      {hotel.hotel_themes?.length > 0 && (
        <p className="text-sm text-gray-700">
          <strong>Affinities:</strong> {hotel.hotel_themes.map(t => t.themes?.name).filter(Boolean).join(" · ")}
        </p>
      )}

      {/* Activities */}
      {hotel.hotel_activities?.length > 0 && (
        <p className="text-sm text-gray-700">
          <strong>Activities:</strong> {hotel.hotel_activities.map(a => a.activities?.name).filter(Boolean).join(" · ")}
        </p>
      )}

      {/* Ideal for */}
      {hotel.idealGuests && (
        <p className="text-sm text-gray-700">
          <strong>This hotel is ideal for guests who enjoy:</strong> {hotel.idealGuests}
        </p>
      )}

      {/* Atmosphere */}
      {hotel.atmosphere && (
        <p className="text-sm text-gray-700">
          <strong>Atmosphere:</strong> {hotel.atmosphere}
        </p>
      )}

      {/* Perfect location */}
      {hotel.perfectLocation && (
        <p className="text-sm text-gray-700">
          <strong>Our location is perfect for:</strong> {hotel.perfectLocation}
        </p>
      )}
    </div>
  );
};
