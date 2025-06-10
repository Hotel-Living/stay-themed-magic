
import { useState, useEffect } from "react";
import { addDays } from "date-fns";
import { useFirstBookingMode } from "@/hooks/useFirstBookingMode";

interface PricingMatrixItem {
  roomType: string;
  stayLength: string;
  mealPlan: string;
  price: number;
}

interface UseBookingLogicProps {
  stayDurations: number[];
  selectedDuration: number;
  setSelectedDuration: (duration: number) => void;
  handleBookClick: () => void;
  pricingMatrix?: Array<{
    roomType: string;
    stayLength: string;
    mealPlan: string;
    price: number;
  }>;
}

export function useBookingLogic({
  stayDurations,
  selectedDuration,
  setSelectedDuration,
  handleBookClick,
  pricingMatrix
}: UseBookingLogicProps) {
  const [selectedOption, setSelectedOption] = useState<PricingMatrixItem | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [confirmedBookingData, setConfirmedBookingData] = useState<{
    roomType: string;
    stayLength: string;
    mealPlan: string;
    price: number;
    checkInDate: Date;
    checkOutDate: Date;
  } | null>(null);
  const { isFirstTimeUser } = useFirstBookingMode();

  // Initialize with longest duration if selectedDuration is 0
  useEffect(() => {
    if (stayDurations.length > 0 && selectedDuration === 0) {
      const longestDuration = Math.max(...stayDurations);
      setSelectedDuration(longestDuration);
    }
  }, [stayDurations, selectedDuration, setSelectedDuration]);

  // Helper function to capitalize first letter
  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Enhanced booking handler that includes selected option data
  const handleBookingClick = (checkInDate: Date | undefined) => {
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
    
    // Set confirmation state
    setBookingConfirmed(true);
    setConfirmedBookingData(bookingData);
    
    // Call the original booking handler
    handleBookClick();
  };

  const isBookingDisabled = !selectedOption || bookingConfirmed;

  return {
    selectedOption,
    setSelectedOption,
    bookingConfirmed,
    confirmedBookingData,
    isFirstTimeUser,
    capitalize,
    handleBookingClick,
    isBookingDisabled
  };
}
