
import React from "react";
import ThemeSubmenu from "./ThemeSubmenu";

interface CategorySubcategoryProps {
  name: string;
  themes?: Array<{
    id: string;
    name: string;
  }>;
  submenus?: Array<{
    name: string;
    options: Array<{
      id: string;
      name: string;
      suboptions?: string[];
    }>;
  }>;
  openSubmenus: { [key: string]: boolean };
  toggleSubmenu: (submenu: string) => void;
  onThemeSelect?: (themeId: string, isSelected: boolean) => void;
  selectedThemes: string[];
}

const CategorySubcategory: React.FC<CategorySubcategoryProps> = ({
  name,
  themes,
  submenus,
  openSubmenus,
  toggleSubmenu,
  onThemeSelect,
  selectedThemes = []
}) => {
  return (
    <div className="pl-3 pr-1 py-1 bg-[#451761]/30 rounded-md">
      <div className="mb-1 text-xs font-medium text-fuchsia-300">{name}</div>

      {themes && themes.length > 0 && (
        <div className="space-y-0.5 pl-2">
          {themes.map((theme) => (
            <div key={theme.id} className="flex items-center py-0.5">
              <input
                type="checkbox"
                id={theme.id}
                checked={selectedThemes.includes(theme.id)}
                onChange={(e) => onThemeSelect && onThemeSelect(theme.id, e.target.checked)}
                className="mr-1.5 h-3 w-3 rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-0"
              />
              <label
                htmlFor={theme.id}
                className="text-xs cursor-pointer hover:text-fuchsia-300 truncate"
              >
                {theme.name}
              </label>
            </div>
          ))}
        </div>
      )}

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
  );
};

export default CategorySubcategory;
