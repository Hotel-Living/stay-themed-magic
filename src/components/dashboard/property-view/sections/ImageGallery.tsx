
import React from 'react';
import { Card } from "@/components/ui/card";
import { Hotel } from "@/integrations/supabase/types-custom";

interface ImageGalleryProps {
  hotel: Hotel;
}

export const ImageGallery = ({ hotel }: ImageGalleryProps) => {
  const hotelImages = hotel.hotel_images || [];
  
  return (
    <Card className="p-6 bg-[#2A0F44]">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700">Hotel Images</h3>
      {hotelImages.length > 0 ? (
        <div>
          <p className="text-sm text-gray-400 mb-2">Main Image</p>
          <div className="mb-4 w-full aspect-video rounded-lg overflow-hidden">
            <img 
              src={hotel.main_image_url || hotelImages.find(img => img.is_main)?.image_url || hotelImages[0].image_url} 
              alt={`${hotel.name} - Main`}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-sm text-gray-400 mb-2">All Images ({hotelImages.length})</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {hotelImages.map((image) => (
              <div key={image.id} className="relative aspect-square rounded-lg overflow-hidden">
                <img 
                  src={image.image_url} 
                  alt={`${hotel.name} - Gallery Image`}
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
      ) : (
        <p>No images available for this hotel.</p>
      )}
    </Card>
  );
};
