
import React from 'react';

interface EmptyCalendarMessageProps {
  weekdayName: string;
}

export function EmptyCalendarMessage({ weekdayName }: EmptyCalendarMessageProps) {
  return (
    <p className="text-center py-4 text-muted-foreground">
      No {weekdayName}s available in this month.
    </p>
  );
}
