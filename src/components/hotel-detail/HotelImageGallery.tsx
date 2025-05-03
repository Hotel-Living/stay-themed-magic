
import React from "react";
import { HotelImage } from "@/types/hotel";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";

interface HotelImageGalleryProps {
  hotelImages: HotelImage[];
  hotelName: string;
}

export function HotelImageGallery({ hotelImages, hotelName }: HotelImageGalleryProps) {
  return (
    <div className="mt-4">
      {(hotelImages && hotelImages.length > 0) ? (
        <div className="relative">
          <Carousel className="w-full">
            <CarouselContent>
              {hotelImages.map((image, index) => (
                <CarouselItem key={image.id || index}>
                  <div className="p-1">
                    <div className="overflow-hidden rounded-xl">
                      <img
                        src={image.image_url}
                        alt={`${hotelName} view ${index + 1}`}
                        className="h-72 w-full object-cover"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2">
              <CarouselPrevious className="relative -left-0" />
              <CarouselNext className="relative -right-0" />
            </div>
          </Carousel>
          <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
            {hotelImages.length} photos
          </div>
        </div>
      ) : (
        <div className="w-full h-72 bg-fuchsia-900/20 flex items-center justify-center rounded-xl">
          <p className="text-fuchsia-300">No images available</p>
        </div>
      )}
    </div>
  );
}
