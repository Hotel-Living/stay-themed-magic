
import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronRight, Info } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useHierarchicalActivities } from "@/hooks/useHierarchicalActivities";
import HierarchicalActivitiesDisplay from "./HierarchicalActivitiesDisplay";

interface ActivitiesSectionProps {
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
  selectedActivities?: string[];
  onActivitySelect?: (activityId: string, isSelected: boolean) => void;
  onActivityChange?: (activity: string, isChecked: boolean) => void;
  openCategory?: string | null;
  setOpenCategory?: (category: string | null) => void;
  openSubmenu?: string | null;
  setOpenSubmenu?: (submenu: string | null) => void;
}

export const ActivitiesSection: React.FC<ActivitiesSectionProps> = ({
  formData = {},
  updateFormData = () => {},
  selectedActivities = [],
  onActivitySelect = () => {},
  onActivityChange = () => {},
  openCategory = null,
  setOpenCategory = () => {},
  openSubmenu = null,
  setOpenSubmenu = () => {}
}) => {
  const { t, isReady } = useTranslation();
  const { activities, loading } = useHierarchicalActivities();
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [selectedAct, setSelectedAct] = useState<string[]>(selectedActivities);

  useEffect(() => {
    if (formData.selectedActivities) {
      setSelectedAct(formData.selectedActivities);
    }
  }, [formData.selectedActivities]);

  useEffect(() => {
    setSelectedAct(selectedActivities);
  }, [selectedActivities]);

  const toggleCategory = (categoryId: string) => {
    if (setOpenCategory) {
      setOpenCategory(openCategory === categoryId ? null : categoryId);
    } else {
      setExpandedCategories(prev => ({
        ...prev,
        [categoryId]: !prev[categoryId]
      }));
    }
  };

  const isExpanded = (categoryId: string) => {
    return openCategory ? openCategory === categoryId : expandedCategories[categoryId];
  };

  const handleActivitySelection = (activityId: string, isSelected: boolean) => {
    onActivitySelect(activityId, isSelected);
    onActivityChange(activityId, isSelected);
    
    if (isSelected) {
      setSelectedAct(prev => [...prev, activityId]);
    } else {
      setSelectedAct(prev => prev.filter(id => id !== activityId));
    }
  };

  // Simple translation function - return name as is since translations should come from the backend
  const getTranslatedActivityName = (name: string) => {
    return name;
  };

  // Don't render until i18n is ready to avoid English fallbacks
  if (loading || !isReady) {
    return <div>{t('common.loading')}</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">2.2- {t('activities.title')}</h3>
        <p className="text-white/80 text-sm mb-4">
          {t('activities.description')}
        </p>
        
        <button
          type="button"
          className="flex items-center space-x-2 px-4 py-2 bg-fuchsia-600 text-white rounded-lg hover:bg-fuchsia-700 mb-6"
        >
          <Info className="w-4 h-4" />
          <span>{t('activities.moreInformation')}</span>
        </button>
        
        <div className="space-y-3">
          {activities.map((category) => (
            <div key={category.id}>
              <button
                type="button"
                onClick={() => toggleCategory(category.id)}
                className="flex items-center space-x-2 text-white hover:text-white/80 font-medium"
              >
                {isExpanded(category.id) ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
                <span>{getTranslatedActivityName(category.name)}</span>
              </button>
              
              {isExpanded(category.id) && (
                <div className="ml-6 mt-2 space-y-2">
                  {category.children && category.children.length > 0 ? (
                    <div className="space-y-1">
                      {category.children.map((activity) => (
                        <label key={activity.id} className="flex items-center space-x-2">
                          <input 
                            type="checkbox" 
                            checked={selectedAct.includes(activity.id)}
                            onChange={(e) => handleActivitySelection(activity.id, e.target.checked)}
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
      </div>
    </div>
  );
};
