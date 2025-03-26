
import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

export function DetailedCalendarPlaceholder() {
  return (
    <div className="flex items-center justify-center p-12 border border-dashed rounded-lg">
      <div className="text-center">
        <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
        <h3 className="mt-4 text-base font-medium">No month selected</h3>
        <p className="text-sm text-muted-foreground">
          Click on the dropdown arrow next to a month to view and select specific days
        </p>
      </div>
    </div>
  );
}
