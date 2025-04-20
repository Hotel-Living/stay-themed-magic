
import React, { useState } from "react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

export const CustomActivitiesSection: React.FC = () => {
  return (
    <Collapsible className="w-full" defaultOpen={false}>
      <div className="bg-fuchsia-900/10 rounded-lg">
        <CollapsibleTrigger className="flex items-center justify-between w-full p-4">
          <h3 className="text-sm font-medium uppercase">Add Custom Activities</h3>
          <ChevronDown className="h-4 w-4 text-white" />
        </CollapsibleTrigger>
        
        <CollapsibleContent className="p-4 pt-0">
          <div className="space-y-4">
            <div>
              <label htmlFor="activity-name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white">Activity Name</label>
              <input id="activity-name" placeholder="e.g. Local Pottery Workshop" className="flex h-9 w-full rounded-md border border-input bg-fuchsia-950/30 px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-white" />
            </div>
            <div>
              <label htmlFor="activity-description" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white">Description</label>
              <textarea id="activity-description" placeholder="Describe the activity..." className="flex min-h-[80px] w-full rounded-md border border-input bg-fuchsia-950/30 px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-white" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="activity-duration" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white">Duration (hours)</label>
                <input id="activity-duration" type="number" min="0.5" step="0.5" placeholder="2" className="flex h-9 w-full rounded-md border border-input bg-fuchsia-950/30 px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-white" />
              </div>
              <div>
                <label htmlFor="activity-price" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white">Price ($)</label>
                <input id="activity-price" type="number" min="0" placeholder="25" className="flex h-9 w-full rounded-md border border-input bg-fuchsia-950/30 px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-white" />
              </div>
            </div>
            <button className="w-full py-2 text-sm bg-fuchsia-900/30 hover:bg-fuchsia-900/50 border border-fuchsia-500/30 rounded-lg uppercase">
              Add Custom Activity
            </button>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};
