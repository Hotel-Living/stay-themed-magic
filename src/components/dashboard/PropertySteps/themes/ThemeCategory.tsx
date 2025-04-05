
import React from "react";
import { ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import ThemeItem from "./ThemeItem";
import ThemeSubcategory from "./ThemeSubcategory";
import { PlusCircle } from "lucide-react";

interface Theme {
  id: string;
  name: string;
  isAddOption?: boolean;
}

interface ThemeSubcategory {
  name: string;
  themes?: Theme[];
  submenus?: Array<{
    name: string;
    options: Array<{
      id: string;
      name: string;
      suboptions?: string[];
      isAddOption?: boolean;
    }>;
  }>;
}

interface ThemeCategoryProps {
  category: {
    category: string;
    themes?: Theme[];
    subcategories?: ThemeSubcategory[];
  };
  isOpen: boolean;
  toggleCategory: (category: string) => void;
  openSubmenus: Record<string, boolean>;
  toggleSubmenu: (submenu: string) => void;
}

const ThemeCategory = ({
  category,
  isOpen,
  toggleCategory,
  openSubmenus,
  toggleSubmenu,
}: ThemeCategoryProps) => {
  return (
    <Collapsible className="mb-0">
      <div className="bg-[#5A1876]/30 rounded-lg p-2 border border-fuchsia-800/30 py-0 px-0">
        <CollapsibleTrigger
          onClick={() => toggleCategory(category.category)}
          className="flex items-center justify-between w-full font-medium h-8 rounded-none my-[4px] bg-[#af09be]"
        >
          <h4 className="uppercase text-white">{category.category}</h4>
          <ChevronRight
            className={`h-4 w-4 transform transition-transform ${
              isOpen ? "rotate-90" : ""
            }`}
          />
        </CollapsibleTrigger>

        <CollapsibleContent>
          {category.subcategories ? (
            <div className="space-y-0.5 mt-1">
              {category.subcategories.map((subcategory) => (
                <ThemeSubcategory
                  key={subcategory.name}
                  subcategory={subcategory}
                  openSubmenus={openSubmenus}
                  toggleSubmenu={toggleSubmenu}
                />
              ))}
              <div className="flex items-center mt-1">
                <PlusCircle className="w-4 h-4 mr-1 text-fuchsia-400" />
                <span className="text-xs text-slate-50">
                  Add new subcategory
                </span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1 mt-1">
              {category.themes?.map((theme) => (
                <ThemeItem
                  key={theme.id}
                  id={theme.id}
                  name={theme.name}
                  isAddOption={theme.isAddOption}
                />
              ))}
              {!category.themes?.some((theme) => theme.isAddOption) && (
                <div className="flex items-center">
                  <PlusCircle className="w-4 h-4 mr-1 text-fuchsia-400" />
                  <span className="text-xs text-fuchsia-400">
                    Add new theme
                  </span>
                </div>
              )}
            </div>
          )}
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};

export default ThemeCategory;
