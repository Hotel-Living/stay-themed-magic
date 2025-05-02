
import React from "react";
import ThemeItem from "./ThemeItem";
import { useThemes } from "@/hooks/useThemes";
import { Spinner } from "@/components/ui/spinner";

interface Theme {
  id: string;
  name: string;
  isAddOption?: boolean;
}

interface DirectThemesProps {
  themes?: Theme[];
  selectedThemes?: string[];
  onThemeSelect?: (themeId: string, isSelected: boolean) => void;
  onThemeChange?: (themes: string[]) => void;
}

const DirectThemes = ({ selectedThemes = [], onThemeSelect, onThemeChange }: DirectThemesProps) => {
  const { data: dbThemes, isLoading } = useThemes();
  
  // Filter for "direct" themes - those without a specific category
  const directThemes = React.useMemo(() => {
    if (!dbThemes) return [];
    return dbThemes.filter(theme => !theme.category || theme.category.trim() === "");
  }, [dbThemes]);

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <Spinner size="sm" />
      </div>
    );
  }

  if (!directThemes || directThemes.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#5A1876]/15 rounded-lg p-1.5 border border-fuchsia-800/15">
      <div className="space-y-0.5">
        {directThemes.map(theme => (
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

export default DirectThemes;
