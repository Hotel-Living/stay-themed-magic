
import React, { useState, useEffect } from "react";
import LengthOfStaySection from "./rooms/LengthOfStaySection";
import MealPlanSection from "./rooms/MealPlanSection";
import RoomTypeSection from "./rooms/roomTypes/RoomTypeSection";

interface RoomsAndPricingStepProps {
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
}

export default function RoomsAndPricingStep({
  formData = {},
  updateFormData = () => {}
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

  // Handle stay length selection
  const handleStayLengthsChange = (stayLengths: number[]) => {
    if (updateFormData) {
      console.log("Updating stay lengths:", stayLengths);
      updateFormData('stayLengths', stayLengths);
    }
  };

  // Handle meal plan selection
  const handleMealPlansChange = (mealPlans: string[]) => {
    if (updateFormData) {
      console.log("Updating meal plans:", mealPlans);
      updateFormData('mealPlans', mealPlans);
    }
  };

  return (
    <div className="space-y-6">
      {/* Main section with LENGTH OF STAY and MEALS & SERVICES */}
      <div className="mb-8">
        <h2 className="font-medium text-lg mb-4">LENGTH OF STAY – MEALS & SERVICES</h2>
        <div className="space-y-6 pl-2">
          <LengthOfStaySection 
            onValidationChange={(isValid) => handleValidationChange('stayLengths', isValid)} 
            title="LENGTH OF STAY"
            initialStayLengths={formData.stayLengths || []}
            onStayLengthsChange={handleStayLengthsChange}
          />
          
          <MealPlanSection 
            onValidationChange={(isValid) => handleValidationChange('mealPlan', isValid)} 
            title="MEALS & SERVICES"
            initialMealPlans={formData.mealPlans || []}
            onMealPlansChange={handleMealPlansChange}
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
