
import React from "react";
import { Theme } from "@/utils/themes";
import { ThemeButton } from "./ThemeButton";

interface GroupedThemeOptionsProps {
  filteredThemes: Theme[];
  activeTheme: Theme | null;
  updateFilter: (key: string, value: any) => void;
  useLargerMobileText?: boolean;
  sortAlphabetically?: boolean;
}

export const GroupedThemeOptions: React.FC<GroupedThemeOptionsProps> = ({
  filteredThemes,
  activeTheme,
  updateFilter,
  useLargerMobileText = false,
  sortAlphabetically = true
}) => {
  // Sort themes alphabetically
  const sortedThemes = sortAlphabetically 
    ? [...filteredThemes].sort((a, b) => a.name.localeCompare(b.name))
    : filteredThemes;
    
  const buttonFontSize = useLargerMobileText ? 'text-base' : 'text-sm';

  return (
    <div className="space-y-4">
      {sortedThemes.length === 0 ? (
        <div className="text-center py-2 text-sm text-foreground/70">
          No themes found. Try a different search term.
        </div>
      ) : (
        <div className="space-y-1">
          <h3 className={`font-medium text-foreground ${useLargerMobileText ? 'text-base' : 'text-sm'}`}>
            Themes
          </h3>
          <div className="space-y-1">
            {sortedThemes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => updateFilter("theme", theme)}
                className={`w-full text-left px-3 py-2 rounded-md ${buttonFontSize} transition-colors ${
                  activeTheme?.id === theme.id
                    ? "bg-fuchsia-700/60 text-white font-medium"
                    : "hover:bg-fuchsia-900/40"
                }`}
              >
                {theme.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
