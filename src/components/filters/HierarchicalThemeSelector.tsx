
import React, { useState } from "react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useHierarchicalThemes } from "@/hooks/useHierarchicalThemes";
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
  const { themes, loading, error } = useHierarchicalThemes();
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
        <div key={category.id} className="mb-4">
          <Collapsible 
            open={openCategories.has(category.id)}
            onOpenChange={() => toggleCategory(category.id)}
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-fuchsia-900/30 rounded-lg hover:bg-fuchsia-800/40 transition-colors">
              <span className="text-white font-medium text-left">{category.name}</span>
              {openCategories.has(category.id) ? (
                <ChevronDown className="h-4 w-4 text-white" />
              ) : (
                <ChevronRight className="h-4 w-4 text-white" />
              )}
            </CollapsibleTrigger>
            
            <CollapsibleContent className="mt-2 ml-4 space-y-2">
              {category.children?.map((subcategory) => (
                <div key={subcategory.id} className="space-y-2">
                  {subcategory.children && subcategory.children.length > 0 ? (
                    // Subcategory with items
                    <div>
                      <h4 className="text-fuchsia-300 font-medium text-sm mb-2 ml-2">
                        {subcategory.name}
                      </h4>
                      <div className="ml-4 space-y-1">
                        {subcategory.children.map((item) => (
                          <label 
                            key={item.id} 
                            className="flex items-center space-x-2 text-white/90 hover:text-white cursor-pointer p-1 rounded hover:bg-fuchsia-800/20"
                          >
                            <Checkbox
                              checked={selectedThemes.includes(item.id)}
                              onCheckedChange={() => handleThemeSelect(item.id)}
                              className="data-[state=checked]:bg-fuchsia-600 data-[state=checked]:border-fuchsia-600"
                            />
                            <span className="text-sm">{item.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ) : (
                    // Direct item under category
                    <label 
                      key={subcategory.id} 
                      className="flex items-center space-x-2 text-white/90 hover:text-white cursor-pointer p-1 rounded hover:bg-fuchsia-800/20"
                    >
                      <Checkbox
                        checked={selectedThemes.includes(subcategory.id)}
                        onCheckedChange={() => handleThemeSelect(subcategory.id)}
                        className="data-[state=checked]:bg-fuchsia-600 data-[state=checked]:border-fuchsia-600"
                      />
                      <span className="text-sm">{subcategory.name}</span>
                    </label>
                  )}
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </div>
      ))}
    </div>
  );
};
