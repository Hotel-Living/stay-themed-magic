
import React, { useState, useEffect } from "react";
import LengthOfStaySection from "./rooms/LengthOfStaySection";
import MealPlanSection from "./rooms/MealPlanSection";
import RoomTypeSection from "./rooms/RoomTypeSection";

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
    <div className="space-y-6">
      {/* Main section with LENGTH OF STAY and MEALS & SERVICES */}
      <div className="mb-8">
        <h2 className="font-medium text-lg mb-4">LENGTH OF STAY – MEALS & SERVICES</h2>
        <div className="space-y-6 pl-2">
          <LengthOfStaySection 
            onValidationChange={(isValid) => handleValidationChange('stayLengths', isValid)} 
            title="LENGTH OF STAY"
          />
          
          <MealPlanSection 
            onValidationChange={(isValid) => handleValidationChange('mealPlan', isValid)} 
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
