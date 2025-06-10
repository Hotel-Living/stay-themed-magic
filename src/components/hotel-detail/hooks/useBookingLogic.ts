
import { useState, useEffect } from "react";
import { useBookingState } from "@/hooks/useBookingState";
import { useFirstBookingMode } from "@/hooks/useFirstBookingMode";

interface Hotel {
  id: string;
  name: string;
  location: string;
  price_per_month: number;
}

interface UseBookingLogicProps {
  hotel: Hotel;
}

export function useBookingLogic({ hotel }: UseBookingLogicProps) {
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedDuration, setSelectedDuration] = useState<number>(1);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  
  const { bookingState, updateBookingState } = useBookingState();
  const { isFirstBooking, markFirstBookingComplete } = useFirstBookingMode();

  // Update booking state when hotel or selections change
  useEffect(() => {
    if (hotel && selectedMonth) {
      updateBookingState({
        hotelId: hotel.id,
        hotelName: hotel.name,
        location: hotel.location,
        month: selectedMonth,
        duration: selectedDuration,
        pricePerMonth: hotel.price_per_month,
        totalPrice: hotel.price_per_month * selectedDuration,
        dates: selectedDates
      });
    }
  }, [hotel, selectedMonth, selectedDuration, selectedDates, updateBookingState]);

  const handleMonthSelect = (month: string) => {
    setSelectedMonth(month);
    setShowCalendar(true);
  };

  const handleDurationChange = (duration: number) => {
    setSelectedDuration(duration);
  };

  const handleDateSelect = (dates: Date[]) => {
    setSelectedDates(dates);
  };

  const handleBookingComplete = () => {
    if (isFirstBooking) {
      markFirstBookingComplete();
    }
  };

  const canProceedToBooking = Boolean(
    hotel && 
    selectedMonth && 
    selectedDuration > 0 && 
    selectedDates.length > 0
  );

  return {
    selectedMonth,
    selectedDuration,
    showCalendar,
    selectedDates,
    bookingState,
    isFirstBooking,
    canProceedToBooking,
    handleMonthSelect,
    handleDurationChange,
    handleDateSelect,
    handleBookingComplete,
    setShowCalendar
  };
}
