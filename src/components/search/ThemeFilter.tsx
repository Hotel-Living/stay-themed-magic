
import { useState } from "react";
import { FilterItem } from "./FilterItem";
import { Theme } from "@/utils/themes";
import { CollapsibleThemeOptions } from "@/components/filters/theme-options/CollapsibleThemeOptions";

interface ThemeFilterProps {
  activeTheme: Theme | null;
  onChange: (value: Theme) => void;
}

export function ThemeFilter({ activeTheme, onChange }: ThemeFilterProps) {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [themeQuery, setThemeQuery] = useState("");
  
  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  const updateFilter = (_key: string, value: Theme) => {
    onChange(value);
  };

  return (
    <FilterItem title="THEME">
      <div className="bg-fuchsia-950/30 rounded-lg p-2">
        <div className="mb-2 relative">
          <input
            type="text"
            placeholder="Search themes..."
            value={themeQuery}
            onChange={(e) => setThemeQuery(e.target.value)}
            className="w-full px-3 py-2 bg-fuchsia-900/30 border border-fuchsia-800/20 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-fuchsia-500/50"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
        
        <CollapsibleThemeOptions
          activeTheme={activeTheme}
          updateFilter={updateFilter}
          openCategory={openCategory}
          toggleCategory={toggleCategory}
          themeQuery={themeQuery}
        />
      </div>
    </FilterItem>
  );
}
