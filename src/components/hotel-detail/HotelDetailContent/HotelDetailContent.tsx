
import React, { useState, useEffect } from "react";
import { HotelDetailProps } from "@/types/hotel";
import { HotelHeader } from "../HotelHeader";
import { HotelGallerySection } from "./sections/HotelGallerySection";
import { HotelDescriptionSection } from "../HotelDescription";
import { HotelHighlights } from "../HotelHighlights";
import { HotelThemesAndActivities } from "../HotelThemesAndActivities";
import { BookingForm } from "@/components/BookingForm";
import { HotelAvailableMonths } from "../HotelAvailableMonths";
import { HotelFeaturesInfo } from "./sections/HotelFeaturesInfo";

export interface HotelDetailContentProps {
  hotel: HotelDetailProps;
  isLoading?: boolean;
}

export function HotelDetailContent({ hotel, isLoading = false }: HotelDetailContentProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Collect images from multiple sources: hotel_images table, photos array, and main_image_url
  const images = (() => {
    const imageUrls: string[] = [];
    
    // First, add images from hotel_images table
    if (hotel?.hotel_images?.length > 0) {
      hotel.hotel_images.forEach(img => {
        if (img.image_url && !imageUrls.includes(img.image_url)) {
          imageUrls.push(img.image_url);
        }
      });
    }
    
    // Then, add images from photos array (for backward compatibility)
    const hotelWithPhotos = hotel as any; // Type assertion to access photos array
    if (hotelWithPhotos?.photos && Array.isArray(hotelWithPhotos.photos) && hotelWithPhotos.photos.length > 0) {
      hotelWithPhotos.photos.forEach((photoUrl: string) => {
        if (photoUrl && typeof photoUrl === 'string' && !imageUrls.includes(photoUrl)) {
          imageUrls.push(photoUrl);
        }
      });
    }
    
    // Finally, add main_image_url if not already included
    if (hotel?.main_image_url && !imageUrls.includes(hotel.main_image_url)) {
      imageUrls.push(hotel.main_image_url);
    }
    
    console.log(`Hotel ${hotel?.name} image sources:`, {
      hotel_images_count: hotel?.hotel_images?.length || 0,
      photos_array_count: (hotel as any)?.photos?.length || 0,
      main_image: hotel?.main_image_url ? 'present' : 'none',
      total_images: imageUrls.length
    });
    
    return imageUrls;
  })();

  const themes = hotel?.themes || hotel?.hotel_themes?.map(ht => ht.themes).filter(Boolean) || [];
  const activities = hotel?.activities || [];

  // Convert old night values to day values for consistency with UI
  const convertNightsToDays = (nightValues: number[]) => {
    const nightToDayMap: Record<number, number> = {
      8: 8,   // 8 nights -> 8 days (special case)
      16: 15, // 16 nights -> 15 days  
      24: 22, // 24 nights -> 22 days
      32: 29  // 32 nights -> 29 days
    };
    return nightValues.map(night => nightToDayMap[night] || night);
  };
  
  const convertedStayLengths = convertNightsToDays(hotel.stay_lengths || []);

  // Create highlights from the available hotel data
  const highlights = [
    hotel?.ideal_guests && { question: "Ideal for:", answer: hotel.ideal_guests },
    hotel?.atmosphere && { question: "Atmosphere:", answer: hotel.atmosphere },
    hotel?.perfect_location && { question: "Location:", answer: hotel.perfect_location }
  ].filter(Boolean);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900 animate-pulse">
        <div className="h-96 bg-purple-800/50"></div>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-8 bg-purple-700/50 rounded"></div>
              <div className="h-64 bg-purple-700/50 rounded"></div>
              <div className="space-y-4">
                <div className="h-4 bg-purple-700/50 rounded w-3/4"></div>
                <div className="h-4 bg-purple-700/50 rounded w-1/2"></div>
              </div>
            </div>
            <div className="h-96 bg-purple-700/50 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!hotel) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900">
      <div className="relative h-96 overflow-hidden">
        {images.length > 0 && (
          <img
            src={images[currentImageIndex]}
            alt={hotel.name}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <HotelHeader hotel={hotel} />
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <HotelGallerySection 
              images={images}
              hotelName={hotel.name}
              currentImageIndex={currentImageIndex}
              setCurrentImageIndex={setCurrentImageIndex}
            />
            
            <HotelDescriptionSection 
              description={hotel.description}
              idealGuests={hotel.ideal_guests}
              atmosphere={hotel.atmosphere}
              perfectLocation={hotel.perfect_location}
            />
            
            {highlights.length > 0 && (
              <HotelHighlights highlights={highlights} />
            )}
            
            <HotelThemesAndActivities 
              stayLengths={convertedStayLengths}
              hotelThemes={themes}
              hotelActivities={activities}
            />
            
            <HotelAvailableMonths months={hotel.available_months || []} />
            
            <HotelFeaturesInfo 
              hotelFeatures={hotel.hotelFeatures || []}
              roomFeatures={hotel.roomFeatures || []}
            />
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <BookingForm 
                hotelId={hotel.id}
                hotelName={hotel.name}
                pricePerMonth={hotel.price_per_month}
                availableStayLengths={convertedStayLengths}
                availableMonths={hotel.available_months}
                preferredWeekday={hotel.check_in_weekday}
                roomTypes={hotel.room_types}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
