
import React, { useState } from "react";
import { HotelImage } from "@/types/hotel";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface HotelImageGalleryProps {
  hotelImages: HotelImage[];
  hotelName: string;
}

export function HotelImageGallery({ hotelImages, hotelName }: HotelImageGalleryProps) {
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  
  // Filter out invalid images (those without valid URLs)
  const validImages = hotelImages?.filter(img => 
    img && 
    img.image_url && 
    typeof img.image_url === 'string' &&
    img.image_url.trim() !== '' &&
    !failedImages.has(img.image_url)
  ) || [];

  const handleImageError = (imageUrl: string) => {
    setFailedImages(prev => {
      const updated = new Set(prev);
      updated.add(imageUrl);
      return updated;
    });
  };

  return (
    <div className="mt-4">
      {validImages.length > 0 ? (
        <div className="relative">
          <Carousel className="w-full">
            <CarouselContent>
              {validImages.map((image, index) => (
                <CarouselItem key={image.id || index} className="flex justify-center">
                  <div className="p-1 w-full">
                    <div className="overflow-hidden rounded-xl w-full">
                      <img
                        src={image.image_url}
                        alt={`${hotelName} view ${index + 1}`}
                        className="h-72 w-full object-cover"
                        onError={() => handleImageError(image.image_url)}
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-2" />
            <CarouselNext className="absolute right-2" />
          </Carousel>
          <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
            {validImages.length} photos
          </div>
        </div>
      ) : (
        <div className="w-full h-72 bg-fuchsia-900/20 flex items-center justify-center rounded-xl">
          <p className="text-white">No images available</p>
        </div>
      )}
      
      {/* Thumbnail gallery */}
      {validImages.length > 3 && (
        <div className="mt-4 grid grid-cols-6 gap-2">
          {validImages.slice(0, 6).map((image, index) => (
            <div 
              key={`thumb-${image.id || index}`} 
              className={cn(
                "aspect-square rounded-md overflow-hidden cursor-pointer",
                index === 0 && "col-span-2 row-span-2"
              )}
            >
              <img 
                src={image.image_url}
                alt={`${hotelName} thumbnail ${index + 1}`}
                className="h-full w-full object-cover"
                onError={() => handleImageError(image.image_url)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
