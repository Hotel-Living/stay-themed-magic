
import { useState } from "react";
import { FilterItem } from "./FilterItem";
import { themeCategories } from "@/utils/data";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";

interface ThemeFilterProps {
  activeTheme: string | any | null;
  onChange: (value: string) => void;
}

export function ThemeFilter({ activeTheme, onChange }: ThemeFilterProps) {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  
  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  // Determine the active theme ID
  const activeThemeId = typeof activeTheme === 'string' ? activeTheme : 
                        (activeTheme && typeof activeTheme === 'object' ? activeTheme.id : null);

  return (
    <FilterItem title="THEME">
      {themeCategories.map((category) => (
        <Collapsible key={category.category}>
          <div className="bg-fuchsia-950/30 rounded-lg p-2 mb-2 border border-fuchsia-800/30">
            <CollapsibleTrigger 
              className="flex items-center justify-between w-full font-medium text-sm"
              onClick={() => toggleCategory(category.category)}
            >
              <h4>{category.category}</h4>
              <ChevronRight className={`h-4 w-4 transform transition-transform ${openCategory === category.category ? 'rotate-90' : ''}`} />
            </CollapsibleTrigger>
            
            <CollapsibleContent>
              <div className="grid grid-cols-1 gap-1 mt-2 pl-2">
                {category.themes.map((theme) => (
                  <label key={theme.id} className="flex items-start">
                    <input 
                      type="radio" 
                      name="theme"
                      checked={activeThemeId === theme.id}
                      onChange={() => onChange(theme.id)}
                      className="rounded-full border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
                    />
                    <span className="text-sm">{theme.name}</span>
                  </label>
                ))}
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      ))}
    </FilterItem>
  );
}
