
import React, { memo, useMemo } from 'react';
import { format } from 'date-fns';
import { Info } from 'lucide-react';

interface CalendarHeaderProps {
  monthDate: Date;
  weekdayName: string;
  selectionStart: Date | null;
  validPeriodLengths: number[];
}

export const CalendarHeader = memo(function CalendarHeader({
  monthDate,
  weekdayName,
  selectionStart,
  validPeriodLengths
}: CalendarHeaderProps) {
  const monthTitle = useMemo(() => format(monthDate, 'MMMM yyyy'), [monthDate]);
  const selectionDate = useMemo(() => 
    selectionStart ? format(selectionStart, 'MMMM d, yyyy') : null, 
    [selectionStart]
  );

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-base font-medium">
          {monthTitle} - Available {weekdayName}s
        </h3>
        <div className="flex items-center text-xs text-fuchsia-300 bg-fuchsia-900/20 p-1 rounded">
          <Info className="h-3 w-3 mr-1" />
          <span>Only {weekdayName}s are shown - Customers can only check-in/out on these days</span>
        </div>
      </div>
      
      <div className="text-sm mb-4">
        {selectionStart ? (
          <p className="text-fuchsia-300">
            Started selection from {selectionDate}. 
            Select another {weekdayName} to complete the period.
            Valid periods: {validPeriodLengths.join(', ')} days.
          </p>
        ) : (
          <p>Select a {weekdayName} to mark as available and set a booking period.</p>
        )}
      </div>
    </>
  );
});
