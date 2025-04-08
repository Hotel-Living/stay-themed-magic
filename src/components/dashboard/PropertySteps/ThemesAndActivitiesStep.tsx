
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { sortedThemeCategories } from "./themes/themeData";
import ThemeCategory from "./themes/ThemeCategory";
import { useToast } from "@/hooks/use-toast";

interface ThemesAndActivitiesStepProps {
  onValidationChange?: (isValid: boolean) => void;
}

export default function ThemesAndActivitiesStep({
  onValidationChange = () => {}
}: ThemesAndActivitiesStepProps) {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const { toast } = useToast();
  
  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
  };
  
  const toggleSubmenu = (submenu: string) => {
    setOpenSubmenu(openSubmenu === submenu ? null : submenu);
  };

  // Track theme selection
  const handleThemeSelection = (themeId: string, isSelected: boolean) => {
    setSelectedThemes(prev => {
      if (isSelected) {
        // Show toast for selected themes
        if (!prev.includes(themeId)) {
          toast({
            title: "Theme selected",
            description: "The theme has been added to your selection"
          });
        }
        return [...prev.filter(id => id !== themeId), themeId];
      } else {
        return prev.filter(id => id !== themeId);
      }
    });
  };

  // Validate based on theme selection
  useEffect(() => {
    // Consider the step valid if at least one theme is selected
    const isValid = selectedThemes.length > 0;
    onValidationChange(isValid);
  }, [selectedThemes, onValidationChange]);
  
  return (
    <div className="space-y-4">
      <label className="block text-2xl font-bold text-foreground/90 mb-2 uppercase bg-[#6c0686]">
        THEMES
      </label>
      
      <p className="text-sm text-foreground/90 mb-4">
        Make your hotel stand out from the competition boosting it with group themes to attract your best and perfect guests
      </p>
      
      <Link 
        to="/themes-information" 
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
              toggleCategory={toggleCategory} 
              openSubmenus={{[openSubmenu || '']: !!openSubmenu}} 
              toggleSubmenu={toggleSubmenu}
              onThemeSelect={handleThemeSelection} 
            />
          ))}
        </div>
      </div>
      
      {selectedThemes.length > 0 && (
        <div className="p-3 bg-fuchsia-900/20 rounded-lg mt-3">
          <h3 className="text-sm font-medium mb-2">Selected Themes ({selectedThemes.length})</h3>
          <div className="flex flex-wrap gap-2">
            {selectedThemes.map(themeId => (
              <div 
                key={themeId} 
                className="px-2 py-1 bg-fuchsia-800/30 rounded-md text-xs flex items-center"
              >
                {themeId.replace(/^custom-/, '').replace(/-/g, ' ')}
                <button 
                  className="ml-1.5 text-fuchsia-300 hover:text-white"
                  onClick={() => handleThemeSelection(themeId, false)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedThemes.length === 0 && (
        <p className="text-sm mt-2 text-[#fa97a3]/[0.99]">
          Please select at least one theme to continue
        </p>
      )}
    </div>
  );
}
