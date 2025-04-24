
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

function isCheckoutOnlyDate(date: Date, selectedDates: Date[], month: Date) {
  // If this is the last selected date in the month
  const datesInMonth = selectedDates.filter(d => 
    d.getMonth() === month.getMonth() && 
    d.getFullYear() === month.getFullYear()
  );
  
  if (datesInMonth.length > 0) {
    const lastDate = new Date(Math.max(...datesInMonth.map(d => d.getTime())));
    return isSameDay(date, lastDate);
  }
  return false;
}

export default function CustomCalendarSingleWeekday({
  month,
  preferredDayNum,
  selected,
  preferredWeekday,
  onSelectDate,
}: CustomCalendarSingleWeekdayProps) {
  const availableDates = getAvailableDatesForMonth(month, preferredDayNum);
  const selectedDatesInMonth = getSelectedDatesInMonth(selected, month, preferredDayNum);

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
    if (isDateSelected(date)) {
      onSelectDate(date);
    } else if (selectedDatesInMonth.length < 2) {
      onSelectDate(date);
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
        {availableDates.map((date) => {
          const isSelected = isDateSelected(date);
          const canSelect = isSelected || selectedDatesInMonth.length < 2;
          const isCheckout = isSelected && isCheckoutOnlyDate(date, selectedDatesInMonth, month);
          
          return (
            <button
              type="button"
              key={format(date, "yyyy-MM-dd")}
              className={`w-full px-3 py-2 rounded-md text-sm transition
                ${
                  isSelected
                    ? isCheckout
                      ? "bg-fuchsia-800 text-white hover:bg-fuchsia-900"
                      : "bg-fuchsia-600 text-white hover:bg-fuchsia-700"
                    : canSelect
                      ? "bg-fuchsia-900/20 text-white hover:bg-fuchsia-700/70"
                      : "bg-gray-400/30 text-white cursor-not-allowed opacity-50"
                }`}
              onClick={() => canSelect ? handleDateClick(date) : undefined}
              disabled={!canSelect}
            >
              {format(date, "EEE, MMM d, yyyy")}
              {isCheckout && (
                <span className="ml-2 text-xs font-medium">(Check-out only)</span>
              )}
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
