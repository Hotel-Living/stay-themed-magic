
import React from "react";
import { Theme } from "@/utils/themes";
import { CollapsibleThemeOptions } from "./theme-options/CollapsibleThemeOptions";
import { GroupedThemeOptions } from "./theme-options/GroupedThemeOptions";
import { ThemeSearchInput } from "./theme-options/ThemeSearchInput";
import { filterThemesByQuery } from "./FilterUtils";

interface ThemeOptionsProps {
  themeQuery: string;
  setThemeQuery: (query: string) => void;
  activeTheme: Theme | null;
  updateFilter: (key: string, value: any) => void;
  useCollapsibleThemes: boolean;
  openThemeCategory: string | null;
  toggleThemeCategory: (category: string) => void;
}

export const ThemeOptions: React.FC<ThemeOptionsProps> = ({
  themeQuery,
  setThemeQuery,
  activeTheme,
  updateFilter,
  useCollapsibleThemes,
  openThemeCategory,
  toggleThemeCategory
}) => {
  const filteredThemes = filterThemesByQuery(themeQuery);
  
  return (
    <>
      <ThemeSearchInput 
        themeQuery={themeQuery}
        setThemeQuery={setThemeQuery}
      />
      
      {useCollapsibleThemes ? (
        <CollapsibleThemeOptions 
          activeTheme={activeTheme}
          updateFilter={updateFilter}
          openCategory={openThemeCategory}
          toggleCategory={toggleThemeCategory}
          themeQuery={themeQuery}
        />
      ) : (
        <GroupedThemeOptions 
          filteredThemes={filteredThemes}
          activeTheme={activeTheme}
          updateFilter={updateFilter}
        />
      )}
    </>
  );
};
