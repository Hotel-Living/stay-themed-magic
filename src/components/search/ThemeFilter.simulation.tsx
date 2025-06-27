
import React from "react";
import { FilterItem } from "./FilterItem";
import { mockThemes } from "@/components/simulation/MockFilterData";
import { Theme } from "@/components/filters/FilterTypes";

interface ThemeFilterSimulationProps {
  activeTheme: Theme | null;
  onChange: (value: Theme | null) => void;
}

export function ThemeFilterSimulation({ activeTheme, onChange }: ThemeFilterSimulationProps) {
  const handleThemeClick = (theme: Theme) => {
    // Allow deselection by clicking the same theme again
    const isCurrentlySelected = activeTheme?.id === theme.id;
    onChange(isCurrentlySelected ? null : theme);
  };

  // Group themes by category for better organization
  const themesByCategory = mockThemes.reduce((acc, theme) => {
    const category = theme.category || 'OTHER';
    if (!acc[category]) acc[category] = [];
    acc[category].push(theme);
    return acc;
  }, {} as Record<string, typeof mockThemes>);

  return (
    <FilterItem title="AFFINITY">
      <div className="max-h-48 overflow-y-auto">
        {Object.entries(themesByCategory).map(([category, themes]) => (
          <div key={category} className="mb-2">
            <div className="text-xs text-fuchsia-300/50 uppercase mb-1 px-2">{category}</div>
            {themes.map(theme => (
              <label key={theme.id} className="flex items-start mb-1 cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
                <input 
                  type="radio" 
                  name="theme"
                  checked={activeTheme?.id === theme.id}
                  onChange={() => handleThemeClick(theme)}
                  className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
                />
                <span 
                  className="text-sm font-bold text-white flex-1"
                  onClick={() => handleThemeClick(theme)}
                >
                  {theme.name}
                </span>
              </label>
            ))}
          </div>
        ))}
      </div>
    </FilterItem>
  );
}
