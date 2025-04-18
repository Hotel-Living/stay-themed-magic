import React, { useState, useEffect } from "react";
import LengthOfStaySection from "./rooms/LengthOfStaySection";
import MealPlanSection from "./rooms/MealPlanSection";
import { RoomTypeSection } from "./rooms/roomTypes/RoomTypeSection";

interface RoomsAndPricingStepProps {
  onStayLengthsChange?: (lengths: number[]) => void;
  onMealPlansChange?: (plans: string[]) => void;
}

export default function RoomsAndPricingStep({
  onStayLengthsChange = () => {},
  onMealPlansChange = () => {}
}: RoomsAndPricingStepProps) {
  const [validations, setValidations] = useState({
    stayLengths: false,
    mealPlan: false
  });

  const handleValidationChange = (section: keyof typeof validations, isValid: boolean) => {
    setValidations(prev => ({
      ...prev,
      [section]: isValid
    }));
  };

  // Handler for length of stay updates
  const handleStayLengthsUpdate = (isValid: boolean, lengths?: number[]) => {
    handleValidationChange('stayLengths', isValid);
    if (lengths && lengths.length > 0) {
      onStayLengthsChange(lengths);
    }
  };

  // Handler for meal plan updates
  const handleMealPlansUpdate = (isValid: boolean, plans?: string[]) => {
    handleValidationChange('mealPlan', isValid);
    if (plans && plans.length > 0) {
      onMealPlansChange(plans);
    }
  };

  return (
    <div className="space-y-6">
      {/* Main section with LENGTH OF STAY and MEALS & SERVICES */}
      <div className="mb-8">
        <h2 className="font-medium text-lg mb-4">LENGTH OF STAY – MEALS & SERVICES</h2>
        <div className="space-y-6 pl-2">
          <LengthOfStaySection 
            onValidationChange={(isValid, data) => handleStayLengthsUpdate(isValid, data?.selectedLengths)} 
            title="LENGTH OF STAY"
          />
          
          <MealPlanSection 
            onValidationChange={(isValid, mealPlan) => handleMealPlansUpdate(isValid, mealPlan ? [mealPlan] : [])} 
            title="MEALS & SERVICES" 
          />
        </div>
      </div>
      
      {/* Room Type Section */}
      <div>
        <RoomTypeSection 
          onValidationChange={() => {}} 
        />
      </div>
    </div>
  );
}
