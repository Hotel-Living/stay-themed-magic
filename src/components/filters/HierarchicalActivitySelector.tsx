
import React, { useState, useMemo } from "react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useHierarchicalActivities } from "@/hooks/useHierarchicalActivities";
import { useTranslation } from "@/hooks/useTranslation";

interface HierarchicalActivitySelectorProps {
  selectedActivities: string[];
  onActivitySelect: (activityId: string, isSelected: boolean) => void;
  allowMultiple?: boolean;
  className?: string;
  searchQuery?: string;
}

export const HierarchicalActivitySelector: React.FC<HierarchicalActivitySelectorProps> = ({
  selectedActivities,
  onActivitySelect,
  allowMultiple = true,
  className = "",
  searchQuery = ""
}) => {
  const { activities, loading, error } = useHierarchicalActivities();
  const { t } = useTranslation();
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [expandedSubcategories, setExpandedSubcategories] = useState<Set<string>>(new Set());

  // Activity name translation mapping
  const getTranslatedActivityName = (activityName: string): string => {
    const activityMap: Record<string, string> = {
      'Indoor': t('filters.activities.indoor'),
      'Outdoor': t('filters.activities.outdoor'),
      'Art & Creativity': t('filters.activities.artCreativity'),
      'Cinema & Media': t('filters.activities.cinemaMedia'),
      'Cooking & Food': t('filters.activities.cookingFood'),
      'Fitness & Movement': t('filters.activities.fitnessMovement'),
      'Games & Entertainment': t('filters.activities.gamesEntertainment'),
      'Language Activities': t('filters.activities.languageActivities'),
      'Learning & Talks': t('filters.activities.learningTalks'),
      'Mind & Balance': t('filters.activities.mindBalance'),
      'Music & Stage': t('filters.activities.musicStage'),
      'Tech & Science': t('filters.activities.techScience'),
      'Wellness & Care': t('filters.activities.wellnessCare'),
      'Animal Encounters': t('filters.activities.animalEncounters'),
      'Adventure': t('filters.activities.adventure'),
      'Gardening & Green Living': t('filters.activities.gardeningGreenLiving'),
      'Live Culture': t('filters.activities.liveCulture'),
      'Nature & Trails': t('filters.activities.natureTrails'),
      'Outdoor Wellness': t('filters.activities.outdoorWellness'),
      'Social & Community': t('filters.activities.socialCommunity'),
      'Sports & Fitness': t('filters.activities.sportsFitness')
    };

    return activityMap[activityName] || activityName;
  };

  // Filter activities based on search query
  const filteredActivities = useMemo(() => {
    if (!searchQuery.trim()) {
      return activities;
    }

    const lowercaseQuery = searchQuery.toLowerCase();
    
    const activityMatches = (activity: any) => {
      const translatedName = getTranslatedActivityName(activity.name);
      return translatedName.toLowerCase().includes(lowercaseQuery) ||
             activity.name.toLowerCase().includes(lowercaseQuery);
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
  }, [searchQuery, activities, t]);

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
        {t('loading')} actividades...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-400 p-4">
        Error: {error}
      </div>
    );
  }

  if (!filteredActivities || filteredActivities.length === 0) {
    return (
      <div className="text-yellow-400 p-4">
        {searchQuery ? t('No activities found matching your search.') : t('No se encontraron actividades disponibles')}
      </div>
    );
  }

  const renderActivity = (activity: any, level: number = 1) => {
    const isExpanded = level === 1 ? expandedCategories.has(activity.id) : expandedSubcategories.has(activity.id);
    const isSelected = selectedActivities.includes(activity.id);
    const hasChildren = activity.children && activity.children.length > 0;
    const translatedName = getTranslatedActivityName(activity.name);
    
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
            {translatedName}
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
