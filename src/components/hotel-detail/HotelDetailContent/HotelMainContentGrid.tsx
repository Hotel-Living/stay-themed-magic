
import React from "react";
import { HotelDetailProps } from "@/types/hotel";
import { HotelFeaturesInfo } from "../HotelFeaturesInfo";
import { HotelLocation } from "../HotelLocation";
import { HotelBookingSection } from "../HotelBookingSection";
import { HotelNotificationButtons } from "../HotelNotificationButtons";

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
  return (
    <div className="grid md:grid-cols-3 gap-6 mt-6">
      {/* Left content area */}
      <div className="md:col-span-2 space-y-6">
        {/* Features card with enhanced styling */}
        <div className="bg-gradient-to-br from-[#7B1C92] via-[#6B1A87] to-[#5A1575] rounded-xl shadow-2xl border border-white/10 overflow-hidden">
          <HotelFeaturesInfo
            hotelFeatures={hotel.hotelFeatures || []}
            roomFeatures={hotel.roomFeatures || []}
          />
        </div>
        
        {/* Location card with enhanced styling */}
        <div className="bg-gradient-to-br from-[#7B1C92] via-[#6B1A87] to-[#5A1575] rounded-xl shadow-2xl border border-white/10 overflow-hidden">
          <HotelLocation 
            latitude={Number(hotel.latitude)} 
            longitude={Number(hotel.longitude)} 
            hotelName={hotel.name} 
            address={hotel.address || ""}
          />
        </div>
      </div>

      {/* Booking section with enhanced styling and CORRECT DYNAMIC PRICING FIELD NAMES */}
      <div className="bg-gradient-to-br from-[#7B1C92] via-[#8B1FA3] to-[#6B1A87] rounded-xl shadow-2xl border border-white/10 p-1">
        <div className="bg-gradient-to-br from-purple-900/40 to-fuchsia-900/30 rounded-lg backdrop-blur-sm border border-white/10">
          <HotelBookingSection 
            checkInDate={checkInDate}
            setCheckInDate={setCheckInDate}
            selectedDuration={selectedDuration}
            setSelectedDuration={setSelectedDuration}
            stayDurations={stayDurations}
            rates={preparedRates}
            currency={hotel.currency || "USD"}
            handleBookClick={handleBookClick}
            preferredWeekday={checkInWeekday}
            enable_price_increase={hotel.enable_price_increase}
            price_increase_cap={hotel.price_increase_cap}
            availableMonths={hotel.available_months}
            pricingMatrix={pricingMatrix}
            mealPlans={hotel.meal_plans}
          />
          
          {/* Add notification buttons */}
          <div className="p-4 border-t border-white/10">
            <HotelNotificationButtons 
              hotelId={hotel.id}
              isAvailable={isHotelAvailable}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
