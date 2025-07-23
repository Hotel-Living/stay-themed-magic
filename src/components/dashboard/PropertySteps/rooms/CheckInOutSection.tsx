
import React from "react";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";

export default function CheckInOutSection() {
  return (
    <Collapsible className="w-full">
      <CollapsibleTrigger className="flex items-center justify-between w-full text-left mb-2">
        <label className="block text-sm font-medium text-foreground/90 uppercase">
          CHECK-IN/OUT POLICY
        </label>
        <ChevronRight className="h-4 w-4" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <label className="block text-sm mb-1 uppercase">CHECK-IN TIME</label>
            <input 
              type="time" 
              className="w-full bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg p-2"
              defaultValue="14:00"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1 uppercase">CHECK-OUT TIME</label>
            <input 
              type="time" 
              className="w-full bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg p-2"
              defaultValue="11:00"
              required
            />
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
