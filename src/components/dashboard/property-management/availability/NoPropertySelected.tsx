
import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

export function NoPropertySelected() {
  return (
    <div className="flex items-center justify-center p-12 border border-dashed rounded-lg">
      <div className="text-center">
        <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
        <h3 className="mt-4 text-lg font-semibold">No property selected</h3>
        <p className="text-muted-foreground">
          Select a property to manage its availability
        </p>
      </div>
    </div>
  );
}
