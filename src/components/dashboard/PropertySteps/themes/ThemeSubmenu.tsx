
import React from "react";
import { ChevronRight } from "lucide-react";

interface ThemeSubmenuProps {
  submenu: {
    name: string;
    options: Array<{
      id: string;
      name: string;
      suboptions?: string[];
      isAddOption?: boolean;
    }>;
  };
  isOpen: boolean;
  toggleSubmenu: (submenu: string) => void;
  onThemeSelect?: (themeId: string, isSelected: boolean) => void;
  selectedThemes: string[];
}

const ThemeSubmenu: React.FC<ThemeSubmenuProps> = ({
  submenu,
  isOpen,
  toggleSubmenu,
  onThemeSelect,
  selectedThemes = []
}) => {
  return (
    <div className="pl-2 pr-0 my-1">
      <div
        className="flex items-center justify-between w-full h-5 cursor-pointer"
        onClick={() => toggleSubmenu(submenu.name)}
      >
        <span className="text-xs text-fuchsia-200">{submenu.name}</span>
        <ChevronRight
          className={`h-2 w-2 transform transition-transform ${
            isOpen ? "rotate-90" : ""
          }`}
        />
      </div>

      {isOpen && (
        <div className="space-y-0.5 mt-1 pl-2">
          {submenu.options
            .filter(option => option.isAddOption !== true)
            .map((option) => (
              <div key={option.id} className="flex items-center py-0.5">
                <input
                  type="checkbox"
                  id={option.id}
                  checked={selectedThemes.includes(option.id)}
                  onChange={(e) => onThemeSelect && onThemeSelect(option.id, e.target.checked)}
                  className="mr-1.5 h-3 w-3 rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-0"
                />
                <label
                  htmlFor={option.id}
                  className="text-xs cursor-pointer hover:text-fuchsia-300 truncate"
                >
                  {option.name}
                </label>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSubmenu;
