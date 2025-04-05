
import React from "react";
import { ChevronRight } from "lucide-react";
import { PlusCircle } from "lucide-react";
import ThemeSubmenu from "./ThemeSubmenu";
import ThemeItem from "./ThemeItem";

interface ThemeCategoryProps {
  category: {
    category: string;
    themes?: Array<{
      id: string;
      name: string;
      isAddOption?: boolean;
    }>;
    subcategories?: Array<{
      name: string;
      themes?: Array<{
        id: string;
        name: string;
        isAddOption?: boolean;
      }>;
      submenus?: Array<{
        name: string;
        options: Array<{
          id: string;
          name: string;
          suboptions?: string[];
          isAddOption?: boolean;
        }>;
      }>;
    }>;
    submenus?: Array<{
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
  // Function to handle direct theme selection (for categories with themes array)
  const handleThemeSelection = (themeId: string, isSelected: boolean) => {
    if (onThemeSelect) {
      onThemeSelect(themeId, isSelected);
    }
  };

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
          {/* Render direct themes if they exist */}
          {category.themes && category.themes.length > 0 && (
            <div className="bg-[#5A1876]/15 rounded-lg p-1.5 border border-fuchsia-800/15">
              <div className="space-y-0.5">
                {category.themes.map(theme => (
                  <div key={theme.id} className="bg-[#5A1876]/10 rounded-lg p-1.5 border border-fuchsia-800/10">
                    <ThemeItem
                      id={theme.id}
                      name={theme.name}
                      isAddOption={theme.isAddOption}
                      onSelect={(isSelected) => handleThemeSelection(theme.id, isSelected)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Render submenus if they exist */}
          {category.submenus && category.submenus.map((submenu) => (
            <ThemeSubmenu
              key={submenu.name}
              submenu={submenu}
              isOpen={openSubmenus[submenu.name] || false}
              toggleSubmenu={toggleSubmenu}
              onThemeSelect={onThemeSelect}
            />
          ))}
          
          {/* Render subcategories if they exist */}
          {category.subcategories && category.subcategories.map((subcategory) => (
            <div key={subcategory.name} className="bg-[#5A1876]/15 rounded-lg p-1.5 border border-fuchsia-800/15">
              <div className="flex items-center justify-between w-full text-sm h-6">
                <span>{subcategory.name}</span>
              </div>
              
              <div className="mt-1 space-y-0.5">
                {/* Render subcategory themes if they exist */}
                {subcategory.themes && subcategory.themes.map((theme) => (
                  <div key={theme.id} className="bg-[#5A1876]/10 rounded-lg p-1.5 border border-fuchsia-800/10">
                    <ThemeItem
                      id={theme.id}
                      name={theme.name}
                      isAddOption={theme.isAddOption}
                      onSelect={(isSelected) => handleThemeSelection(theme.id, isSelected)}
                    />
                  </div>
                ))}
                
                {/* Render subcategory submenus if they exist */}
                {subcategory.submenus && subcategory.submenus.map((submenu) => (
                  <ThemeSubmenu
                    key={submenu.name}
                    submenu={submenu}
                    isOpen={openSubmenus[submenu.name] || false}
                    toggleSubmenu={toggleSubmenu}
                    onThemeSelect={onThemeSelect}
                  />
                ))}
              </div>
            </div>
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
