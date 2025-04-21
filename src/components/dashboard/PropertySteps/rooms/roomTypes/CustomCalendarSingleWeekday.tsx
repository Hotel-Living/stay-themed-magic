
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

function getSelectedDatesInMonth(selected: string[], month: Date, preferredDayNum: number) {
  return selected
    .map(d => {
      try { return parseISO(d); } catch { return null; }
    })
    .filter(date => 
      date &&
      date.getMonth() === month.getMonth() &&
      date.getFullYear() === month.getFullYear() &&
      date.getDay() === preferredDayNum
    ) as Date[];
}

export default function CustomCalendarSingleWeekday({
  month,
  preferredDayNum,
  selected,
  preferredWeekday,
  onSelectDate,
}: CustomCalendarSingleWeekdayProps) {
  const availableDates = getAvailableDatesForMonth(month, preferredDayNum);

  // Only allow at most 2 dates for THIS MONTH (on preferred weekday)
  const selectedDatesInMonth = getSelectedDatesInMonth(selected, month, preferredDayNum);

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

  const handleDateClick = (date: Date) => {
    // If the clicked date is already selected, unselect it
    if (isDateSelected(date)) {
      onSelectDate(date);
    } else if (selectedDatesInMonth.length < 2) {
      onSelectDate(date);
    }
    // If already 2 selected, do nothing (so you can only deselect or select when <2)
  };

  return (
    <div className="p-3 pointer-events-auto bg-fuchsia-950/50 rounded-md border border-fuchsia-800/30 w-full">
      <div className="grid grid-cols-1">
        <div className="flex items-center mb-1 justify-center">
          <span className="font-semibold">{weekdayLabel}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {availableDates.map((date) => {
          const isSelected = isDateSelected(date);
          const canSelect = isSelected || selectedDatesInMonth.length < 2;
          return (
            <button
              type="button"
              key={format(date, "yyyy-MM-dd")}
              className={`w-full px-3 py-2 rounded-md text-sm transition
                ${
                  isSelected
                    ? "bg-fuchsia-600 text-white hover:bg-fuchsia-700"
                    : canSelect
                      ? "bg-fuchsia-900/20 text-white hover:bg-fuchsia-700/70"
                      : "bg-gray-400/30 text-white cursor-not-allowed opacity-50"
                }`}
              onClick={() => canSelect ? handleDateClick(date) : undefined}
              disabled={!canSelect}
            >
              {format(date, "EEE, MMM d, yyyy")}
            </button>
          );
        })}
        {availableDates.length === 0 && (
          <div className="text-sm text-gray-400 text-center">
            No {weekdayLabel}s in this month
          </div>
        )}
        {selectedDatesInMonth.length === 2 && (
          <div className="text-xs text-gray-300 text-center">
            Only two {weekdayLabel}s can be selected per month.
          </div>
        )}
      </div>
    </div>
  );
}

