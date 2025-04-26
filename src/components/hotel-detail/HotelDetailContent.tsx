
import React from "react";
import { HotelHeader } from "./HotelHeader";
import { HotelGallery } from "./HotelGallery";
import { HotelDescription } from "./HotelDescription";
import { HotelAvailableMonths } from "./HotelAvailableMonths";
import { HotelFeaturesInfo } from "./HotelFeaturesInfo";
import { HotelLocation } from "./HotelLocation";
import { HotelReviews } from "./HotelReviews";
import { HotelRoomTypes } from "./HotelRoomTypes";
import { HotelActivities } from "./HotelActivities";
import { Container } from "../ui/container";
import { HotelDetailProps } from "@/types/hotel";

export interface HotelDetailContentProps {
  hotel: HotelDetailProps;
  isLoading?: boolean;
}

export function HotelDetailContent({ hotel, isLoading = false }: HotelDetailContentProps) {
  return (
    <Container className="py-8">
      <div className="grid grid-cols-1 gap-8">
        <HotelHeader
          name={hotel.name || ""}
          stars={hotel.category || 0}
          city={hotel.city || ""}
          country={hotel.country || ""}
          themes={hotel.themes || []}
          isLoading={isLoading}
        />
        
        <HotelGallery 
          images={(hotel.hotel_images || []).map(img => img.image_url)} 
          hotelName={hotel.name || ""} 
          isLoading={isLoading} 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <HotelDescription 
              description={hotel.description || ""} 
              idealGuests={hotel.idealGuests || ""} 
              atmosphere={hotel.atmosphere || ""} 
              perfectLocation={hotel.perfectLocation || ""} 
              isLoading={isLoading} 
            />
            
            <HotelRoomTypes 
              roomTypes={hotel.room_types || []} 
              hotelId={hotel.id} 
              isLoading={isLoading} 
            />
            
            <HotelFeaturesInfo
              hotelFeatures={hotel.hotelFeatures || []}
              roomFeatures={hotel.roomFeatures || []}
            />

            <HotelActivities 
              activities={hotel.activities || []} 
            />
          </div>
          
          <div className="space-y-8">
            <HotelAvailableMonths 
              months={hotel.available_months || []} 
              isLoading={isLoading} 
            />
            
            <HotelLocation 
              latitude={Number(hotel.latitude)} 
              longitude={Number(hotel.longitude)} 
              hotelName={hotel.name || ""} 
              address={hotel.address || ""} 
            />
            
            <HotelReviews 
              hotelId={hotel.id} 
              averageRating={hotel.average_rating} 
              isLoading={isLoading} 
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
