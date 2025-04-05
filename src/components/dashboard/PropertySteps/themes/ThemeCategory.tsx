
import React from "react";
import { ChevronRight } from "lucide-react";
import { PlusCircle } from "lucide-react";
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
  toggleCategory: (category: string) => void;
  openSubmenus: { [key: string]: boolean };
  toggleSubmenu: (submenu: string) => void;
  onThemeSelect?: (themeId: string, isSelected: boolean) => void;
}

const ThemeCategory = ({ 
  category, 
  isOpen, 
  toggleCategory,
  openSubmenus,
  toggleSubmenu,
  onThemeSelect
}: ThemeCategoryProps) => {
  return (
    <div className="bg-[#5A1876]/20 rounded-lg p-1.5 border border-fuchsia-800/20 mb-1">
      <div 
        className="flex items-center justify-between w-full text-sm h-6 cursor-pointer" 
        onClick={() => toggleCategory(category.category)}
      >
        <span className="uppercase">{category.category}</span>
        <ChevronRight
          className={`h-3 w-3 transform transition-transform ${
            isOpen ? "rotate-90" : ""
          }`}
        />
      </div>

      {isOpen && (
        <div className="mt-1 space-y-0.5">
          {category.submenus.map((submenu) => (
            <ThemeSubmenu
              key={submenu.name}
              submenu={submenu}
              isOpen={openSubmenus[submenu.name] || false}
              toggleSubmenu={toggleSubmenu}
              onThemeSelect={onThemeSelect}
            />
          ))}
          <div className="flex items-center">
            <PlusCircle className="w-4 h-4 mr-1 text-fuchsia-400" />
            <span className="text-xs text-fuchsia-400">Add new category</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeCategory;
