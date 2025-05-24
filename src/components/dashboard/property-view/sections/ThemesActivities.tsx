
import React from "react";
import { Card } from "@/components/ui/card";
import { Tag, Activity } from "lucide-react";

interface ThemesActivitiesProps {
  hotel: any;
}

export function ThemesActivities({ hotel }: ThemesActivitiesProps) {
  const themes = hotel.hotel_themes || [];
  const activities = hotel.hotel_activities || [];
  
  const validThemes = Array.isArray(themes) 
    ? themes.filter(theme => theme && theme.theme_id && theme.themes)
    : [];
    
  const validActivities = Array.isArray(activities) 
    ? activities.filter(activity => {
        const hasActivityId = activity?.activity_id;
        const hasActivitiesObject = activity?.activities;
        return hasActivityId || hasActivitiesObject;
      })
    : [];

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-[#5A0080]">
        <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700 flex items-center gap-2">
          <Tag className="w-5 h-5 text-purple-400" />
          Affinities
        </h3>
        {validThemes && validThemes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {validThemes.map((theme) => (
              <div key={theme.theme_id} className="p-3 border border-purple-700/30 rounded-lg bg-purple-900/20">
                <p className="font-medium text-purple-300">
                  {theme.themes?.name || "Unknown Affinity"}
                </p>
                {theme.themes?.description && (
                  <p className="text-sm text-gray-400 mt-1">{theme.themes.description}</p>
                )}
                {theme.themes?.category && (
                  <p className="text-xs text-fuchsia-400 mt-2">Category: {theme.themes.category}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No affinities associated with this hotel.</p>
        )}
      </Card>

      <Card className="p-6 bg-[#5A0080]">
        <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700 flex items-center gap-2">
          <Activity className="w-5 h-5 text-purple-400" />
          Activities
        </h3>
        {validActivities && validActivities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {validActivities.map((activity, index) => {
              const activityName = activity.activities?.name || `Activity ID: ${activity.activity_id}` || `Activity ${index + 1}`;
              const activityCategory = activity.activities?.category || "Uncategorized";
              
              return (
                <div key={activity.activity_id || index} className="p-3 border border-purple-700/30 rounded-lg bg-purple-900/20">
                  <p className="font-medium text-purple-300">
                    {activityName}
                  </p>
                  {activity.activities?.category && (
                    <p className="text-xs text-fuchsia-400 mt-2">Category: {activityCategory}</p>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-400">No activities associated with this hotel.</p>
        )}
      </Card>
    </div>
  );
}
