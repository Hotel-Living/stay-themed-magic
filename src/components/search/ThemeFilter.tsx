
import { useState } from "react";
import { FilterItem } from "./FilterItem";
import { Theme } from "@/utils/themes";
import { HierarchicalThemeSelector } from "@/components/filters/HierarchicalThemeSelector";
import { Search } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface ThemeFilterProps {
  activeTheme: Theme | null;
  onChange: (value: Theme | null) => void;
}

export function ThemeFilter({ activeTheme, onChange }: ThemeFilterProps) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const selectedThemes = activeTheme ? [activeTheme.id] : [];
  
  const handleThemeSelect = (themeId: string, isSelected: boolean) => {
    if (isSelected) {
      // For search filter, we only allow single selection
      // Create a minimal theme object for compatibility
      onChange({
        id: themeId,
        name: themeId, // This will be resolved by the search logic
        level: 3 // Assume it's a selectable item
      } as Theme);
    } else {
      onChange(null);
    }
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <FilterItem title={t('filters.affinity')}>
      <div 
        className="bg-fuchsia-950/30 rounded-lg max-h-96 overflow-y-auto" 
        onClick={handleContainerClick}
      >
        {/* Search Input */}
        <div className="p-2 border-b border-fuchsia-800/30" onClick={handleSearchClick}>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-fuchsia-300" />
            <input
              type="text"
              placeholder={t('common.search')}
              value={searchQuery}
              onChange={handleSearchChange}
              onClick={handleSearchClick}
              className="w-full pl-8 pr-3 py-1.5 bg-fuchsia-900/30 border border-fuchsia-700/50 rounded-md text-sm text-white placeholder:text-fuchsia-300/70 focus:outline-none focus:border-fuchsia-500"
            />
          </div>
        </div>
        
        <HierarchicalThemeSelector
          selectedThemes={selectedThemes}
          onThemeSelect={handleThemeSelect}
          allowMultiple={false}
          className="space-y-1"
          searchQuery={searchQuery}
        />
      </div>
    </FilterItem>
  );
}
