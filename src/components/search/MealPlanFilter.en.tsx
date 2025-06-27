
import { FilterItem } from "./FilterItem";

interface MealPlanFilterENProps {
  activeMealPlan: string | null;
  onChange: (value: string | null) => void;
}

export function MealPlanFilterEN({ activeMealPlan, onChange }: MealPlanFilterENProps) {
  const mealPlans = [
    { value: "breakfast", label: "Breakfast Only" },
    { value: "half_board", label: "Half Board" },
    { value: "full_board", label: "Full Board" },
    { value: "all_inclusive", label: "All Inclusive" },
    { value: "no_meals", label: "No Meals" }
  ];

  const handleMealPlanClick = (planValue: string) => {
    const newValue = activeMealPlan === planValue ? null : planValue;
    console.log("MealPlanFilter - Plan toggled:", planValue, "->", newValue);
    onChange(newValue);
  };

  return (
    <FilterItem title="MEAL PLAN">
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
