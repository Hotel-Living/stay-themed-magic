
import React from "react";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";

export function LengthOfStaysSection() {
  return (
    <Collapsible className="w-full">
      <CollapsibleTrigger className="flex items-center justify-between w-full text-left mb-2">
        <label className="block text-sm font-medium text-foreground/90">
          LENGTH OF STAYS
        </label>
        <ChevronRight className="h-4 w-4" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <label className="block text-sm mb-1">Minimum stay (nights)</label>
            <input 
              type="number" 
              className="w-full bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg p-2"
              min="1"
              placeholder="e.g., 7"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Maximum stay (nights)</label>
            <input 
              type="number" 
              className="w-full bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg p-2"
              min="1"
              placeholder="e.g., 90"
            />
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
