
import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import ThemeOption from "./ThemeOption";

interface ThemeSubmenuProps {
  submenu: {
    name: string;
    options: {
      id: string;
      name: string;
      suboptions?: string[];
      isAddOption?: boolean;
    }[];
  };
  isOpen: boolean;
  toggleSubmenu: (submenu: string) => void;
  onThemeSelect: (themeId: string, isSelected: boolean) => void;
  selectedThemes: string[];
}

const ThemeSubmenu = ({ 
  submenu, 
  isOpen, 
  toggleSubmenu,
  onThemeSelect,
  selectedThemes = []
}: ThemeSubmenuProps) => {
  return (
    <div className="mb-2">
      <button
        onClick={() => toggleSubmenu(submenu.name)}
        className="flex justify-between items-center w-full px-2 py-1.5 text-left text-sm hover:bg-fuchsia-900/20 rounded-lg"
      >
        <span>{submenu.name}</span>
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      
      {isOpen && (
        <div className="pl-4 mt-2 space-y-2">
          {submenu.options.map((option) => (
            <ThemeOption 
              key={option.id} 
              option={option} 
              onThemeSelect={onThemeSelect}
              selectedThemes={selectedThemes}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSubmenu;
