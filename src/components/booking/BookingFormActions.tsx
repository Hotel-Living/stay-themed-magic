
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock, Users } from "lucide-react";
import { format, addDays, isWeekend } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { RoomType } from "@/types/hotel";
import { useRebookingData } from "@/hooks/useRebookingData";

interface BookingFormActionsProps {
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
  duration: number;
  setDuration: (duration: number) => void;
  selectedRoomType: string;
  setSelectedRoomType: (type: string) => void;
  rooms: any[];
  newBooking: any;
  endDate: Date | null;
  dynamicPrice: number;
  availableStayLengths?: number[];
  availableMonths?: string[];
  preferredWeekday?: string;
  roomTypes?: RoomType[];
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
  availableStayLengths = [8, 16, 24, 32],
  availableMonths,
  preferredWeekday,
  roomTypes = []
}: BookingFormActionsProps) {
  const { rebookingData, hasRebookingData, clearRebookingData } = useRebookingData();

  // Apply rebooking data when available
  useEffect(() => {
    if (hasRebookingData && rebookingData) {
      if (rebookingData.duration && availableStayLengths.includes(rebookingData.duration)) {
        setDuration(rebookingData.duration);
      }
      // Clear the data after applying it
      clearRebookingData();
    }
  }, [hasRebookingData, rebookingData, availableStayLengths, setDuration, clearRebookingData]);

  const weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  const isValidDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (date < today) return false;
    
    if (preferredWeekday) {
      const dayOfWeek = weekdayNames[date.getDay()];
      if (dayOfWeek !== preferredWeekday) return false;
    }
    
    if (availableMonths && availableMonths.length > 0) {
      const monthName = format(date, 'MMMM').toLowerCase();
      if (!availableMonths.map(m => m.toLowerCase()).includes(monthName)) return false;
    }
    
    return true;
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date && isValidDate(date)) {
      setStartDate(date);
    }
  };

  return (
    <div className="space-y-4">
      {/* Rebooking Notice */}
      {hasRebookingData && (
        <div className="bg-green-950/30 border border-green-500/30 p-3 rounded-lg">
          <p className="text-sm text-green-200">
            📅 Your previous stay preferences have been applied! Duration set to {rebookingData?.duration} days.
          </p>
        </div>
      )}

      {/* Duration Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-white">Stay Duration</label>
        <Select value={duration.toString()} onValueChange={(value) => setDuration(parseInt(value))}>
          <SelectTrigger className="bg-fuchsia-950/20 border-fuchsia-800 text-white">
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent>
            {availableStayLengths.map((length) => (
              <SelectItem key={length} value={length.toString()}>
                {length} days
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Check-in Date Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-white">Check-in Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal bg-fuchsia-950/20 border-fuchsia-800 text-white hover:bg-fuchsia-800/30",
                !startDate && "text-fuchsia-300"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {startDate ? format(startDate, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-fuchsia-950/90 border-fuchsia-800" align="start">
            <Calendar
              mode="single"
              selected={startDate || undefined}
              onSelect={handleDateSelect}
              disabled={(date) => !isValidDate(date)}
              initialFocus
              className="text-white"
            />
          </PopoverContent>
        </Popover>
        
        {preferredWeekday && (
          <p className="text-xs text-fuchsia-300">
            Check-in available on {preferredWeekday}s only
          </p>
        )}
        
        {availableMonths && availableMonths.length > 0 && (
          <p className="text-xs text-fuchsia-300">
            Available months: {availableMonths.join(', ')}
          </p>
        )}
      </div>

      {/* Room Type Selection */}
      {roomTypes.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Room Type</label>
          <Select value={selectedRoomType} onValueChange={setSelectedRoomType}>
            <SelectTrigger className="bg-fuchsia-950/20 border-fuchsia-800 text-white">
              <SelectValue placeholder="Select room type" />
            </SelectTrigger>
            <SelectContent>
              {roomTypes.map((roomType) => (
                <SelectItem key={roomType.id} value={roomType.id}>
                  {roomType.name} - ${roomType.price_per_night}/night
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Booking Summary */}
      {startDate && endDate && (
        <div className="bg-fuchsia-950/30 p-4 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-fuchsia-200">Check-out:</span>
            <span className="text-white font-medium">{format(endDate, "PPP")}</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span className="text-fuchsia-200">Total price:</span>
            <span className="text-white font-bold">${dynamicPrice}</span>
          </div>
        </div>
      )}
    </div>
  );
}
