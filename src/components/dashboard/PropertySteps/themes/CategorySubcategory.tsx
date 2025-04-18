
import React from "react";
import ThemeSubmenu from "./ThemeSubmenu";
import ThemeOption from "./ThemeOption";

interface CategorySubcategoryProps {
  name: string;
  themes: {
    id: string;
    name: string;
    isAddOption?: boolean;
  }[];
  submenus: {
    name: string;
    options: {
      id: string;
      name: string;
      suboptions?: string[];
      isAddOption?: boolean;
    }[];
  }[];
  openSubmenus: {
    [key: string]: boolean;
  };
  toggleSubmenu: (submenu: string) => void;
  onThemeSelect: (themeId: string, isSelected: boolean) => void;
  selectedThemes: string[];
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
  // Render direct themes (if any)
  const hasDirectThemes = themes && themes.length > 0;
  
  // Render subcategories with their themes
  const hasSubmenus = submenus && submenus.length > 0;
  
  return (
    <div className="mb-4">
      {/* Category name */}
      <h3 className="font-medium text-base mb-2">{name}</h3>
      
      {/* Direct themes under this category */}
      {hasDirectThemes && (
        <div className="pl-2 mb-3 space-y-2">
          {themes.map((theme) => (
            <ThemeOption 
              key={theme.id} 
              option={theme}
              onThemeSelect={onThemeSelect}
              selectedThemes={selectedThemes}
            />
          ))}
        </div>
      )}
      
      {/* Subcategories and their themes */}
      {hasSubmenus && (
        <div className="pl-2">
          {submenus.map((submenu) => (
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
      )}
    </div>
  );
};

export default CategorySubcategory;
