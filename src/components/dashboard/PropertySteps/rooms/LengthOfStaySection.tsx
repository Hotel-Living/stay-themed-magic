
import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";

export default function LengthOfStaySection({ onValidationChange }: { onValidationChange: (isValid: boolean) => void }) {
  const stayLengths = ["8 days", "16 days", "24 days", "32 days"];
  const [stayLengthsValid, setStayLengthsValid] = useState(false);

  const handleStayLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setStayLengthsValid(true);
      onValidationChange(true);
    }
  };

  return (
    <Collapsible className="w-full">
      <CollapsibleTrigger className="flex items-center justify-between w-full text-left mb-2">
        <label className="block text-sm font-medium text-foreground/90 uppercase">
          LENGTH OF STAY
        </label>
        <ChevronRight className="h-4 w-4" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="col-span-2">
            <label className="block text-sm mb-1 uppercase">AVAILABLE STAY LENGTHS</label>
            <div className="grid grid-cols-2 gap-2">
              {stayLengths.map((length) => (
                <label key={length} className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2"
                    onChange={handleStayLengthChange}
                  />
                  <span className="text-sm">{length}</span>
                </label>
              ))}
            </div>
            {!stayLengthsValid && (
              <p className="text-red-400 text-xs mt-1">Please select at least one stay length</p>
            )}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
