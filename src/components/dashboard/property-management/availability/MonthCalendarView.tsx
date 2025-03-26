
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { addDays, differenceInDays, format, isSameDay, isSameMonth, startOfMonth, endOfMonth } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

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
      toast({
        title: "Selection started",
        description: `Started selection from ${format(date, 'MMMM d, yyyy')}. Select another ${format(new Date(2023, 0, selectedWeekday + 1), 'EEEE')} to complete the period.`,
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
  
  // Calculate what period length would be if selecting this date
  const calculatePotentialPeriodLength = (date: Date) => {
    if (!selectionStart) return null;
    
    const days = Math.abs(differenceInDays(date, selectionStart)) + 1;
    
    // Check if the period length would be valid
    const isValid = validPeriodLengths.includes(days);
    
    return { days, isValid };
  };
  
  // Render a date button with period length information
  const renderDateButton = (date: Date) => {
    const isSelected = isDateInSelectedPeriod(date);
    const isSelecting = selectionStart && isSameDay(date, selectionStart);
    let potentialPeriod = null;
    
    if (selectionStart && !isSameDay(date, selectionStart)) {
      potentialPeriod = calculatePotentialPeriodLength(date);
    }
    
    return (
      <button
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
            Valid periods: {validPeriodLengths.join(', ')} days.
          </p>
        ) : (
          <p>Click on a {format(new Date(2023, 0, selectedWeekday + 1), 'EEEE')} to start selecting a period.</p>
        )}
      </div>
      
      {weekdayDates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
          {weekdayDates.map((date) => renderDateButton(date))}
        </div>
      ) : (
        <p className="text-center py-4 text-muted-foreground">
          No {format(new Date(2023, 0, selectedWeekday + 1), 'EEEE')}s available in this month.
        </p>
      )}
    </div>
  );
}
