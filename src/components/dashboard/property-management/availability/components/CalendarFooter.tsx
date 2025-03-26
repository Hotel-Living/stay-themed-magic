
import React, { memo } from 'react';

interface CalendarFooterProps {
  weekdayName: string;
  validPeriodLengths: number[];
}

export const CalendarFooter = memo(function CalendarFooter({ 
  weekdayName, 
  validPeriodLengths 
}: CalendarFooterProps) {
  const periodsText = validPeriodLengths.join(', ');
  
  return (
    <div className="mt-4 p-2 bg-fuchsia-100 text-fuchsia-800 rounded-lg">
      <p className="text-sm font-medium">Customer-Facing Calendar</p>
      <p className="text-xs">
        The booking calendar shown to customers will only display {weekdayName}s 
        for check-in/check-out. Stays must be in periods of {periodsText} days exactly.
      </p>
    </div>
  );
});
