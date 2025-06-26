
import React, { useState, useMemo } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useHierarchicalActivities } from "@/hooks/useHierarchicalActivities";

interface HierarchicalActivitySelectorPTProps {
  selectedActivities: string[];
  onActivitySelect: (activityId: string, isSelected: boolean) => void;
  allowMultiple?: boolean;
  className?: string;
  searchQuery?: string;
}

export const HierarchicalActivitySelectorPT: React.FC<HierarchicalActivitySelectorPTProps> = ({
  selectedActivities,
  onActivitySelect,
  allowMultiple = true,
  className = "",
  searchQuery = ""
}) => {
  const { activities, loading, error } = useHierarchicalActivities();
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [expandedSubcategories, setExpandedSubcategories] = useState<Set<string>>(new Set());

  // Filter activities based on search query
  const filteredActivities = useMemo(() => {
    if (!searchQuery.trim()) {
      return activities;
    }

    const lowercaseQuery = searchQuery.toLowerCase();
    
    const activityMatches = (activity: any) => {
      return activity.name.toLowerCase().includes(lowercaseQuery);
    };

    const filterActivityHierarchy = (activityList: any[]): any[] => {
      return activityList
        .map(activity => {
          const hasMatchingChildren = activity.children && activity.children.length > 0;
          let filteredChildren: any[] = [];
          
          if (hasMatchingChildren) {
            filteredChildren = filterActivityHierarchy(activity.children);
          }
          
          if (activityMatches(activity) || filteredChildren.length > 0) {
            return {
              ...activity,
              children: filteredChildren
            };
          }
          
          return null;
        })
        .filter(Boolean);
    };

    return filterActivityHierarchy(activities);
  }, [searchQuery, activities]);

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

  const handleActivitySelect = (activityId: string) => {
    const isCurrentlySelected = selectedActivities.includes(activityId);
    
    if (!allowMultiple && !isCurrentlySelected) {
      selectedActivities.forEach(id => {
        if (id !== activityId) {
          onActivitySelect(id, false);
        }
      });
    }
    
    onActivitySelect(activityId, !isCurrentlySelected);
  };

  if (loading) {
    return (
      <div className="text-white p-4">
        Carregando atividades...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-400 p-4">
        Erro: {error}
      </div>
    );
  }

  if (!filteredActivities || filteredActivities.length === 0) {
    return (
      <div className="text-yellow-400 p-4">
        {searchQuery ? "Nenhuma atividade encontrada que corresponda à sua pesquisa." : "Nenhuma atividade disponível"}
      </div>
    );
  }

  const renderActivity = (activity: any, level: number = 1) => {
    const isExpanded = level === 1 ? expandedCategories.has(activity.id) : expandedSubcategories.has(activity.id);
    const isSelected = selectedActivities.includes(activity.id);
    const hasChildren = activity.children && activity.children.length > 0;
    
    const paddingLeft = level === 1 ? 0 : level === 2 ? 12 : 24;

    return (
      <div key={activity.id} className="w-full">
        <div 
          className={`flex items-center py-1.5 px-1 rounded-md cursor-pointer hover:bg-fuchsia-900/20 ${
            isSelected ? 'bg-fuchsia-700/30 text-white' : ''
          }`}
          style={{ paddingLeft: `${paddingLeft}px` }}
          onClick={() => {
            if (hasChildren && (level === 1 || level === 2)) {
              if (level === 1) {
                toggleCategory(activity.id);
              } else {
                toggleSubcategory(activity.id);
              }
            } else if (level === 3 || (!hasChildren && level >= 1)) {
              handleActivitySelect(activity.id);
            }
          }}
        >
          {hasChildren && (level === 1 || level === 2) && (
            <div className="mr-1.5">
              {isExpanded ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </div>
          )}
          
          {(!hasChildren || level === 3) && (
            <input
              type={allowMultiple ? "checkbox" : "radio"}
              checked={isSelected}
              onChange={() => handleActivitySelect(activity.id)}
              className="mr-1.5 h-3 w-3 rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-0"
              onClick={(e) => e.stopPropagation()}
            />
          )}
          
          <span className={`text-sm ${level === 1 ? 'font-medium uppercase' : level === 2 ? 'font-medium' : ''}`}>
            {activity.name}
          </span>
        </div>

        {hasChildren && (
          <div className="mt-1" style={{ display: isExpanded ? 'block' : 'none' }}>
            {activity.children.map((child: any) => renderActivity(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`space-y-1 ${className}`}>
      {filteredActivities.map(activity => renderActivity(activity, 1))}
    </div>
  );
};
