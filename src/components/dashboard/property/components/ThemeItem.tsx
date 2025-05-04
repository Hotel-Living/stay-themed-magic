
import React from "react";

interface ThemeItemProps {
  id: string;
  name: string;
  isSelected: boolean;
  isAddOption?: boolean;
  onSelect: (isSelected: boolean) => void;
}

const ThemeItem = ({ id, name, isSelected, isAddOption, onSelect }: ThemeItemProps) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={`theme-${id}`}
        checked={isSelected}
        onChange={(e) => onSelect(e.target.checked)}
        className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 h-4 w-4 mr-2"
      />
      <label htmlFor={`theme-${id}`} className="text-sm cursor-pointer">
        {name}
      </label>
    </div>
  );
};

export default ThemeItem;
