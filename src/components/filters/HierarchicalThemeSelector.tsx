
import React, { useState } from "react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useHierarchicalThemesWithTranslations } from "@/hooks/useHierarchicalThemesWithTranslations";
import { Checkbox } from "@/components/ui/checkbox";

interface HierarchicalThemeSelectorProps {
  selectedThemes: string[];
  onThemeSelect: (themeId: string, isSelected: boolean) => void;
  allowMultiple?: boolean;
  className?: string;
  searchQuery?: string;
}

export const HierarchicalThemeSelector: React.FC<HierarchicalThemeSelectorProps> = ({
  selectedThemes,
  onThemeSelect,
  allowMultiple = true,
  className = "",
  searchQuery = ""
}) => {
  const { themes, loading, error } = useHierarchicalThemesWithTranslations();
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set());

  console.log("HierarchicalThemeSelector - themes:", themes);
  console.log("HierarchicalThemeSelector - loading:", loading);
  console.log("HierarchicalThemeSelector - error:", error);

  if (loading) {
    return <div className="text-white">Cargando afinidades...</div>;
  }

  if (error) {
    return <div className="text-red-400">Error: {error}</div>;
  }

  if (!themes || themes.length === 0) {
    return <div className="text-yellow-400">No se encontraron afinidades disponibles</div>;
  }

  const toggleCategory = (categoryId: string) => {
    const newOpen = new Set(openCategories);
    if (newOpen.has(categoryId)) {
      newOpen.delete(categoryId);
    } else {
      newOpen.add(categoryId);
    }
    setOpenCategories(newOpen);
  };

  const handleThemeSelect = (themeId: string) => {
    const isSelected = selectedThemes.includes(themeId);
    onThemeSelect(themeId, !isSelected);
  };

  // Filter themes based on search query - only filter if search query exists
  const filterThemes = (themeList: any[]) => {
    if (!searchQuery || searchQuery.trim() === "") {
      return themeList; // Return all themes if no search query
    }
    
    return themeList.filter(theme => {
      // Check if theme name matches
      if (theme.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return true;
      }
      
      // Check if any children match
      if (theme.children && theme.children.length > 0) {
        return filterThemes(theme.children).length > 0;
      }
      
      return false;
    });
  };

  const filteredThemes = filterThemes(themes);

  console.log("HierarchicalThemeSelector - filteredThemes:", filteredThemes);
  console.log("HierarchicalThemeSelector - searchQuery:", searchQuery);

  return (
    <div className={className}>
      {filteredThemes.map((category) => (
        <div key={category.id} className="mb-2">
          <Collapsible
            open={openCategories.has(category.id)}
            onOpenChange={() => toggleCategory(category.id)}
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full p-2 text-left bg-fuchsia-800/30 rounded-lg hover:bg-fuchsia-700/30 transition-colors">
              <span className="font-medium text-fuchsia-200">{category.name}</span>
              {openCategories.has(category.id) ? (
                <ChevronDown className="h-4 w-4 text-fuchsia-300" />
              ) : (
                <ChevronRight className="h-4 w-4 text-fuchsia-300" />
              )}
            </CollapsibleTrigger>
            
            <CollapsibleContent className="mt-2 ml-4 space-y-1">
              {category.children && category.children.length > 0 ? (
                category.children.map((subcategory) => (
                  <div key={subcategory.id} className="mb-2">
                    <Collapsible
                      open={openCategories.has(subcategory.id)}
                      onOpenChange={() => toggleCategory(subcategory.id)}
                    >
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-2 text-left bg-fuchsia-900/20 rounded-md hover:bg-fuchsia-800/20 transition-colors">
                        <span className="text-sm text-fuchsia-300">{subcategory.name}</span>
                        {openCategories.has(subcategory.id) ? (
                          <ChevronDown className="h-3 w-3 text-fuchsia-400" />
                        ) : (
                          <ChevronRight className="h-3 w-3 text-fuchsia-400" />
                        )}
                      </CollapsibleTrigger>
                      
                      <CollapsibleContent className="mt-1 ml-3 space-y-1">
                        {subcategory.children && subcategory.children.map((item) => (
                          <div key={item.id} className="flex items-center space-x-2 p-1">
                            <Checkbox
                              id={item.id}
                              checked={selectedThemes.includes(item.id)}
                              onCheckedChange={() => handleThemeSelect(item.id)}
                              className="border-fuchsia-500 data-[state=checked]:bg-fuchsia-600"
                            />
                            <label
                              htmlFor={item.id}
                              className="text-sm text-white cursor-pointer hover:text-fuchsia-200"
                            >
                              {item.name}
                            </label>
                          </div>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                ))
              ) : (
                <div className="flex items-center space-x-2 p-1">
                  <Checkbox
                    id={category.id}
                    checked={selectedThemes.includes(category.id)}
                    onCheckedChange={() => handleThemeSelect(category.id)}
                    className="border-fuchsia-500 data-[state=checked]:bg-fuchsia-600"
                  />
                  <label
                    htmlFor={category.id}
                    className="text-sm text-white cursor-pointer hover:text-fuchsia-200"
                  >
                    {category.name}
                  </label>
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>
        </div>
      ))}
    </div>
  );
};
