
import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

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
  const [indoorExpanded, setIndoorExpanded] = useState(false);
  const [outdoorExpanded, setOutdoorExpanded] = useState(false);
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

  const handleAddActivity = () => {
    if (newActivity.name && newActivity.description) {
      const updatedActivities = [...customActivities, newActivity];
      setCustomActivities(updatedActivities);
      updateFormData('customActivities', updatedActivities);
      setNewActivity({ name: "", description: "", duration: "", price: "" });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">2.2- {t('activities.title')}</h3>
        <p className="text-white/80 text-sm mb-4">{t('activities.selectAvailableActivities')}</p>
        
        <div className="space-y-4">
          <div>
            <button
              type="button"
              onClick={() => setIndoorExpanded(!indoorExpanded)}
              className="flex items-center space-x-2 text-white hover:text-white/80"
            >
              {indoorExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              <span>{t('activities.indoor')}</span>
            </button>
            {indoorExpanded && (
              <div className="ml-6 mt-2 space-y-2">
                {/* Indoor activities would be listed here */}
              </div>
            )}
          </div>
          
          <div>
            <button
              type="button"
              onClick={() => setOutdoorExpanded(!outdoorExpanded)}
              className="flex items-center space-x-2 text-white hover:text-white/80"
            >
              {outdoorExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              <span>{t('activities.outdoor')}</span>
            </button>
            {outdoorExpanded && (
              <div className="ml-6 mt-2 space-y-2">
                {/* Outdoor activities would be listed here */}
              </div>
            )}
          </div>
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
