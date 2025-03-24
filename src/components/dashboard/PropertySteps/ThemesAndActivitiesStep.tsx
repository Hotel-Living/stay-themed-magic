
import React, { useState } from "react";
import { PlusCircle, ChevronRight } from "lucide-react";
import { themeCategories } from "@/utils/data";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";

export default function ThemesAndActivitiesStep() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  
  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
  };
  
  return (
    <div className="space-y-5">
      <h3 className="text-lg font-semibold mb-4">THEMES</h3>
      
      <p className="text-sm text-foreground/90 mb-4">
        Make your hotel stand out from the competition boosting it with group themes to attract your best and perfect guests
      </p>
      <button className="inline-flex items-center px-4 py-2 rounded-lg bg-[#5A1876]/80 hover:bg-[#5A1876] text-white text-sm font-medium transition-colors mb-6">
        More Information
      </button>
      
      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-3">
          THEMES
        </label>
        <div className="grid grid-cols-1 gap-4">
          {/* Map through all theme categories */}
          {themeCategories.map((category) => (
            <Collapsible key={category.category}>
              <div className="bg-[#5A1876]/30 rounded-lg p-4 border border-fuchsia-800/30">
                <CollapsibleTrigger 
                  className="flex items-center justify-between w-full font-medium mb-2"
                  onClick={() => toggleCategory(category.category)}
                >
                  <h4>{category.category}</h4>
                  <ChevronRight className={`h-4 w-4 transform transition-transform ${openCategory === category.category ? 'rotate-90' : ''}`} />
                </CollapsibleTrigger>
                
                <CollapsibleContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                    {category.themes.map((theme) => (
                      <label key={theme.id} className="flex items-start">
                        <input 
                          type="checkbox" 
                          className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
                        />
                        <span className="text-sm">{theme.name}</span>
                      </label>
                    ))}
                    <div className="flex items-center">
                      <PlusCircle className="w-4 h-4 mr-2 text-fuchsia-400" />
                      <span className="text-sm text-fuchsia-400">Add new {category.category} theme</span>
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}
          
          <div className="flex items-center">
            <PlusCircle className="w-5 h-5 mr-2 text-fuchsia-400" />
            <span className="text-fuchsia-400 font-medium">Add new theme category</span>
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-3">
          HOTEL FEATURES
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {["Free WiFi", "Parking", "Restaurant", "Pool", "Spa", "Gym", "24/7 Reception", "Room Service"].map((feature) => (
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
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-3">
          ACTIVITIES
        </label>
        <Collapsible className="w-full">
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-[#5A1876]/30 rounded-lg p-4 border border-fuchsia-800/30">
              <CollapsibleTrigger className="flex items-center justify-between w-full font-medium mb-2">
                <h4>On Premises</h4>
                <ChevronRight className="h-4 w-4" />
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                  {["Dancing", "Concerts", "Courses", "Games", "Theater", "Spa"].map((activity) => (
                    <label key={activity} className="flex items-start">
                      <input 
                        type="checkbox" 
                        className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
                      />
                      <span className="text-sm">{activity}</span>
                    </label>
                  ))}
                  <div className="flex items-center">
                    <PlusCircle className="w-4 h-4 mr-2 text-fuchsia-400" />
                    <span className="text-sm text-fuchsia-400">Add new activity</span>
                  </div>
                </div>
              </CollapsibleContent>
            </div>
            
            <div className="bg-[#5A1876]/30 rounded-lg p-4 border border-fuchsia-800/30">
              <CollapsibleTrigger className="flex items-center justify-between w-full font-medium mb-2">
                <h4>At Nearby Locations</h4>
                <ChevronRight className="h-4 w-4" />
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                  {["Beach", "Hiking", "Concerts", "Shopping", "Museums", "Sports"].map((activity) => (
                    <label key={activity} className="flex items-start">
                      <input 
                        type="checkbox" 
                        className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
                      />
                      <span className="text-sm">{activity}</span>
                    </label>
                  ))}
                  <div className="flex items-center">
                    <PlusCircle className="w-4 h-4 mr-2 text-fuchsia-400" />
                    <span className="text-sm text-fuchsia-400">Add new activity</span>
                  </div>
                </div>
              </CollapsibleContent>
            </div>
          </div>
        </Collapsible>
      </div>
    </div>
  );
}
