
import React from "react";
import { Search, X } from "lucide-react";

interface ThemeSearchInputProps {
  themeQuery: string;
  setThemeQuery: (query: string) => void;
}

export const ThemeSearchInput: React.FC<ThemeSearchInputProps> = ({
  themeQuery,
  setThemeQuery
}) => {
  const handleClearSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setThemeQuery("");
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setThemeQuery(e.target.value);
  };
  
  const handleInputClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  
  return (
    <div className="mb-2 relative" onClick={(e) => e.stopPropagation()}>
      <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-fuchsia-400" />
      </div>
      
      <input
        type="text"
        placeholder="Search themes..."
        value={themeQuery}
        onChange={handleInputChange}
        onClick={handleInputClick}
        className="w-full pl-8 pr-8 py-2 bg-fuchsia-900/30 border border-fuchsia-800/20 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-fuchsia-500/50"
      />
      
      {themeQuery && (
        <button
          onClick={handleClearSearch}
          className="absolute inset-y-0 right-2 flex items-center text-fuchsia-400 hover:text-fuchsia-300"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
