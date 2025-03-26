
import React from 'react';
import { differenceInDays } from 'date-fns';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

interface SelectedPeriodsCardProps {
  selectedPeriods: Array<{ start: Date; end: Date }>;
  selectedWeekday: number;
  onRemovePeriod: (index: number) => void;
}

export function SelectedPeriodsCard({ 
  selectedPeriods, 
  selectedWeekday,
  onRemovePeriod
}: SelectedPeriodsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Selected Periods</CardTitle>
        <CardDescription>
          All selected periods must start and end on {new Date(2023, 0, selectedWeekday + 1).toLocaleString('default', { weekday: 'long' })}s
        </CardDescription>
      </CardHeader>
      <CardContent>
        {selectedPeriods.length > 0 ? (
          <ul className="space-y-2">
            {selectedPeriods.map((period, index) => {
              const days = differenceInDays(period.end, period.start) + 1;
              return (
                <li key={index} className="flex justify-between items-center p-2 hover:bg-fuchsia-950/10 rounded">
                  <div>
                    <span className="text-sm">
                      {period.start.toLocaleDateString()} - {period.end.toLocaleDateString()}
                    </span>
                    <span className="text-xs text-fuchsia-400 block">
                      {days} days
                    </span>
                  </div>
                  <button 
                    onClick={() => onRemovePeriod(index)}
                    className="text-red-500 hover:text-red-700 text-xs"
                  >
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-center py-4 text-sm text-muted-foreground">
            No specific periods selected
          </p>
        )}
      </CardContent>
    </Card>
  );
}
