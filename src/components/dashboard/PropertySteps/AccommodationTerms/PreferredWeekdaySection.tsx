
import React from "react";
import { ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface PreferredWeekdaySectionProps {
  preferredWeekday: string;
  onWeekdayChange: (weekday: string) => void;
}

export default function PreferredWeekdaySection({
  preferredWeekday = "Monday",
  onWeekdayChange,
}: PreferredWeekdaySectionProps) {
  return (
    <Collapsible className="w-full mb-6">
      <CollapsibleTrigger className="w-full flex items-center justify-between px-6 py-3 text-left rounded-lg bg-[#860493]">
        <h2 className="text-base font-medium text-white">Preferred weekday for all check-in / outs</h2>
        <ChevronRight className="h-5 w-5 text-white" />
      </CollapsibleTrigger>
      <CollapsibleContent className="p-4">
        <div className="grid grid-cols-7 gap-2 mt-2">
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
            <label key={day} className="flex flex-col items-center">
              <input 
                type="radio" 
                name="preferred-weekday" 
                className="rounded-full border-white text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mb-1"
                value={day}
                checked={preferredWeekday === day}
                onChange={() => onWeekdayChange(day)}
              />
              <span className="text-xs text-center text-white">{day}</span>
            </label>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
