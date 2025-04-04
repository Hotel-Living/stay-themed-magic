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
          <h3 className="font-normal text-base">MEAL PLANS</h3>
          <p className="text-sm text-muted-foreground">Select the meal plans you offer at your property.</p>
        </div>
        
        <div className="grid gap-4">
          <div>
            <Label htmlFor="mealPlan">Meal Plan <span className="text-red-500">*</span></Label>
            <Select onValueChange={handleMealPlanChange} value={mealPlans[0]}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a meal plan" />
              </SelectTrigger>
              <SelectContent className="bg-[#860493] border border-fuchsia-800/30">
                {mealPlanOptions.map(plan => <SelectItem key={plan} value={plan} className="text-white hover:bg-[#5A1876]/20">
                    {plan}
                  </SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          
          {error && <div className="p-3 rounded-md bg-red-50 text-red-700 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              <span>{error}</span>
            </div>}
          
          {mealPlans.length > 0 && !error && <div className="p-3 rounded-md bg-green-50 text-green-700 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>Meal plan selected successfully</span>
            </div>}
        </div>
      </div>
    </div>;
}