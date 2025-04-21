
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { format, addMonths, isSameDay, parseISO, getDay, startOfMonth, endOfMonth, addDays, isSameMonth } from "date-fns";

interface AvailabilityDateSectionProps {
  preferredWeekday: string;
  onAvailabilityChange: (dates: string[]) => void;
  selectedDates: string[];
}

const weekdayMap: Record<string, number> = {
  "Monday": 1,
  "Tuesday": 2,
  "Wednesday": 3,
  "Thursday": 4,
  "Friday": 5,
  "Saturday": 6,
  "Sunday": 0
};

function getAvailableDatesForMonth(monthDate: Date, preferredDayNum: number) {
  const dates: Date[] = [];
  let d = startOfMonth(monthDate);
  const end = endOfMonth(monthDate);
  // Find first occurrence of preferred weekday in the month
  while (getDay(d) !== preferredDayNum) {
    d = addDays(d, 1);
  }
  while (d <= end) {
    dates.push(new Date(d));
    d = addDays(d, 7);
  }
  return dates;
}

export default function AvailabilityDateSection({
  preferredWeekday = "Monday",
  onAvailabilityChange,
  selectedDates = []
}: AvailabilityDateSectionProps) {
  const [expandedMonths, setExpandedMonths] = useState<Record<string, boolean>>({});

  const currentDate = new Date();
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = addMonths(currentDate, i);
    return format(date, "MMMM yyyy");
  });

  const toggleMonth = (month: string) => {
    setExpandedMonths(prev => ({
      ...prev,
      [month]: !prev[month]
    }));
  };

  const handleMonthSelection = (month: string) => {
    // Add or remove the entire month (all available weekdays)
    const monthDate = new Date(month + " 01");
    const dayNum = weekdayMap[preferredWeekday];
    const availableDates = getAvailableDatesForMonth(monthDate, dayNum).map(d => format(d, "yyyy-MM-dd"));

    const hasAll = availableDates.every(d => selectedDates.includes(d));
    if (hasAll) {
      // Remove all from this month
      onAvailabilityChange(selectedDates.filter(date => !availableDates.includes(date)));
    } else {
      // Add only those not present
      onAvailabilityChange(Array.from(new Set([...selectedDates, ...availableDates])));
    }
  };

  const handleDateSelect = (date: Date | undefined, _month: string) => {
    if (!date) return;
    const dateString = format(date, "yyyy-MM-dd");
    if (selectedDates.includes(dateString)) {
      onAvailabilityChange(selectedDates.filter(d => d !== dateString));
    } else {
      onAvailabilityChange([...selectedDates, dateString]);
    }
  };

  const isMonthSelected = (month: string) => {
    const monthDate = new Date(month + " 01");
    const dayNum = weekdayMap[preferredWeekday];
    const availableDates = getAvailableDatesForMonth(monthDate, dayNum).map(d => format(d, "yyyy-MM-dd"));
    // Check if ALL this month's possible days are selected
    return availableDates.length > 0 && availableDates.every(d => selectedDates.includes(d));
  };

  const isDateSelected = (date: Date) => {
    try {
      return selectedDates.some(d => isSameDay(parseISO(d), date));
    } catch {
      return false;
    }
  };

  // Renders a custom calendar grid: Only allow the preferred weekday, others are completely hidden
  function CustomCalendarSingleWeekday({
    month,
    preferredDayNum,
    selected,
    onSelectDate
  }: {
    month: Date;
    preferredDayNum: number;
    selected: string[];
    onSelectDate: (d: Date) => void;
  }) {
    const availableDates = getAvailableDatesForMonth(month, preferredDayNum);

    // Get label for weekday
    const weekdayLabel = format(addDays(startOfMonth(month), (preferredDayNum - getDay(startOfMonth(month)) + 7) % 7), "EEEE");
    return (
      <div className="p-3 pointer-events-auto bg-fuchsia-950/50 rounded-md border border-fuchsia-800/30 w-full">
        <div className="grid grid-cols-1">
          <div className="flex items-center mb-1 justify-center">
            <span className="font-semibold">{weekdayLabel}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {availableDates.map(date => (
            <button
              type="button"
              key={format(date, "yyyy-MM-dd")}
              className={`w-full px-3 py-2 rounded-md text-sm
                ${isDateSelected(date)
                  ? "bg-fuchsia-600 text-white hover:bg-fuchsia-700"
                  : "bg-fuchsia-900/20 text-white hover:bg-fuchsia-700/70"}`
              }
              onClick={() => onSelectDate(date)}
            >
              {format(date, "EEE, MMM d, yyyy")}
            </button>
          ))}
          {availableDates.length === 0 && (
            <div className="text-sm text-gray-400 text-center">No {weekdayLabel}s in this month</div>
          )}
        </div>
      </div>
    );
  }

  const preferredDayNum = weekdayMap[preferredWeekday];

  return (
    <div className="grid grid-cols-4 items-start gap-4">
      <Label className="text-right text-sm text-white">AVAILABILITY DATES</Label>
      <div className="col-span-3 bg-fuchsia-950/50 border border-white rounded-lg p-4 text-white">
        <p className="text-sm mb-3">
          Select full months or specific check-in dates ({preferredWeekday}s only)
        </p>
        <div className="space-y-2">
          {months.map((month, idx) => {
            const monthDate = addMonths(currentDate, idx);
            return (
              <Collapsible
                key={month}
                open={expandedMonths[month]}
                onOpenChange={() => toggleMonth(month)}
                className="border border-fuchsia-800/30 rounded-md overflow-hidden"
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-left bg-fuchsia-900/30 hover:bg-fuchsia-900/50">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isMonthSelected(month)}
                      onChange={() => handleMonthSelection(month)}
                      onClick={(e) => e.stopPropagation()}
                      className="mr-3 rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50"
                    />
                    <span>{month}</span>
                  </div>
                  {expandedMonths[month] ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </CollapsibleTrigger>
                <CollapsibleContent className="px-3 py-2">
                  <CustomCalendarSingleWeekday
                    month={monthDate}
                    preferredDayNum={preferredDayNum}
                    selected={selectedDates}
                    onSelectDate={date => handleDateSelect(date, month)}
                  />
                </CollapsibleContent>
              </Collapsible>
            );
          })}
        </div>
        {selectedDates.length > 0 && (
          <div className="mt-4 p-2 bg-fuchsia-900/20 rounded">
            <h4 className="text-sm font-medium mb-1">Selected Availability:</h4>
            <div className="flex flex-wrap gap-2">
              {selectedDates.map((date) => (
                <div
                  key={date}
                  className="bg-fuchsia-800/40 text-white text-xs px-2 py-1 rounded flex items-center"
                >
                  {date.includes("-") ? format(parseISO(date), "MMM dd, yyyy") : date}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-4 w-4 p-0 text-white hover:bg-fuchsia-700/30"
                    onClick={() => onAvailabilityChange(selectedDates.filter(d => d !== date))}
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
