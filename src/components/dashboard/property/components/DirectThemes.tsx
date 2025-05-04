
import React from "react";
import ThemeItem from "./ThemeItem";
import { useThemes } from "@/hooks/useThemes";
import { Spinner } from "@/components/ui/spinner";
import { Theme } from "@/utils/theme-types";

interface DirectThemesProps {
  selectedThemes?: string[];
  onThemeSelect?: (themeId: string, isSelected: boolean) => void;
  onThemeChange?: (themes: string[]) => void;
  openCategory?: string | null;
  setOpenCategory?: (category: string | null) => void;
  openSubmenu?: string | null;
  setOpenSubmenu?: (submenu: string | null) => void;
}

export const DirectThemes = ({ 
  selectedThemes = [], 
  onThemeSelect, 
  openCategory,
  setOpenCategory,
  openSubmenu,
  setOpenSubmenu
}: DirectThemesProps) => {
  const { data: themes, isLoading } = useThemes();
  
  const featuredThemes = React.useMemo(() => {
    if (!themes) return [];
    return themes.slice(0, 5);
  }, [themes]);

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <Spinner size="sm" />
      </div>
    );
  }

  if (!featuredThemes || featuredThemes.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#5A1876]/15 rounded-lg p-1.5 border border-fuchsia-800/15">
      <div className="space-y-0.5">
        {featuredThemes.map(theme => (
          <div key={theme.id} className="bg-[#5A1876]/10 rounded-lg p-1.5 border border-fuchsia-800/10">
            <ThemeItem
              id={theme.id}
              name={theme.name}
              isAddOption={theme.isAddOption}
              isSelected={selectedThemes.includes(theme.id)}
              onSelect={(isSelected) => {
                if (onThemeSelect) {
                  onThemeSelect(theme.id, isSelected);
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
