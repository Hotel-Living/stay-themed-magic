
import React, { useState } from "react";

interface ThemeOptionProps {
  option: {
    id: string;
    name: string;
    suboptions?: string[];
    isAddOption?: boolean;
  };
  onThemeSelect?: (themeId: string, isSelected: boolean) => void;
  selectedThemes?: string[];
}

const ThemeOption = ({ option, onThemeSelect, selectedThemes = [] }: ThemeOptionProps) => {
  const isSelected = selectedThemes.includes(option.id);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onThemeSelect) {
      onThemeSelect(option.id, e.target.checked);
    }
  };

  if (option.isAddOption) {
    return (
      <div className="flex items-center">
        <span className="text-xs text-fuchsia-400">{option.name}</span>
      </div>
    );
  }

  return (
    <div className="flex items-start">
      <input
        type="checkbox"
        id={option.id}
        checked={isSelected}
        onChange={handleChange}
        className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5"
      />
      <label htmlFor={option.id} className="text-sm cursor-pointer">
        {option.name}
      </label>
    </div>
  );
};

export default ThemeOption;
