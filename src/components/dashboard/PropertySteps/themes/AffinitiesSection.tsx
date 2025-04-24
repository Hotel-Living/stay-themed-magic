
import React from "react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { sortedThemeCategories } from "./themeData";
import ThemeCategory from "./ThemeCategory";

interface AffinitiesSectionProps {
  openCategory: string | null;
  setOpenCategory: (category: string | null) => void;
  openSubmenu: string | null;
  setOpenSubmenu: (submenu: string | null) => void;
  onThemeSelect: (themeId: string, isSelected: boolean) => void;
  selectedThemes: string[]; // Add this prop to track selected themes
}

export const AffinitiesSection: React.FC<AffinitiesSectionProps> = ({
  openCategory,
  setOpenCategory,
  openSubmenu,
  setOpenSubmenu,
  onThemeSelect,
  selectedThemes,
}) => {
  return (
    <Collapsible defaultOpen={false} className="w-full">
      <div className="bg-[#6c0686]">
        <CollapsibleTrigger className="flex items-center justify-between w-full p-2">
          <label className="block text-xl font-bold text-foreground/90 uppercase">
            AFFINITIES
          </label>
          <ChevronDown className="h-5 w-5 text-white" />
        </CollapsibleTrigger>
      </div>
      
      <CollapsibleContent>
        <p className="text-sm text-foreground/90 mb-4">
          Make your hotel stand out from the competition boosting it with group affinities to attract your best and perfect guests
        </p>
        
        <Link 
          to="/themes-information" 
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors mb-4 bg-[#e108fd]/80 hover:bg-[#e108fd]"
        >
          More Information
        </Link>
        
        <div>
          <div className="grid grid-cols-1 gap-0.5">
            {sortedThemeCategories.map(category => (
              <ThemeCategory 
                key={category.category} 
                category={category} 
                isOpen={openCategory === category.category} 
                toggleCategory={setOpenCategory} 
                openSubmenus={{[openSubmenu || '']: !!openSubmenu}} 
                toggleSubmenu={setOpenSubmenu}
                onThemeSelect={onThemeSelect}
                selectedThemes={selectedThemes} // Pass selected themes down to category
              />
            ))}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
