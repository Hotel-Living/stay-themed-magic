
import { FilterItem } from "./FilterItem";
import { Theme } from "@/utils/themes";
import { useDynamicFilterData } from "@/hooks/useDynamicFilterData";

interface ThemeFilterESProps {
  activeTheme: Theme | null;
  onChange: (value: Theme | null) => void;
}

export function ThemeFilterES({ activeTheme, onChange }: ThemeFilterESProps) {
  const { themes, loading, error } = useDynamicFilterData();

  const handleThemeClick = (themeData: { id: string; name: string; level: number }) => {
    const themeValue: Theme = { 
      id: themeData.id, 
      name: themeData.name, 
      level: themeData.level as 1 
    };
    const newValue = activeTheme?.id === themeValue.id ? null : themeValue;
    console.log("ThemeFilter - Theme toggled:", themeValue, "->", newValue);
    onChange(newValue);
  };

  if (loading) {
    return (
      <FilterItem title="AFINIDAD">
        <div className="text-sm text-fuchsia-300/70 px-3 py-2">Cargando temas...</div>
      </FilterItem>
    );
  }

  if (error || themes.length === 0) {
    return (
      <FilterItem title="AFINIDAD">
        <div className="text-sm text-fuchsia-300/70 px-3 py-2">No hay temas disponibles</div>
      </FilterItem>
    );
  }

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
          <span className="text-sm font-bold text-white flex-1">{theme.name}</span>
          <span className="text-xs text-fuchsia-300/70 ml-2">({theme.count})</span>
        </label>
      ))}
    </FilterItem>
  );
}
