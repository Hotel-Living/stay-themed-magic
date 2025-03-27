
import { FilterDropdownProps, ThemeType } from "./FilterTypes";
import { FilterDropdown } from "./FilterDropdown";
import React, { useState } from "react";
import { Theme, allThemes, themeCategories } from "@/utils/data";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";

interface ThemeDropdownProps {
  value: ThemeType | null;
  placeholder: string;
  isOpen: boolean;
  toggleDropdown: () => void;
  filterBgColor: string;
  compactSpacing: boolean;
  useBoldLabels: boolean;
  themeRef: React.RefObject<HTMLDivElement>;
  onSelect: (value: ThemeType) => void;
  closeDropdown: () => void;
  useCollapsible?: boolean;
  availableThemes: Theme[];
}

export function ThemeDropdown({
  value,
  placeholder,
  isOpen,
  toggleDropdown,
  filterBgColor,
  compactSpacing,
  useBoldLabels,
  themeRef,
  onSelect,
  closeDropdown,
  useCollapsible = false,
  availableThemes = []
}: ThemeDropdownProps) {
  const [themeQuery, setThemeQuery] = useState("");
  const [openThemeCategory, setOpenThemeCategory] = useState<string | null>(null);
  
  const toggleThemeCategory = (category: string) => {
    setOpenThemeCategory(openThemeCategory === category ? null : category);
  };
  
  const filteredThemes = allThemes.filter(theme => 
    theme.name.toLowerCase().includes(themeQuery.toLowerCase()) ||
    theme.category.toLowerCase().includes(themeQuery.toLowerCase())
  );
  
  const clearFilter = () => {
    onSelect(null as any); // This will effectively clear the filter
    closeDropdown();
  };

  // Get the appropriate label for display
  const getThemeLabel = (): string => {
    if (!value) return "";
    
    if (typeof value === 'string') {
      // Find the theme by ID if value is a string
      const theme = allThemes.find(t => t.id === value);
      return theme ? theme.name : value;
    }
    
    // If it's a Theme object, use its name
    return value.name;
  };

  return (
    <FilterDropdown
      label={getThemeLabel()}
      value={value}
      placeholder={placeholder}
      isOpen={isOpen}
      toggleDropdown={toggleDropdown}
      clearFilter={clearFilter}
      filterBgColor={filterBgColor}
      compactSpacing={compactSpacing}
      useBoldLabels={useBoldLabels}
      dropdownRef={themeRef}
    >
      <div className="mb-2">
        <input
          type="text"
          placeholder="Search themes..."
          value={themeQuery}
          onChange={(e) => setThemeQuery(e.target.value)}
          className="w-full px-3 py-2 bg-fuchsia-900/30 border border-fuchsia-800/20 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-fuchsia-500/50"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      
      {filteredThemes.length === 0 ? (
        <div className="text-center py-3 text-sm text-foreground/60">
          No themes found
        </div>
      ) : useCollapsible ? (
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {themeCategories.map(category => (
            <Collapsible key={category.category}>
              <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 text-xs uppercase rounded-md hover:bg-fuchsia-900/40">
                <span>{category.category}</span>
                <ChevronRight className={`h-4 w-4 transform transition-transform ${openThemeCategory === category.category ? 'rotate-90' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="pt-1 pl-3 space-y-1">
                  {category.themes.map(theme => (
                    <button
                      key={theme.id}
                      onClick={() => onSelect(theme)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        (typeof value === 'string' ? value === theme.id : 
                         value?.id === theme.id)
                          ? "bg-fuchsia-500/20 text-white"
                          : "hover:bg-fuchsia-900/40"
                      }`}
                    >
                      {theme.name}
                    </button>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      ) : (
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {Array.from(
            new Set(filteredThemes.map(theme => theme.category))
          ).map(category => (
            <div key={category} className="mb-2">
              <div className="text-xs uppercase text-foreground/60 mb-1 px-3">{category}</div>
              {filteredThemes
                .filter(theme => theme.category === category)
                .map(theme => (
                  <button
                    key={theme.id}
                    onClick={() => onSelect(theme)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      (typeof value === 'string' ? value === theme.id : 
                       value?.id === theme.id)
                        ? "bg-fuchsia-500/20 text-white"
                        : "hover:bg-fuchsia-900/40"
                    }`}
                  >
                    {theme.name}
                  </button>
                ))
              }
            </div>
          ))}
        </div>
      )}
    </FilterDropdown>
  );
}
