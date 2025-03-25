
import { useState, useEffect } from "react";

interface HotelGalleryProps {
  images: string[];
  hotelName: string;
}

export function HotelGallery({ images, hotelName }: HotelGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Reset active image index when images change
  useEffect(() => {
    setActiveImageIndex(0);
  }, [images]);
  
  // Fallback image for when no images are available
  const fallbackImage = "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070";
  
  // Use the provided images or fallback to a default one
  const displayImages = images && images.length > 0 ? images : [fallbackImage];
  
  return (
    <div className="glass-card rounded-2xl overflow-hidden mb-8">
      <div className="aspect-[16/9] overflow-hidden">
        <img 
          src={displayImages[activeImageIndex]} 
          alt={hotelName}
          className="w-full h-full object-cover transition-all duration-500"
          onError={(e) => {
            // If image fails to load, set src to fallback
            const target = e.target as HTMLImageElement;
            target.src = fallbackImage;
          }}
        />
      </div>
      <div className="p-4 flex gap-2 overflow-x-auto">
        {displayImages.map((image, index) => (
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
              onError={(e) => {
                // If thumbnail fails to load, set src to fallback
                const target = e.target as HTMLImageElement;
                target.src = fallbackImage;
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
