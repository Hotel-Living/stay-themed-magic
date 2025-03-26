
import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WeekdaySelectorProps {
  selectedWeekday: number;
  onWeekdaySelect: (weekday: number) => void;
}

export function WeekdaySelector({
  selectedWeekday,
  onWeekdaySelect
}: WeekdaySelectorProps) {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium mb-2">WEEKDAY FOR CHECK-INS/OUTS</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {weekdays.map((day, index) => (
          <Button
            key={day}
            variant={selectedWeekday === index ? "default" : "outline"}
            size="sm"
            className={`justify-start ${selectedWeekday === index ? 'bg-fuchsia-600 hover:bg-fuchsia-700' : ''}`}
            onClick={() => onWeekdaySelect(index)}
          >
            {selectedWeekday === index && <Check className="h-4 w-4 mr-1" />}
            {day}
          </Button>
        ))}
      </div>
    </div>
  );
}
