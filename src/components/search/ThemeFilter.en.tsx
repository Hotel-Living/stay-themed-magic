
import React from "react";
import { FilterItem } from "./FilterItem";
import { useDynamicFilterData } from "@/hooks/useDynamicFilterData";
import { Theme } from "@/components/filters/FilterTypes";

interface ThemeFilterENProps {
  activeTheme: Theme | null;
  onChange: (value: Theme | null) => void;
}

export function ThemeFilterEN({ activeTheme, onChange }: ThemeFilterENProps) {
  const { themes, loading } = useDynamicFilterData();

  const handleThemeClick = (theme: any) => {
    // Convert theme data to Theme type
    const themeObj: Theme = {
      id: theme.id,
      name: theme.name,
      level: theme.level as 1 | 2 | 3
    };
    
    // Allow deselection by clicking the same theme again
    const isCurrentlySelected = activeTheme?.id === theme.id;
    onChange(isCurrentlySelected ? null : themeObj);
  };

  if (loading) {
    return (
      <FilterItem title="AFFINITY">
        <div className="text-white text-sm">Loading themes...</div>
      </FilterItem>
    );
  }

  return (
    <FilterItem title="AFFINITY">
      <div className="max-h-48 overflow-y-auto">
        {themes.map(theme => (
          <label key={theme.id} className="flex items-start mb-1 cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
            <input 
              type="radio" 
              name="theme"
              checked={activeTheme?.id === theme.id}
              onChange={() => handleThemeClick(theme)}
              className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
            />
            <span className="text-sm font-bold text-white flex-1">
              {theme.name} ({theme.count})
            </span>
          </label>
        ))}
      </div>
    </FilterItem>
  );
}
