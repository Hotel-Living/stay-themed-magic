
import React, { useState, useEffect } from "react";
import { Theme, themeCategories, allThemes } from "@/utils/themes";
import { ThemeCategory } from "./ThemeCategory";

interface CollapsibleThemeOptionsProps {
  activeTheme: Theme | null;
  updateFilter: (key: string, value: any) => void;
  openCategory: string | null;
  toggleCategory: (category: string) => void;
  themeQuery?: string; // Add optional search query prop
}

export const CollapsibleThemeOptions: React.FC<CollapsibleThemeOptionsProps> = ({
  activeTheme,
  updateFilter,
  openCategory,
  toggleCategory,
  themeQuery = "" // Default to empty string
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
      const filteredThemes = subcategory.themes 
        ? subcategory.themes.filter(themeMatches) 
        : [];
        
      // Filter submenus
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
        themes: filteredThemes,
        submenus: filteredSubmenus,
        hasMatches: filteredThemes.length > 0 || filteredSubmenus.length > 0
      };
    };

    // Filter categories while maintaining the expected structure
    const filtered = themeCategories
      .map(category => {
        // Filter direct themes in category
        const filteredThemes = category.themes 
          ? category.themes.filter(themeMatches) 
          : [];
        
        // Filter subcategories
        const filteredSubcategories = category.subcategories 
          ? category.subcategories
              .map(filterSubcategoryThemes)
              .filter(subcategory => subcategory.hasMatches)
          : [];
        
        // Ensure we maintain the exact structure as in themeCategories
        return {
          category: category.category,
          subcategories: category.subcategories 
            ? filteredSubcategories 
            : undefined,
          themes: category.themes 
            ? filteredThemes 
            : undefined,
          hasMatches: filteredThemes.length > 0 || filteredSubcategories.length > 0
        };
      })
      .filter(category => category.hasMatches);
    
    setFilteredCategories(filtered);
    
    // If search query is not empty, automatically open matching categories
    if (themeQuery.trim() !== "") {
      const matchingCategories = filtered.map(category => category.category);
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
        ))
      )}
    </div>
  );
};
