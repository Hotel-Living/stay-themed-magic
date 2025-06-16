
import React, { useState, useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { CustomActivityForm } from "./CustomActivityForm";
import { CustomActivitiesList } from "./CustomActivitiesList";
import { HierarchicalActivitiesDisplay } from "./HierarchicalActivitiesDisplay";

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
  const [customActivities, setCustomActivities] = useState<Activity[]>([]);

  useEffect(() => {
    if (formData.customActivities) {
      setCustomActivities(formData.customActivities);
    }
  }, [formData.customActivities]);

  const handleAddActivity = (activity: Activity) => {
    const updatedActivities = [...customActivities, activity];
    setCustomActivities(updatedActivities);
    updateFormData('customActivities', updatedActivities);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">2.2- {t('activities.title')}</h3>
        <p className="text-white/80 text-sm mb-4">{t('activities.selectAvailableActivities')}</p>
        
        <HierarchicalActivitiesDisplay
          selectedActivities={selectedActivities}
          onActivityChange={onActivityChange}
        />
      </div>

      <CustomActivityForm onAddActivity={handleAddActivity} />
      
      <CustomActivitiesList activities={customActivities} />
    </div>
  );
};
