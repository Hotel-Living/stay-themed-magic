
import React from "react";
import { ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Theme } from "@/utils/themes";
import { ThemeButton } from "./ThemeButton";
import { ThemeSubmenu } from "./ThemeSubmenu";

interface ThemeSubcategoryProps {
  subcategory: {
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
  };
  category: string;
  activeTheme: Theme | null;
  updateFilter: (key: string, value: any) => void;
  openSubcategories: Record<string, boolean>;
  toggleSubcategory: (subcategory: string, e: React.MouseEvent) => void;
  openSubmenus: Record<string, boolean>;
  toggleSubmenu: (submenu: string, e: React.MouseEvent) => void;
  allThemes: Theme[];
}

export const ThemeSubcategory: React.FC<ThemeSubcategoryProps> = ({
  subcategory,
  category,
  activeTheme,
  updateFilter,
  openSubcategories,
  toggleSubcategory,
  openSubmenus,
  toggleSubmenu,
  allThemes
}) => {
  return (
    <div key={subcategory.name} className="rounded-md">
      <Collapsible 
        open={Boolean(openSubcategories[subcategory.name])}
        className="mb-1"
      >
        <CollapsibleTrigger 
          className="flex items-center justify-between w-full px-2 py-1 text-xs font-medium rounded-md hover:bg-fuchsia-900/30"
          onClick={(e) => toggleSubcategory(subcategory.name, e)}
        >
          <span>{subcategory.name}</span>
          <ChevronRight 
            className={`h-3 w-3 ml-1 transform transition-transform ${openSubcategories[subcategory.name] ? 'rotate-90' : ''}`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-1 pl-1">
          {/* If subcategory has themes */}
          {subcategory.themes && (
            <div className="pl-2 space-y-1">
              {subcategory.themes.filter(theme => !theme.isAddOption).map(theme => {
                // Find the corresponding theme in allThemes
                const fullTheme = allThemes.find(t => t.id === theme.id) || {
                  id: theme.id, 
                  name: theme.name,
                  category: category
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
          
          {/* If subcategory has submenus */}
          {subcategory.submenus && (
            <div className="pl-2 space-y-1">
              {subcategory.submenus.map(submenu => (
                <ThemeSubmenu
                  key={submenu.name}
                  submenu={submenu}
                  activeTheme={activeTheme}
                  updateFilter={updateFilter}
                  category={category}
                  openSubmenus={openSubmenus}
                  toggleSubmenu={toggleSubmenu}
                />
              ))}
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
