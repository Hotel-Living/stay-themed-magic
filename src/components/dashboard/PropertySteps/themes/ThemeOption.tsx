
import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import ThemeItem from "./ThemeItem";

interface ThemeOptionProps {
  option: {
    id: string;
    name: string;
    suboptions?: string[];
    isAddOption?: boolean;
  };
  onThemeSelect?: (themeId: string, isSelected: boolean) => void;
}

const ThemeOption = ({ option, onThemeSelect }: ThemeOptionProps) => {
  const [selected, setSelected] = useState(false);
  const [selectedSuboptions, setSelectedSuboptions] = useState<string[]>([]);

  if (option.isAddOption) {
    return (
      <div className="flex items-center">
        <PlusCircle className="w-3 h-3 mr-1 text-fuchsia-400" />
        <span className="text-xs text-fuchsia-400">{option.name}</span>
      </div>
    );
  }

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setSelected(isChecked);
    
    if (onThemeSelect) {
      onThemeSelect(option.id, isChecked);
    }
  };

  const handleSuboptionChange = (suboption: string, isChecked: boolean) => {
    setSelectedSuboptions(prev => {
      const newSelected = isChecked 
        ? [...prev, suboption] 
        : prev.filter(item => item !== suboption);
        
      if (onThemeSelect && newSelected.length > 0) {
        // Consider the main option selected if any suboption is selected
        if (!selected) {
          setSelected(true);
          onThemeSelect(option.id, true);
        }
      }
      
      return newSelected;
    });
  };

  return (
    <>
      <label className="flex items-start mb-1">
        <input
          type="checkbox"
          className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5"
          checked={selected}
          onChange={handleOptionChange}
        />
        <span className="text-sm">{option.name}</span>
      </label>

      {option.suboptions && (
        <div className="pl-6 grid grid-cols-2 gap-1">
          {option.suboptions.map((suboption) => (
            <ThemeItem
              key={`${option.id}-${suboption}`}
              id={`${option.id}-${suboption}`}
              name={suboption}
              onSelect={(isChecked) => handleSuboptionChange(suboption, isChecked)}
            />
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
