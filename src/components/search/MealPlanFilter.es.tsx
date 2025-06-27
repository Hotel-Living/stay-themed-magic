
import { FilterItem } from "./FilterItem";

interface MealPlanFilterESProps {
  activeMealPlan: string | null;
  onChange: (value: string | null) => void;
}

export function MealPlanFilterES({ activeMealPlan, onChange }: MealPlanFilterESProps) {
  const mealPlans = [
    { value: "breakfast", label: "Solo Desayuno" },
    { value: "half_board", label: "Media Pensión" },
    { value: "full_board", label: "Pensión Completa" },
    { value: "all_inclusive", label: "Todo Incluido" },
    { value: "no_meals", label: "Sin Comidas" }
  ];

  const handleMealPlanClick = (planValue: string) => {
    const newValue = activeMealPlan === planValue ? null : planValue;
    console.log("MealPlanFilter - Plan toggled:", planValue, "->", newValue);
    onChange(newValue);
  };

  return (
    <FilterItem title="PLAN DE COMIDAS">
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
