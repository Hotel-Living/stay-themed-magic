
import { useState } from "react";
import { FilterItem } from "./FilterItem";
import { Theme } from "@/utils/themes";
import { HierarchicalThemeSelector } from "@/components/filters/HierarchicalThemeSelector";

interface ThemeFilterProps {
  activeTheme: Theme | null;
  onChange: (value: Theme) => void;
}

export function ThemeFilter({ activeTheme, onChange }: ThemeFilterProps) {
  const selectedThemes = activeTheme ? [activeTheme.id] : [];
  
  const handleThemeSelect = (themeId: string, isSelected: boolean) => {
    if (isSelected) {
      // For search filter, we only allow single selection
      // Create a minimal theme object for compatibility
      onChange({
        id: themeId,
        name: themeId // This will be resolved by the search logic
      } as Theme);
    } else {
      onChange(null as any);
    }
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <FilterItem title="AFFINITY">
      <div 
        className="bg-fuchsia-950/30 rounded-lg p-4 max-h-96 overflow-y-auto" 
        onClick={handleContainerClick}
      >
        <HierarchicalThemeSelector
          selectedThemes={selectedThemes}
          onThemeSelect={handleThemeSelect}
          allowMultiple={false}
          className="space-y-1"
        />
      </div>
    </FilterItem>
  );
}
