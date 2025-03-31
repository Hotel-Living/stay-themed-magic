
import { useState, useEffect } from "react";
import { Theme, allThemes } from "@/utils/themes";
import { ThemeButton } from "./ThemeButton";
import { ChevronDown } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AlphabeticalThemeListProps {
  activeTheme: Theme | null;
  onChange: (value: Theme) => void;
  themeQuery: string;
}

export const AlphabeticalThemeList = ({ 
  activeTheme, 
  onChange,
  themeQuery 
}: AlphabeticalThemeListProps) => {
  const [displayCount, setDisplayCount] = useState(10);
  const [filteredThemes, setFilteredThemes] = useState<Theme[]>([]);
  
  // Filter and sort themes alphabetically
  useEffect(() => {
    let themes = [...allThemes];
    
    // Apply search filter if query exists
    if (themeQuery.trim()) {
      const lowercaseQuery = themeQuery.toLowerCase();
      themes = themes.filter(theme => 
        theme.name.toLowerCase().includes(lowercaseQuery) || 
        (theme.category && theme.category.toLowerCase().includes(lowercaseQuery))
      );
    }
    
    // Sort alphabetically by name
    themes.sort((a, b) => a.name.localeCompare(b.name));
    
    setFilteredThemes(themes);
    // Reset display count when search changes
    setDisplayCount(10);
  }, [themeQuery]);
  
  const handleLoadMore = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDisplayCount(prev => prev + 10);
  };
  
  const handleThemeClick = (e: React.MouseEvent, theme: Theme) => {
    e.preventDefault();
    e.stopPropagation();
    onChange(theme);
  };
  
  const visibleThemes = filteredThemes.slice(0, displayCount);
  const hasMoreThemes = displayCount < filteredThemes.length;
  
  if (filteredThemes.length === 0) {
    return <div className="text-center py-3 text-sm text-fuchsia-300">No themes found</div>;
  }
  
  return (
    <div className="mt-2">
      <ScrollArea className="h-[280px] pr-2">
        <div className="space-y-1">
          {visibleThemes.map((theme) => (
            <ThemeButton
              key={theme.id}
              theme={theme}
              isActive={activeTheme?.id === theme.id}
              onClick={(e) => handleThemeClick(e, theme)}
            />
          ))}
          
          {hasMoreThemes && (
            <button
              onClick={handleLoadMore}
              className="w-full flex items-center justify-center py-2 mt-1 text-sm text-fuchsia-300 hover:text-fuchsia-200 transition-colors"
            >
              Show more <ChevronDown className="ml-1 h-4 w-4" />
            </button>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
