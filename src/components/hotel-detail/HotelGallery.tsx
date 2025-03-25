
import { useState } from "react";

interface HotelGalleryProps {
  images: string[];
  hotelName: string;
}

export function HotelGallery({ images, hotelName }: HotelGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  return (
    <div className="glass-card rounded-2xl overflow-hidden mb-8">
      <div className="aspect-[16/9] overflow-hidden">
        <img 
          src={images[activeImageIndex]} 
          alt={hotelName}
          className="w-full h-full object-cover transition-all duration-500"
        />
      </div>
      <div className="p-4 flex gap-2 overflow-x-auto">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveImageIndex(index)}
            className={`w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
              index === activeImageIndex 
                ? "ring-2 ring-fuchsia-500 opacity-100" 
                : "opacity-70 hover:opacity-100"
            }`}
          >
            <img 
              src={image} 
              alt={`${hotelName} view ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
