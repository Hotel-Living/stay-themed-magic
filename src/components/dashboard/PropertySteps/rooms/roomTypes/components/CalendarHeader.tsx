
import React from "react";
import { weekdayMap } from "../availabilityDateUtils";

interface CalendarHeaderProps {
  preferredWeekday: string;
}

export function CalendarHeader({ preferredWeekday }: CalendarHeaderProps) {
  const weekdayLabel = Object.keys(weekdayMap).find(
    (key) => weekdayMap[key] === weekdayMap[preferredWeekday]
  ) || preferredWeekday;

  return (
    <div className="grid grid-cols-1">
      <div className="flex items-center mb-1 justify-center">
        <span className="font-semibold">{weekdayLabel}</span>
      </div>
    </div>
  );
}
