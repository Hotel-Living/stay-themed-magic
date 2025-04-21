
import React, { useState } from "react";
import { Room, BookedStay, calculateBookingPosition, formatDateForCalendar } from "@/utils/roomAssignment";
import { format, addMonths, subMonths } from "date-fns";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

interface RoomAvailabilityCalendarProps {
  rooms: Room[];
  onAddStay?: (roomId: string, startDate: Date, duration: number) => void;
  highlightNewBooking?: {
    roomId: string;
    startDate: Date;
    endDate: Date;
  } | null;
}

export function RoomAvailabilityCalendar({ 
  rooms,
  onAddStay,
  highlightNewBooking
}: RoomAvailabilityCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  // Generate array of days for the month header
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  
  // Group days by tens for cleaner header
  const dayGroups = [];
  for (let i = 0; i < daysInMonth; i += 10) {
    const end = Math.min(i + 9, daysInMonth);
    dayGroups.push(`${i + 1}-${end}`);
  }
  
  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };
  
  const getStayColor = (roomTypeId: string, booking: BookedStay) => {
    // Color based on room type and duration
    if (roomTypeId === "single") {
      return booking.duration <= 8 ? "bg-[#B1E2DC]" : "bg-[#FFE299]";
    } else {
      return booking.duration <= 16 ? "bg-[#F8D0EC]" : "bg-[#C9E7F8]";
    }
  };
  
  // Check if a booking is the newly created one
  const isHighlightedBooking = (roomId: string, booking: BookedStay) => {
    if (!highlightNewBooking) return false;
    
    return (
      roomId === highlightNewBooking.roomId &&
      booking.startDate.getTime() === highlightNewBooking.startDate.getTime() &&
      booking.endDate.getTime() === highlightNewBooking.endDate.getTime()
    );
  };
  
  return (
    <div className="bg-[#5A1876]/20 rounded-lg p-4 border border-fuchsia-800/30 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-medium">Room Availability Calendar</h3>
        <div className="flex items-center space-x-2">
          <button 
            onClick={handlePrevMonth}
            className="p-1 rounded-full hover:bg-fuchsia-800/20"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-medium">
            {format(currentDate, "MMMM yyyy")}
          </span>
          <button 
            onClick={handleNextMonth}
            className="p-1 rounded-full hover:bg-fuchsia-800/20"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <div className="min-w-[640px]">
          {/* Calendar header with days */}
          <div className="flex border-b border-fuchsia-800/30">
            <div className="w-1/6 p-2 font-medium text-xs">Room</div>
            <div className="w-5/6 flex">
              {dayGroups.map((group, i) => (
                <div 
                  key={i} 
                  className="flex-1 p-2 text-center text-xs font-medium border-l border-fuchsia-800/20"
                >
                  {group}
                </div>
              ))}
            </div>
          </div>
          
          {/* Room rows */}
          {rooms.length > 0 ? (
            rooms.map((room) => (
              <div key={room.id} className="flex border-b border-fuchsia-800/20 hover:bg-fuchsia-900/10">
                <div className="w-1/6 p-2 text-xs">
                  {room.id} ({room.roomTypeId})
                </div>
                <div className="w-5/6 relative py-2">
                  {/* Day columns for visualization */}
                  <div className="absolute inset-0 flex">
                    {daysArray.map((day) => (
                      <div 
                        key={day} 
                        className="flex-1 border-l border-fuchsia-800/10 h-full" 
                      />
                    ))}
                  </div>
                  
                  {/* Bookings for this room */}
                  <div className="relative h-8">
                    {room.bookings.map((booking, i) => {
                      const { start, width } = calculateBookingPosition(
                        booking, 
                        currentMonth, 
                        currentYear
                      );
                      
                      const isHighlighted = isHighlightedBooking(room.id, booking);
                      
                      return (
                        <div
                          key={i}
                          className={`absolute top-0 h-full rounded-md flex items-center justify-center text-xs 
                            ${getStayColor(room.roomTypeId, booking)}
                            ${isHighlighted ? 'border-2 border-fuchsia-500 shadow-lg' : 'border border-gray-300/20'}
                          `}
                          style={{
                            left: `${start}%`,
                            width: `${width}%`,
                            minWidth: '40px'
                          }}
                          title={`${formatDateForCalendar(booking.startDate)} - ${formatDateForCalendar(booking.endDate)} (${booking.duration} days)`}
                        >
                          {booking.duration}-day
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-sm text-fuchsia-300">
              <Calendar className="w-12 h-12 mx-auto mb-2 text-fuchsia-400/50" />
              <p>No rooms with bookings to display for this month</p>
              <p className="text-xs mt-1">New bookings will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
