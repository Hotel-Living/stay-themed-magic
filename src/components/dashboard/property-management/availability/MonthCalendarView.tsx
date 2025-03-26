
import React, { useMemo, useCallback, useState } from 'react';
import { 
  addDays, 
  differenceInDays, 
  format, 
  isSameDay, 
  isSameMonth, 
  startOfMonth, 
  endOfMonth 
} from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { CalendarHeader } from './components/CalendarHeader';
import { CalendarGrid } from './components/CalendarGrid';
import { CalendarFooter } from './components/CalendarFooter';

interface MonthCalendarViewProps {
  year: number;
  month: number;
  selectedWeekday: number;
  selectedPeriods: Array<{ start: Date; end: Date }>;
  onPeriodSelect: (start: Date, end: Date | null) => void;
  validPeriodLengths: number[];
}

export function MonthCalendarView({
  year,
  month,
  selectedWeekday,
  selectedPeriods,
  onPeriodSelect,
  validPeriodLengths
}: MonthCalendarViewProps) {
  const { toast } = useToast();
  const [selectionStart, setSelectionStart] = useState<Date | null>(null);
  
  // Format weekday name for consistent display
  const weekdayName = useMemo(() => 
    format(new Date(2023, 0, selectedWeekday + 1), 'EEEE'),
    [selectedWeekday]
  );
  
  // Memoize the month date
  const monthDate = useMemo(() => new Date(year, month), [year, month]);
  
  // Generate all days of the selected weekday in the specified month
  const weekdayDates = useMemo(() => {
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
  }, [monthDate, selectedWeekday]);
  
  // Check if a date is in a selected period
  const isDateInSelectedPeriod = useCallback((date: Date) => {
    return selectedPeriods.some(period => 
      date >= period.start && date <= period.end
    );
  }, [selectedPeriods]);
  
  // Calculate potential period length
  const calculatePotentialPeriodLength = useCallback((date: Date) => {
    if (!selectionStart) return null;
    
    const days = Math.abs(differenceInDays(date, selectionStart)) + 1;
    const isValid = validPeriodLengths.includes(days);
    
    return { days, isValid };
  }, [selectionStart, validPeriodLengths]);
  
  // Handle date selection
  const handleSelect = useCallback((date: Date) => {
    if (selectionStart === null) {
      // Start a new selection
      setSelectionStart(date);
      toast({
        title: "Selection started",
        description: `Started selection from ${format(date, 'MMMM d, yyyy')}. Select another ${weekdayName} to complete the period.`,
      });
    } else {
      // Complete the selection
      const [startDate, endDate] = date < selectionStart 
        ? [date, selectionStart] 
        : [selectionStart, date];
      
      // Calculate days in the period (inclusive)
      const days = differenceInDays(endDate, startDate) + 1;
      
      // Check if the period length is valid
      if (!validPeriodLengths.includes(days)) {
        toast({
          title: "Invalid period length",
          description: `Periods must be exactly ${validPeriodLengths.join(', ')} days. Your selection was ${days} days.`,
          variant: "destructive",
        });
        setSelectionStart(null);
        return;
      }
      
      onPeriodSelect(startDate, endDate);
      setSelectionStart(null);
    }
  }, [selectionStart, weekdayName, validPeriodLengths, onPeriodSelect, toast]);
  
  return (
    <div className="p-2 border border-fuchsia-800/30 rounded-lg bg-fuchsia-950/10">
      <CalendarHeader 
        monthDate={monthDate}
        weekdayName={weekdayName}
        selectionStart={selectionStart}
        validPeriodLengths={validPeriodLengths}
      />
      
      <CalendarGrid
        weekdayDates={weekdayDates}
        weekdayName={weekdayName}
        selectionStart={selectionStart}
        isDateInSelectedPeriod={isDateInSelectedPeriod}
        calculatePotentialPeriodLength={calculatePotentialPeriodLength}
        onDateSelect={handleSelect}
      />
      
      <CalendarFooter 
        weekdayName={weekdayName}
        validPeriodLengths={validPeriodLengths}
      />
    </div>
  );
}
