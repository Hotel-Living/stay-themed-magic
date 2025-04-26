
import React from "react";
import { HotelHeader } from "./HotelHeader";
import { HotelGallery } from "./HotelGallery";
import { HotelDescription } from "./HotelDescription";
import { HotelFeaturesInfo } from "./HotelFeaturesInfo";
import { HotelLocation } from "./HotelLocation";
import { HotelReviews } from "./HotelReviews";
import { HotelAvailableMonths } from "./HotelAvailableMonths";
import { HotelActivities } from "./HotelActivities";
import { Container } from "../ui/container";
import { HotelDetailContentProps } from "@/types/hotel";
import { HotelRoomTypes } from "./HotelRoomTypes";
import { Skeleton } from "@/components/ui/skeleton";

export function HotelDetailContent({ hotel, isLoading = false }: HotelDetailContentProps) {
  const images = hotel.hotel_images?.map(img => img.image_url) || [];

  if (isLoading) {
    return (
      <Container className="py-8">
        <div className="space-y-8">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-96 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-80 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
            <div className="space-y-8">
              <Skeleton className="h-96 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
          </div>
        </div>
      </Container>
    );
  }

  const themes = hotel.hotel_themes?.map(t => t.themes) || [];
  
  return (
    <Container className="py-8">
      <HotelHeader
        name={hotel.name}
        stars={hotel.category || 0}
        city={hotel.city}
        country={hotel.country}
        themes={themes}
      />
      
      <div className="mt-6">
        <HotelGallery images={images} hotelName={hotel.name} />
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <HotelDescription
            description={hotel.description || ""}
            idealGuests={hotel.idealGuests || ""}
            atmosphere={hotel.atmosphere || ""}
            perfectLocation={hotel.perfectLocation || ""}
          />
          
          <HotelRoomTypes hotel={hotel} />
          
          <HotelFeaturesInfo 
            hotelFeatures={hotel.hotelFeatures || []}
            roomFeatures={hotel.roomFeatures || []}
          />
          
          {hotel.latitude && hotel.longitude && (
            <HotelLocation
              latitude={Number(hotel.latitude)}
              longitude={Number(hotel.longitude)}
              hotelName={hotel.name}
              address={hotel.address || ""}
            />
          )}
          
          <HotelActivities activities={hotel.activities || []} />
        </div>
        
        <div className="space-y-8">
          <HotelAvailableMonths months={hotel.available_months || []} />
          
          <HotelReviews hotelId={hotel.id} averageRating={hotel.average_rating} />
        </div>
      </div>
    </Container>
  );
}
