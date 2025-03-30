
import React from "react";
import { ChevronRight } from "lucide-react";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { Theme, themeCategories } from "@/utils/themes";
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
      
      {filteredThemes.length === 0 ? (
        <div className="text-center py-3 text-sm text-foreground/60">
          No themes found
        </div>
      ) : useCollapsibleThemes ? (
        <CollapsibleThemeOptions 
          categories={themeCategories}
          activeTheme={activeTheme}
          updateFilter={updateFilter}
          openCategory={openThemeCategory}
          toggleCategory={toggleThemeCategory}
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

interface CollapsibleThemeOptionsProps {
  categories: typeof themeCategories;
  activeTheme: Theme | null;
  updateFilter: (key: string, value: any) => void;
  openCategory: string | null;
  toggleCategory: (category: string) => void;
}

const CollapsibleThemeOptions: React.FC<CollapsibleThemeOptionsProps> = ({
  categories,
  activeTheme,
  updateFilter,
  openCategory,
  toggleCategory
}) => {
  return (
    <div className="space-y-2">
      {categories.map(category => (
        <Collapsible key={category.category}>
          <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 text-xs uppercase rounded-md hover:bg-fuchsia-900/40">
            <span>{category.category}</span>
            <ChevronRight className={`h-4 w-4 transform transition-transform ${openCategory === category.category ? 'rotate-90' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="pt-1 pl-3 space-y-1">
              {category.themes.map(theme => (
                <button
                  key={theme.id}
                  onClick={() => updateFilter("theme", theme)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    activeTheme?.id === theme.id
                      ? "bg-fuchsia-500/20 text-white"
                      : "hover:bg-fuchsia-900/40"
                  }`}
                >
                  {theme.name}
                </button>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
};

interface GroupedThemeOptionsProps {
  filteredThemes: Theme[];
  activeTheme: Theme | null;
  updateFilter: (key: string, value: any) => void;
}

const GroupedThemeOptions: React.FC<GroupedThemeOptionsProps> = ({
  filteredThemes,
  activeTheme,
  updateFilter
}) => {
  return (
    <div className="space-y-2">
      {Array.from(
        new Set(filteredThemes.map(theme => theme.category))
      ).map(category => (
        <div key={category} className="mb-2">
          <div className="text-xs uppercase text-foreground/60 mb-1 px-3">{category}</div>
          {filteredThemes
            .filter(theme => theme.category === category)
            .map(theme => (
              <button
                key={theme.id}
                onClick={() => updateFilter("theme", theme)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  activeTheme?.id === theme.id
                    ? "bg-fuchsia-500/20 text-white"
                    : "hover:bg-fuchsia-900/40"
                }`}
              >
                {theme.name}
              </button>
            ))
          }
        </div>
      ))}
    </div>
  );
};
