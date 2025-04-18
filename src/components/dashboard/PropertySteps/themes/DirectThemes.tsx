
import React from "react";
import ThemeItem from "./ThemeItem";

export interface DirectThemesProps {
  themes: { id: string; name: string; isAddOption?: boolean }[];
  onThemeSelect: (themeId: string) => void;
  selectedThemes: string[];
}

const DirectThemes = ({ themes, onThemeSelect, selectedThemes = [] }: DirectThemesProps) => {
  const handleThemeSelect = (themeId: string, isSelected: boolean) => {
    onThemeSelect(themeId);
  };

  return (
    <div className="space-y-2 mb-4">
      {themes.map(theme => (
        <ThemeItem
          key={theme.id}
          id={theme.id}
          name={theme.name}
          isAddOption={theme.isAddOption}
          isSelected={selectedThemes.includes(theme.id)}
          onSelect={(isSelected) => handleThemeSelect(theme.id, isSelected)}
        />
      ))}
    </div>
  );
};

export default DirectThemes;
