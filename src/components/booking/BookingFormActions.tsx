
import { BookingCalendarSelector } from "./BookingCalendarSelector";
import { BookingDurationSelector } from "./BookingDurationSelector";
import { RoomTypeSelector } from "./RoomTypeSelector";
import { RoomAvailabilityCalendar } from "./RoomAvailabilityCalendar";
import { BookingSummaryCard } from "./BookingSummaryCard";

interface BookingFormActionsProps {
  startDate: Date | null;
  setStartDate: (date: Date) => void;
  duration: number;
  setDuration: (val: number) => void;
  selectedRoomType: string;
  setSelectedRoomType: (type: string) => void;
  rooms: any[];
  newBooking: any;
  endDate: Date | null;
  dynamicPrice: number;
}

export function BookingFormActions({
  startDate,
  setStartDate,
  duration,
  setDuration,
  selectedRoomType,
  setSelectedRoomType,
  rooms,
  newBooking,
  endDate,
  dynamicPrice,
}: BookingFormActionsProps) {
  return (
    <div className="space-y-4">
      <BookingCalendarSelector
        startDate={startDate}
        setStartDate={setStartDate}
      />
      <BookingDurationSelector
        duration={duration}
        setDuration={setDuration}
      />
      <RoomTypeSelector
        selectedRoomType={selectedRoomType}
        setSelectedRoomType={setSelectedRoomType}
      />
      {startDate && (
        <RoomAvailabilityCalendar 
          rooms={rooms.filter(room => room.roomTypeId === selectedRoomType)} 
          highlightNewBooking={newBooking}
        />
      )}
      {startDate && endDate && (
        <BookingSummaryCard
          startDate={startDate}
          endDate={endDate}
          duration={duration}
          dynamicPrice={dynamicPrice}
        />
      )}
    </div>
  );
}
