
import React from "react";
import { ChevronRight, Info } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { Link } from "react-router-dom";

export default function ThemesAndActivitiesStep() {
  // Example themes
  const themes = {
    "Nature & Outdoors": ["Mountains", "Beach", "Lake", "Countryside", "Forest"],
    "Wellness & Relaxation": ["Spa", "Yoga", "Meditation", "Thermal baths"],
    "Food & Wine": ["Gastronomy", "Wine tasting", "Cooking classes"],
    "Culture & History": ["Museums", "Historical sites", "Local traditions"],
    "Sports & Adventure": ["Hiking", "Biking", "Water sports", "Winter sports", "Extreme sports"]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-medium">THEMES & ACTIVITIES</h2>
        <Link 
          to="/themes-information" 
          className="text-sm text-fuchsia-400 hover:text-fuchsia-300 flex items-center gap-1"
        >
          <Info className="w-4 h-4" />
          <span>More Information</span>
        </Link>
      </div>
      
      {/* Theme categories */}
      {Object.entries(themes).map(([category, items]) => (
        <Collapsible key={category} className="w-full">
          <CollapsibleTrigger className="w-full flex items-center justify-between bg-[#5A1876]/20 p-3 rounded-md">
            <span className="font-medium">{category}</span>
            <ChevronRight className="w-4 h-4" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-3 bg-[#5A1876]/10 rounded-b-md">
              {items.map(item => (
                <div key={item} className="flex items-center">
                  <input 
                    type="checkbox" 
                    id={`theme-${item.replace(/\s+/g, '-').toLowerCase()}`}
                    className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2"
                  />
                  <label 
                    htmlFor={`theme-${item.replace(/\s+/g, '-').toLowerCase()}`}
                    className="text-sm"
                  >
                    {item}
                  </label>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
      
      {/* Activities section */}
      <Collapsible className="w-full">
        <CollapsibleTrigger className="w-full flex items-center justify-between bg-[#5A1876]/20 p-3 rounded-md">
          <span className="font-medium">POPULAR ACTIVITIES NEARBY</span>
          <ChevronRight className="w-4 h-4" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="p-3 bg-[#5A1876]/10 rounded-b-md">
            <textarea 
              className="w-full text-sm bg-fuchsia-950/50 border border-fuchsia-500/30 rounded-lg p-3" 
              rows={4} 
              placeholder="List popular activities available near your property..."
            ></textarea>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
