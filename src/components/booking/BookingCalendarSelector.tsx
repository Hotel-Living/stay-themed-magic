
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface BookingCalendarSelectorProps {
  startDate: Date | null;
  setStartDate: (date: Date) => void;
}

export function BookingCalendarSelector({ startDate, setStartDate }: BookingCalendarSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">Check-in date</label>
      <button
        type="button"
        className={cn(
          "w-full flex items-center justify-between rounded-lg border border-border bg-background/50 p-3 text-left transition hover:border-fuchsia-500/50",
          !startDate && "text-muted-foreground"
        )}
        onClick={() => {
          // Placeholder logic: select 2 weeks from now
          const today = new Date();
          today.setDate(today.getDate() + 14);
          setStartDate(today);
        }}
      >
        {startDate ? format(startDate, "MMMM d, yyyy") : "Select date"}
        <CalendarIcon className="w-5 h-5 text-muted-foreground" />
      </button>
    </div>
  );
}
