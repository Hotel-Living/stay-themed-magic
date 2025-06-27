
import { FilterItem } from "./FilterItem";
import { Theme } from "@/utils/themes";

interface ThemeFilterENProps {
  activeTheme: Theme | null;
  onChange: (value: Theme | null) => void;
}

export function ThemeFilterEN({ activeTheme, onChange }: ThemeFilterENProps) {
  const themes = [
    { id: "adventure", name: "Adventure", level: 1 as const },
    { id: "art", name: "Art & Culture", level: 1 as const },
    { id: "business", name: "Business", level: 1 as const },
    { id: "culinary", name: "Culinary", level: 1 as const },
    { id: "nature", name: "Nature", level: 1 as const },
    { id: "wellness", name: "Wellness", level: 1 as const }
  ];

  const handleThemeClick = (themeValue: Theme) => {
    const newValue = activeTheme?.id === themeValue.id ? null : themeValue;
    console.log("ThemeFilter - Theme toggled:", themeValue, "->", newValue);
    onChange(newValue);
  };

  return (
    <FilterItem title="AFFINITY">
      {themes.map(theme => (
        <label key={theme.id} className="flex items-start mb-2 cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
          <input 
            type="checkbox" 
            checked={activeTheme?.id === theme.id}
            onChange={() => handleThemeClick(theme)}
            className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm font-bold text-white">{theme.name}</span>
        </label>
      ))}
    </FilterItem>
  );
}
