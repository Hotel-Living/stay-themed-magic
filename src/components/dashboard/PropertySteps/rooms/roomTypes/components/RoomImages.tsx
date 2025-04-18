
import React from "react";

interface RoomImagesProps {
  images: string[];
  name: string;
}

export default function RoomImages({ images, name }: RoomImagesProps) {
  if (!images || images.length === 0) return null;

  return (
    <div className="mb-3">
      <label className="text-xs mb-1 block uppercase">ROOM IMAGES</label>
      <div className="grid grid-cols-3 gap-2 mt-1">
        {images.map((imageUrl, idx) => (
          <img 
            key={idx} 
            src={imageUrl} 
            alt={`${name} image ${idx + 1}`}
            className="h-20 w-full object-cover rounded-md"
          />
        ))}
      </div>
    </div>
  );
}
