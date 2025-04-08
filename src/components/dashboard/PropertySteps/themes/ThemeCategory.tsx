
import React, { useState } from "react";
import { ChevronRight, PlusCircle } from "lucide-react";
import ThemeSubmenu from "./ThemeSubmenu";
import ThemeItem from "./ThemeItem";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  // Function to handle direct theme selection (for categories with themes array)
  const handleThemeSelection = (themeId: string, isSelected: boolean) => {
    if (onThemeSelect) {
      onThemeSelect(themeId, isSelected);
    }
  };

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      // Create a custom category ID
      const customCategoryId = `${category.category.toLowerCase().replace(/\s+/g, '-')}-custom-${newCategoryName.toLowerCase().replace(/\s+/g, '-')}`;
      
      console.log(`New category added: ${newCategoryName} with ID: ${customCategoryId}`);
      
      // If onThemeSelect is provided, select this new custom category
      if (onThemeSelect) {
        onThemeSelect(customCategoryId, true);
      }
      
      // Reset the form
      setNewCategoryName("");
      setIsAddingCategory(false);
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
          
          {/* Add new category button/input */}
          {isAddingCategory ? (
            <div className="p-2 bg-[#5A1876]/10 rounded-lg space-y-2">
              <Input 
                type="text"
                placeholder="Enter category name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="bg-fuchsia-950/40 border-fuchsia-800/30 text-sm text-white"
              />
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  onClick={handleAddCategory}
                  className="bg-fuchsia-800 hover:bg-fuchsia-700 text-white text-xs"
                >
                  Add
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => setIsAddingCategory(false)}
                  className="bg-transparent text-xs text-white"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <button 
              className="flex items-center cursor-pointer p-2"
              onClick={() => setIsAddingCategory(true)}
            >
              <PlusCircle className="w-4 h-4 mr-1 text-fuchsia-400" />
              <span className="text-xs text-fuchsia-400">Add new category</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ThemeCategory;
