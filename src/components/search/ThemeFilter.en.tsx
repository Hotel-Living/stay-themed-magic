
import { FilterItem } from "./FilterItem";
import { Theme } from "@/utils/themes";

interface ThemeFilterENProps {
  activeTheme: Theme | null;
  onChange: (value: Theme | null) => void;
}

export function ThemeFilterEN({ activeTheme, onChange }: ThemeFilterENProps) {
  const themes = [
    { value: { id: "adventure", name: "Adventure" }, label: "Adventure" },
    { value: { id: "art", name: "Art" }, label: "Art & Culture" },
    { value: { id: "business", name: "Business" }, label: "Business" },
    { value: { id: "culinary", name: "Culinary" }, label: "Culinary" },
    { value: { id: "nature", name: "Nature" }, label: "Nature" },
    { value: { id: "wellness", name: "Wellness" }, label: "Wellness" }
  ];

  const handleThemeClick = (themeValue: Theme) => {
    const newValue = activeTheme?.id === themeValue.id ? null : themeValue;
    console.log("ThemeFilter - Theme toggled:", themeValue, "->", newValue);
    onChange(newValue);
  };

  return (
    <FilterItem title="AFFINITY">
      {themes.map(theme => (
        <label key={theme.value.id} className="flex items-start mb-2 cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
          <input 
            type="checkbox" 
            checked={activeTheme?.id === theme.value.id}
            onChange={() => handleThemeClick(theme.value)}
            className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm font-bold text-white">{theme.label}</span>
        </label>
      ))}
    </FilterItem>
  );
}
