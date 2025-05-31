
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
    <div className="space-y-4 sm:space-y-6">
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
          <SelectTrigger className="bg-fuchsia-950/20 border-fuchsia-800 text-white h-11 sm:h-10">
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent className="bg-fuchsia-950/90 border-fuchsia-800 z-50">
            {availableStayLengths.map((length) => (
              <SelectItem 
                key={length} 
                value={length.toString()}
                className="text-white hover:bg-fuchsia-800/30 focus:bg-fuchsia-800/30"
              >
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
                "w-full justify-start text-left font-normal bg-fuchsia-950/20 border-fuchsia-800 text-white hover:bg-fuchsia-800/30 h-11 sm:h-10",
                !startDate && "text-fuchsia-300"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0" />
              <span className="truncate">
                {startDate ? format(startDate, "PPP") : "Pick a date"}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-fuchsia-950/90 border-fuchsia-800 z-50" align="start">
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
            <SelectTrigger className="bg-fuchsia-950/20 border-fuchsia-800 text-white h-11 sm:h-10">
              <SelectValue placeholder="Select room type" />
            </SelectTrigger>
            <SelectContent className="bg-fuchsia-950/90 border-fuchsia-800 z-50">
              {roomTypes.map((roomType) => (
                <SelectItem 
                  key={roomType.id} 
                  value={roomType.id}
                  className="text-white hover:bg-fuchsia-800/30 focus:bg-fuchsia-800/30"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
                    <span className="font-medium">{roomType.name}</span>
                    {roomType.basePrice && (
                      <span className="text-xs sm:text-sm text-fuchsia-300 sm:ml-2">
                        ${roomType.basePrice}/night
                      </span>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Booking Summary */}
      {startDate && endDate && (
        <div className="bg-fuchsia-950/30 p-4 rounded-lg">
          <div className="space-y-3 sm:space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm">
              <span className="text-fuchsia-200 font-medium">Check-out:</span>
              <span className="text-white font-medium mt-1 sm:mt-0">{format(endDate, "PPP")}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm">
              <span className="text-fuchsia-200 font-medium">Total price:</span>
              <span className="text-white font-bold text-lg sm:text-base mt-1 sm:mt-0">${dynamicPrice}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
