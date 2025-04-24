
import React from "react";

interface DirectThemesProps {
  themes: Array<{
    id: string;
    name: string;
  }>;
  onThemeSelect?: (themeId: string, isSelected: boolean) => void;
  selectedThemes: string[];
}

const DirectThemes: React.FC<DirectThemesProps> = ({ themes, onThemeSelect, selectedThemes = [] }) => {
  return (
    <div className="space-y-1 mt-1 pl-2">
      {themes.map((theme) => (
        <div key={theme.id} className="flex items-center py-0.5">
          <input
            type="checkbox"
            id={theme.id}
            checked={selectedThemes.includes(theme.id)}
            onChange={(e) => onThemeSelect && onThemeSelect(theme.id, e.target.checked)}
            className="mr-1.5 h-3 w-3 rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-0"
          />
          <label
            htmlFor={theme.id}
            className="text-xs cursor-pointer hover:text-fuchsia-300 truncate"
          >
            {theme.name}
          </label>
        </div>
      ))}
    </div>
  );
};

export default DirectThemes;
