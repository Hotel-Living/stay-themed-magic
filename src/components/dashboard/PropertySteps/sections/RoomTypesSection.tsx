
import React from "react";
import { ChevronRight, PlusCircle } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";

export function RoomTypesSection() {
  const roomTypes = ["Single", "Double", "Suite", "Apartment"];

  return (
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
                    <label className="block text-sm mb-1">Price per night</label>
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
                    <label className="block text-sm mb-1">Number of rooms</label>
                    <input 
                      type="number" 
                      className="w-full bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg p-2"
                      min="0"
                      placeholder="e.g., 5"
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
  );
}
