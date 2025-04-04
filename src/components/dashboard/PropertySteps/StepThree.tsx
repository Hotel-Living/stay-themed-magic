
import React, { useState, useEffect } from "react";
import HotelFeaturesStep from "./HotelFeaturesStep";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CheckCircle, AlertCircle } from "lucide-react";

interface StepThreeProps {
  onValidationChange?: (isValid: boolean) => void;
}

export default function StepThree({
  onValidationChange = () => {}
}: StepThreeProps) {
  const [mealPlans, setMealPlans] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const mealPlanOptions = ["No Meals", "Only Breakfast", "Half Board", "Full Board", "All Inclusive", "All Inclusive plus Laundry"];

  // Check if all required fields are completed
  const checkValidation = () => {
    if (mealPlans.length === 0) {
      setError("Please select at least one meal plan");
      onValidationChange(false);
      return false;
    }
    setError("");
    onValidationChange(true);
    return true;
  };

  // Handle meal plan selection
  const handleMealPlanChange = (value: string) => {
    if (!mealPlans.includes(value)) {
      setMealPlans([value]);
    }

    // Check validation after change
    setTimeout(checkValidation, 100);
  };

  useEffect(() => {
    // Validate on mount and when fields change
    checkValidation();
  }, [mealPlans]);

  return (
    <div className="space-y-6">
      <HotelFeaturesStep />
      
      <div className="space-y-4 mt-8">
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">MEAL PLANS</h3>
          <p className="text-sm text-foreground/80 mb-4">
            Select which meal plans are available at your property.
          </p>
        </div>
        
        <div className="w-full">
          <Select onValueChange={handleMealPlanChange}>
            <SelectTrigger className="w-full bg-fuchsia-950/30 border border-fuchsia-800/30">
              <SelectValue placeholder="Choose meal plan" />
            </SelectTrigger>
            <SelectContent className="bg-[#860493] border border-fuchsia-800/30">
              {mealPlanOptions.map(plan => (
                <SelectItem key={plan} value={plan} className="text-white hover:bg-[#5A1876]/20">
                  {plan}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {error && (
            <div className="flex items-center gap-2 mt-2 text-red-400 text-xs">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}
          
          {mealPlans.length > 0 && (
            <div className="mt-4 p-4 bg-fuchsia-900/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <h4 className="font-medium">Selected Meal Plan</h4>
              </div>
              <div className="pl-7">
                <ul>
                  {mealPlans.map(plan => (
                    <li key={plan} className="text-sm">{plan}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
