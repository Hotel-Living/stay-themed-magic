
import React, { memo } from 'react';

interface EmptyCalendarMessageProps {
  weekdayName: string;
}

export const EmptyCalendarMessage = memo(function EmptyCalendarMessage({ 
  weekdayName 
}: EmptyCalendarMessageProps) {
  return (
    <p className="text-center py-4 text-muted-foreground">
      No {weekdayName}s available in this month.
    </p>
  );
});
