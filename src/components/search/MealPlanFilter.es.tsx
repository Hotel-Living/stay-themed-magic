
import React from "react";
import { FilterItem } from "./FilterItem";

interface MealPlanFilterESProps {
  activeMealPlans: string[];
  onChange: (value: string, isChecked: boolean) => void;
}

export function MealPlanFilterES({ activeMealPlans, onChange }: MealPlanFilterESProps) {
  const mealPlanOptions = [
    { value: "breakfast", label: "Desayuno" },
    { value: "halfBoard", label: "Media Pensión" },
    { value: "fullBoard", label: "Pensión Completa" },
    { value: "allInclusive", label: "Todo Incluido" },
    { value: "laundryIncluded", label: "Lavandería Incluída" }
  ];

  // Handle single selection logic - only one meal plan can be selected at a time
  const handleMealPlanClick = (planValue: string) => {
    const isCurrentlySelected = activeMealPlans.includes(planValue);
    if (isCurrentlySelected) {
      // Deselect - remove from array
      onChange(planValue, false);
    } else {
      // Select - first clear all others, then add this one (single selection)
      activeMealPlans.forEach(plan => onChange(plan, false));
      onChange(planValue, true);
    }
  };

  return (
    <FilterItem title="PLANES DE COMIDAS">
      {mealPlanOptions.map(option => (
        <label key={option.value} className="flex items-start cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
          <input 
            type="checkbox" 
            checked={activeMealPlans.includes(option.value)}
            onChange={() => handleMealPlanClick(option.value)}
            className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm text-white">{option.label}</span>
        </label>
      ))}
    </FilterItem>
  );
}
