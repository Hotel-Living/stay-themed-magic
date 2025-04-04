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
          
          
        </div>
        
        
      </div>
    </div>;
}