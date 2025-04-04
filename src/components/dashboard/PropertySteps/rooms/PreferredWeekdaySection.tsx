
import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";

export default function PreferredWeekdaySection() {
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const [selectedWeekday, setSelectedWeekday] = useState("Monday");

  return (
    <Collapsible className="w-full">
      <CollapsibleTrigger className="flex items-center justify-between w-full text-left mb-2">
        <label className="block text-sm font-medium text-foreground/90 uppercase">
          PREFERRED WEEKDAY FOR ALL CHECK-INS / OUTS
        </label>
        <ChevronRight className="h-4 w-4" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="grid grid-cols-7 gap-2 mt-2">
          {weekdays.map(day => (
            <label key={day} className="flex flex-col items-center">
              <input 
                type="radio" 
                name="preferred-weekday"
                className="rounded-full border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mb-1"
                checked={selectedWeekday === day}
                onChange={() => setSelectedWeekday(day)}
              />
              <span className="text-xs text-center">{day}</span>
            </label>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
