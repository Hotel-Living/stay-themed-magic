
import React, { useState } from "react";
import StayLengthSection from "./AccommodationTerms/StayLengthSection";
import MealPlanSection from "./rooms/MealPlanSection";
import RoomTypeSection from "./rooms/roomTypes/RoomTypeSection";

export default function RoomsAndPricingStep() {
  const [validations, setValidations] = useState({
    stayLengths: false,
    mealPlan: false
  });

  const [isStayLengthOpen, setIsStayLengthOpen] = useState(false);

  const handleValidationChange = (section: keyof typeof validations, isValid: boolean) => {
    setValidations(prev => ({
      ...prev,
      [section]: isValid
    }));
  };

  return (
    <div className="space-y-4">
      {/* Main section with LENGTH OF STAY and MEALS */}
      <div className="mb-6">
        <h2 className="font-medium text-lg mb-3">LENGTH OF STAY – MEALS</h2>
        <div className="space-y-4 pl-2">
          <StayLengthSection 
            isOpen={isStayLengthOpen}
            onOpenChange={setIsStayLengthOpen}
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
