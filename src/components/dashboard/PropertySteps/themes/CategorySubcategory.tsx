
import React from "react";
import ThemeSubmenu from "./ThemeSubmenu";
import ThemeItem from "./ThemeItem";

interface SubcategoryTheme {
  id: string;
  name: string;
  isAddOption?: boolean;
}

interface Submenu {
  name: string;
  options: Array<{
    id: string;
    name: string;
    suboptions?: string[];
    isAddOption?: boolean;
  }>;
}

interface CategorySubcategoryProps {
  name: string;
  themes?: SubcategoryTheme[];
  submenus?: Submenu[];
  openSubmenus: { [key: string]: boolean };
  toggleSubmenu: (submenu: string) => void;
  onThemeSelect?: (themeId: string, isSelected: boolean) => void;
  selectedThemes?: string[];
}

const CategorySubcategory = ({ 
  name, 
  themes, 
  submenus, 
  openSubmenus, 
  toggleSubmenu, 
  onThemeSelect,
  selectedThemes = []
}: CategorySubcategoryProps) => {
  return (
    <div className="bg-[#5A1876]/15 rounded-lg p-1.5 border border-fuchsia-800/15">
      <div className="flex items-center justify-between w-full text-sm h-6">
        <span>{name}</span>
      </div>
      
      <div className="mt-1 space-y-0.5">
        {/* Render subcategory themes if they exist */}
        {themes && themes.map((theme) => (
          <div key={theme.id} className="bg-[#5A1876]/10 rounded-lg p-1.5 border border-fuchsia-800/10">
            <ThemeItem
              id={theme.id}
              name={theme.name}
              isAddOption={theme.isAddOption}
              isSelected={selectedThemes.includes(theme.id)}
              onSelect={(isSelected) => {
                if (onThemeSelect) {
                  onThemeSelect(theme.id, isSelected);
                }
              }}
            />
          </div>
        ))}
        
        {/* Render subcategory submenus if they exist */}
        {submenus && submenus.map((submenu) => (
          <ThemeSubmenu
            key={submenu.name}
            submenu={submenu}
            isOpen={openSubmenus[submenu.name] || false}
            toggleSubmenu={toggleSubmenu}
            onThemeSelect={onThemeSelect}
            selectedThemes={selectedThemes}
          />
        ))}
      </div>
    </div>
  );
};

export default CategorySubcategory;
