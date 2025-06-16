
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface Activity {
  name: string;
  description: string;
  duration: string;
  price: string;
}

interface CustomActivityFormProps {
  onAddActivity: (activity: Activity) => void;
}

export const CustomActivityForm: React.FC<CustomActivityFormProps> = ({
  onAddActivity
}) => {
  const { t } = useTranslation();
  const [newActivity, setNewActivity] = useState<Activity>({
    name: "",
    description: "",
    duration: "",
    price: ""
  });

  const handleAddActivity = () => {
    if (newActivity.name && newActivity.description) {
      onAddActivity(newActivity);
      setNewActivity({ name: "", description: "", duration: "", price: "" });
    }
  };

  return (
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
    </div>
  );
};
