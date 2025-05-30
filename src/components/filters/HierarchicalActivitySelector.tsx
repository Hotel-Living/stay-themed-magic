
import React, { useState } from "react";
import { useHierarchicalActivities } from "@/hooks/useHierarchicalActivities";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

interface HierarchicalActivitySelectorProps {
  selectedActivities: string[];
  onActivitySelect: (activityId: string, isSelected: boolean) => void;
  allowMultiple?: boolean;
  className?: string;
}

export const HierarchicalActivitySelector: React.FC<HierarchicalActivitySelectorProps> = ({
  selectedActivities,
  onActivitySelect,
  allowMultiple = true,
  className = ""
}) => {
  const { activities, loading, error } = useHierarchicalActivities();
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const handleActivitySelect = (activityId: string) => {
    const isCurrentlySelected = selectedActivities.includes(activityId);
    
    if (!allowMultiple && !isCurrentlySelected) {
      // Clear all other selections for single selection mode
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
      <div className="flex justify-center p-4">
        <Spinner size="sm" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-sm p-4">
        Error loading activities: {error}
      </div>
    );
  }

  if (!activities || activities.length === 0) {
    return (
      <div className="text-gray-500 text-sm p-4">
        No activities available
      </div>
    );
  }

  const renderActivity = (activity: any, depth: number = 0) => {
    const isExpanded = expandedCategories.has(activity.id);
    const isSelected = selectedActivities.includes(activity.id);
    const hasChildren = activity.children && activity.children.length > 0;
    const paddingLeft = depth * 16;

    return (
      <div key={activity.id} className="w-full">
        <div 
          className={`flex items-center py-1.5 px-2 rounded-md cursor-pointer hover:bg-fuchsia-900/20 ${
            isSelected ? 'bg-fuchsia-700/30 text-white' : ''
          }`}
          style={{ paddingLeft: `${paddingLeft + 8}px` }}
          onClick={() => {
            if (hasChildren && activity.level === 1) {
              toggleCategory(activity.id);
            } else if (activity.level === 3) {
              handleActivitySelect(activity.id);
            }
          }}
        >
          {hasChildren && activity.level === 1 && (
            <div className="mr-2">
              {isExpanded ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </div>
          )}
          
          {!hasChildren && activity.level === 3 && (
            <input
              type={allowMultiple ? "checkbox" : "radio"}
              checked={isSelected}
              onChange={() => handleActivitySelect(activity.id)}
              className="mr-2 h-3 w-3 rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-0"
              onClick={(e) => e.stopPropagation()}
            />
          )}
          
          <span className={`text-sm ${activity.level === 1 ? 'font-medium uppercase' : activity.level === 2 ? 'font-medium' : ''}`}>
            {activity.name}
          </span>
        </div>

        {hasChildren && (activity.level === 1 ? isExpanded : true) && (
          <div className="mt-1">
            {activity.children.map((child: any) => renderActivity(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`space-y-1 ${className}`}>
      {activities.map(activity => renderActivity(activity))}
    </div>
  );
};
