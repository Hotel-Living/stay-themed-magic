
import React, { useState, useMemo } from "react";
import { useHierarchicalThemes } from "@/hooks/useHierarchicalThemes";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

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
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [expandedSubcategories, setExpandedSubcategories] = useState<Set<string>>(new Set());

  // Filter themes based on search query
  const filteredThemes = useMemo(() => {
    if (!searchQuery.trim()) {
      return themes;
    }

    const lowercaseQuery = searchQuery.toLowerCase();
    
    // Function to check if a theme matches the query
    const themeMatches = (theme: any) => {
      return theme.name.toLowerCase().includes(lowercaseQuery);
    };

    // Recursively filter themes while maintaining hierarchy
    const filterThemeHierarchy = (themeList: any[]): any[] => {
      return themeList
        .map(theme => {
          const hasMatchingChildren = theme.children && theme.children.length > 0;
          let filteredChildren: any[] = [];
          
          if (hasMatchingChildren) {
            filteredChildren = filterThemeHierarchy(theme.children);
          }
          
          // Include theme if it matches or has matching children
          if (themeMatches(theme) || filteredChildren.length > 0) {
            return {
              ...theme,
              children: filteredChildren
            };
          }
          
          return null;
        })
        .filter(Boolean);
    };

    return filterThemeHierarchy(themes);
  }, [searchQuery, themes]);

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const toggleSubcategory = (subcategoryId: string) => {
    const newExpanded = new Set(expandedSubcategories);
    if (newExpanded.has(subcategoryId)) {
      newExpanded.delete(subcategoryId);
    } else {
      newExpanded.add(subcategoryId);
    }
    setExpandedSubcategories(newExpanded);
  };

  const handleThemeSelect = (themeId: string) => {
    const isCurrentlySelected = selectedThemes.includes(themeId);
    
    if (!allowMultiple && !isCurrentlySelected) {
      // Clear all other selections for single selection mode
      selectedThemes.forEach(id => {
        if (id !== themeId) {
          onThemeSelect(id, false);
        }
      });
    }
    
    onThemeSelect(themeId, !isCurrentlySelected);
  };

  if (loading) {
    return (
      <div className="flex justify-center p-4">
        <Spinner size="sm" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-sm p-4">
        Error loading themes: {error}
      </div>
    );
  }

  if (!filteredThemes || filteredThemes.length === 0) {
    return (
      <div className="text-gray-500 text-sm p-4">
        {searchQuery ? "No themes found matching your search." : "No themes available"}
      </div>
    );
  }

  const renderTheme = (theme: any, depth: number = 0) => {
    const isExpanded = expandedCategories.has(theme.id);
    const isSubcategoryExpanded = expandedSubcategories.has(theme.id);
    const isSelected = selectedThemes.includes(theme.id);
    const hasChildren = theme.children && theme.children.length > 0;
    
    // Level 1 items should have no left padding to align under filter title
    // Level 2+ items get appropriate indentation
    const paddingLeft = theme.level === 1 ? 0 : theme.level === 2 ? 12 : 24;

    return (
      <div key={theme.id} className="w-full">
        <div 
          className={`flex items-center py-1.5 px-1 rounded-md cursor-pointer hover:bg-fuchsia-900/20 ${
            isSelected ? 'bg-fuchsia-700/30 text-white' : ''
          }`}
          style={{ paddingLeft: `${paddingLeft}px` }}
          onClick={() => {
            if (hasChildren && theme.level === 1) {
              toggleCategory(theme.id);
            } else if (hasChildren && theme.level === 2) {
              toggleSubcategory(theme.id);
            } else if (theme.level === 3) {
              handleThemeSelect(theme.id);
            }
          }}
        >
          {hasChildren && (theme.level === 1 || theme.level === 2) && (
            <div className="mr-1.5">
              {(theme.level === 1 ? isExpanded : isSubcategoryExpanded) ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </div>
          )}
          
          {!hasChildren && theme.level === 3 && (
            <input
              type={allowMultiple ? "checkbox" : "radio"}
              checked={isSelected}
              onChange={() => handleThemeSelect(theme.id)}
              className="mr-1.5 h-3 w-3 rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-0"
              onClick={(e) => e.stopPropagation()}
            />
          )}
          
          <span className={`text-sm ${theme.level === 1 ? 'font-medium uppercase' : theme.level === 2 ? 'font-medium' : ''}`}>
            {theme.name}
          </span>
        </div>

        {hasChildren && (
          <div className="mt-1" style={{ display: (theme.level === 1 ? isExpanded : theme.level === 2 ? isSubcategoryExpanded : true) ? 'block' : 'none' }}>
            {theme.children.map((child: any) => renderTheme(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`space-y-1 ${className}`}>
      {filteredThemes.map(theme => renderTheme(theme))}
    </div>
  );
};
