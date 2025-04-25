
import React, { useState, useEffect } from "react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Link } from "react-router-dom";
import { ChevronDown, PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AffinitiesSectionProps {
  openCategory: string | null;
  setOpenCategory: (category: string | null) => void;
  openSubmenu: string | null;
  setOpenSubmenu: (submenu: string | null) => void;
  onThemeSelect: (themeId: string, isSelected: boolean) => void;
  selectedThemes: string[];
}

interface Theme {
  id: string;
  name: string;
  description?: string | null;
  category?: string;
}

interface ThemeCategory {
  category: string;
  themes: Theme[];
}

export const AffinitiesSection: React.FC<AffinitiesSectionProps> = ({
  openCategory,
  setOpenCategory,
  onThemeSelect,
  selectedThemes,
}) => {
  const [themeCategories, setThemeCategories] = useState<ThemeCategory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchThemes();
  }, []);

  const fetchThemes = async () => {
    try {
      setIsLoading(true);
      // Fetch themes from Supabase, no category filtering
      const { data, error } = await supabase
        .from('themes')
        .select('id, name, description, category');
      
      if (error) {
        console.error("Error fetching themes:", error);
        toast({
          title: "Error loading affinities",
          description: "There was a problem loading affinities. Please try again.",
          variant: "destructive"
        });
        return;
      }

      if (data) {
        // Group themes by category - use a default category for themes without a category
        const groupedThemes: {[key: string]: Theme[]} = {};
        
        data.forEach(theme => {
          // Use the theme's category or default to 'General'
          const category = theme.category || 'General';
          if (!groupedThemes[category]) {
            groupedThemes[category] = [];
          }
          
          groupedThemes[category].push({
            id: theme.id,
            name: theme.name,
            description: theme.description,
            category
          });
        });
        
        // Convert to array of categories
        const categoriesArray: ThemeCategory[] = Object.keys(groupedThemes).map(key => ({
          category: key,
          themes: groupedThemes[key]
        }));
        
        setThemeCategories(categoriesArray);
        console.log("Fetched themes:", categoriesArray);
      }
    } catch (err) {
      console.error("Error in fetchThemes:", err);
    } finally {
      setIsLoading(false);
    }
  };

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
        
        {isLoading ? (
          <div className="flex justify-center p-4">
            <div className="animate-pulse text-fuchsia-300">Loading affinities...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-0.5">
            {themeCategories.map(category => (
              <div key={category.category} className="bg-[#5A1876]/20 rounded-lg p-1.5 border border-fuchsia-800/20">
                <div
                  className="flex items-center justify-between w-full text-sm cursor-pointer"
                  onClick={() => setOpenCategory(openCategory === category.category ? null : category.category)}
                >
                  <span className="uppercase">{category.category}</span>
                  <ChevronDown
                    className={`h-3 w-3 transform transition-transform ${
                      openCategory === category.category ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {openCategory === category.category && (
                  <div className="mt-2 space-y-1">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
                      {category.themes.map(theme => (
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
                      <span className="text-xs text-fuchsia-400">Add new {category.category.toLowerCase()} theme</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
};
