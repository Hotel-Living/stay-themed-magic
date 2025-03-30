
import React from "react";

interface ThemeSearchInputProps {
  themeQuery: string;
  setThemeQuery: (query: string) => void;
}

export const ThemeSearchInput: React.FC<ThemeSearchInputProps> = ({
  themeQuery,
  setThemeQuery
}) => {
  return (
    <div className="mb-2">
      <input
        type="text"
        placeholder="Search themes..."
        value={themeQuery}
        onChange={(e) => setThemeQuery(e.target.value)}
        className="w-full px-3 py-2 bg-fuchsia-900/30 border border-fuchsia-800/20 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-fuchsia-500/50"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};
