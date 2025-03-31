
import { useState } from "react";
import { FilterItem } from "./FilterItem";
import { Theme } from "@/utils/themes";
import { CollapsibleThemeOptions } from "@/components/filters/theme-options/CollapsibleThemeOptions";
import { ThemeSearchInput } from "@/components/filters/theme-options/ThemeSearchInput";

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

  // Prevent dropdown from closing when clicking inside
  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <FilterItem title="THEME">
      <div className="bg-fuchsia-950/30 rounded-lg p-2" onClick={handleContainerClick}>
        <ThemeSearchInput 
          themeQuery={themeQuery}
          setThemeQuery={setThemeQuery}
        />
        
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
