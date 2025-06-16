import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MealPlanSectionProps {
  isOpen?: boolean;
  onOpenChange?: () => void;
  onValidationChange: (isValid: boolean) => void;
  title?: string;
  showHeader?: boolean;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
}

export default function MealPlanSection({ 
  isOpen = false,
  onOpenChange = () => {},
  onValidationChange,
  title = "MEALS",
  showHeader = true,
  formData = {},
  updateFormData = () => {}
}: MealPlanSectionProps) {
  // Updated meal plans to match the public filter options exactly
  const mealPlans = [
    "Breakfast Included", 
    "Half Board", 
    "Full Board", 
    "All Inclusive", 
    "Laundry", 
    "External Laundry Service Available"
  ];
  
  // Initialize from formData if available
  const initialMealPlan = formData.mealPlans && formData.mealPlans.length > 0 
    ? formData.mealPlans[0] 
    : "";
    
  const [selectedMealPlan, setSelectedMealPlan] = useState(initialMealPlan);
  const [mealPlanValid, setMealPlanValid] = useState(initialMealPlan !== "");
  const [touched, setTouched] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  // Initialize from form data when component mounts or form data changes
  useEffect(() => {
    if (formData.mealPlans && formData.mealPlans.length > 0) {
      const mealPlan = formData.mealPlans[0];
      setSelectedMealPlan(mealPlan);
      setMealPlanValid(true);
      onValidationChange(true);
    }
  }, [formData]);

  const handleMealPlanChange = (plan: string) => {
    setSelectedMealPlan(plan);
    setMealPlanValid(true);
    setTouched(true);
    
    // Update parent form data
    if (updateFormData) {
      updateFormData('mealPlans', [plan]);
    }
    
    onValidationChange(true);
  };

  // This useEffect will run when selectedMealPlan changes
  useEffect(() => {
    if (selectedMealPlan) {
      setMealPlanValid(true);
      onValidationChange(true);
    } else {
      setMealPlanValid(false);
      onValidationChange(false);
    }
  }, [selectedMealPlan, onValidationChange]);

  const handleOpenStateChange = (open: boolean) => {
    setTouched(true);
    if (!open && touched && !mealPlanValid) {
      setShowErrors(true);
    }
  };

  const mealPlanContent = (
    <div className="mt-2">
      <div>
        <Select 
          value={selectedMealPlan}
          onValueChange={handleMealPlanChange} 
          onOpenChange={handleOpenStateChange}
        >
          <SelectTrigger className="w-full bg-fuchsia-950/30 border border-fuchsia-800/30">
            <SelectValue placeholder="Select a meal plan" />
          </SelectTrigger>
          <SelectContent className="bg-[#860493] border border-fuchsia-800/30">
            {mealPlans.map((plan) => (
              <SelectItem key={plan} value={plan} className="text-white hover:bg-[#860493] focus:bg-[#860493] data-[state=checked]:bg-[#860493] focus:text-white">
                {plan}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {touched && !mealPlanValid && showErrors && (
          <p className="text-white text-xs mt-1">Please select a meal plan</p>
        )}
      </div>
    </div>
  );

  if (!showHeader) {
    return mealPlanContent;
  }

  return (
    <Collapsible className="w-full border border-fuchsia-800/30 rounded-lg overflow-hidden bg-fuchsia-900/10" defaultOpen={false}>
      <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 text-left bg-fuchsia-900/20">
        <label className="text-base font-medium text-white uppercase">
          {title}
        </label>
        <ChevronDown className="h-4 w-4 text-white" />
      </CollapsibleTrigger>
      <CollapsibleContent className="p-3">
        {mealPlanContent}
      </CollapsibleContent>
    </Collapsible>
  );
}
