
import React, { useState, useEffect } from "react";

interface MealPlanSectionProps {
  onValidationChange?: (isValid: boolean) => void;
  title: string;
  initialMealPlans?: string[];
  onMealPlansChange?: (mealPlans: string[]) => void;
}

export default function MealPlanSection({ 
  onValidationChange = () => {},
  title,
  initialMealPlans = [],
  onMealPlansChange = () => {}
}: MealPlanSectionProps) {
  const [selectedMealPlans, setSelectedMealPlans] = useState<string[]>(initialMealPlans);

  const handleMealPlanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    
    let newMealPlans: string[];
    if (isChecked) {
      newMealPlans = [...selectedMealPlans, value];
    } else {
      newMealPlans = selectedMealPlans.filter(plan => plan !== value);
    }
    
    setSelectedMealPlans(newMealPlans);
    onMealPlansChange(newMealPlans);
  };

  useEffect(() => {
    // Update validation state
    onValidationChange(selectedMealPlans.length > 0);
    
    // Notify parent of changes
    onMealPlansChange(selectedMealPlans);
  }, [selectedMealPlans]);

  // Load initial values
  useEffect(() => {
    if (initialMealPlans && initialMealPlans.length > 0) {
      console.log("Setting initial meal plans:", initialMealPlans);
      setSelectedMealPlans(initialMealPlans);
    }
  }, [initialMealPlans]);

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold uppercase">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {[
          { id: 'breakfast', label: 'Breakfast' },
          { id: 'halfBoard', label: 'Half Board' },
          { id: 'fullBoard', label: 'Full Board' },
          { id: 'allInclusive', label: 'All Inclusive' },
          { id: 'roomOnly', label: 'Room Only' }
        ].map(mealPlan => (
          <label key={mealPlan.id} className="flex items-center space-x-2 bg-fuchsia-950/30 px-3 py-2 rounded-md">
            <input
              type="checkbox"
              value={mealPlan.id}
              checked={selectedMealPlans.includes(mealPlan.id)}
              onChange={handleMealPlanChange}
              className="rounded border-fuchsia-500 text-fuchsia-600 focus:ring-fuchsia-500"
            />
            <span className="text-sm">{mealPlan.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
