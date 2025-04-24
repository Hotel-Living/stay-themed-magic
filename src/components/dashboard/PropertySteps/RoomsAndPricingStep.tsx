
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
      {/* Main section with LENGTH OF STAY and MEALS */}
      <div className="mb-4">
        <h2 className="font-medium text-lg mb-2 text-white">LENGTH OF STAY – MEALS</h2>
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
