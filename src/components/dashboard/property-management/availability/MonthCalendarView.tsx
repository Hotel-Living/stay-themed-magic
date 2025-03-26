
import React, { useMemo } from 'react';
import { addDays, differenceInDays, format, isSameDay, isSameMonth, startOfMonth, endOfMonth } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { Info } from 'lucide-react';

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
  const monthDate = useMemo(() => new Date(year, month), [year, month]);
  const [selectionStart, setSelectionStart] = React.useState<Date | null>(null);
  
  // Generate all days of the selected weekday in the specified month - memoized for performance
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
  
  // Check if a date is in a selected period - memoized for performance
  const isDateInSelectedPeriod = React.useCallback((date: Date) => {
    return selectedPeriods.some(period => {
      // Check if date is between start and end, inclusive
      return date >= period.start && date <= period.end;
    });
  }, [selectedPeriods]);
  
  // Format weekday name for consistent display
  const weekdayName = useMemo(() => 
    format(new Date(2023, 0, selectedWeekday + 1), 'EEEE'),
    [selectedWeekday]
  );
  
  // Handle date selection
  const handleSelect = (date: Date | null) => {
    if (!date) return;
    
    if (selectionStart === null) {
      // Start a new selection
      setSelectionStart(date);
      toast({
        title: "Selection started",
        description: `Started selection from ${format(date, 'MMMM d, yyyy')}. Select another ${weekdayName} to complete the period.`,
      });
    } else {
      // Complete the selection
      let startDate, endDate;
      if (date < selectionStart) {
        startDate = date;
        endDate = selectionStart;
      } else {
        startDate = selectionStart;
        endDate = date;
      }
      
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
  };
  
  // Calculate what period length would be if selecting this date - memoized for performance
  const calculatePotentialPeriodLength = React.useCallback((date: Date) => {
    if (!selectionStart) return null;
    
    const days = Math.abs(differenceInDays(date, selectionStart)) + 1;
    
    // Check if the period length would be valid
    const isValid = validPeriodLengths.includes(days);
    
    return { days, isValid };
  }, [selectionStart, validPeriodLengths]);
  
  // Render a date button with period length information
  const renderDateButton = React.useCallback((date: Date) => {
    const isSelected = isDateInSelectedPeriod(date);
    const isSelecting = selectionStart && isSameDay(date, selectionStart);
    let potentialPeriod = null;
    
    if (selectionStart && !isSameDay(date, selectionStart)) {
      potentialPeriod = calculatePotentialPeriodLength(date);
    }
    
    return (
      <button
        key={date.toISOString()}
        onClick={() => handleSelect(date)}
        className={`
          p-2 rounded-lg flex flex-col items-center justify-center relative
          ${isSelected ? 'bg-fuchsia-600 text-white' : 'bg-fuchsia-100 text-fuchsia-800 hover:bg-fuchsia-200'}
          ${isSelecting ? 'ring-2 ring-fuchsia-600' : ''}
          ${potentialPeriod && !potentialPeriod.isValid ? 'opacity-50' : ''}
        `}
      >
        <span className="text-sm">{format(date, 'EEEE')}</span>
        <span className="text-lg font-bold">{format(date, 'd')}</span>
        
        {potentialPeriod && (
          <span className={`text-xs mt-1 px-2 py-0.5 rounded-full ${
            potentialPeriod.isValid ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}>
            {potentialPeriod.days} days
          </span>
        )}
      </button>
    );
  }, [selectionStart, isDateInSelectedPeriod, calculatePotentialPeriodLength, handleSelect]);
  
  // Render calendar content
  const renderCalendarContent = () => {
    if (weekdayDates.length === 0) {
      return (
        <p className="text-center py-4 text-muted-foreground">
          No {weekdayName}s available in this month.
        </p>
      );
    }
    
    return (
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
        {weekdayDates.map(renderDateButton)}
      </div>
    );
  };
  
  return (
    <div className="p-2 border border-fuchsia-800/30 rounded-lg bg-fuchsia-950/10">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-base font-medium">
          {format(monthDate, 'MMMM yyyy')} - Available {weekdayName}s
        </h3>
        <div className="flex items-center text-xs text-fuchsia-300 bg-fuchsia-900/20 p-1 rounded">
          <Info className="h-3 w-3 mr-1" />
          <span>Only {weekdayName}s are shown - Customers can only check-in/out on these days</span>
        </div>
      </div>
      
      <div className="text-sm mb-4">
        {selectionStart ? (
          <p className="text-fuchsia-300">
            Started selection from {format(selectionStart, 'MMMM d, yyyy')}. 
            Select another {weekdayName} to complete the period.
            Valid periods: {validPeriodLengths.join(', ')} days.
          </p>
        ) : (
          <p>Select a {weekdayName} to mark as available and set a booking period.</p>
        )}
      </div>
      
      {renderCalendarContent()}
      
      <div className="mt-4 p-2 bg-fuchsia-100 text-fuchsia-800 rounded-lg">
        <p className="text-sm font-medium">Customer-Facing Calendar</p>
        <p className="text-xs">
          The booking calendar shown to customers will only display {weekdayName}s 
          for check-in/check-out. Stays must be in periods of {validPeriodLengths.join(', ')} days exactly.
        </p>
      </div>
    </div>
  );
}
