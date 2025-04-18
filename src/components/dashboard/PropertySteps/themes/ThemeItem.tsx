
import React from "react";

interface ThemeItemProps {
  id: string;
  name: string;
  isAddOption?: boolean;
  isSelected?: boolean;
  onSelect?: (isSelected: boolean) => void;
}

const ThemeItem = ({ id, name, isAddOption, isSelected = false, onSelect = () => {} }: ThemeItemProps) => {
  const handleClick = () => {
    onSelect(!isSelected);
  };

  return (
    <div
      className={`rounded-lg p-1.5 cursor-pointer transition-colors ${
        isSelected
          ? "bg-fuchsia-800/40 border-fuchsia-400"
          : "hover:bg-fuchsia-800/20 border-transparent"
      } border`}
      onClick={handleClick}
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => {}}
          className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2"
        />
        <span className="text-sm truncate">{name}</span>
      </div>
    </div>
  );
};

export default ThemeItem;
