
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
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const mealPlans = ["Breakfast only", "Half board", "Full board", "All inclusive", "No Meals Included"];
  const roomTypes = ["Single", "Double", "Suite", "Apartment"];
  const stayLengths = ["8 days", "16 days", "24 days", "32 days"];
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-6">ADD A NEW PROPERTY</h2>
      
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
              <div className="col-span-2">
                <label className="block text-sm uppercase font-medium mb-1">Preferred Weekday for all Check-ins/outs</label>
                <Select>
                  <SelectTrigger className="w-full bg-fuchsia-950/30 border border-fuchsia-800/30">
                    <SelectValue placeholder="Select a weekday" />
                  </SelectTrigger>
                  <SelectContent>
                    {weekdays.map((day) => (
                      <SelectItem key={day} value={day.toLowerCase()}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
      
      <div>
        <Collapsible className="w-full">
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left mb-2">
            <label className="block text-sm font-medium text-foreground/90">
              ROOM TYPES
            </label>
            <ChevronRight className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="grid grid-cols-1 gap-4 mt-2">
              <div className="space-y-4">
                {roomTypes.map((roomType) => (
                  <div key={roomType} className="bg-fuchsia-950/30 rounded-lg p-4 border border-fuchsia-800/30">
                    <h4 className="font-medium mb-3">{roomType}</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm mb-1">Number of rooms</label>
                        <input 
                          type="number" 
                          className="w-full bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg p-2"
                          min="0"
                          placeholder="e.g., 5"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-1">Max guests per room</label>
                        <input 
                          type="number" 
                          className="w-full bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg p-2"
                          min="1"
                          placeholder="e.g., 2"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex items-center">
                  <PlusCircle className="w-5 h-5 mr-2 text-fuchsia-400" />
                  <span className="text-fuchsia-400 font-medium">Add new room type</span>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
