
import React from "react";
import { Theme } from "@/utils/themes";
import { ThemeButton } from "./ThemeButton";

interface GroupedThemeOptionsProps {
  filteredThemes: Theme[];
  activeTheme: Theme | null;
  updateFilter: (key: string, value: any) => void;
  useLargerMobileText?: boolean; // Added this property
  sortAlphabetically?: boolean; // Added this property
}

export const GroupedThemeOptions: React.FC<GroupedThemeOptionsProps> = ({
  filteredThemes,
  activeTheme,
  updateFilter,
  useLargerMobileText = false, // Added default value
  sortAlphabetically = true // Added default value
}) => {
  // Group themes by their category
  const groupedThemes = filteredThemes.reduce<Record<string, Theme[]>>((acc, theme) => {
    const category = theme.category || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(theme);
    return acc;
  }, {});

  // Sort categories alphabetically if enabled
  const sortedCategories = sortAlphabetically 
    ? Object.keys(groupedThemes).sort() 
    : Object.keys(groupedThemes);

  const buttonFontSize = useLargerMobileText ? 'text-base' : 'text-sm';

  return (
    <div className="space-y-4">
      {Object.keys(groupedThemes).length === 0 ? (
        <div className="text-center py-2 text-sm text-foreground/70">
          No themes found. Try a different search term.
        </div>
      ) : (
        sortedCategories.map((category) => {
          // Sort themes within each category if enabled
          const themes = sortAlphabetically 
            ? [...groupedThemes[category]].sort((a, b) => a.name.localeCompare(b.name))
            : groupedThemes[category];
            
          return (
            <div key={category} className="space-y-1">
              <h3 className={`font-medium text-foreground ${useLargerMobileText ? 'text-base' : 'text-sm'}`}>
                {category}
              </h3>
              <div className="space-y-1">
                {themes.map((theme) => (
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
          );
        })
      )}
    </div>
  );
};
