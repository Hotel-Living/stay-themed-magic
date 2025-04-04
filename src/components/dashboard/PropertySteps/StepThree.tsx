
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
      
      {/* Removed the white box with meal options */}
      
      {error ? <div className="p-3 rounded-md text-red-200 flex items-center gap-2 bg-[#540ea9]/20">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div> : mealPlans.length > 0 ? <div className="p-3 rounded-md bg-green-500/20 text-green-200 flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          <span>Meal plan selected: {mealPlans.join(', ')}</span>
        </div> : null}
    </div>;
}
