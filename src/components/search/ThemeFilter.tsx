
import { useState } from "react";
import { FilterItem } from "./FilterItem";
import { Theme, themeCategories } from "@/utils/themes";
import { CollapsibleThemeOptions } from "@/components/filters/theme-options/CollapsibleThemeOptions";

interface ThemeFilterProps {
  activeTheme: Theme | null;
  onChange: (value: Theme) => void;
}

export function ThemeFilter({ activeTheme, onChange }: ThemeFilterProps) {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  
  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  const updateFilter = (_key: string, value: Theme) => {
    onChange(value);
  };

  return (
    <FilterItem title="THEME">
      <div className="bg-fuchsia-950/30 rounded-lg p-2">
        <CollapsibleThemeOptions
          activeTheme={activeTheme}
          updateFilter={updateFilter}
          openCategory={openCategory}
          toggleCategory={toggleCategory}
        />
      </div>
    </FilterItem>
  );
}
