
import { FilterItem } from "./FilterItem";

interface ActivityFilterPTProps {
  activeActivities: string[];
  onChange: (value: string, isChecked: boolean) => void;
}

export function ActivityFilterPT({ activeActivities, onChange }: ActivityFilterPTProps) {
  const activities = [
    { value: "City Tours", label: "Tours da Cidade" },
    { value: "Cultural Experiences", label: "Experiências Culturais" },
    { value: "Food & Drink", label: "Comida e Bebida" },
    { value: "Museums", label: "Museus" },
    { value: "Nightlife", label: "Vida Noturna" },
    { value: "Outdoor Activities", label: "Atividades ao Ar Livre" },
    { value: "Shopping", label: "Compras" },
    { value: "Wellness", label: "Bem-estar" }
  ];

  const handleActivityClick = (activityValue: string) => {
    const isCurrentlySelected = activeActivities.includes(activityValue);
    console.log("ActivityFilter - Activity toggled:", activityValue, "->", !isCurrentlySelected);
    onChange(activityValue, !isCurrentlySelected);
  };

  return (
    <FilterItem title="ATIVIDADES">
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
