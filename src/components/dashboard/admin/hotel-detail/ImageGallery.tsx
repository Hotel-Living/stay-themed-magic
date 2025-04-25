
import React from "react";
import { AdminHotelDetail } from "@/types/hotel";

interface ImageGalleryProps {
  images: AdminHotelDetail['hotel_images'];
  hotel: AdminHotelDetail;
}

export function ImageGallery({ images, hotel }: ImageGalleryProps) {
  // Ensure images is always an array
  const validImages = Array.isArray(images) ? images.filter(img => img && img.image_url) : [];
  
  console.log("Processing hotel images:", validImages);
  
  return (
    <div className="rounded-xl p-6 bg-[#2A0F44]">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700">Hotel Images</h3>
      {validImages && validImages.length > 0 ? (
        <div>
          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-2">Main Image</p>
            <div className="w-full aspect-video border rounded-lg overflow-hidden">
              <img 
                src={hotel.main_image_url || validImages.find(img => img.is_main)?.image_url || validImages[0].image_url} 
                alt={`${hotel.name} - Main`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-2">All Images ({validImages.length})</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {validImages.map((image, index) => (
                <div key={image.id} className="relative aspect-square rounded-lg overflow-hidden">
                  <img 
                    src={image.image_url} 
                    alt={`${hotel.name} - ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {image.is_main && (
                    <div className="absolute top-1 right-1 bg-purple-700 text-white text-xs px-2 py-1 rounded">
                      Main
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p>No images available for this hotel.</p>
      )}
    </div>
  );
}
