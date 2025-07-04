
import React from "react";
import { HotelDetailProps } from "@/types/hotel";
import { HotelHeader } from "../HotelHeader";
import { HotelDescriptionSection } from "../HotelDescription";
import { HotelBookingSection } from "../HotelBookingSection";
import { HotelFeaturesInfo } from "../HotelFeaturesInfo";
import { HotelThemesAndActivities } from "../HotelThemesAndActivities";
import { HotelSkeletonLoader } from "../HotelSkeletonLoader";

export interface HotelDetailContentProps {
  hotel: HotelDetailProps;
  isLoading?: boolean;
}

export function HotelDetailContent({ hotel, isLoading = false }: HotelDetailContentProps) {
  if (isLoading) {
    return <HotelSkeletonLoader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Hotel Header */}
          <HotelHeader hotel={hotel} />
          
          {/* Hotel Description with new narrative fields */}
          <HotelDescriptionSection
            description={hotel.description}
            idealGuests={hotel.ideal_guests || hotel.idealGuests}
            atmosphere={hotel.atmosphere}
            perfectLocation={hotel.perfect_location || hotel.perfectLocation}
          />
          
          {/* Features Section */}
          <HotelFeaturesInfo 
            hotelFeatures={hotel.hotelFeatures || []}
            roomFeatures={hotel.roomFeatures || []}
          />
          
          {/* Themes and Activities */}
          <HotelThemesAndActivities 
            stayLengths={hotel.stay_lengths || []}
            hotelThemes={hotel.hotel_themes?.map(ht => ht.themes) || []}
            hotelActivities={hotel.activities || []}
          />
        </div>
      </div>
    </div>
  );
}
