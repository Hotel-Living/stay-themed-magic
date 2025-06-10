
import React from "react";
import { addDays } from "date-fns";
import BookingDropdown from "@/components/hotel-detail/BookingDropdown";
import { FirstBookingTooltip } from "@/components/booking/FirstBookingTooltip";
import { FirstBookingWelcomeBanner } from "@/components/booking/FirstBookingWelcomeBanner";
import { useBookingLogic } from "./hooks/useBookingLogic";
import { BookingCalendar } from "./BookingCalendar";
import { BookingSummary } from "./BookingSummary";
import { BookingActionButton } from "./BookingActionButton";

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
  const {
    selectedOption,
    setSelectedOption,
    bookingConfirmed,
    confirmedBookingData,
    isFirstTimeUser,
    capitalize,
    handleBookingClick,
    isBookingDisabled
  } = useBookingLogic({
    stayDurations,
    selectedDuration,
    setSelectedDuration,
    handleBookClick,
    pricingMatrix
  });

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

  // Calculate checkout date using the longest duration since we removed the duration selector
  const longestDuration = stayDurations.length > 0 ? Math.max(...stayDurations) : selectedDuration;
  const checkoutDate = checkInDate ? addDays(checkInDate, longestDuration) : null;

  return (
    <div className="p-6 space-y-6">
      {/* Show welcome banner after booking for first-time users */}
      {bookingConfirmed && isFirstTimeUser && (
        <FirstBookingWelcomeBanner />
      )}

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

      {/* First booking tooltip for meal plans */}
      {isFirstTimeUser && mealPlans && mealPlans.length > 0 && !bookingConfirmed && (
        <FirstBookingTooltip step="meals" />
      )}

      {/* BookingDropdown Component */}
      <div>
        <BookingDropdown
          pricingMatrix={pricingMatrix}
          onSelect={(option) => setSelectedOption(option)}
        />
      </div>

      {/* First booking tooltip for dates */}
      {isFirstTimeUser && !bookingConfirmed && (
        <FirstBookingTooltip step="dates" />
      )}

      {/* Calendar component */}
      <BookingCalendar
        checkInDate={checkInDate}
        setCheckInDate={setCheckInDate}
        preferredWeekday={preferredWeekday}
        availableMonths={availableMonths}
        bookingConfirmed={bookingConfirmed}
      />

      {/* Dynamic Pricing Message */}
      {enable_price_increase && !bookingConfirmed && (
        <div className="bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg p-3">
          <p className="text-white/90 text-sm text-center">
            This property uses dynamic pricing based on demand. Book early to secure the best rates!
          </p>
        </div>
      )}

      {/* First booking tooltip for review */}
      {isFirstTimeUser && selectedOption && checkInDate && !bookingConfirmed && (
        <FirstBookingTooltip step="review" />
      )}

      {/* Booking Summary */}
      <BookingSummary
        selectedOption={selectedOption}
        checkInDate={checkInDate}
        bookingConfirmed={bookingConfirmed}
        confirmedBookingData={confirmedBookingData}
        capitalize={capitalize}
        checkoutDate={checkoutDate}
        isBookingDisabled={isBookingDisabled}
      />

      {/* Booking Action Button */}
      <BookingActionButton
        isBookingDisabled={isBookingDisabled || !checkInDate}
        bookingConfirmed={bookingConfirmed}
        handleBookingClick={() => handleBookingClick(checkInDate)}
      />
    </div>
  );
}
