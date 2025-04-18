
import React, { useState } from "react";
import { PlusCircle } from "lucide-react";

interface ThemeItemProps {
  id: string;
  name: string;
  isAddOption?: boolean;
  onSelect?: (isSelected: boolean) => void;
}

const ThemeItem = ({ id, name, isAddOption, onSelect }: ThemeItemProps) => {
  const [checked, setChecked] = useState(false);

  if (isAddOption) {
    return (
      <div className="flex items-center">
        <PlusCircle className="w-4 h-4 mr-1 text-fuchsia-400" />
        <span className="text-xs text-fuchsia-400">{name}</span>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setChecked(isChecked);
    if (onSelect) {
      onSelect(isChecked);
    }
  };

  return (
    <label className="flex items-start">
      <input
        type="checkbox"
        className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5"
        checked={checked}
        onChange={handleChange}
      />
      <span className="text-sm">{name}</span>
    </label>
  );
};

export default ThemeItem;
