
import React from "react";
import { ChevronRight } from "lucide-react";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { Theme, themeCategories } from "@/utils/themes";
import { ThemeButton } from "./ThemeButton";

interface CollapsibleThemeOptionsProps {
  activeTheme: Theme | null;
  updateFilter: (key: string, value: any) => void;
  openCategory: string | null;
  toggleCategory: (category: string) => void;
}

export const CollapsibleThemeOptions: React.FC<CollapsibleThemeOptionsProps> = ({
  activeTheme,
  updateFilter,
  openCategory,
  toggleCategory
}) => {
  return (
    <div className="space-y-2">
      {themeCategories.map(category => (
        <Collapsible key={category.category}>
          <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 text-xs uppercase rounded-md hover:bg-fuchsia-900/40">
            <span>{category.category}</span>
            <ChevronRight className={`h-4 w-4 transform transition-transform ${openCategory === category.category ? 'rotate-90' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="pt-1 pl-3 space-y-1">
              {category.themes.map(theme => (
                <ThemeButton
                  key={theme.id}
                  theme={theme}
                  isActive={activeTheme?.id === theme.id}
                  onClick={() => updateFilter("theme", theme)}
                />
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
};
