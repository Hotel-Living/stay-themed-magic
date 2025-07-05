
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { SquareFilter } from "./SquareFilter";
import { useThemesWithTranslations } from "@/hooks/useThemesWithTranslations";
import { Theme } from "@/utils/themes";

interface ThemeFilterProps {
  activeTheme: Theme | null;
  onChange: (value: Theme | null) => void;
}

export function ThemeFilter({ activeTheme, onChange }: ThemeFilterProps) {
  const { t } = useTranslation();
  const { data: themeOptions = [], isLoading } = useThemesWithTranslations();

  console.log(`🎨 ThemeFilter: Loading=${isLoading}, Options=`, themeOptions);

  // Transform the data to the format expected by SquareFilter (single select)
  const formattedOptions = themeOptions.map(option => ({
    value: option.name, // Use name as value for consistency
    label: option.name
  }));

  console.log(`🎨 ThemeFilter: Formatted options=`, formattedOptions);

  // Convert single theme selection to array format for SquareFilter
  const selectedThemes = activeTheme ? [activeTheme.name] : [];

  const handleThemeChange = (value: string, isChecked: boolean) => {
    if (isChecked) {
      // Find the theme in our data to get the full object
      const selectedTheme = themeOptions.find(theme => theme.name === value);
      if (selectedTheme) {
        onChange({
          id: selectedTheme.id,
          name: selectedTheme.name,
          level: selectedTheme.level || 1,
          category: selectedTheme.category || 'GENERAL'
        } as Theme);
      }
    } else {
      // If deselecting the current theme, clear selection
      if (activeTheme && activeTheme.name === value) {
        onChange(null);
      }
    }
  };

  return (
    <SquareFilter
      title={t("filters.affinity")}
      options={formattedOptions}
      selectedOptions={selectedThemes}
      onChange={handleThemeChange}
      loading={isLoading}
      singleSelect={true}
    />
  );
}
