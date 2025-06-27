
import React from "react";
import { FilterItem } from "./FilterItem";
import { useDynamicFilterData } from "@/hooks/useDynamicFilterData";

interface ActivityFilterENProps {
  activeActivities: string[];
  onChange: (value: string, isChecked: boolean) => void;
}

export function ActivityFilterEN({ activeActivities, onChange }: ActivityFilterENProps) {
  const { activities, loading } = useDynamicFilterData();

  const handleActivityClick = (activityName: string) => {
    const isCurrentlySelected = activeActivities.includes(activityName);
    onChange(activityName, !isCurrentlySelected);
  };

  if (loading) {
    return (
      <FilterItem title="ACTIVITIES">
        <div className="text-white text-sm">Loading activities...</div>
      </FilterItem>
    );
  }

  return (
    <FilterItem title="ACTIVITIES">
      <div className="max-h-48 overflow-y-auto">
        {activities.map(activity => (
          <label key={activity.id} className="flex items-start mb-2 cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
            <input 
              type="checkbox" 
              checked={activeActivities.includes(activity.name)}
              onChange={() => handleActivityClick(activity.name)}
              className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
            />
            <span className="text-sm font-bold text-white">
              {activity.name} ({activity.count})
            </span>
          </label>
        ))}
      </div>
    </FilterItem>
  );
}
