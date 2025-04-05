
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sortedThemeCategories } from "./themes/themeData";
import ThemeCategory from "./themes/ThemeCategory";

export default function ThemesAndActivitiesStep() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  
  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
  };
  
  const toggleSubmenu = (submenu: string) => {
    setOpenSubmenu(openSubmenu === submenu ? null : submenu);
  };
  
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
            />
          ))}
        </div>
      </div>
    </div>
  );
}
