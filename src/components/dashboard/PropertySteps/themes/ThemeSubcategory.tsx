
import React from "react";
import ThemeItem from "./ThemeItem";
import ThemeSubmenu from "./ThemeSubmenu";
import { PlusCircle } from "lucide-react";

interface Theme {
  id: string;
  name: string;
  isAddOption?: boolean;
}

interface ThemeSubmenuType {
  name: string;
  options: Array<{
    id: string;
    name: string;
    suboptions?: string[];
    isAddOption?: boolean;
  }>;
}

interface ThemeSubcategoryProps {
  subcategory: {
    name: string;
    themes?: Theme[];
    submenus?: ThemeSubmenuType[];
  };
  openSubmenus: Record<string, boolean>;
  toggleSubmenu: (submenuName: string) => void;
  onThemeSelect?: (themeId: string, isSelected: boolean) => void;
  selectedThemes?: string[]; // Add this prop
}

const ThemeSubcategory = ({
  subcategory,
  openSubmenus,
  toggleSubmenu,
  onThemeSelect,
  selectedThemes = [], // Default to empty array if not provided
}: ThemeSubcategoryProps) => {
  return (
    <div className="bg-[#5A1876]/20 rounded-lg p-1.5 border border-fuchsia-800/20">
      <h5 className="font-medium mb-1 uppercase">{subcategory.name}</h5>

      {subcategory.submenus ? (
        <div className="space-y-0.5">
          {subcategory.submenus.map((submenu) => (
            <ThemeSubmenu
              key={submenu.name}
              submenu={submenu}
              isOpen={openSubmenus[submenu.name] || false}
              toggleSubmenu={toggleSubmenu}
              onThemeSelect={onThemeSelect}
              selectedThemes={selectedThemes} // Pass the selectedThemes prop
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
          {subcategory.themes?.map((theme) => (
            <ThemeItem
              key={theme.id}
              id={theme.id}
              name={theme.name}
              isAddOption={theme.isAddOption}
              onSelect={onThemeSelect ? (isSelected) => onThemeSelect(theme.id, isSelected) : undefined}
            />
          ))}
          {!subcategory.themes?.some((theme) => theme.isAddOption) && (
            <div className="flex items-center">
              <PlusCircle className="w-4 h-4 mr-1 text-fuchsia-400" />
              <span className="text-xs text-fuchsia-400">Add new theme</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ThemeSubcategory;
