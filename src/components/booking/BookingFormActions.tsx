
import { BookingCalendarSelector } from "./BookingCalendarSelector";
import { BookingDurationSelector } from "./BookingDurationSelector";
import { RoomTypeSelector } from "./RoomTypeSelector";
// import { RoomAvailabilityCalendar } from "./RoomAvailabilityCalendar"; // REMOVED as required
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
  availableStayLengths?: number[];
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
  availableStayLengths,
}: BookingFormActionsProps) {
  return (
    <div className="space-y-4 bg-[#5C088F] rounded-lg p-6">
      <BookingCalendarSelector
        startDate={startDate}
        setStartDate={setStartDate}
      />
      <BookingDurationSelector
        duration={duration}
        setDuration={setDuration}
        allowedDurations={availableStayLengths}
      />
      <RoomTypeSelector
        selectedRoomType={selectedRoomType}
        setSelectedRoomType={setSelectedRoomType}
      />
      {/* RoomAvailabilityCalendar component removed */}
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
