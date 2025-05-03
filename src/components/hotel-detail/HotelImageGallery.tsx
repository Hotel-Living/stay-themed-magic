
import React from "react";
import { HotelImage } from "@/types/hotel";

interface HotelImageGalleryProps {
  hotelImages: HotelImage[];
  hotelName: string;
}

export function HotelImageGallery({ hotelImages, hotelName }: HotelImageGalleryProps) {
  return (
    <div className="mt-4">
      <div className="rounded-xl overflow-hidden">
        {(hotelImages && hotelImages.length > 0) ? (
          <div className="relative">
            <img
              src={hotelImages[0].image_url}
              alt={`${hotelName}`}
              className="w-full h-72 object-cover"
            />
            {hotelImages.length > 1 && (
              <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                +{hotelImages.length - 1} more
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-72 bg-fuchsia-900/20 flex items-center justify-center rounded-xl">
            <p className="text-fuchsia-300">No images available</p>
          </div>
        )}
      </div>
    </div>
  );
}
