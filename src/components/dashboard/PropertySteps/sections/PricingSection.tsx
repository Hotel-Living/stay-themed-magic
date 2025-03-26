
import React from "react";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";

export function PricingSection() {
  return (
    <Collapsible className="w-full">
      <CollapsibleTrigger className="flex items-center justify-between w-full text-left mb-2">
        <label className="block text-sm font-medium text-foreground/90">
          PRICING
        </label>
        <ChevronRight className="h-4 w-4" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <label className="block text-sm mb-1">Base price per night</label>
            <div className="relative">
              <input 
                type="number" 
                className="w-full bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg p-2 pl-7"
                placeholder="0.00"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1">Weekly discount (%)</label>
            <input 
              type="number" 
              className="w-full bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg p-2"
              min="0"
              max="100"
              placeholder="e.g., 10"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Monthly discount (%)</label>
            <input 
              type="number" 
              className="w-full bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg p-2"
              min="0"
              max="100"
              placeholder="e.g., 20"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Cleaning fee</label>
            <div className="relative">
              <input 
                type="number" 
                className="w-full bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg p-2 pl-7"
                placeholder="0.00"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
