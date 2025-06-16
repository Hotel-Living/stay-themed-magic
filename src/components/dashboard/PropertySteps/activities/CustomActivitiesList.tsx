
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

interface Activity {
  name: string;
  description: string;
  duration: string;
  price: string;
}

interface CustomActivitiesListProps {
  activities: Activity[];
}

export const CustomActivitiesList: React.FC<CustomActivitiesListProps> = ({
  activities
}) => {
  const { t } = useTranslation();

  if (activities.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <h5 className="text-sm font-medium text-white mb-2">{t('activities.addedActivities')}</h5>
      <div className="space-y-2">
        {activities.map((activity, index) => (
          <div key={index} className="bg-white/5 p-3 rounded border border-white/10">
            <div className="font-medium text-white">{activity.name}</div>
            <div className="text-sm text-white/70">{activity.description}</div>
            {activity.duration && (
              <div className="text-xs text-white/60">
                {t('activities.duration')}: {activity.duration} {t('activities.hours')}
              </div>
            )}
            {activity.price && (
              <div className="text-xs text-white/60">
                {t('activities.price')}: ${activity.price}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
