
import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { HierarchicalTheme } from "@/utils/theme-types";
import { useHierarchicalThemes } from "@/hooks/useHierarchicalThemes";
import { Spinner } from "@/components/ui/spinner";

interface HierarchicalThemeSelectorProps {
  selectedThemes: string[];
  onThemeSelect: (themeId: string, isSelected: boolean) => void;
  allowMultiple?: boolean;
  className?: string;
}

export function HierarchicalThemeSelector({
  selectedThemes,
  onThemeSelect,
  allowMultiple = true,
  className = ""
}: HierarchicalThemeSelectorProps) {
  const { themes, loading, error } = useHierarchicalThemes();
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [expandedSubcategories, setExpandedSubcategories] = useState<Set<string>>(new Set());

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

  const handleThemeSelection = (themeId: string, currentlySelected: boolean) => {
    if (!allowMultiple && !currentlySelected) {
      // Clear all selections first
      selectedThemes.forEach(id => onThemeSelect(id, false));
    }
    onThemeSelect(themeId, !currentlySelected);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 text-sm">
        Error loading affinities: {error}
      </div>
    );
  }

  if (!themes || themes.length === 0) {
    return (
      <div className="p-4 text-gray-500 text-sm">
        No affinities available
      </div>
    );
  }

  return (
    <div className={`space-y-0.5 ${className}`}>
      {themes.map((category) => (
        <div key={category.id} className="border border-purple-300/20 rounded-md">
          {/* Category Level - Compact design */}
          <div
            className="flex items-center justify-between px-2 py-1 cursor-pointer hover:bg-purple-100/10 rounded-t-md"
            onClick={() => toggleCategory(category.id)}
          >
            <div className="flex items-center space-x-1.5">
              <span className="font-medium text-xs text-purple-200 uppercase tracking-wide">
                {category.name}
              </span>
            </div>
            {expandedCategories.has(category.id) ? (
              <ChevronDown className="w-3 h-3 text-purple-300" />
            ) : (
              <ChevronRight className="w-3 h-3 text-purple-300" />
            )}
          </div>

          {/* Subcategories and Items */}
          {expandedCategories.has(category.id) && (
            <div className="border-t border-purple-300/20 bg-purple-900/20">
              {category.children.map((subcategory) => (
                <div key={subcategory.id} className="border-b border-purple-300/10 last:border-b-0">
                  {/* Subcategory Level - More compact */}
                  <div
                    className="flex items-center justify-between px-3 py-0.5 cursor-pointer hover:bg-purple-100/10"
                    onClick={() => toggleSubcategory(subcategory.id)}
                  >
                    <span className="font-medium text-xs text-purple-100">
                      {subcategory.name}
                    </span>
                    {expandedSubcategories.has(subcategory.id) ? (
                      <ChevronDown className="w-2.5 h-2.5 text-purple-300" />
                    ) : (
                      <ChevronRight className="w-2.5 h-2.5 text-purple-300" />
                    )}
                  </div>

                  {/* Items Level - Most compact */}
                  {expandedSubcategories.has(subcategory.id) && (
                    <div className="bg-purple-900/30 px-4 py-0.5">
                      <div className="grid grid-cols-1 gap-0">
                        {subcategory.children.map((item) => {
                          const isSelected = selectedThemes.includes(item.id);
                          return (
                            <label
                              key={item.id}
                              className="flex items-center space-x-1.5 py-0.5 rounded cursor-pointer hover:bg-purple-100/10"
                            >
                              <input
                                type={allowMultiple ? "checkbox" : "radio"}
                                name={allowMultiple ? undefined : "theme-selection"}
                                checked={isSelected}
                                onChange={() => handleThemeSelection(item.id, isSelected)}
                                className="w-2.5 h-2.5 rounded border-purple-400/50 text-purple-600 focus:ring-purple-500 focus:ring-offset-0"
                              />
                              <span className="text-xs text-purple-100 hover:text-white">
                                {item.name}
                              </span>
                              {item.description && (
                                <span className="text-xs text-purple-300/70 ml-1">
                                  ({item.description})
                                </span>
                              )}
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
