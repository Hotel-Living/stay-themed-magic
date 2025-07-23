
import React from "react";

interface EmptyCalendarStateProps {
  weekdayLabel: string;
  hasNoAvailableDates: boolean;
  hasMaxSelection: boolean;
}

export function EmptyCalendarState({ 
  weekdayLabel, 
  hasNoAvailableDates,
  hasMaxSelection 
}: EmptyCalendarStateProps) {
  if (hasNoAvailableDates) {
    return (
      <div className="text-sm text-gray-400 text-center">
        No {weekdayLabel}s in this month
      </div>
    );
  }

  if (hasMaxSelection) {
    return (
      <div className="text-xs text-gray-300 text-center">
        Only two {weekdayLabel}s can be selected per month.
      </div>
    );
  }

  return null;
}
