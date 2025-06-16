
import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useHierarchicalActivities } from "@/hooks/useHierarchicalActivities";

interface HierarchicalActivitiesDisplayProps {
  selectedActivities: string[];
  onActivityChange: (activity: string, isChecked: boolean) => void;
}

export const HierarchicalActivitiesDisplay: React.FC<HierarchicalActivitiesDisplayProps> = ({
  selectedActivities,
  onActivityChange
}) => {
  const { t } = useTranslation();
  const { activities, loading } = useHierarchicalActivities();
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const getTranslatedActivityName = (name: string) => {
    const key = name.toLowerCase()
      .replace(/\s+/g, '')
      .replace(/&/g, 'And')
      .replace(/[^\w]/g, '');
    
    const translatedName = t(`activities.${key}`);
    return translatedName.startsWith('activities.') ? name : translatedName;
  };

  if (loading) {
    return <div>{t('common.loading')}</div>;
  }

  return (
    <div className="space-y-4">
      {activities.map((category) => (
        <div key={category.id}>
          <button
            type="button"
            onClick={() => toggleCategory(category.id)}
            className="flex items-center space-x-2 text-white hover:text-white/80"
          >
            {expandedCategories[category.id] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            <span>{getTranslatedActivityName(category.name)}</span>
          </button>
          {expandedCategories[category.id] && (
            <div className="ml-6 mt-2 space-y-2">
              {category.children && category.children.length > 0 ? (
                <div className="space-y-1">
                  {category.children.map((activity) => (
                    <label key={activity.id} className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        checked={selectedActivities.includes(activity.id)}
                        onChange={(e) => onActivityChange(activity.id, e.target.checked)}
                        className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50"
                      />
                      <span className="text-sm text-white/80">{getTranslatedActivityName(activity.name)}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <p className="text-white/60 text-sm">{t('common.noOptionsAvailable')}</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
