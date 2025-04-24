
import React from "react";

interface ThemeOptionProps {
  option: {
    id: string;
    name: string;
    suboptions?: string[];
    isAddOption?: boolean;
  };
  onThemeSelect?: (themeId: string, isSelected: boolean) => void;
  isSelected?: boolean; // Add this prop
}

const ThemeOption: React.FC<ThemeOptionProps> = ({ 
  option, 
  onThemeSelect,
  isSelected = false // Default to false if not provided
}) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={option.id}
        checked={isSelected} // Use the isSelected prop
        onChange={(e) => onThemeSelect && onThemeSelect(option.id, e.target.checked)}
        className="mr-1.5 h-3 w-3 rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-0"
      />
      <label
        htmlFor={option.id}
        className="text-xs cursor-pointer hover:text-fuchsia-300 truncate"
      >
        {option.name}
      </label>
    </div>
  );
};

export default ThemeOption;
