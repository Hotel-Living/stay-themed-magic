
import { FilterItem } from "./FilterItem";

interface ActivityFilterENProps {
  activeActivities: string[];
  onChange: (value: string, isChecked: boolean) => void;
}

export function ActivityFilterEN({ activeActivities, onChange }: ActivityFilterENProps) {
  const activities = [
    { value: "City Tours", label: "City Tours" },
    { value: "Cultural Experiences", label: "Cultural Experiences" },
    { value: "Food & Drink", label: "Food & Drink" },
    { value: "Museums", label: "Museums" },
    { value: "Nightlife", label: "Nightlife" },
    { value: "Outdoor Activities", label: "Outdoor Activities" },
    { value: "Shopping", label: "Shopping" },
    { value: "Wellness", label: "Wellness" }
  ];

  const handleActivityClick = (activityValue: string) => {
    const isCurrentlySelected = activeActivities.includes(activityValue);
    console.log("ActivityFilter - Activity toggled:", activityValue, "->", !isCurrentlySelected);
    onChange(activityValue, !isCurrentlySelected);
  };

  return (
    <FilterItem title="ACTIVITIES">
      {activities.map(activity => (
        <label key={activity.value} className="flex items-start mb-2 cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
          <input 
            type="checkbox" 
            checked={activeActivities.includes(activity.value)}
            onChange={() => handleActivityClick(activity.value)}
            className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm font-bold text-white">{activity.label}</span>
        </label>
      ))}
    </FilterItem>
  );
}
