
import React from "react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Link } from "react-router-dom";
import { ChevronDown, PlusCircle } from "lucide-react";
import { useThemes } from "@/hooks/useThemes";
import { Spinner } from "@/components/ui/spinner";
import { Theme } from "@/utils/theme-types";

interface AffinitiesSectionProps {
  openCategory: string | null;
  setOpenCategory: (category: string | null) => void;
  openSubmenu: string | null;
  setOpenSubmenu: (submenu: string | null) => void;
  onThemeSelect: (themeId: string, isSelected: boolean) => void;
  selectedThemes: string[];
}

export const AffinitiesSection: React.FC<AffinitiesSectionProps> = ({
  openCategory,
  setOpenCategory,
  openSubmenu,
  setOpenSubmenu,
  onThemeSelect,
  selectedThemes,
}) => {
  const { data: themes, isLoading, error } = useThemes();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-500/20 text-red-200 rounded-lg">
        Error loading themes. Please try again later.
      </div>
    );
  }

  if (!themes || themes.length === 0) {
    return (
      <div className="p-4 text-foreground/70">
        No themes available.
      </div>
    );
  }

  // Sort themes alphabetically by name
  const sortedThemes = [...themes].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Collapsible defaultOpen={false} className="w-full">
      <div className="bg-[#6c0686]">
        <CollapsibleTrigger className="flex items-center justify-between w-full p-2">
          <label className="block text-xl font-bold text-foreground/90 uppercase">
            AFFINITIES
          </label>
          <ChevronDown className="h-5 w-5 text-white" />
        </CollapsibleTrigger>
      </div>
      
      <CollapsibleContent>
        <p className="text-sm text-foreground/90 mb-4">
          Make your hotel stand out from the competition boosting it with group affinities to attract your best and perfect guests
        </p>
        
        <Link 
          to="/themes-information" 
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors mb-4 bg-[#e108fd]/80 hover:bg-[#e108fd]"
        >
          More Information
        </Link>
        
        <div className="bg-[#5A1876]/20 rounded-lg p-1.5 border border-fuchsia-800/20">
          <div className="mt-2 space-y-1">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
              {sortedThemes.map(theme => (
                <div key={theme.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={theme.id}
                    checked={selectedThemes.includes(theme.id)}
                    onChange={(e) => onThemeSelect(theme.id, e.target.checked)}
                    className="mr-1.5 h-3 w-3 rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-0"
                  />
                  <label
                    htmlFor={theme.id}
                    className="text-xs cursor-pointer hover:text-fuchsia-300 truncate"
                    title={theme.description || theme.name}
                  >
                    {theme.name}
                  </label>
                </div>
              ))}
            </div>
            
            <button 
              className="flex items-center cursor-pointer p-2"
              onClick={() => {/* Add custom theme handling */}}
            >
              <PlusCircle className="w-4 h-4 mr-1 text-fuchsia-400" />
              <span className="text-xs text-fuchsia-400">Add new theme</span>
            </button>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
