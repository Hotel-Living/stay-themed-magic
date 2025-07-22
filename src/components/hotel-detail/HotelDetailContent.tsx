
import React from "react";
import { HotelDetailProps } from "@/types/hotel/detail";
import { HotelHeader } from "./HotelDetailContent/HotelHeader";
import { HotelGallery } from "./HotelGallery";
import { HotelAvailableMonths } from "./HotelAvailableMonths";
import { HotelReviews } from "./HotelReviews";
import { HotelDescriptionSection } from "./HotelDescription";
import { HotelFeaturesInfo } from "./HotelFeaturesInfo";
import { HotelAmenitiesSection } from "./HotelAmenitiesSection";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface HotelDetailContentProps {
  hotel: HotelDetailProps;
  isLoading?: boolean;
}

export function HotelDetailContent({ hotel, isLoading }: HotelDetailContentProps) {
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#8B5CF6] to-[#3B82F6] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const handleBooking = () => {
    // Simple booking handler - can be enhanced later
    console.log("Booking hotel:", hotel.name);
    // Add booking logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8B5CF6] to-[#3B82F6]">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hotel Header */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <HotelHeader hotel={hotel} />
            </div>

            {/* Hotel Gallery */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <HotelGallery 
                images={hotel.hotel_images?.map(img => img.url) || []} 
                hotelName={hotel.name}
              />
            </div>

            {/* Hotel Description */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <HotelDescriptionSection
                description={hotel.description}
                idealGuests={hotel.ideal_guests}
                atmosphere={hotel.atmosphere}
                perfectLocation={hotel.perfect_location}
              />
            </div>

            {/* Hotel Features */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <HotelFeaturesInfo
                hotelFeatures={hotel.hotelFeatures || []}
                roomFeatures={hotel.roomFeatures || []}
              />
            </div>

            {/* Hotel Amenities */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <HotelAmenitiesSection
                bankingInfo={hotel.banking_info}
                laundryService={hotel.laundry_service}
                additionalAmenities={hotel.additional_amenities}
                specialFeatures={hotel.special_features}
                accessibilityFeatures={hotel.accessibility_features}
                checkInInstructions={hotel.check_in_instructions}
                localRecommendations={hotel.local_recommendations}
                houseRules={hotel.house_rules}
                cancellationPolicy={hotel.cancellation_policy}
              />
            </div>

            {/* Hotel Reviews */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <HotelReviews hotelId={hotel.id} averageRating={hotel.average_rating} />
            </div>
          </div>

          {/* Right Column - Booking Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 sticky top-8">
              <div className="space-y-6">
                {/* Price */}
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">
                    ${hotel.price_per_month}
                  </div>
                  <div className="text-white/70">per month</div>
                </div>

                {/* Available Months */}
                <HotelAvailableMonths months={hotel.available_months || []} />

                {/* Booking Button */}
                <Button 
                  onClick={handleBooking}
                  className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Now
                </Button>

                {/* Hotel Stats */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-lg font-semibold text-white">
                      {hotel.category ? "★".repeat(hotel.category) : "N/A"}
                    </div>
                    <div className="text-sm text-white/70">Rating</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-lg font-semibold text-white">
                      {hotel.average_rating ? hotel.average_rating.toFixed(1) : "N/A"}
                    </div>
                    <div className="text-sm text-white/70">Reviews</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
