
import React from "react";
import { HotelDetailProps } from "@/types/hotel";
import { HotelHeader } from "./HotelHeader";
import { HotelDescriptionSection } from "../HotelDescription";
import { HotelImageGallery } from "./HotelImageGallery";
import { HotelBookingSection } from "./HotelBookingSection";
import { HotelFeatures } from "./HotelFeatures";
import { HotelThemesDisplay } from "./HotelThemesDisplay";
import { HotelActivitiesDisplay } from "./HotelActivitiesDisplay";
import { LoadingState } from "./LoadingState";

export interface HotelDetailContentProps {
  hotel: HotelDetailProps;
  isLoading?: boolean;
}

export function HotelDetailContent({ hotel, isLoading = false }: HotelDetailContentProps) {
  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Hotel Header */}
          <HotelHeader hotel={hotel} />
          
          {/* Main Image Gallery */}
          <HotelImageGallery hotel={hotel} />
          
          {/* Hotel Description with new narrative fields */}
          <HotelDescriptionSection
            description={hotel.description}
            idealGuests={hotel.ideal_guests || hotel.idealGuests}
            atmosphere={hotel.atmosphere}
            perfectLocation={hotel.perfect_location || hotel.perfectLocation}
          />
          
          {/* Booking Section */}
          <HotelBookingSection hotel={hotel} />
          
          {/* Features Section */}
          <HotelFeatures hotel={hotel} />
          
          {/* Themes Display */}
          <HotelThemesDisplay hotel={hotel} />
          
          {/* Activities Display */}
          <HotelActivitiesDisplay hotel={hotel} />
        </div>
      </div>
    </div>
  );
}
