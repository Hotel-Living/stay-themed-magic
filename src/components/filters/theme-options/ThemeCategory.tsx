
import React from "react";
import { ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Theme, allThemes } from "@/utils/themes";
import { ThemeButton } from "./ThemeButton";
import { ThemeSubcategory } from "./ThemeSubcategory";

interface ThemeCategoryProps {
  category: {
    category: string;
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
    themes?: Array<{ 
      id: string; 
      name: string;
      isAddOption?: boolean;
    }>;
  };
  activeTheme: Theme | null;
  updateFilter: (key: string, value: any) => void;
  openCategory: string | null;
  toggleCategory: (category: string) => void;
  openSubcategories: Record<string, boolean>;
  toggleSubcategory: (subcategory: string, e: React.MouseEvent) => void;
  openSubmenus: Record<string, boolean>;
  toggleSubmenu: (submenu: string, e: React.MouseEvent) => void;
}

export const ThemeCategory: React.FC<ThemeCategoryProps> = ({
  category,
  activeTheme,
  updateFilter,
  openCategory,
  toggleCategory,
  openSubcategories,
  toggleSubcategory,
  openSubmenus,
  toggleSubmenu
}) => {
  return (
    <Collapsible 
      key={category.category} 
      open={openCategory === category.category}
      onOpenChange={() => toggleCategory(category.category)}
    >
      <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 text-xs font-medium uppercase rounded-md hover:bg-fuchsia-900/40">
        <span>{category.category}</span>
        <ChevronRight className={`h-4 w-4 transform transition-transform ${openCategory === category.category ? 'rotate-90' : ''}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-1 pb-1">
        {/* If category has subcategories */}
        {category.subcategories ? (
          <div className="pl-3 space-y-1">
            {category.subcategories.map(subcategory => (
              <ThemeSubcategory
                key={subcategory.name}
                subcategory={subcategory}
                category={category.category}
                activeTheme={activeTheme}
                updateFilter={updateFilter}
                openSubcategories={openSubcategories}
                toggleSubcategory={toggleSubcategory}
                openSubmenus={openSubmenus}
                toggleSubmenu={toggleSubmenu}
                allThemes={allThemes}
              />
            ))}
          </div>
        ) : (
          /* Direct themes in category */
          <div className="pl-3 space-y-1">
            {(category.themes || []).filter(theme => !theme.isAddOption).map(theme => {
              // Find the corresponding theme in allThemes
              const fullTheme = allThemes.find(t => t.id === theme.id) || {
                id: theme.id, 
                name: theme.name,
                category: category.category
              };
              
              return (
                <ThemeButton
                  key={theme.id}
                  theme={fullTheme}
                  isActive={activeTheme?.id === theme.id}
                  onClick={() => updateFilter("theme", fullTheme)}
                />
              );
            })}
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
};
