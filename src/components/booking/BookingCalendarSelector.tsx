
import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover";
import { weekdayMap } from "@/components/dashboard/PropertySteps/rooms/roomTypes/availabilityDateUtils";

interface BookingCalendarSelectorProps {
  startDate: Date | null;
  setStartDate: (date: Date) => void;
  availableMonths?: string[];
  preferredWeekday?: string;
}

export function BookingCalendarSelector({ 
  startDate, 
  setStartDate,
  availableMonths = [],
  preferredWeekday = "Monday"
}: BookingCalendarSelectorProps) {
  const [open, setOpen] = useState(false);
  
  // Convert preferred weekday to number (0 = Sunday, 1 = Monday, etc.)
  const preferredDayNum = preferredWeekday ? weekdayMap[preferredWeekday] ?? 1 : 1; // Default to Monday
  
  // Function to check if a date is selectable
  const isDateSelectable = (date: Date) => {
    // Check if it's the preferred weekday
    if (date.getDay() !== preferredDayNum) {
      return false;
    }
    
    // Check if it's in an available month
    if (availableMonths && availableMonths.length > 0) {
      const monthName = format(date, 'MMMM').toLowerCase();
      if (!availableMonths.map(m => m.toLowerCase()).includes(monthName)) {
        return false;
      }
    }
    
    // Check if it's in the past
    return date >= new Date();
  };
  
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">Check-in date</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              "w-full flex items-center justify-between rounded-lg border border-border bg-background/50 p-3 text-left transition hover:border-fuchsia-500/50",
              !startDate && "text-muted-foreground"
            )}
            aria-label="Select check-in date"
          >
            {startDate ? format(startDate, "MMMM d, yyyy") : "Select date"}
            <CalendarIcon className="w-5 h-5 text-muted-foreground" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={startDate || undefined}
            onSelect={(date) => {
              if (date) {
                setStartDate(date);
                setOpen(false);
              }
            }}
            disabled={isDateSelectable}
            initialFocus
          />
          <div className="p-3 border-t text-xs text-muted-foreground">
            <p>Check-in only available on {preferredWeekday}s</p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
