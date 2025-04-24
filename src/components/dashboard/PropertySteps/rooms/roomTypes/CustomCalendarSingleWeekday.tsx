
import React from "react";
import { format } from "date-fns";
import { weekdayMap, getAvailableDatesForMonth } from "./availabilityDateUtils";
import { CalendarHeader } from "./components/CalendarHeader";
import { CalendarDateButton } from "./components/CalendarDateButton";
import { EmptyCalendarState } from "./components/EmptyCalendarState";
import { 
  getSelectedDatesInMonth, 
  isCheckoutOnlyDate, 
  isDateSelected 
} from "./utils/calendarDateUtils";

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
  const selectedDatesInMonth = getSelectedDatesInMonth(selected, month, preferredDayNum);
  
  const weekdayLabel = Object.keys(weekdayMap).find(
    (key) => weekdayMap[key] === preferredDayNum
  ) || preferredWeekday;

  const handleDateClick = (date: Date) => {
    if (isDateSelected(date, selected)) {
      onSelectDate(date);
    } else if (selectedDatesInMonth.length < 2) {
      onSelectDate(date);
    }
  };

  return (
    <div className="p-3 pointer-events-auto bg-fuchsia-950/50 rounded-md border border-fuchsia-800/30 w-full">
      <CalendarHeader preferredWeekday={preferredWeekday} />
      <div className="flex flex-col gap-2">
        {availableDates.map((date) => {
          const dateSelected = isDateSelected(date, selected);
          const canSelect = dateSelected || selectedDatesInMonth.length < 2;
          const isCheckout = dateSelected && isCheckoutOnlyDate(date, selected);
          
          return (
            <CalendarDateButton
              key={format(date, "yyyy-MM-dd")}
              date={date}
              isSelected={dateSelected}
              canSelect={canSelect}
              isCheckout={isCheckout}
              onClick={() => handleDateClick(date)}
            />
          );
        })}
        
        <EmptyCalendarState
          weekdayLabel={weekdayLabel}
          hasNoAvailableDates={availableDates.length === 0}
          hasMaxSelection={selectedDatesInMonth.length === 2}
        />
      </div>
    </div>
  );
}
