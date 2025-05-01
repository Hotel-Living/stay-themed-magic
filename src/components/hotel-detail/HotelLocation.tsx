// RUTA: src/components/hotel-detail/HotelLocation.tsx

import React from "react";
import { HotelDetailProps } from "@/types/hotel";

interface Props {
  hotel: HotelDetailProps;
}

export const HotelLocation: React.FC<Props> = ({ hotel }) => {
  if (!hotel.latitude || !hotel.longitude) return null;

  const mapsUrl = `https://www.google.com/maps?q=${hotel.latitude},${hotel.longitude}&z=16&output=embed`;
  const linkUrl = `https://www.google.com/maps?q=${hotel.latitude},${hotel.longitude}`;

  return (
    <div className="space-y-2">
      <h3 className="text-xl font-semibold">Location</h3>
      <div className="rounded overflow-hidden border">
        <iframe
          src={mapsUrl}
          width="100%"
          height="180"
          loading="lazy"
          title="Google Map"
          className="border-none"
        ></iframe>
      </div>
      <a
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-blue-600 hover:underline"
      >
        View larger map
      </a>
    </div>
  );
};
