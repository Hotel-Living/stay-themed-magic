import React from "react";
import { HotelDetailProps } from "@/types/hotel";
import { HotelFeaturesInfo } from "../HotelFeaturesInfo";
import { HotelLocation } from "../HotelLocation";
import { RedesignedBookingSection } from "../RedesignedBookingSection";
import { HotelNotificationButtons } from "../HotelNotificationButtons";
import { Card } from "@/components/ui/card";
interface HotelMainContentGridProps {
  hotel: HotelDetailProps;
  checkInDate: Date | undefined;
  setCheckInDate: (date: Date | undefined) => void;
  selectedDuration: number;
  setSelectedDuration: (duration: number) => void;
  stayDurations: number[];
  preparedRates: Record<string, number>;
  handleBookClick: () => void;
  checkInWeekday: string;
  pricingMatrix: Array<{
    roomType: string;
    stayLength: string;
    mealPlan: string;
    price: number;
  }>;
  isHotelAvailable: boolean;
}
export function HotelMainContentGrid({
  hotel,
  checkInDate,
  setCheckInDate,
  selectedDuration,
  setSelectedDuration,
  stayDurations,
  preparedRates,
  handleBookClick,
  checkInWeekday,
  pricingMatrix,
  isHotelAvailable
}: HotelMainContentGridProps) {
  return <div className="grid lg:grid-cols-3 gap-8">
      {/* Left content area - Features and Map */}
      <div className="lg:col-span-2 space-y-8">
        {/* Hotel Features and Room Features */}
        <Card className="bg-gradient-to-br from-gold-900/40 to-gold-800/30 border-gold-700/30 shadow-2xl">
          <div className="p-6 bg-gold-800">
            <HotelFeaturesInfo hotelFeatures={hotel.hotelFeatures || []} roomFeatures={hotel.roomFeatures || []} />
          </div>
        </Card>
        
        {/* Google Map Section */}
        <Card className="bg-gradient-to-br from-gold-900/40 to-gold-800/30 border-gold-700/30 shadow-2xl">
          <div className="p-6 bg-gold-800">
            <h2 className="text-2xl font-bold mb-6 text-white text-center">HOTEL LOCATION</h2>
            <HotelLocation hotelId={hotel.id} latitude={Number(hotel.latitude)} longitude={Number(hotel.longitude)} hotelName={hotel.name} address={hotel.address || ""} city={hotel.city || ""} country={hotel.country || ""} />
          </div>
        </Card>
      </div>

      {/* Right sidebar - Booking Widget */}
      <div className="lg:col-span-1">
        <div className="sticky top-4 bg-card">
          <RedesignedBookingSection checkInDate={checkInDate} setCheckInDate={setCheckInDate} selectedDuration={selectedDuration} setSelectedDuration={setSelectedDuration} stayDurations={stayDurations} rates={preparedRates} currency={hotel.currency || "USD"} handleBookClick={handleBookClick} preferredWeekday={checkInWeekday} enable_price_increase={hotel.enable_price_increase} price_increase_cap={hotel.price_increase_cap} availableMonths={hotel.available_months} pricingMatrix={pricingMatrix} mealPlans={hotel.meal_plans} />
          
          {/* Add notification buttons */}
          <Card className="mt-4 bg-gradient-to-br from-gold-900/40 to-gold-800/30 border-gold-700/30 shadow-2xl">
            
          </Card>
        </div>
      </div>
    </div>;
}