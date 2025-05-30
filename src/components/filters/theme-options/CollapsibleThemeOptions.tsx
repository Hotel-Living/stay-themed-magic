
import React, { useState, useEffect } from "react";
import { Theme, themeCategories, allThemes } from "@/utils/themes";
import { ThemeCategory } from "./ThemeCategory";

interface CollapsibleThemeOptionsProps {
  activeTheme: Theme | null;
  updateFilter: (key: string, value: any) => void;
  openCategory: string | null;
  toggleCategory: (category: string) => void;
  themeQuery?: string;
  useLargerMobileText?: boolean;
  sortAlphabetically?: boolean;
}

export const CollapsibleThemeOptions: React.FC<CollapsibleThemeOptionsProps> = ({
  activeTheme,
  updateFilter,
  openCategory,
  toggleCategory,
  themeQuery = "",
  useLargerMobileText = false,
  sortAlphabetically = true
}) => {
  // Track open subcategories and submenus
  const [openSubcategories, setOpenSubcategories] = useState<Record<string, boolean>>({});
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
  const [filteredCategories, setFilteredCategories] = useState(themeCategories);

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

  // Filter themes based on search query
  useEffect(() => {
    if (!themeQuery.trim()) {
      setFilteredCategories(themeCategories);
      return;
    }

    const lowercaseQuery = themeQuery.toLowerCase();
    
    // Function to check if a theme matches the query
    const themeMatches = (theme: any) => {
      return theme.name.toLowerCase().includes(lowercaseQuery);
    };

    // Filter subcategory themes and maintain proper structure
    const filterSubcategoryThemes = (subcategory: any) => {
      // For the new hierarchical structure, we need to check children instead of themes
      const filteredChildren = subcategory.children 
        ? subcategory.children.filter(themeMatches) 
        : [];
        
      // Filter submenus - this is for legacy compatibility
      const filteredSubmenus = subcategory.submenus 
        ? subcategory.submenus
            .map((submenu: any) => ({
              ...submenu,
              options: submenu.options.filter((option: any) => 
                themeMatches(option) || 
                (option.suboptions && option.suboptions.some(
                  (suboption: string) => suboption.toLowerCase().includes(lowercaseQuery)
                ))
              )
            }))
            .filter((submenu: any) => submenu.options.length > 0)
        : [];
        
      return {
        ...subcategory,
        children: filteredChildren,
        submenus: filteredSubmenus,
        hasMatches: filteredChildren.length > 0 || filteredSubmenus.length > 0
      };
    };

    // Create a deep copy of the themeCategories structure to modify
    const filtered = themeCategories
      .map(category => {
        // Create a new category object with the same structure
        const newCategory = { ...category };
        
        // For the new hierarchical structure, check children instead of themes
        if (newCategory.children) {
          newCategory.children = newCategory.children.filter(themeMatches);
        }
        
        // If the category has subcategories, filter them
        if (newCategory.subcategories) {
          newCategory.subcategories = newCategory.subcategories
            .map(filterSubcategoryThemes)
            .filter(subcategory => subcategory.hasMatches);
        }
        
        // Check if this category has any matches
        const hasChildrenMatches = newCategory.children && newCategory.children.length > 0;
        const hasSubcategoryMatches = newCategory.subcategories && newCategory.subcategories.length > 0;
        
        return {
          ...newCategory,
          hasMatches: hasChildrenMatches || hasSubcategoryMatches
        };
      })
      .filter(category => category.hasMatches);
    
    setFilteredCategories(filtered);
    
    // If search query is not empty, automatically open matching categories
    if (themeQuery.trim() !== "") {
      const matchingCategories = filtered.map(category => category.name || category.category);
      if (matchingCategories.length === 1) {
        toggleCategory(matchingCategories[0]);
      }
    }
  }, [themeQuery, toggleCategory]);

  return (
    <div className="space-y-2 max-h-[300px] overflow-y-auto">
      {filteredCategories.length === 0 ? (
        <div className="text-center py-2 text-sm text-foreground/70">
          No themes found. Try a different search term.
        </div>
      ) : (
        filteredCategories.map(category => (
          <ThemeCategory
            key={category.id || category.category}
            category={category}
            activeTheme={activeTheme}
            updateFilter={updateFilter}
            openCategory={openCategory}
            toggleCategory={toggleCategory}
            openSubcategories={openSubcategories}
            toggleSubcategory={toggleSubcategory}
            openSubmenus={openSubmenus}
            toggleSubmenu={toggleSubmenu}
            useLargerMobileText={useLargerMobileText}
          />
        ))
      )}
    </div>
  );
};
