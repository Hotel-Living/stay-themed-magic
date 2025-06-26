
import { FilterItem } from "./FilterItem";

interface MealPlansFilterProps {
  selectedMealPlans: string[];
  onChange: (mealPlans: string[]) => void;
}

export function MealPlansFilter({ selectedMealPlans, onChange }: MealPlansFilterProps) {
  const mealPlans = [
    { value: "room-only", label: "Room Only" },
    { value: "bed-breakfast", label: "Bed & Breakfast" },
    { value: "half-board", label: "Half Board" },
    { value: "full-board", label: "Full Board" },
    { value: "all-inclusive", label: "All Inclusive" }
  ];

  const handleMealPlanClick = (mealPlanValue: string) => {
    const isSelected = selectedMealPlans.includes(mealPlanValue);
    let newMealPlans: string[];
    
    if (isSelected) {
      newMealPlans = selectedMealPlans.filter(plan => plan !== mealPlanValue);
    } else {
      newMealPlans = [...selectedMealPlans, mealPlanValue];
    }
    
    onChange(newMealPlans);
  };

  return (
    <FilterItem title="MEAL PLANS">
      {mealPlans.map(option => (
        <label key={option.value} className="flex items-start mb-2 cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
          <input 
            type="checkbox" 
            checked={selectedMealPlans.includes(option.value)}
            onChange={() => handleMealPlanClick(option.value)}
            className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm font-bold text-white">{option.label}</span>
        </label>
      ))}
    </FilterItem>
  );
}
