
import { useState } from "react";
import { FilterItem } from "./FilterItem";
import { Theme } from "@/utils/themes";
import { ThemeSearchInput } from "@/components/filters/theme-options/ThemeSearchInput";
import { AlphabeticalThemeList } from "@/components/filters/theme-options/AlphabeticalThemeList";

interface ThemeFilterProps {
  activeTheme: Theme | null;
  onChange: (value: Theme) => void;
}

export function ThemeFilter({ activeTheme, onChange }: ThemeFilterProps) {
  const [themeQuery, setThemeQuery] = useState("");
  
  const handleContainerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <FilterItem title="AFFINITY">
      <div 
        className="bg-fuchsia-950/30 rounded-lg p-2" 
        onClick={handleContainerClick}
      >
        <ThemeSearchInput 
          themeQuery={themeQuery}
          setThemeQuery={setThemeQuery}
        />
        
        <AlphabeticalThemeList
          activeTheme={activeTheme}
          onChange={onChange}
          themeQuery={themeQuery}
        />
      </div>
    </FilterItem>
  );
}
