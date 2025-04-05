
import React, { useState, useEffect } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import LengthOfStaySection from "./rooms/LengthOfStaySection";
import MealPlanSection from "./rooms/MealPlanSection";
import RoomTypeSection from "./rooms/RoomTypeSection";

interface StepThreeProps {
  onValidationChange?: (isValid: boolean) => void;
}

export default function StepThree({
  onValidationChange = () => {}
}: StepThreeProps) {
  const [mealPlans, setMealPlans] = useState<string[]>([]);
  const [stayLengthValid, setStayLengthValid] = useState(false);
  const [mealPlanValid, setMealPlanValid] = useState(false);
  const [error, setError] = useState<string>("");
  
  // Check if all required fields are completed
  const checkValidation = () => {
    if (mealPlans.length === 0) {
      setError("Please select at least one meal plan");
      onValidationChange(false);
      return false;
    }
    
    if (!stayLengthValid) {
      setError("Please select at least one stay length");
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
  }, [mealPlans, stayLengthValid, mealPlanValid]);
  
  return (
    <div className="space-y-6">
      {/* Length of Stay Section with updated title */}
      <div className="mb-6">
        <LengthOfStaySection 
          onValidationChange={(isValid) => {
            setStayLengthValid(isValid);
            checkValidation();
          }} 
          title="LENGTH OF STAY - MEALS & SERVICES"
        />
      </div>
      
      {/* Meal Plans Section with updated title */}
      <div className="mb-6">
        <MealPlanSection 
          onValidationChange={(isValid) => {
            setMealPlanValid(isValid);
            checkValidation();
          }}
          title="MEALS & SERVICES" 
        />
      </div>
      
      {/* Room Types Section with updated title */}
      <div>
        <RoomTypeSection 
          onValidationChange={(isValid) => {
            checkValidation();
          }}
          title="ROOMS & RATES"
        />
      </div>
      
      {/* Validation Messages */}
      {error && 
        <div className="p-3 rounded-md text-red-200 flex items-center gap-2 bg-[#540ea9]/20">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      }
      
      {mealPlans.length > 0 && stayLengthValid && !error && 
        <div className="p-3 rounded-md bg-green-500/20 text-green-200 flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          <span>All required information has been provided</span>
        </div>
      }
    </div>
  );
}
