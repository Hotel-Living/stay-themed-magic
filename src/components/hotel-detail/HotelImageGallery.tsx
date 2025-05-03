
import React, { useState, useEffect } from "react";
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
  const [processedImages, setProcessedImages] = useState<HotelImage[]>([]);
  
  // Debug the incoming hotel images
  useEffect(() => {
    console.log("HotelImageGallery received images:", hotelImages);
  }, [hotelImages]);
  
  // New debug log to specifically inspect what the component is receiving
  useEffect(() => {
    console.log("📸 hotelImages received in gallery:", hotelImages);
    
    // Additional information to help debug
    if (hotelImages && Array.isArray(hotelImages)) {
      console.log("Number of images:", hotelImages.length);
      console.log("First image (if exists):", hotelImages[0]);
      
      // Check specifically for blob URLs
      const blobUrls = hotelImages.filter(img => 
        img?.image_url?.startsWith('blob:')
      );
      
      if (blobUrls.length > 0) {
        console.log("⚠️ Found blob URLs:", blobUrls.length);
        console.log("Example blob URL:", blobUrls[0]);
      }
    } else {
      console.log("⚠️ hotelImages is not an array or is undefined:", hotelImages);
    }
  }, [hotelImages]);
  
  // Filter out blob URLs and invalid images
  useEffect(() => {
    if (hotelImages && Array.isArray(hotelImages)) {
      // Filter out invalid images (those without valid URLs or blob URLs)
      const validImages = hotelImages.filter(img => 
        img && 
        img.image_url && 
        typeof img.image_url === 'string' &&
        img.image_url.trim() !== '' &&
        !img.image_url.startsWith('blob:') && // Exclude blob URLs
        !failedImages.has(img.image_url)
      );
      
      console.log("Processed hotel images:", validImages);
      setProcessedImages(validImages);
    } else {
      console.log("No valid hotel images found");
      setProcessedImages([]);
    }
  }, [hotelImages, failedImages]);

  const handleImageError = (imageUrl: string) => {
    console.log("Image failed to load:", imageUrl);
    setFailedImages(prev => {
      const updated = new Set(prev);
      updated.add(imageUrl);
      return updated;
    });
  };

  if (!processedImages || processedImages.length === 0) {
    return (
      <div className="mt-4">
        <div className="w-full h-72 bg-fuchsia-900/20 flex items-center justify-center rounded-xl">
          <p className="text-white">No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="relative">
        <Carousel className="w-full">
          <CarouselContent>
            {processedImages.map((image, index) => (
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
          {processedImages.length} photos
        </div>
      </div>
      
      {/* Thumbnail gallery */}
      {processedImages.length > 3 && (
        <div className="mt-4 grid grid-cols-6 gap-2">
          {processedImages.slice(0, 6).map((image, index) => (
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
