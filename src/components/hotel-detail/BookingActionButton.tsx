
import React from "react";
import { Button } from "@/components/ui/button";

interface BookingActionButtonProps {
  isBookingDisabled: boolean;
  bookingConfirmed: boolean;
  handleBookingClick: () => void;
}

export function BookingActionButton({
  isBookingDisabled,
  bookingConfirmed,
  handleBookingClick
}: BookingActionButtonProps) {
  return (
    <Button 
      className={`w-full ${isBookingDisabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-fuchsia-500 hover:bg-fuchsia-700'} text-white`} 
      onClick={handleBookingClick}
      disabled={isBookingDisabled}
    >
      {bookingConfirmed ? 'Booking Confirmed' : 'Book Now'}
    </Button>
  );
}
