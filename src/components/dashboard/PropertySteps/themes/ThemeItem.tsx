
import React from "react";
import { PlusCircle } from "lucide-react";

interface ThemeItemProps {
  id: string;
  name: string;
  isAddOption?: boolean;
}

const ThemeItem = ({ id, name, isAddOption }: ThemeItemProps) => {
  if (isAddOption) {
    return (
      <div className="flex items-center">
        <PlusCircle className="w-4 h-4 mr-1 text-fuchsia-400" />
        <span className="text-xs text-fuchsia-400">{name}</span>
      </div>
    );
  }

  return (
    <label className="flex items-start">
      <input
        type="checkbox"
        className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5"
      />
      <span className="text-sm">{name}</span>
    </label>
  );
};

export default ThemeItem;
