
import { FilterItem } from "./FilterItem";

interface MealPlanFilterROProps {
  activeMealPlan: string | null;
  onChange: (value: string | null) => void;
}

export function MealPlanFilterRO({ activeMealPlan, onChange }: MealPlanFilterROProps) {
  const mealPlans = [
    { value: "breakfast", label: "Doar Mic Dejun" },
    { value: "half_board", label: "Demipensiune" },
    { value: "full_board", label: "Pensiune Completă" },
    { value: "all_inclusive", label: "All Inclusive" },
    { value: "no_meals", label: "Fără Mese" }
  ];

  const handleMealPlanClick = (planValue: string) => {
    const newValue = activeMealPlan === planValue ? null : planValue;
    console.log("MealPlanFilter - Plan toggled:", planValue, "->", newValue);
    onChange(newValue);
  };

  return (
    <FilterItem title="PLAN DE MESE">
      {mealPlans.map(plan => (
        <label key={plan.value} className="flex items-start mb-2 cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
          <input 
            type="checkbox" 
            checked={activeMealPlan === plan.value}
            onChange={() => handleMealPlanClick(plan.value)}
            className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm font-bold text-white">{plan.label}</span>
        </label>
      ))}
    </FilterItem>
  );
}
