
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export default function PreferredWeekdaySection() {
  const [selectedDay, setSelectedDay] = useState("Monday"); // Monday is the default

  return (
    <Collapsible className="w-full mb-6 border border-white rounded-lg overflow-hidden bg-fuchsia-900/10">
      <CollapsibleTrigger className="w-full flex items-center justify-between px-4 text-left border-b border-white py-[4px]">
        <h2 className="font-medium text-base text-white">Preferred Weekday for All Check-In / Outs</h2>
        <ChevronDown className="h-5 w-5 text-white" />
      </CollapsibleTrigger>
      <CollapsibleContent className="p-4">
        <p className="mb-3 text-sm bg-fuchsia-800/20 p-2 rounded text-white">
          <strong>Note:</strong> Monday is set as the default check-in/out day to help standardize your property management.
        </p>
        <div className="grid grid-cols-7 gap-2 mt-2">
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
            <label key={day} className="flex flex-col items-center">
              <input 
                type="radio" 
                name="preferred-weekday" 
                className="rounded-full border-white text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mb-1"
                checked={selectedDay === day}
                onChange={() => setSelectedDay(day)}
              />
              <span className="text-xs text-center text-white">{day}</span>
            </label>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
