
import React, { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";

interface PreferredWeekdaySectionProps {
  preferredWeekday?: string;
  onWeekdayChange?: (weekday: string) => void;
}

export default function PreferredWeekdaySection({
  preferredWeekday = "Monday",
  onWeekdayChange = () => {}
}: PreferredWeekdaySectionProps) {
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const [selectedWeekday, setSelectedWeekday] = useState(preferredWeekday); 
  const [isOpen, setIsOpen] = useState(false);
  
  // Set initial weekday based on prop
  useEffect(() => {
    setSelectedWeekday(preferredWeekday);
  }, [preferredWeekday]);

  // Listen for weekday updates from other components
  useEffect(() => {
    const handleWeekdayUpdate = (event: CustomEvent) => {
      setSelectedWeekday(event.detail);
      onWeekdayChange(event.detail);
    };
    
    window.addEventListener('preferredWeekdayUpdated', handleWeekdayUpdate as EventListener);
    
    return () => {
      window.removeEventListener('preferredWeekdayUpdated', handleWeekdayUpdate as EventListener);
    };
  }, [onWeekdayChange]);

  const handleWeekdayChange = (day: string) => {
    setSelectedWeekday(day);
    onWeekdayChange(day);
    
    // Dispatch event for other components
    const event = new CustomEvent('preferredWeekdayUpdated', { detail: day });
    window.dispatchEvent(event);

    // Removed toast notification
  };

  return (
    <Collapsible className="w-full mb-6 border rounded-lg overflow-hidden bg-fuchsia-900/10" open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="w-full flex items-center justify-between py-3 px-4 text-left border-b border-fuchsia-800/20">
        <label className="block text-lg font-medium uppercase">
          Preferred weekday for all check-in / outs
        </label>
        <ChevronRight className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="p-4">
        <p className="mb-3 text-sm bg-fuchsia-800/20 p-2 rounded">
          <strong>Note:</strong> {selectedWeekday} is selected as the default check-in/out day. This helps standardize your property management.
        </p>
        <div className="grid grid-cols-7 gap-2 mt-2">
          {weekdays.map(day => (
            <label key={day} className="flex flex-col items-center">
              <input 
                type="radio" 
                name="preferred-weekday"
                value={day}
                className="rounded-full border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mb-1"
                checked={selectedWeekday === day}
                onChange={() => handleWeekdayChange(day)}
              />
              <span className="text-xs text-center">{day}</span>
            </label>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
