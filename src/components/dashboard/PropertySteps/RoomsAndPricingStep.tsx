
import React, { useState } from "react";
import StayLengthSection from "./AccommodationTerms/StayLengthSection";
import MealPlanSection from "./rooms/MealPlanSection";
import RoomTypeSection from "./rooms/roomTypes/RoomTypeSection";

export default function RoomsAndPricingStep() {
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

  return (
    <div className="space-y-2">
      <div className="space-y-2">
        <StayLengthSection 
          isOpen={false}
          onOpenChange={() => {}}
          onValidationChange={(isValid) => handleValidationChange('stayLengths', isValid)}
          formData={{}}
          updateFormData={() => {}}
        />
        
        <MealPlanSection 
          onValidationChange={(isValid) => handleValidationChange('mealPlan', isValid)} 
          title="MEALS" 
        />
      </div>
      
      <RoomTypeSection 
        onValidationChange={() => {}} 
      />
    </div>
  );
}
