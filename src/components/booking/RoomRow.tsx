
import React from "react";
import { BookingBar } from "./BookingBar";
import { GapIndicator } from "./GapIndicator";
import { Room, BookedStay } from "@/types/booking";
import { formatShortDate } from "@/utils/dateUtils";

export interface RoomRowProps {
  room: Room;
  month: number;
  year: number;
  daysArray: number[];
  highlightedBooking: {
    id?: string;
    roomId?: string;
  } | null;
}

export function RoomRow({ room, month, year, daysArray, highlightedBooking }: RoomRowProps) {
  const bookingsInMonth = room.bookings?.filter((booking) => {
    const bookingStartDate = new Date(booking.startDate);
    const bookingEndDate = new Date(booking.endDate);
    
    const viewStartDate = new Date(year, month, 1);
    const viewEndDate = new Date(year, month + 1, 0);
    
    return (
      (bookingStartDate <= viewEndDate && bookingEndDate >= viewStartDate) ||
      (bookingStartDate >= viewStartDate && bookingStartDate <= viewEndDate)
    );
  });
  
  const calculatePosition = (booking: BookedStay) => {
    const startDate = new Date(booking.startDate);
    const endDate = new Date(booking.endDate);
    
    // Get the first day of the month we're viewing
    const firstDayOfMonth = new Date(year, month, 1);
    
    // Get the last day of the month we're viewing
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    // Calculate start position (if booking starts before this month, clamp to first day)
    const effectiveStartDate = startDate < firstDayOfMonth ? firstDayOfMonth : startDate;
    const startDay = effectiveStartDate.getDate();
    
    // Calculate end position (if booking ends after this month, clamp to last day)
    const effectiveEndDate = endDate > lastDayOfMonth ? lastDayOfMonth : endDate;
    const endDay = effectiveEndDate.getDate();
    
    // Calculate width based on days in this month
    const daysInMonth = daysArray.length;
    const start = ((startDay - 1) / daysInMonth) * 100;
    const width = ((endDay - startDay + 1) / daysInMonth) * 100;
    
    return { start, width };
  };
  
  const renderBookings = () => {
    return bookingsInMonth?.map((booking, index) => {
      const position = calculatePosition(booking);
      const isHighlighted = highlightedBooking?.id === booking.id && 
                           highlightedBooking?.roomId === room.id;
      
      return (
        <BookingBar 
          key={`booking-${booking.id}-${index}`} 
          booking={booking}
          roomTypeId={room.roomTypeId}
          position={position}
          isHighlighted={isHighlighted}
        />
      );
    });
  };
  
  const gaps = []; // Calculate gaps between bookings
  
  return (
    <div className="flex border-b border-fuchsia-800/10 hover:bg-fuchsia-900/10">
      <div className="w-1/6 p-2 text-sm font-medium text-fuchsia-100">
        {room.id}
      </div>
      
      <div className="w-5/6 relative py-2">
        <GapIndicator gaps={gaps} />
        {renderBookings()}
      </div>
    </div>
  );
}
