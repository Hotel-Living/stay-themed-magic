
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Theme } from "@/utils/themes";

interface ThemeSubmenuOptionProps {
  option: any;
  activeTheme: Theme | null;
  updateFilter: (key: string, value: any) => void;
  useLargerMobileText?: boolean; // Added property
}

export const ThemeSubmenuOption: React.FC<ThemeSubmenuOptionProps> = ({
  option,
  activeTheme,
  updateFilter,
  useLargerMobileText = false // Added default value
}) => {
  const [showSuboptions, setShowSuboptions] = useState(false);
  
  const toggleSuboptions = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowSuboptions(!showSuboptions);
  };
  
  const handleOptionClick = () => {
    if (option.isAddOption) {
      // Handle "Add other" option
      console.log("Add other option clicked");
    } else if (option.suboptions) {
      toggleSuboptions({} as React.MouseEvent);
    } else {
      updateFilter("theme", option);
    }
  };
  
  return (
    <div className="space-y-0.5">
      <button
        onClick={handleOptionClick}
        className={`w-full text-left px-2 py-1 rounded-sm ${useLargerMobileText ? 'text-sm' : 'text-xs'} transition-colors ${
          activeTheme?.id === option.id
            ? "bg-fuchsia-700/60 text-white font-medium"
            : "hover:bg-fuchsia-900/40"
        } flex items-center justify-between`}
      >
        <span>{option.name}</span>
        {option.suboptions && (
          <span
            onClick={toggleSuboptions}
            className="ml-1 p-0.5 rounded-full bg-fuchsia-900/40 text-fuchsia-300 hover:bg-fuchsia-800/50"
          >
            <Plus className="h-2.5 w-2.5" />
          </span>
        )}
      </button>
      
      {showSuboptions && option.suboptions && (
        <div className="pl-2 space-y-0.5">
          {option.suboptions.map((suboption: string) => (
            <button
              key={suboption}
              onClick={() =>
                updateFilter("theme", {
                  id: `${option.id}-${suboption.toLowerCase()}`,
                  name: suboption,
                  parentTheme: option
                })
              }
              className={`w-full text-left px-2 py-0.5 rounded-sm ${useLargerMobileText ? 'text-xs' : 'text-[10px]'} transition-colors hover:bg-fuchsia-900/40`}
            >
              {suboption}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
