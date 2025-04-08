
import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import ThemeSubmenu from "./ThemeSubmenu";
import DirectThemes from "./DirectThemes";
import CategorySubcategory from "./CategorySubcategory";
import AddNewCategoryButton from "./AddNewCategoryButton";
import AddNewCategoryForm from "./AddNewCategoryForm";
import { useToast } from "@/hooks/use-toast";

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
  const [customThemes, setCustomThemes] = useState<Array<{id: string, name: string}>>([]);
  const { toast } = useToast();

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      // Create a custom category ID
      const customThemeId = `custom-${category.category.toLowerCase().replace(/\s+/g, '-')}-${newCategoryName.toLowerCase().replace(/\s+/g, '-')}`;
      
      // Add to local state to display it
      setCustomThemes(prev => [...prev, { id: customThemeId, name: newCategoryName }]);
      
      // If onThemeSelect is provided, select this new custom category
      if (onThemeSelect) {
        onThemeSelect(customThemeId, true);
      }
      
      toast({
        title: "Theme added",
        description: `${newCategoryName} has been added to ${category.category}`
      });
      
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
          
          {/* Render custom themes if any exist */}
          {customThemes.length > 0 && (
            <div className="space-y-1 mt-1 pl-2">
              {customThemes.map((theme) => (
                <div key={theme.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={theme.id}
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
