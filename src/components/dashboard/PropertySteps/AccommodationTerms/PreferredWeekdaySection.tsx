
import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface PreferredWeekdaySectionProps {
  preferredWeekday?: string;
  onWeekdayChange?: (weekday: string) => void;
  weekdays?: string[];
}

export default function PreferredWeekdaySection({
  preferredWeekday = "Monday",
  onWeekdayChange = () => {},
  weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
}: PreferredWeekdaySectionProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible 
      className="w-full border border-fuchsia-800/30 rounded-lg overflow-hidden bg-fuchsia-900/10"
      open={isOpen}
      onOpenChange={setIsOpen}
      defaultOpen={false}
    >
      <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 text-left bg-fuchsia-900/20">
        <h2 className="text-base font-medium text-white">Preferred Weekday for all Check-in / outs</h2>
        {isOpen ? 
          <ChevronUp className="h-4 w-4 text-white" /> : 
          <ChevronDown className="h-4 w-4 text-white" />
        }
      </CollapsibleTrigger>
      <CollapsibleContent className="p-3">
        <div className="grid grid-cols-7 gap-2">
          {weekdays.map(day => (
            <label key={day} className="flex flex-col items-center">
              <input 
                type="radio" 
                name="preferred-weekday" 
                className="rounded-full border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mb-1"
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
