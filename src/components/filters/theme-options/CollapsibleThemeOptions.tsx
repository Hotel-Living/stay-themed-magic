
import React, { useState } from "react";
import { Theme, themeCategories } from "@/utils/themes";
import { ThemeCategory } from "./ThemeCategory";

interface CollapsibleThemeOptionsProps {
  activeTheme: Theme | null;
  updateFilter: (key: string, value: any) => void;
  openCategory: string | null;
  toggleCategory: (category: string) => void;
}

export const CollapsibleThemeOptions: React.FC<CollapsibleThemeOptionsProps> = ({
  activeTheme,
  updateFilter,
  openCategory,
  toggleCategory
}) => {
  // Track open subcategories and submenus
  const [openSubcategories, setOpenSubcategories] = useState<Record<string, boolean>>({});
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});

  const toggleSubcategory = (subcategory: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenSubcategories(prev => ({
      ...prev,
      [subcategory]: !prev[subcategory]
    }));
  };

  const toggleSubmenu = (submenu: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenSubmenus(prev => ({
      ...prev,
      [submenu]: !prev[submenu]
    }));
  };

  return (
    <div className="space-y-2 max-h-[300px] overflow-y-auto">
      {themeCategories.map(category => (
        <ThemeCategory
          key={category.category}
          category={category}
          activeTheme={activeTheme}
          updateFilter={updateFilter}
          openCategory={openCategory}
          toggleCategory={toggleCategory}
          openSubcategories={openSubcategories}
          toggleSubcategory={toggleSubcategory}
          openSubmenus={openSubmenus}
          toggleSubmenu={toggleSubmenu}
        />
      ))}
    </div>
  );
};
