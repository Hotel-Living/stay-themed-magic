
import React from "react";
import { Theme } from "@/utils/themes";
import { ThemeButton } from "./ThemeButton";

interface ThemeSubmenuOptionProps {
  option: {
    id: string;
    name: string;
    suboptions?: string[];
    isAddOption?: boolean;
  };
  activeTheme: Theme | null;
  updateFilter: (key: string, value: any) => void;
  category: string;
}

export const ThemeSubmenuOption: React.FC<ThemeSubmenuOptionProps> = ({
  option,
  activeTheme,
  updateFilter,
  category
}) => {
  // Create a theme object for the main option
  const optionTheme = {
    id: option.id,
    name: option.name,
    category: category
  };
  
  return (
    <div className="ml-1">
      <ThemeButton
        theme={optionTheme}
        isActive={activeTheme?.id === option.id}
        onClick={() => updateFilter("theme", optionTheme)}
      />
      
      {/* Only render suboptions if they exist */}
      {option.suboptions && option.suboptions.length > 0 && (
        <div className="pl-3 pt-1 space-y-1">
          {option.suboptions.map((suboption, index) => {
            // Create a theme object for suboption
            const suboOptionId = `${option.id}-${index}`;
            const suboOptionTheme = {
              id: suboOptionId,
              name: suboption,
              category: category
            };
            
            return (
              <ThemeButton
                key={suboOptionId}
                theme={suboOptionTheme}
                isActive={activeTheme?.id === suboOptionId}
                onClick={() => updateFilter("theme", suboOptionTheme)}
                variant="submenu"
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
