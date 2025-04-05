
import React, { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MealPlanSectionProps {
  onValidationChange: (isValid: boolean) => void;
  title?: string;
  showHeader?: boolean;
}

export default function MealPlanSection({ 
  onValidationChange,
  title = "MEALS",
  showHeader = true
}: MealPlanSectionProps) {
  const mealPlans = ["No Meals", "Breakfast only", "Half board", "Full board", "All inclusive", "All inclusive plus Laundry"];
  const [selectedMealPlan, setSelectedMealPlan] = useState("");
  const [mealPlanValid, setMealPlanValid] = useState(false);
  const [touched, setTouched] = useState(false);

  const handleMealPlanChange = (plan: string) => {
    setSelectedMealPlan(plan);
    setMealPlanValid(true);
    setTouched(true);
    onValidationChange(true);
  };

  const mealPlanContent = (
    <div className="grid grid-cols-1 gap-4 mt-2">
      <div>
        <Select onValueChange={handleMealPlanChange} onOpenChange={() => setTouched(true)}>
          <SelectTrigger className="w-full bg-fuchsia-950/30 border border-fuchsia-800/30">
            <SelectValue placeholder="Select a meal plan" />
          </SelectTrigger>
          <SelectContent className="bg-[#860493] border border-fuchsia-800/30">
            {mealPlans.map((plan) => (
              <SelectItem key={plan} value={plan} className="text-white hover:bg-[#5A1876]/20">
                {plan}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {touched && !mealPlanValid && (
          <p className="text-red-400 text-xs mt-1">Please select a meal plan</p>
        )}
      </div>
    </div>
  );

  if (!showHeader) {
    return mealPlanContent;
  }

  return (
    <Collapsible className="w-full">
      <CollapsibleTrigger className="flex items-center justify-between w-full text-left mb-2">
        <label className="block text-sm font-medium text-foreground/90 uppercase">
          {title}
        </label>
        <ChevronRight className="h-4 w-4" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        {mealPlanContent}
      </CollapsibleContent>
    </Collapsible>
  );
}
