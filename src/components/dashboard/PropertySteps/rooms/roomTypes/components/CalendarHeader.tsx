
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

    // Find the key in weekdayMap that corresponds to the preferredWeekday value
    const weekdayKey = Object.entries(weekdayMap).find(
      ([key, value]) => value === weekdayMap[preferredWeekday]
    )?.[0];
    
    return weekdayKey || preferredWeekday;
  };

  const weekdayLabel = getWeekdayLabel();
  
  return (
    <div className="grid grid-cols-1">
      <div className="flex items-center mb-1 justify-center">
        <span className="font-semibold text-sm">{weekdayLabel}</span>
      </div>
    </div>
  );
}

export default CalendarHeader;
