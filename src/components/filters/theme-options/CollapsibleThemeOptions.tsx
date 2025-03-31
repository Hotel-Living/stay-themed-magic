
import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { Theme, allThemes, themeCategories } from "@/utils/themes";
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
  // Track open subcategories and submenus
  const [openSubcategories, setOpenSubcategories] = useState<Record<string, boolean>>({});
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});

  const toggleSubcategory = (subcategory: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenSubcategories(prev => ({
      ...prev,
      [subcategory]: !prev[subcategory]
    }));
  };

  const toggleSubmenu = (submenu: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenSubmenus(prev => ({
      ...prev,
      [submenu]: !prev[submenu]
    }));
  };

  return (
    <div className="space-y-2 max-h-[300px] overflow-y-auto">
      {themeCategories.map(category => (
        <Collapsible 
          key={category.category} 
          open={openCategory === category.category}
          onOpenChange={() => toggleCategory(category.category)}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 text-xs font-medium uppercase rounded-md hover:bg-fuchsia-900/40">
            <span>{category.category}</span>
            <ChevronRight className={`h-4 w-4 transform transition-transform ${openCategory === category.category ? 'rotate-90' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            {/* If category has subcategories */}
            {category.subcategories ? (
              <div className="pl-3 space-y-1 mt-1">
                {category.subcategories.map(subcategory => (
                  <div key={subcategory.name} className="rounded-md">
                    {/* Subcategory header as collapsible */}
                    <Collapsible 
                      open={openSubcategories[subcategory.name] || false}
                      onOpenChange={() => setOpenSubcategories(prev => ({
                        ...prev,
                        [subcategory.name]: !prev[subcategory.name]
                      }))}
                    >
                      <CollapsibleTrigger className="flex items-center justify-between w-full px-2 py-1 text-xs font-medium rounded-md hover:bg-fuchsia-900/30">
                        <span>{subcategory.name}</span>
                        <ChevronRight className={`h-3 w-3 transform transition-transform ${openSubcategories[subcategory.name] ? 'rotate-90' : ''}`} />
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        {/* If subcategory has themes */}
                        {subcategory.themes && (
                          <div className="pl-2 pt-1 space-y-1">
                            {subcategory.themes.filter(theme => !theme.isAddOption).map(theme => {
                              // Find the corresponding theme in allThemes
                              const fullTheme = allThemes.find(t => t.id === theme.id) || {
                                id: theme.id, 
                                name: theme.name,
                                category: category.category
                              };
                              
                              return (
                                <ThemeButton
                                  key={theme.id}
                                  theme={fullTheme}
                                  isActive={activeTheme?.id === theme.id}
                                  onClick={() => updateFilter("theme", fullTheme)}
                                />
                              );
                            })}
                          </div>
                        )}
                        
                        {/* If subcategory has submenus */}
                        {subcategory.submenus && (
                          <div className="pl-2 pt-1 space-y-1">
                            {subcategory.submenus.map(submenu => (
                              <Collapsible 
                                key={submenu.name}
                                open={openSubmenus[submenu.name] || false}
                                onOpenChange={() => setOpenSubmenus(prev => ({
                                  ...prev,
                                  [submenu.name]: !prev[submenu.name]
                                }))}
                              >
                                <CollapsibleTrigger className="flex items-center justify-between w-full px-2 py-1 text-xs font-medium rounded-md hover:bg-fuchsia-900/20">
                                  <span>{submenu.name}</span>
                                  <ChevronRight className={`h-3 w-3 transform transition-transform ${openSubmenus[submenu.name] ? 'rotate-90' : ''}`} />
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                  <div className="pl-2 pt-1 space-y-1">
                                    {submenu.options.filter(option => !option.isAddOption).map(option => {
                                      // Create a theme object
                                      const optionTheme = {
                                        id: option.id,
                                        name: option.name,
                                        category: category.category
                                      };
                                      
                                      return (
                                        <div key={option.id}>
                                          <ThemeButton
                                            theme={optionTheme}
                                            isActive={activeTheme?.id === option.id}
                                            onClick={() => updateFilter("theme", optionTheme)}
                                          />
                                          
                                          {/* If option has suboptions */}
                                          {option.suboptions && (
                                            <div className="pl-4 pt-1 space-y-1">
                                              {option.suboptions.map((suboption, index) => {
                                                // Create a theme object for suboption
                                                const suboOptionId = `${option.id}-${index}`;
                                                const suboOptionTheme = {
                                                  id: suboOptionId,
                                                  name: suboption,
                                                  category: category.category
                                                };
                                                
                                                return (
                                                  <ThemeButton
                                                    key={suboOptionId}
                                                    theme={suboOptionTheme}
                                                    isActive={activeTheme?.id === suboOptionId}
                                                    onClick={() => updateFilter("theme", suboOptionTheme)}
                                                    variant="submenu"
                                                  />
                                                );
                                              })}
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </CollapsibleContent>
                              </Collapsible>
                            ))}
                          </div>
                        )}
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                ))}
              </div>
            ) : (
              /* Direct themes in category */
              <div className="pl-3 pt-1 space-y-1">
                {category.themes.filter(theme => !theme.isAddOption).map(theme => {
                  // Find the corresponding theme in allThemes
                  const fullTheme = allThemes.find(t => t.id === theme.id) || {
                    id: theme.id, 
                    name: theme.name,
                    category: category.category
                  };
                  
                  return (
                    <ThemeButton
                      key={theme.id}
                      theme={fullTheme}
                      isActive={activeTheme?.id === theme.id}
                      onClick={() => updateFilter("theme", fullTheme)}
                    />
                  );
                })}
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
};
