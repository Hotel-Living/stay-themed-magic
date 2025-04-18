
import React from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { saveSelectedStayLengths } from "@/utils/stayLengthsContext";

interface StayLengthMealsSectionProps {
  stayLengths: number[];
  setStayLengths: (value: number[]) => void;
  mealPlans: string[];
  setMealPlans: (value: string[]) => void;
}

export default function StayLengthMealsSection({
  stayLengths,
  setStayLengths,
  mealPlans,
  setMealPlans
}: StayLengthMealsSectionProps) {
  const handleStayLengthChange = (length: number) => {
    let updatedLengths: number[];
    
    if (stayLengths.includes(length)) {
      updatedLengths = stayLengths.filter(l => l !== length);
    } else {
      updatedLengths = [...stayLengths, length];
    }
    
    setStayLengths(updatedLengths);
    saveSelectedStayLengths(updatedLengths);
  };

  const handleMealPlanChange = (plan: string) => {
    if (mealPlans.includes(plan)) {
      setMealPlans(mealPlans.filter(p => p !== plan));
    } else {
      setMealPlans([...mealPlans, plan]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Stay Length Options */}
      <div>
        <Label htmlFor="stay-lengths" className="text-lg font-medium text-white mb-4 block">
          Available Stay Lengths (months) <span className="text-red-400">*</span>
        </Label>
        <div className="flex flex-wrap gap-4" id="stay-lengths">
          {[1, 2, 3, 4, 6, 8, 12, 16, 24, 32].map(length => (
            <div key={length} className="flex items-center gap-2">
              <Checkbox 
                id={`length-${length}`} 
                checked={stayLengths.includes(length)}
                onCheckedChange={() => handleStayLengthChange(length)}
                className="data-[state=checked]:bg-fuchsia-500 data-[state=checked]:border-fuchsia-500"
              />
              <Label 
                htmlFor={`length-${length}`} 
                className="text-white cursor-pointer"
              >
                {length} month{length !== 1 ? 's' : ''}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Meal Plan Options */}
      <div>
        <Label htmlFor="meal-plans" className="text-lg font-medium text-white mb-4 block">
          Available Meal Plans <span className="text-red-400">*</span>
        </Label>
        <div className="flex flex-wrap gap-4" id="meal-plans">
          {['No Meals', 'Breakfast Only', 'Half Board', 'Full Board', 'All Inclusive'].map(plan => (
            <div key={plan} className="flex items-center gap-2">
              <Checkbox 
                id={`plan-${plan}`} 
                checked={mealPlans.includes(plan)}
                onCheckedChange={() => handleMealPlanChange(plan)}
                className="data-[state=checked]:bg-fuchsia-500 data-[state=checked]:border-fuchsia-500"
              />
              <Label 
                htmlFor={`plan-${plan}`} 
                className="text-white cursor-pointer"
              >
                {plan}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
