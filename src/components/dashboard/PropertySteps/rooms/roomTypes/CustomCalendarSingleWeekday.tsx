
import React from "react";
import { format, parseISO, isSameDay } from "date-fns";
import { weekdayMap, getAvailableDatesForMonth } from "./availabilityDateUtils";

interface CustomCalendarSingleWeekdayProps {
  month: Date;
  preferredDayNum: number;
  selected: string[];
  preferredWeekday: string;
  onSelectDate: (d: Date) => void;
}

export default function CustomCalendarSingleWeekday({
  month,
  preferredDayNum,
  selected,
  preferredWeekday,
  onSelectDate,
}: CustomCalendarSingleWeekdayProps) {
  const availableDates = getAvailableDatesForMonth(month, preferredDayNum);

  // Get label for weekday
  const weekdayLabel = Object.keys(weekdayMap).find(
    (key) => weekdayMap[key] === preferredDayNum
  ) || preferredWeekday;

  const isDateSelected = (date: Date) => {
    try {
      return selected.some((d) => isSameDay(parseISO(d), date));
    } catch {
      return false;
    }
  };

  return (
    <div className="p-3 pointer-events-auto bg-fuchsia-950/50 rounded-md border border-fuchsia-800/30 w-full">
      <div className="grid grid-cols-1">
        <div className="flex items-center mb-1 justify-center">
          <span className="font-semibold">{weekdayLabel}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {availableDates.map((date) => (
          <button
            type="button"
            key={format(date, "yyyy-MM-dd")}
            className={`w-full px-3 py-2 rounded-md text-sm
              ${
                isDateSelected(date)
                  ? "bg-fuchsia-600 text-white hover:bg-fuchsia-700"
                  : "bg-fuchsia-900/20 text-white hover:bg-fuchsia-700/70"
              }`}
            onClick={() => onSelectDate(date)}
          >
            {format(date, "EEE, MMM d, yyyy")}
          </button>
        ))}
        {availableDates.length === 0 && (
          <div className="text-sm text-gray-400 text-center">
            No {weekdayLabel}s in this month
          </div>
        )}
      </div>
    </div>
  );
}
