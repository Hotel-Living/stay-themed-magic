
import { FilterItem } from "./FilterItem";

interface ActivityFilterROProps {
  activeActivities: string[];
  onChange: (value: string, isChecked: boolean) => void;
}

export function ActivityFilterRO({ activeActivities, onChange }: ActivityFilterROProps) {
  const activities = [
    { value: "City Tours", label: "Tururi ale Orașului" },
    { value: "Cultural Experiences", label: "Experiențe Culturale" },
    { value: "Food & Drink", label: "Mâncare și Băutură" },
    { value: "Museums", label: "Muzee" },
    { value: "Nightlife", label: "Viața de Noapte" },
    { value: "Outdoor Activities", label: "Activități în Aer Liber" },
    { value: "Shopping", label: "Cumpărături" },
    { value: "Wellness", label: "Wellness" }
  ];

  const handleActivityClick = (activityValue: string) => {
    const isCurrentlySelected = activeActivities.includes(activityValue);
    console.log("ActivityFilter - Activity toggled:", activityValue, "->", !isCurrentlySelected);
    onChange(activityValue, !isCurrentlySelected);
  };

  return (
    <FilterItem title="ACTIVITĂȚI">
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
