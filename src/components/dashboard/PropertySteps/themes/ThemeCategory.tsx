
import React, { useState } from "react";
import { PlusCircle, ChevronDown, ChevronUp } from "lucide-react";
import CategorySubcategory from "./CategorySubcategory";

interface ThemeCategoryProps {
  category: {
    name: string;
    id: string;
    themes?: {
      id: string;
      name: string;
      isAddOption?: boolean;
    }[];
    subcategories?: {
      name: string;
      themes?: {
        id: string;
        name: string;
        isAddOption?: boolean;
      }[];
      submenus?: {
        name: string;
        options: {
          id: string;
          name: string;
          suboptions?: string[];
          isAddOption?: boolean;
        }[];
      }[];
    }[];
  };
  selectedThemes: string[];
  onThemeSelect: (themeId: string, isSelected: boolean) => void;
}

const ThemeCategory = ({ 
  category, 
  selectedThemes = [],
  onThemeSelect
}: ThemeCategoryProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [openSubcategories, setOpenSubcategories] = useState<{[key: string]: boolean}>({});
  const [openSubmenus, setOpenSubmenus] = useState<{[key: string]: boolean}>({});
  
  // Toggle category open/closed state
  const toggleCategory = () => {
    setIsOpen(!isOpen);
  };
  
  // Toggle subcategory open/closed state
  const toggleSubcategory = (subcategoryName: string) => {
    setOpenSubcategories(prev => ({
      ...prev,
      [subcategoryName]: !prev[subcategoryName]
    }));
  };
  
  // Toggle submenu open/closed state
  const toggleSubmenu = (submenuName: string) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [submenuName]: !prev[submenuName]
    }));
  };
  
  // Check if category has direct themes (not in subcategories)
  const hasDirectThemes = category.themes && category.themes.length > 0;
  
  // Check if category has subcategories
  const hasSubcategories = category.subcategories && category.subcategories.length > 0;
  
  return (
    <div className="mb-6 border border-fuchsia-800/30 rounded-lg p-3">
      {/* Category header */}
      <button
        onClick={toggleCategory}
        className="flex justify-between items-center w-full text-left font-semibold text-white mb-2"
      >
        <span>{category.name}</span>
        {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </button>
      
      {/* Category content (shown when open) */}
      {isOpen && (
        <div className="pl-1">
          {/* Direct themes under this category (if any) */}
          {hasDirectThemes && (
            <div className="mb-4">
              <div className="pl-2 space-y-2">
                {category.themes?.map((theme) => (
                  <label key={theme.id} className="flex items-start">
                    {theme.isAddOption ? (
                      <div className="flex items-center">
                        <PlusCircle className="w-4 h-4 mr-1 text-fuchsia-400" />
                        <span className="text-xs text-fuchsia-400">{theme.name}</span>
                      </div>
                    ) : (
                      <>
                        <input
                          type="checkbox"
                          id={theme.id}
                          checked={selectedThemes.includes(theme.id)}
                          onChange={(e) => onThemeSelect(theme.id, e.target.checked)}
                          className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5"
                        />
                        <span className="text-sm">{theme.name}</span>
                      </>
                    )}
                  </label>
                ))}
              </div>
            </div>
          )}
          
          {/* Subcategories */}
          {hasSubcategories && (
            <div>
              {category.subcategories?.map((subcategory) => {
                // Check if subcategory has direct themes
                const hasSubcatDirectThemes = 
                  subcategory.themes && subcategory.themes.length > 0;
                
                // Check if subcategory has submenus
                const hasSubmenus = 
                  subcategory.submenus && subcategory.submenus.length > 0;
                
                // If no content to display, skip this subcategory
                if (!hasSubcatDirectThemes && !hasSubmenus) {
                  return null;
                }
                
                return (
                  <CategorySubcategory
                    key={subcategory.name}
                    name={subcategory.name}
                    themes={subcategory.themes || []}
                    submenus={subcategory.submenus || []}
                    openSubmenus={openSubmenus}
                    toggleSubmenu={toggleSubmenu}
                    onThemeSelect={onThemeSelect}
                    selectedThemes={selectedThemes}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ThemeCategory;
