
import React, { useState, useEffect } from "react";
import LengthOfStaySection from "./rooms/LengthOfStaySection";
import MealPlanSection from "./rooms/MealPlanSection";
import PreferredWeekdaySection from "./rooms/PreferredWeekdaySection";
import CheckInOutSection from "./rooms/CheckInOutSection";
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
      <div>
        <LengthOfStaySection 
          onValidationChange={(isValid) => handleValidationChange('stayLengths', isValid)} 
        />
      </div>
      
      <div>
        <MealPlanSection 
          onValidationChange={(isValid) => handleValidationChange('mealPlan', isValid)} 
        />
      </div>
      
      <div>
        <PreferredWeekdaySection />
      </div>
      
      <div>
        <CheckInOutSection />
      </div>
      
      <div>
        <RoomTypeSection 
          onValidationChange={() => {}} 
        />
      </div>
    </div>
  );
}
