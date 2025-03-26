
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { addDays, format, isSameDay, isSameMonth, startOfMonth, endOfMonth } from 'date-fns';

interface MonthCalendarViewProps {
  year: number;
  month: number;
  selectedWeekday: number;
  selectedPeriods: Array<{ start: Date; end: Date }>;
  onPeriodSelect: (start: Date, end: Date | null) => void;
}

export function MonthCalendarView({
  year,
  month,
  selectedWeekday,
  selectedPeriods,
  onPeriodSelect
}: MonthCalendarViewProps) {
  const monthDate = new Date(year, month);
  const [selectionStart, setSelectionStart] = React.useState<Date | null>(null);
  
  // Generate all days of the selected weekday in the specified month
  const getWeekdayDates = () => {
    const dates: Date[] = [];
    const start = startOfMonth(monthDate);
    const end = endOfMonth(monthDate);
    
    // Find the first occurrence of the selected weekday
    let current = start;
    while (current.getDay() !== selectedWeekday) {
      current = addDays(current, 1);
      if (!isSameMonth(current, start)) return dates; // No occurrences in this month
    }
    
    // Add all occurrences
    while (isSameMonth(current, start) && current <= end) {
      dates.push(new Date(current));
      current = addDays(current, 7);
    }
    
    return dates;
  };
  
  const weekdayDates = getWeekdayDates();
  
  // Check if a date is in a selected period
  const isDateInSelectedPeriod = (date: Date) => {
    return selectedPeriods.some(period => {
      // Check if date is between start and end, inclusive
      return date >= period.start && date <= period.end;
    });
  };
  
  // Handle date selection
  const handleSelect = (date: Date | null) => {
    if (!date) return;
    
    if (selectionStart === null) {
      // Start a new selection
      setSelectionStart(date);
    } else {
      // Complete the selection
      if (date < selectionStart) {
        onPeriodSelect(date, selectionStart);
      } else {
        onPeriodSelect(selectionStart, date);
      }
      setSelectionStart(null);
    }
  };
  
  // Custom rendering for the calendar
  const renderDay = (day: Date) => {
    // Only render days that match the selected weekday
    const isWeekdayMatch = day.getDay() === selectedWeekday;
    if (!isWeekdayMatch) return null;
    
    const isSelected = isDateInSelectedPeriod(day);
    const isSelecting = selectionStart && isSameDay(day, selectionStart);
    
    return (
      <div 
        className={`
          flex items-center justify-center h-10 w-10 rounded-full
          ${isSelected ? 'bg-fuchsia-600 text-white' : 'bg-fuchsia-100 text-fuchsia-800 hover:bg-fuchsia-200'}
          ${isSelecting ? 'ring-2 ring-fuchsia-600' : ''}
          cursor-pointer
        `}
      >
        {format(day, 'd')}
      </div>
    );
  };
  
  return (
    <div className="p-2 border border-fuchsia-800/30 rounded-lg bg-fuchsia-950/10">
      <h3 className="text-base font-medium mb-2">
        {format(monthDate, 'MMMM yyyy')} - Select {format(new Date(2023, 0, selectedWeekday + 1), 'EEEE')}s
      </h3>
      <div className="text-sm mb-4">
        {selectionStart ? (
          <p className="text-fuchsia-300">
            Started selection from {format(selectionStart, 'MMMM d, yyyy')}. 
            Select another {format(new Date(2023, 0, selectedWeekday + 1), 'EEEE')} to complete the period.
          </p>
        ) : (
          <p>Click on a {format(new Date(2023, 0, selectedWeekday + 1), 'EEEE')} to start selecting a period.</p>
        )}
      </div>
      
      {weekdayDates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
          {weekdayDates.map((date) => (
            <button
              key={date.toISOString()}
              onClick={() => handleSelect(date)}
              className={`
                p-2 rounded-lg flex flex-col items-center justify-center
                ${isDateInSelectedPeriod(date) ? 'bg-fuchsia-600 text-white' : 'bg-fuchsia-100 text-fuchsia-800 hover:bg-fuchsia-200'}
                ${selectionStart && isSameDay(date, selectionStart) ? 'ring-2 ring-fuchsia-600' : ''}
              `}
            >
              <span className="text-sm">{format(date, 'EEEE')}</span>
              <span className="text-lg font-bold">{format(date, 'd')}</span>
            </button>
          ))}
        </div>
      ) : (
        <p className="text-center py-4 text-muted-foreground">
          No {format(new Date(2023, 0, selectedWeekday + 1), 'EEEE')}s available in this month.
        </p>
      )}
    </div>
  );
}
