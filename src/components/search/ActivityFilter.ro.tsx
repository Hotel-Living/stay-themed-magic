
import { FilterItem } from "./FilterItem";
import { useDynamicFilterData } from "@/hooks/useDynamicFilterData";

interface ActivityFilterROProps {
  activeActivities: string[];
  onChange: (value: string, isChecked: boolean) => void;
}

export function ActivityFilterRO({ activeActivities, onChange }: ActivityFilterROProps) {
  const { activities, loading, error } = useDynamicFilterData();

  const handleActivityClick = (activityId: string) => {
    const isCurrentlySelected = activeActivities.includes(activityId);
    console.log("ActivityFilter - Activity toggled:", activityId, "->", !isCurrentlySelected);
    onChange(activityId, !isCurrentlySelected);
  };

  if (loading) {
    return (
      <FilterItem title="ACTIVITĂȚI">
        <div className="text-sm text-fuchsia-300/70 px-3 py-2">Se încarcă activitățile...</div>
      </FilterItem>
    );
  }

  if (error || activities.length === 0) {
    return (
      <FilterItem title="ACTIVITĂȚI">
        <div className="text-sm text-fuchsia-300/70 px-3 py-2">Nu sunt activități disponibile</div>
      </FilterItem>
    );
  }

  return (
    <FilterItem title="ACTIVITĂȚI">
      {activities.map(activity => (
        <label key={activity.id} className="flex items-start mb-2 cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
          <input 
            type="checkbox" 
            checked={activeActivities.includes(activity.id)}
            onChange={() => handleActivityClick(activity.id)}
            className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm font-bold text-white flex-1">{activity.name}</span>
          <span className="text-xs text-fuchsia-300/70 ml-2">({activity.count})</span>
        </label>
      ))}
    </FilterItem>
  );
}
