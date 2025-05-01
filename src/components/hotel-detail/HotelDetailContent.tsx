// RUTA: src/components/hotel-detail/HotelDetailContent.tsx

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
import { HotelFaqs } from "./HotelFaqs";
import { HotelMealPlans } from "./HotelMealPlans";
import { HotelThemesSection } from "./HotelThemesSection";
import { Container } from "../ui/container";
import { HotelDetailProps } from "@/types/hotel";

export interface HotelDetailContentProps {
  hotel: HotelDetailProps;
  isLoading?: boolean;
}

export function HotelDetailContent({ hotel, isLoading = false }: HotelDetailContentProps) {
  const hotelThemes = hotel.hotel_themes?.map(theme => theme.themes) || [];

  return (
    <Container className="py-8">
      <div className="grid grid-cols-1 gap-8">
        <HotelHeader
          name={hotel.name || ""}
          stars={hotel.category || 0}
          city={hotel.city || ""}
          country={hotel.country || ""}
          themes={hotelThemes}
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

            <HotelThemesSection themes={hotel.hotel_themes || []} isLoading={isLoading} />
            <HotelActivities hotel={hotel} isLoading={isLoading} />
            <HotelFeaturesInfo hotel={hotel} isLoading={isLoading} />
            <HotelAvailableMonths months={hotel.available_months || []} />
            <HotelMealPlans plans={hotel.mealPlans || []} />
            <HotelFaqs faqs={hotel.faqs || []} />
          </div>

          <div className="space-y-8">
            <HotelLocation hotel={hotel} isLoading={isLoading} />
            <HotelReviews hotelId={hotel.id} />
          </div>
        </div>

        <HotelRoomTypes hotel={hotel} hotelId={hotel.id} isLoading={isLoading} />
      </div>
    </Container>
  );
}
