
import React from "react";
import { weekdayMap } from "../availabilityDateUtils";

interface CalendarHeaderProps {
  preferredWeekday: string;
}

export function CalendarHeader({ preferredWeekday }: CalendarHeaderProps) {
  // Find the readable weekday label from the mapping
  const getWeekdayLabel = () => {
    // Default to the provided weekday if not in the map
    if (!preferredWeekday) return "Day";
    
    // Try to find the label in the map
    const weekdayLabel = Object.keys(weekdayMap).find(
      (key) => weekdayMap[key] === weekdayMap[preferredWeekday]
    );
    
    return weekdayLabel || preferredWeekday;
  };

  const weekdayLabel = getWeekdayLabel();

  return (
    <div className="grid grid-cols-1">
      <div className="flex items-center mb-1 justify-center">
        <span className="font-semibold">{weekdayLabel}</span>
      </div>
    </div>
  );
}
