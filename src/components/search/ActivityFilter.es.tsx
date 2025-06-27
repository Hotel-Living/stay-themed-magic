
import { FilterItem } from "./FilterItem";

interface ActivityFilterESProps {
  activeActivities: string[];
  onChange: (value: string, isChecked: boolean) => void;
}

export function ActivityFilterES({ activeActivities, onChange }: ActivityFilterESProps) {
  const activities = [
    { value: "City Tours", label: "Tours de Ciudad" },
    { value: "Cultural Experiences", label: "Experiencias Culturales" },
    { value: "Food & Drink", label: "Comida y Bebida" },
    { value: "Museums", label: "Museos" },
    { value: "Nightlife", label: "Vida Nocturna" },
    { value: "Outdoor Activities", label: "Actividades al Aire Libre" },
    { value: "Shopping", label: "Compras" },
    { value: "Wellness", label: "Bienestar" }
  ];

  const handleActivityClick = (activityValue: string) => {
    const isCurrentlySelected = activeActivities.includes(activityValue);
    console.log("ActivityFilter - Activity toggled:", activityValue, "->", !isCurrentlySelected);
    onChange(activityValue, !isCurrentlySelected);
  };

  return (
    <FilterItem title="ACTIVIDADES">
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
