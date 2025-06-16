
import React, { useState, useEffect } from "react";
import StayLengthSection from "./AccommodationTerms/StayLengthSection";
import MealPlanSection from "./rooms/MealPlanSection";
import RoomTypeSection from "./rooms/roomTypes/RoomTypeSection";
import { buildPricingMatrix } from "@/utils/buildPricingMatrix";

export default function RoomsAndPricingStep() {
  const [validations, setValidations] = useState({
    stayLengths: false,
    mealPlan: false
  });

  const [formData, setFormData] = useState({
    roomTypes: [],
    stayLengths: [],
    mealPlans: [],
    pricingMatrix: []
  });

  const handleValidationChange = (section: keyof typeof validations, isValid: boolean) => {
    setValidations(prev => ({
      ...prev,
      [section]: isValid
    }));
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Build pricing matrix whenever the form data changes
  useEffect(() => {
    if (formData.roomTypes.length > 0 && formData.stayLengths.length > 0 && formData.mealPlans.length > 0) {
      const pricingMatrix = buildPricingMatrix({
        roomTypes: formData.roomTypes,
        stayLengths: formData.stayLengths,
        mealPlans: formData.mealPlans
      });

      updateFormData("pricingMatrix", pricingMatrix);
      console.log("Generated pricing matrix:", pricingMatrix);
    }
  }, [formData.roomTypes, formData.stayLengths, formData.mealPlans]);

  return (
    <div className="space-y-2">
      <div className="space-y-2">
        <StayLengthSection 
          isOpen={false}
          onOpenChange={() => {}}
          onValidationChange={(isValid) => handleValidationChange('stayLengths', isValid)}
          formData={formData}
          updateFormData={updateFormData}
        />
        
        <MealPlanSection 
          onValidationChange={(isValid) => handleValidationChange('mealPlan', isValid)} 
          title="MEALS"
          formData={formData}
          updateFormData={updateFormData}
        />
      </div>
      
      <RoomTypeSection 
        onValidationChange={() => {}}
        formData={formData}
        updateFormData={updateFormData}
      />
    </div>
  );
}
