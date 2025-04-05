
import React from "react";
import { PlusCircle } from "lucide-react";
import ThemeItem from "./ThemeItem";

interface ThemeOptionProps {
  option: {
    id: string;
    name: string;
    suboptions?: string[];
    isAddOption?: boolean;
  };
}

const ThemeOption = ({ option }: ThemeOptionProps) => {
  if (option.isAddOption) {
    return (
      <div className="flex items-center">
        <PlusCircle className="w-3 h-3 mr-1 text-fuchsia-400" />
        <span className="text-xs text-fuchsia-400">{option.name}</span>
      </div>
    );
  }

  return (
    <>
      <label className="flex items-start mb-1">
        <input
          type="checkbox"
          className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5"
        />
        <span className="text-sm">{option.name}</span>
      </label>

      {option.suboptions && (
        <div className="pl-6 grid grid-cols-2 gap-1">
          {option.suboptions.map((suboption) => (
            <label key={suboption} className="flex items-start">
              <input
                type="checkbox"
                className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-3 w-3 mr-1 mt-0.5"
              />
              <span className="text-xs">{suboption}</span>
            </label>
          ))}
          <div className="flex items-center">
            <PlusCircle className="w-3 h-3 mr-1 text-fuchsia-400" />
            <span className="text-xs text-fuchsia-400">Add other</span>
          </div>
        </div>
      )}
    </>
  );
};

export default ThemeOption;
