
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
  useLargerMobileText?: boolean; // Added this property
}

export const ThemeOptions: React.FC<ThemeOptionsProps> = ({
  themeQuery,
  setThemeQuery,
  activeTheme,
  updateFilter,
  useCollapsibleThemes,
  openThemeCategory,
  toggleThemeCategory,
  useLargerMobileText = false // Added default value
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
          useLargerMobileText={useLargerMobileText} // Pass property to CollapsibleThemeOptions
        />
      ) : (
        <GroupedThemeOptions 
          filteredThemes={filteredThemes}
          activeTheme={activeTheme}
          updateFilter={updateFilter}
          useLargerMobileText={useLargerMobileText} // Pass property to GroupedThemeOptions
        />
      )}
    </>
  );
};
