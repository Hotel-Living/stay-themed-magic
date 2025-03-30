
import React from "react";
import { Theme } from "@/utils/themes";
import { ThemeButton } from "./ThemeButton";

interface GroupedThemeOptionsProps {
  filteredThemes: Theme[];
  activeTheme: Theme | null;
  updateFilter: (key: string, value: any) => void;
}

export const GroupedThemeOptions: React.FC<GroupedThemeOptionsProps> = ({
  filteredThemes,
  activeTheme,
  updateFilter
}) => {
  return (
    <div className="space-y-2">
      {Array.from(
        new Set(filteredThemes.map(theme => theme.category))
      ).map(category => (
        <div key={category} className="mb-2">
          <div className="text-xs uppercase text-foreground/60 mb-1 px-3">{category}</div>
          {filteredThemes
            .filter(theme => theme.category === category)
            .map(theme => (
              <ThemeButton
                key={theme.id}
                theme={theme}
                isActive={activeTheme?.id === theme.id}
                onClick={() => updateFilter("theme", theme)}
              />
            ))
          }
        </div>
      ))}
    </div>
  );
};
