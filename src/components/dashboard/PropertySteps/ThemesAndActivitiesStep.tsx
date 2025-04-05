
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { sortedThemeCategories } from "./themes/themeData";
import ThemeCategory from "./themes/ThemeCategory";

interface ThemesAndActivitiesStepProps {
  onValidationChange?: (isValid: boolean) => void;
}

export default function ThemesAndActivitiesStep({ onValidationChange = () => {} }: ThemesAndActivitiesStepProps) {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  
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
        return [...prev, themeId];
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
              openSubmenus={{ [openSubmenu || '']: !!openSubmenu }}
              toggleSubmenu={toggleSubmenu}
              onThemeSelect={handleThemeSelection}
            />
          ))}
        </div>
      </div>

      {selectedThemes.length === 0 && (
        <p className="text-red-400 text-sm mt-2">
          Please select at least one theme to continue
        </p>
      )}
    </div>
  );
}
