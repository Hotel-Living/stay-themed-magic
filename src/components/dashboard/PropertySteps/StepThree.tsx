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
  return <div className="space-y-6">
      <HotelFeaturesStep />
      
      <div className="space-y-4 mt-8">
        <div className="mb-4">
          
          
          <Select onValueChange={handleMealPlanChange}>
            <SelectTrigger id="meal-plan" className="w-full">
              <SelectValue placeholder="Select a meal plan" />
            </SelectTrigger>
            <SelectContent>
              {mealPlanOptions.map(option => <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        
        {error ? <div className="p-3 rounded-md bg-red-500/20 text-red-200 flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            
          </div> : mealPlans.length > 0 ? <div className="p-3 rounded-md bg-green-500/20 text-green-200 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            <span>Meal plan selected: {mealPlans.join(', ')}</span>
          </div> : null}
      </div>
    </div>;
}