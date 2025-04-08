
import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import ThemeSubmenu from "./ThemeSubmenu";
import DirectThemes from "./DirectThemes";
import CategorySubcategory from "./CategorySubcategory";
import AddNewCategoryButton from "./AddNewCategoryButton";
import AddNewCategoryForm from "./AddNewCategoryForm";

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
            <DirectThemes 
              themes={category.themes} 
              onThemeSelect={onThemeSelect} 
            />
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
            <CategorySubcategory
              key={subcategory.name}
              name={subcategory.name}
              themes={subcategory.themes}
              submenus={subcategory.submenus}
              openSubmenus={openSubmenus}
              toggleSubmenu={toggleSubmenu}
              onThemeSelect={onThemeSelect}
            />
          ))}
          
          {/* Add new category section */}
          {isAddingCategory ? (
            <AddNewCategoryForm
              newCategoryName={newCategoryName}
              setNewCategoryName={setNewCategoryName}
              handleAddCategory={handleAddCategory}
              onCancel={() => setIsAddingCategory(false)}
            />
          ) : (
            <AddNewCategoryButton onClick={() => setIsAddingCategory(true)} />
          )}
        </div>
      )}
    </div>
  );
};

export default ThemeCategory;
