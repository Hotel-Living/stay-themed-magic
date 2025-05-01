// RUTA: src/components/hotel-detail/HotelRoomTypes.tsx

import React from "react";
import { HotelDetailProps } from "@/types/hotel";

interface Props {
  hotel: HotelDetailProps;
}

export const HotelRoomTypes: React.FC<Props> = ({ hotel }) => {
  const features = hotel.featuresRoom || [];

  if (features.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-xl font-semibold">Room Features</h3>
      <ul className="flex flex-wrap gap-3 text-sm text-gray-700">
        {features.map((feature, index) => (
          <li key={index} className="px-3 py-1 bg-gray-100 rounded-full">
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};
