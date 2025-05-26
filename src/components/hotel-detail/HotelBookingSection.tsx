

import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { format, addDays } from "date-fns";
import BookingDropdown from "@/components/hotel-detail/BookingDropdown";

interface PricingMatrixItem {
  roomType: string;
  stayLength: string;
  mealPlan: string;
  price: number;
}

interface HotelBookingSectionProps {
  checkInDate: Date | undefined;
  setCheckInDate: (date: Date | undefined) => void;
  selectedDuration: number;
  setSelectedDuration: (duration: number) => void;
  stayDurations: number[];
  rates: Record<string, number>;
  currency: string;
  handleBookClick: () => void;
  preferredWeekday: string;
  enable_price_increase?: boolean;
  price_increase_cap?: number;
  availableMonths?: string[];
  pricingMatrix?: Array<{
    roomType: string;
    stayLength: string;
    mealPlan: string;
    price: number;
  }>;
  mealPlans?: string[];
}

export function HotelBookingSection({
  checkInDate,
  setCheckInDate,
  selectedDuration,
  setSelectedDuration,
  stayDurations,
  rates,
  currency,
  handleBookClick,
  preferredWeekday,
  enable_price_increase,
  price_increase_cap,
  availableMonths,
  pricingMatrix,
  mealPlans
}: HotelBookingSectionProps) {
  const [selectedOption, setSelectedOption] = useState<PricingMatrixItem | null>(null);
  
  const availableDates = availableMonths || [];

  // Helper function to capitalize first letter
  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Initialize with longest duration if selectedDuration is 0
  React.useEffect(() => {
    if (stayDurations.length > 0 && selectedDuration === 0) {
      const longestDuration = Math.max(...stayDurations);
      setSelectedDuration(longestDuration);
    }
  }, [stayDurations, selectedDuration, setSelectedDuration]);

  const isDateAvailable = (date: Date): boolean => {
    if (!availableDates || availableDates.length === 0) {
      return true;
    }

    const formattedDate = format(date, "MMMM").toLowerCase();
    return availableDates.some(month => month.toLowerCase() === formattedDate);
  };

  const isDateSelectable = (date: Date): boolean => {
    const day = format(date, "EEEE");
    const isPreferredDay = day === preferredWeekday;
    const isAvailable = isDateAvailable(date);
    
    return isPreferredDay && isAvailable;
  };

  const formatMealPlans = () => {
    if (!mealPlans || mealPlans.length === 0) return "";
    
    const mealPlanDisplayNames = mealPlans.map(plan => {
      switch (plan) {
        case 'breakfast-included':
          return 'Breakfast';
        case 'half-board':
          return 'Half Board';
        case 'full-board':
        case 'fullBoard':
          return 'Full Board';
        case 'all-inclusive':
          return 'All Inclusive';
        case 'laundry':
          return 'Laundry';
        case 'external-laundry':
          return 'External Laundry Service Available';
        default:
          return plan.split(/[-_]/).map(word => 
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          ).join(' ');
      }
    });
    
    if (mealPlanDisplayNames.length === 1) {
      return mealPlanDisplayNames[0];
    }
    
    if (mealPlanDisplayNames.length === 2) {
      return `${mealPlanDisplayNames[0]} and ${mealPlanDisplayNames[1]}`;
    }
    
    const lastPlan = mealPlanDisplayNames[mealPlanDisplayNames.length - 1];
    const otherPlans = mealPlanDisplayNames.slice(0, -1);
    return `${otherPlans.join(", ")} and ${lastPlan}`;
  };

  // Enhanced booking handler that includes selected option data
  const handleBookingClick = () => {
    if (!selectedOption) {
      alert("Please select a room and pricing option before booking.");
      return;
    }

    if (!checkInDate) {
      alert("Please select a check-in date before booking.");
      return;
    }

    // Show confirmation dialog with booking summary
    const confirmMessage = `Do you want to confirm this booking?\n\n${capitalize(selectedOption.roomType)} Room – ${selectedOption.stayLength} nights – ${capitalize(selectedOption.mealPlan)} – ${selectedOption.price}`;
    
    if (!confirm(confirmMessage)) {
      return;
    }

    // Create booking data with selected option values
    const bookingData = {
      roomType: selectedOption.roomType,
      stayLength: selectedOption.stayLength,
      mealPlan: selectedOption.mealPlan,
      price: selectedOption.price,
      checkInDate: checkInDate,
      checkOutDate: addDays(checkInDate, parseInt(selectedOption.stayLength))
    };

    console.log("Booking with selected option:", bookingData);
    
    // Call the original booking handler
    handleBookClick();
  };

  // Calculate checkout date using the longest duration since we removed the duration selector
  const longestDuration = stayDurations.length > 0 ? Math.max(...stayDurations) : selectedDuration;
  const checkoutDate = checkInDate ? addDays(checkInDate, longestDuration) : null;

  // Check if booking is disabled
  const isBookingDisabled = !selectedOption || !checkInDate;

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2 text-white">BOOKING</h2>
        <p className="text-white/80 mb-2">
          Weekly Check-In/Out Day: {preferredWeekday}
        </p>
        
        {/* Display meal plans if available */}
        {mealPlans && mealPlans.length > 0 && (
          <p className="text-white/90 mb-4 text-sm">
            Meals: {formatMealPlans()}
          </p>
        )}

        <h3 className="text-lg font-semibold text-white mb-4">TARIFFS PER PERSON</h3>
      </div>

      {/* BookingDropdown Component */}
      <div>
        <BookingDropdown
          pricingMatrix={pricingMatrix}
          onSelect={(option) => setSelectedOption(option)}
        />
      </div>

      {/* Selected Option Display */}
      {selectedOption && (
        <div className="mt-4 text-white text-sm">
          Selected: <strong>
            {capitalize(selectedOption.roomType)} Room – {selectedOption.stayLength} nights – {capitalize(selectedOption.mealPlan)} – {selectedOption.price}
          </strong>
        </div>
      )}

      {/* Calendar component */}
      <Card className="border-none shadow-none bg-transparent">
        <Calendar
          mode="single"
          selected={checkInDate}
          onSelect={(date) => {
            if (date && isDateSelectable(date)) {
              setCheckInDate(date);
            }
          }}
          disabled={date => !isDateSelectable(date)}
          className="border rounded-md w-full mx-auto bg-fuchsia-950/30 text-white"
        />
      </Card>

      {/* Checkout Date Display */}
      {checkInDate && checkoutDate && (
        <div className="text-center space-y-2">
          <div className="text-white/90 text-sm">
            <div>Check-in: {format(checkInDate, "PPP")}</div>
            <div>Check-out: {format(checkoutDate, "PPP")}</div>
          </div>
        </div>
      )}

      {/* Dynamic Pricing Message */}
      {enable_price_increase && (
        <div className="bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg p-3">
          <p className="text-white/90 text-sm text-center">
            This property uses dynamic pricing based on demand. Book early to secure the best rates!
          </p>
        </div>
      )}

      {/* Booking Summary Display */}
      {selectedOption && checkInDate && (
        <div className="bg-fuchsia-950/40 border border-fuchsia-700/50 rounded-lg p-4">
          <h4 className="text-white font-semibold text-sm mb-2">You are about to book:</h4>
          <p className="text-white/90 text-sm">
            <strong>{capitalize(selectedOption.roomType)} Room – {selectedOption.stayLength} nights – {capitalize(selectedOption.mealPlan)} – {selectedOption.price}</strong>
          </p>
          <p className="text-white/80 text-xs mt-1">
            Check-in: {format(checkInDate, "PPP")} | Check-out: {format(addDays(checkInDate, parseInt(selectedOption.stayLength)), "PPP")}
          </p>
        </div>
      )}

      {/* Validation message for missing selection */}
      {isBookingDisabled && (
        <div className="text-center">
          <p className="text-yellow-400 text-sm">
            {!selectedOption && "Please select a room and pricing option"}
            {!checkInDate && selectedOption && "Please select a check-in date"}
          </p>
        </div>
      )}

      <Button 
        className={`w-full ${isBookingDisabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-fuchsia-500 hover:bg-fuchsia-700'} text-white`} 
        onClick={handleBookingClick}
        disabled={isBookingDisabled}
      >
        Book Now
      </Button>
    </div>
  );
}

