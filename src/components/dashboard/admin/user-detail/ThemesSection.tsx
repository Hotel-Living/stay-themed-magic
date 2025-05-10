
import React from "react";

interface ThemesSectionProps {
  themes: any[];
}

export const ThemesSection = ({ themes }: ThemesSectionProps) => {
  if (themes.length === 0) {
    return <p className="text-center py-4">No preferred themes found for this user.</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {themes.map((theme) => (
        <span key={theme.id} className="px-3 py-1 bg-purple-900/30 rounded-full text-xs">
          {theme.name}
        </span>
      ))}
    </div>
  );
};
