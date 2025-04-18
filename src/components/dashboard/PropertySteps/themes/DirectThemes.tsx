
import React from "react";
import ThemeItem from "./ThemeItem";

interface Theme {
  id: string;
  name: string;
  isAddOption?: boolean;
}

interface DirectThemesProps {
  themes: Theme[];
  onThemeSelect?: (themeId: string, isSelected: boolean) => void;
}

const DirectThemes = ({ themes, onThemeSelect }: DirectThemesProps) => {
  if (!themes || themes.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#5A1876]/15 rounded-lg p-1.5 border border-fuchsia-800/15">
      <div className="space-y-0.5">
        {themes.map(theme => (
          <div key={theme.id} className="bg-[#5A1876]/10 rounded-lg p-1.5 border border-fuchsia-800/10">
            <ThemeItem
              id={theme.id}
              name={theme.name}
              isAddOption={theme.isAddOption}
              onSelect={(isSelected) => {
                if (onThemeSelect) {
                  onThemeSelect(theme.id, isSelected);
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DirectThemes;
