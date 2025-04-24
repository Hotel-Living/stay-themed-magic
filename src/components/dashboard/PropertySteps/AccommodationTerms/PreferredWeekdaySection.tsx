
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

  // Dispatch an event when the component mounts to sync with other components
  React.useEffect(() => {
    if (preferredWeekday) {
      const event = new CustomEvent('preferredWeekdayUpdated', { detail: preferredWeekday });
      window.dispatchEvent(event);
    }
  }, [preferredWeekday]);

  return (
    <Collapsible 
      className="w-full border border-white rounded-lg overflow-hidden bg-fuchsia-900/10"
      open={isOpen}
      onOpenChange={setIsOpen}
      defaultOpen={false}
    >
      <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-[4px] text-left bg-fuchsia-900/20 border-b border-white">
        <h2 className="font-medium text-base text-white">Preferred Weekday for all Check-in / outs</h2>
        {isOpen ? 
          <ChevronUp className="h-5 w-5 text-white" /> : 
          <ChevronDown className="h-5 w-5 text-white" />
        }
      </CollapsibleTrigger>
      <CollapsibleContent className="p-4">
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
