
import React from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight, PlusCircle } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";

export default function RoomsAndPricingStep() {
  const stayLengths = ["8 days", "16 days", "24 days", "32 days"];
  const mealPlans = ["Breakfast only", "Half board", "Full board", "All inclusive", "No Meals Included"];
  
  return (
    <div className="space-y-6">
      <div>
        <Collapsible className="w-full">
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left mb-2">
            <label className="block text-sm font-medium text-foreground/90">
              LENGTH OF STAYS
            </label>
            <ChevronRight className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="col-span-2">
                <label className="block text-sm mb-1">Available stay lengths</label>
                <div className="grid grid-cols-2 gap-2">
                  {stayLengths.map((length) => (
                    <label key={length} className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2" 
                      />
                      <span className="text-sm">{length}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
      
      <div>
        <Collapsible className="w-full">
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left mb-2">
            <label className="block text-sm font-medium text-foreground/90">
              MEALS
            </label>
            <ChevronRight className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="grid grid-cols-1 gap-4 mt-2">
              <div>
                <label className="block text-sm mb-1">Meal plans offered</label>
                <div className="space-y-2">
                  {mealPlans.map((plan) => (
                    <label key={plan} className="flex items-start">
                      <input 
                        type="checkbox" 
                        className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
                      />
                      <span className="text-sm">{plan}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
      
      <div>
        <Collapsible className="w-full">
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left mb-2">
            <label className="block text-sm font-medium text-foreground/90">
              CHECK-IN/OUT POLICY
            </label>
            <ChevronRight className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <label className="block text-sm mb-1">Check-in time</label>
                <input 
                  type="time" 
                  className="w-full bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg p-2"
                  defaultValue="14:00"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Check-out time</label>
                <input 
                  type="time" 
                  className="w-full bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg p-2"
                  defaultValue="11:00"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
