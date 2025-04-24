
import React from "react";
import { ChevronDown } from "lucide-react";
import ThemeSubmenu from "./ThemeSubmenu";

interface ThemeCategoryProps {
  category: {
    category: string;
    submenus: Array<{
      name: string;
      options: Array<{
        id: string;
        name: string;
        suboptions?: string[];
        isAddOption?: boolean;
      }>;
    }>;
  };
  isOpen: boolean;
  toggleCategory: (category: string | null) => void;
  openSubmenus: Record<string, boolean>;
  toggleSubmenu: (submenu: string | null) => void;
  onThemeSelect?: (themeId: string, isSelected: boolean) => void;
  selectedThemes: string[]; // Add this prop
}

const ThemeCategory = ({
  category,
  isOpen,
  toggleCategory,
  openSubmenus,
  toggleSubmenu,
  onThemeSelect,
  selectedThemes = [], // Default to empty array if not provided
}: ThemeCategoryProps) => {
  return (
    <div className="bg-[#5A1876]/20 rounded-lg p-1.5 border border-fuchsia-800/20">
      <div
        className="flex items-center justify-between w-full text-sm cursor-pointer"
        onClick={() => toggleCategory(isOpen ? null : category.category)}
      >
        <span className="uppercase">{category.category}</span>
        <ChevronDown
          className={`h-3 w-3 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {isOpen && (
        <div className="mt-2 space-y-1">
          {category.submenus.map((submenu) => (
            <ThemeSubmenu
              key={submenu.name}
              submenu={submenu}
              isOpen={!!openSubmenus[submenu.name]}
              toggleSubmenu={toggleSubmenu}
              onThemeSelect={onThemeSelect}
              selectedThemes={selectedThemes} // Pass selected themes to submenu
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeCategory;
