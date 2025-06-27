
import { FilterItem } from "./FilterItem";
import { Theme } from "@/utils/themes";

interface ThemeFilterESProps {
  activeTheme: Theme | null;
  onChange: (value: Theme | null) => void;
}

export function ThemeFilterES({ activeTheme, onChange }: ThemeFilterESProps) {
  const themes = [
    { id: "adventure", name: "Aventura", level: 1 as const },
    { id: "art", name: "Arte y Cultura", level: 1 as const },
    { id: "business", name: "Negocios", level: 1 as const },
    { id: "culinary", name: "Culinario", level: 1 as const },
    { id: "nature", name: "Naturaleza", level: 1 as const },
    { id: "wellness", name: "Bienestar", level: 1 as const }
  ];

  const handleThemeClick = (themeValue: Theme) => {
    const newValue = activeTheme?.id === themeValue.id ? null : themeValue;
    console.log("ThemeFilter - Theme toggled:", themeValue, "->", newValue);
    onChange(newValue);
  };

  return (
    <FilterItem title="AFINIDAD">
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
