
import React, { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";

export default function PreferredWeekdaySection() {
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const [selectedWeekday, setSelectedWeekday] = useState("Monday"); // Monday is default
  const [isOpen, setIsOpen] = useState(false);
  
  // Ensure Monday is selected by default when component mounts
  useEffect(() => {
    setSelectedWeekday("Monday");
  }, []);

  return (
    <Collapsible className="w-full mb-6 border rounded-lg overflow-hidden bg-fuchsia-900/10" open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="w-full flex items-center justify-between py-3 px-4 text-left border-b border-fuchsia-800/20">
        <label className="block text-lg font-medium uppercase">
          PREFERRED WEEKDAY FOR ALL CHECK-IN / OUTS
        </label>
        <ChevronRight className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="p-4">
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
