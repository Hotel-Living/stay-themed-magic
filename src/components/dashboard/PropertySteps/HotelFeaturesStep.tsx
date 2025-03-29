
import React from "react";
import { PlusCircle, ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";

const hotelFeatures = [
  "Free WiFi", "Parking", "Restaurant", "Pool", "Spa", "Gym", 
  "24/7 Reception", "Room Service", "Bar", "Lounge", 
  "Business Center", "Conference Rooms", "Laundry Service",
  "Concierge", "Airport Shuttle", "Pet Friendly"
];

const roomFeatures = [
  "Air Conditioning", "Private Bathroom", "TV", "Safe", "Mini Bar", 
  "Coffee Machine", "Kettle", "Hairdryer", "Iron", "Work Desk",
  "Balcony", "Sea View", "Mountain View", "City View", "Bathtub",
  "Walk-in Shower", "King Bed", "Queen Bed", "Twin Beds", "Sofa Bed",
  "High-speed Internet", "Blackout Curtains", "Soundproof", "Room Service"
];

export default function HotelFeaturesStep() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">ADD A NEW PROPERTY</h2>
      
      <div>
        <Collapsible className="w-full">
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left mb-2">
            <label className="block text-sm font-medium text-foreground/90 mb-2">
              HOTEL FEATURES
            </label>
            <ChevronRight className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {hotelFeatures.map((feature) => (
                <label key={feature} className="flex items-start">
                  <input 
                    type="checkbox" 
                    className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
                  />
                  <span className="text-sm">{feature}</span>
                </label>
              ))}
              <div className="flex items-center">
                <PlusCircle className="w-4 h-4 mr-2 text-fuchsia-400" />
                <span className="text-sm text-fuchsia-400">Add new feature</span>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
      
      <div>
        <Collapsible className="w-full">
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left mb-2">
            <label className="block text-sm font-medium text-foreground/90 mb-2">
              ROOM FEATURES
            </label>
            <ChevronRight className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {roomFeatures.map((feature) => (
                <label key={feature} className="flex items-start">
                  <input 
                    type="checkbox" 
                    className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
                  />
                  <span className="text-sm">{feature}</span>
                </label>
              ))}
              <div className="flex items-center">
                <PlusCircle className="w-4 h-4 mr-2 text-fuchsia-400" />
                <span className="text-sm text-fuchsia-400">Add new feature</span>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
