// RUTA: src/components/hotel-detail/HotelGallery.tsx

import React from "react";

interface Props {
  images: { image_url: string }[];
}

export const HotelGallery: React.FC<Props> = ({ images }) => {
  if (!images || images.length === 0) return null;

  const mainImage = images[0].image_url;
  const otherImages = images.slice(1);

  return (
    <div className="space-y-4">
      <img
        src={mainImage}
        alt="Main hotel"
        className="w-full h-64 object-cover rounded-xl shadow-md"
      />
      {otherImages.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {otherImages.map((img, index) => (
            <img
              key={index}
              src={img.image_url}
              alt={`Hotel view ${index + 1}`}
              className="w-full h-32 object-cover rounded"
            />
          ))}
        </div>
      )}
    </div>
  );
};
