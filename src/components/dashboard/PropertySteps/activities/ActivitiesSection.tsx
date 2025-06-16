
import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useHierarchicalActivities } from "@/hooks/useHierarchicalActivities";

interface Activity {
  name: string;
  description: string;
  duration: string;
  price: string;
}

interface ActivitiesSectionProps {
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
  selectedActivities?: string[];
  onActivityChange?: (activity: string, isChecked: boolean) => void;
}

export const ActivitiesSection: React.FC<ActivitiesSectionProps> = ({
  formData = {},
  updateFormData = () => {},
  selectedActivities = [],
  onActivityChange = () => {}
}) => {
  const { t } = useTranslation();
  const { activities, loading } = useHierarchicalActivities();
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [customActivities, setCustomActivities] = useState<Activity[]>([]);
  const [newActivity, setNewActivity] = useState<Activity>({
    name: "",
    description: "",
    duration: "",
    price: ""
  });

  useEffect(() => {
    if (formData.customActivities) {
      setCustomActivities(formData.customActivities);
    }
  }, [formData.customActivities]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const handleActivitySelection = (activityId: string, isSelected: boolean) => {
    onActivityChange(activityId, isSelected);
  };

  const handleAddActivity = () => {
    if (newActivity.name && newActivity.description) {
      const updatedActivities = [...customActivities, newActivity];
      setCustomActivities(updatedActivities);
      updateFormData('customActivities', updatedActivities);
      setNewActivity({ name: "", description: "", duration: "", price: "" });
    }
  };

  // Function to get the translated name for activities
  const getTranslatedActivityName = (name: string) => {
    // Convert the activity name to a translation key format
    const key = name.toLowerCase()
      .replace(/\s+/g, '')
      .replace(/&/g, 'And')
      .replace(/[^\w]/g, '');
    
    // Try to get translation from activities namespace
    const translatedName = t(`activities.${key}`);
    
    // If translation key not found, return original name
    return translatedName.startsWith('activities.') ? name : translatedName;
  };

  if (loading) {
    return <div>{t('common.loading')}</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">2.2- {t('activities.title')}</h3>
        <p className="text-white/80 text-sm mb-4">{t('activities.selectAvailableActivities')}</p>
        
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

      <div>
        <h4 className="text-md font-medium mb-4">{t('activities.addCustomActivity')}</h4>
        
        <div className="space-y-4 bg-white/5 p-4 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              {t('activities.activityName')}
            </label>
            <input
              type="text"
              value={newActivity.name}
              onChange={(e) => setNewActivity({...newActivity, name: e.target.value})}
              placeholder={t('activities.activityNamePlaceholder')}
              className="w-full px-3 py-2 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 text-white placeholder:text-white/60"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              {t('activities.description')}
            </label>
            <textarea
              value={newActivity.description}
              onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
              placeholder={t('activities.descriptionPlaceholder')}
              rows={3}
              className="w-full px-3 py-2 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 text-white placeholder:text-white/60"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                {t('activities.duration')}
              </label>
              <input
                type="number"
                value={newActivity.duration}
                onChange={(e) => setNewActivity({...newActivity, duration: e.target.value})}
                className="w-full px-3 py-2 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                {t('activities.price')}
              </label>
              <input
                type="number"
                value={newActivity.price}
                onChange={(e) => setNewActivity({...newActivity, price: e.target.value})}
                className="w-full px-3 py-2 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 text-white"
              />
            </div>
          </div>
          
          <button
            type="button"
            onClick={handleAddActivity}
            className="flex items-center space-x-2 px-4 py-2 bg-fuchsia-600 text-white rounded-lg hover:bg-fuchsia-700"
          >
            <Plus className="w-4 h-4" />
            <span>{t('activities.addActivity')}</span>
          </button>
        </div>
        
        {customActivities.length > 0 && (
          <div className="mt-4">
            <h5 className="text-sm font-medium text-white mb-2">{t('activities.addedActivities')}</h5>
            <div className="space-y-2">
              {customActivities.map((activity, index) => (
                <div key={index} className="bg-white/5 p-3 rounded border border-white/10">
                  <div className="font-medium text-white">{activity.name}</div>
                  <div className="text-sm text-white/70">{activity.description}</div>
                  {activity.duration && (
                    <div className="text-xs text-white/60">{t('activities.duration')}: {activity.duration} {t('activities.hours')}</div>
                  )}
                  {activity.price && (
                    <div className="text-xs text-white/60">{t('activities.price')}: ${activity.price}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
