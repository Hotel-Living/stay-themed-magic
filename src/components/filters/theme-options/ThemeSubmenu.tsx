
import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Theme } from "@/utils/themes";
import { ThemeSubmenuOption } from "./ThemeSubmenuOption";

interface ThemeSubmenuProps {
  submenu: {
    name: string;
    options: Array<{
      id: string;
      name: string;
      suboptions?: string[];
      isAddOption?: boolean;
    }>;
  };
  activeTheme: Theme | null;
  updateFilter: (key: string, value: any) => void;
  category: string;
  openSubmenus: Record<string, boolean>;
  toggleSubmenu: (submenu: string, e: React.MouseEvent) => void;
}

export const ThemeSubmenu: React.FC<ThemeSubmenuProps> = ({
  submenu,
  activeTheme,
  updateFilter,
  category,
  openSubmenus,
  toggleSubmenu
}) => {
  return (
    <Collapsible 
      key={submenu.name}
      open={Boolean(openSubmenus[submenu.name])}
      className="mb-1"
    >
      <CollapsibleTrigger 
        className="flex items-center justify-between w-full px-2 py-1 text-xs font-medium rounded-md hover:bg-fuchsia-900/20"
        onClick={(e) => toggleSubmenu(submenu.name, e)}
      >
        <span className="flex-grow text-left pr-1">{submenu.name}</span>
        <ChevronRight 
          className={`h-3 w-3 ml-1 flex-shrink-0 transform transition-transform ${openSubmenus[submenu.name] ? 'rotate-90' : ''}`}
        />
      </CollapsibleTrigger>
      
      <CollapsibleContent className="mt-1 pl-2">
        <div className="space-y-1">
          {submenu.options.filter(option => !option.isAddOption).map(option => (
            <ThemeSubmenuOption
              key={option.id}
              option={option}
              activeTheme={activeTheme}
              updateFilter={updateFilter}
              category={category}
            />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
