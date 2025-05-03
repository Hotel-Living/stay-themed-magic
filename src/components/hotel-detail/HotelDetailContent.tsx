
import React, { useState } from "react";
import { HotelDetailProps } from "@/types/hotel";
import { useToast } from "@/hooks/use-toast";
import { HotelHeader } from "./HotelHeader";
import { HotelImageGallery } from "./HotelImageGallery";
import { HotelThemesAndActivities } from "./HotelThemesAndActivities";
import { HotelHighlights } from "./HotelHighlights";
import { HotelDescriptionSection } from "./HotelDescription";
import { HotelPriceBreakdown } from "./HotelPriceBreakdown";
import { HotelBookingSection } from "./HotelBookingSection";
import { HotelFeaturesInfo } from "./HotelFeaturesInfo";
import { HotelLocation } from "./HotelLocation";
import { HotelSkeletonLoader } from "./HotelSkeletonLoader";

export interface HotelDetailContentProps {
  hotel: HotelDetailProps;
  isLoading?: boolean;
}

export function HotelDetailContent({ hotel, isLoading = false }: HotelDetailContentProps) {
  const { toast } = useToast();
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(new Date());
  const [selectedDuration, setSelectedDuration] = useState<number>(8);
  
  // Default durations
  const stayDurations = hotel.stay_lengths || [8, 16, 24, 32];
  
  // Extract themes from hotel_themes for the header component
  const hotelThemes = hotel.themes || [];
  const hotelActivities = hotel.activities || [];
  
  // Format hotel highlights from the form data
  const hotelHighlights = [
    {
      question: "This hotel is perfect for:",
      answer: hotel.idealGuests || "Guests seeking a memorable stay."
    },
    {
      question: "The atmosphere of this hotel is:",
      answer: hotel.atmosphere || "Welcoming and comfortable."
    },
    {
      question: "Our location is perfect for:",
      answer: hotel.perfectLocation || "Exploring the local area and attractions."
    }
  ];
  
  const handleAddToFavorites = () => {
    toast({
      title: "Feature in development",
      description: "Adding to favorites will be available soon.",
    });
  };
  
  const handleBookClick = () => {
    toast({
      title: "Feature in development",
      description: "Online booking will be available soon.",
    });
  };
  
  if (isLoading) {
    return <HotelSkeletonLoader />;
  }

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <HotelHeader 
          hotel={hotel} 
          handleAddToFavorites={handleAddToFavorites} 
        />
        
        {/* Image Gallery */}
        <HotelImageGallery 
          hotelImages={hotel.hotel_images} 
          hotelName={hotel.name} 
        />

        <HotelThemesAndActivities 
          stayLengths={stayDurations}
          hotelThemes={hotelThemes}
          hotelActivities={hotelActivities}
        />
        
        {/* Highlights from Hotel Form */}
        <HotelHighlights highlights={hotelHighlights} />
      </div>

      {/* Calendar + Price */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          {/* General Description */}
          <HotelDescriptionSection description={hotel.description} />
          
          {/* Price breakdown moved up */}
          <HotelPriceBreakdown 
            stayLengths={stayDurations} 
            rates={hotel.rates || {}} 
            currency={hotel.currency || "USD"} 
          />
          
          {/* Features */}
          <HotelFeaturesInfo
            hotelFeatures={hotel.hotelFeatures || []}
            roomFeatures={hotel.roomFeatures || []}
          />
          
          {/* Map */}
          <div className="mt-8">
            <HotelLocation 
              latitude={Number(hotel.latitude)} 
              longitude={Number(hotel.longitude)} 
              hotelName={hotel.name} 
              address={hotel.address || ""}
            />
          </div>
        </div>

        <HotelBookingSection 
          checkInDate={checkInDate}
          setCheckInDate={setCheckInDate}
          selectedDuration={selectedDuration}
          setSelectedDuration={setSelectedDuration}
          stayDurations={stayDurations}
          rates={hotel.rates || {}}
          currency={hotel.currency || "USD"}
          handleBookClick={handleBookClick}
        />
      </div>
    </div>
  );
}
