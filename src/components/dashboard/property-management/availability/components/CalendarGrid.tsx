
import React, { memo, useMemo } from 'react';
import { isSameDay } from 'date-fns';
import { DateButton } from './DateButton';
import { EmptyCalendarMessage } from './EmptyCalendarMessage';

interface CalendarGridProps {
  weekdayDates: Date[];
  weekdayName: string;
  selectionStart: Date | null;
  isDateInSelectedPeriod: (date: Date) => boolean;
  calculatePotentialPeriodLength: (date: Date) => { days: number; isValid: boolean } | null;
  onDateSelect: (date: Date) => void;
}

export const CalendarGrid = memo(function CalendarGrid({
  weekdayDates,
  weekdayName,
  selectionStart,
  isDateInSelectedPeriod,
  calculatePotentialPeriodLength,
  onDateSelect
}: CalendarGridProps) {
  const hasWeekdayDates = weekdayDates.length > 0;
  
  if (!hasWeekdayDates) {
    return <EmptyCalendarMessage weekdayName={weekdayName} />;
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
      {weekdayDates.map(date => {
        const dateKey = date.toISOString();
        const isSelected = isDateInSelectedPeriod(date);
        const isSelecting = selectionStart && isSameDay(date, selectionStart);
        let potentialPeriod = null;
        
        if (selectionStart && !isSameDay(date, selectionStart)) {
          potentialPeriod = calculatePotentialPeriodLength(date);
        }
        
        return (
          <DateButton 
            key={dateKey}
            date={date}
            isSelected={isSelected}
            isSelecting={isSelecting}
            potentialPeriod={potentialPeriod}
            onSelect={onDateSelect}
          />
        );
      })}
    </div>
  );
});
