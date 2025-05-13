
import React, { useState } from "react";
import { MonthNavigation } from "./MonthNavigation";
import { CalendarHeader } from "./CalendarHeader";
import { RoomRow } from "./RoomRow";
import { addMonths, format, getDaysInMonth, subMonths } from "date-fns";
import { EmptyCalendarState } from "./EmptyCalendarState";
import { Room } from "@/types/booking";

interface RoomAvailabilityCalendarProps {
  rooms: Room[];
  newBooking?: {
    roomId: string;
    startDate: Date;
    endDate: Date;
  } | null;
}

export function RoomAvailabilityCalendar({
  rooms,
  newBooking
}: RoomAvailabilityCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  
  // Create array of days for the given month
  const daysInMonth = getDaysInMonth(currentDate);
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  
  // Group days into chunks (e.g., by week)
  const dayGroups: string[] = [];
  for (let i = 0; i < daysInMonth; i += 7) {
    const startDay = i + 1;
    const endDay = Math.min(i + 7, daysInMonth);
    const startDate = new Date(year, month, startDay);
    const endDate = new Date(year, month, endDay);
    
    dayGroups.push(`${format(startDate, "d")} - ${format(endDate, "d")}`);
  }
  
  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };
  
  const hasRoomsWithBookings = rooms.some(room => 
    room.bookings && room.bookings.length > 0
  );
  
  return (
    <div className="bg-fuchsia-950/20 border border-fuchsia-900/20 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-fuchsia-900/20 flex justify-between items-center">
        <h3 className="font-semibold">Room Availability</h3>
        <MonthNavigation
          currentDate={currentDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />
      </div>
      
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          <CalendarHeader dayGroups={dayGroups} />
          
          {hasRoomsWithBookings ? (
            <div>
              {rooms.map((room, index) => (
                <RoomRow
                  key={`room-${room.id}-${index}`}
                  room={room}
                  month={month}
                  year={year}
                  daysArray={daysArray}
                  highlightedBooking={
                    newBooking && newBooking.roomId === room.id ? 
                    { id: "new-booking", roomId: room.id } : null
                  }
                />
              ))}
            </div>
          ) : (
            <EmptyCalendarState />
          )}
        </div>
      </div>
    </div>
  );
}
