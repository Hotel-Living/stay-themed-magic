
import React, { useState, useEffect } from "react";
import StayLengthMealsSection from "./StayLengthMealsSection";
import RoomsRatesSection from "./RoomsRatesSection";
import ValidationMessages from "./ValidationMessages";

interface AccommodationTermsStepProps {
  onValidationChange: (isValid: boolean, data?: any) => void;
  initialData?: any;
}

export default function AccommodationTermsStep({
  onValidationChange,
  initialData
}: AccommodationTermsStepProps) {
  const [stayLengthSectionOpen, setStayLengthSectionOpen] = useState(true);
  const [roomsSectionOpen, setRoomsSectionOpen] = useState(false);
  const [error, setError] = useState<string>("");
  const [showErrors, setShowErrors] = useState(false);
  
  const [stayLengthValid, setStayLengthValid] = useState(false);
  const [mealPlanValid, setMealPlanValid] = useState(false);
  const [roomsValid, setRoomsValid] = useState(false);
  
  // Data state
  const [stayLengths, setStayLengths] = useState<number[]>(initialData?.stayLengths || []);
  const [mealPlans, setMealPlans] = useState<string[]>(initialData?.mealPlans || []);
  const [roomTypes, setRoomTypes] = useState(initialData?.roomTypes || []);
  
  // Handle stay length section validation
  const handleStayLengthValid = (isValid: boolean) => {
    setStayLengthValid(isValid);
  };

  // Handle meal plan section validation
  const handleMealPlanValid = (isValid: boolean) => {
    setMealPlanValid(isValid);
  };
  
  // Handle rooms section validation
  const handleRoomsValid = (isValid: boolean, roomTypeData: any[]) => {
    setRoomsValid(isValid);
    if (roomTypeData) {
      setRoomTypes(roomTypeData);
    }
  };
  
  // Update validations and data when any section changes
  useEffect(() => {
    // Check if we have valid stay lengths and meal plans
    const valid = stayLengthValid && mealPlanValid && roomsValid;
    
    // Show validation error message if not valid
    if (!valid) {
      if (!stayLengthValid) {
        setError("Please select at least one length of stay");
      } else if (!mealPlanValid) {
        setError("Please select at least one meal plan");
      } else {
        setError("Please add at least one room type");
      }
      setShowErrors(true);
    } else {
      setError("");
      setShowErrors(false);
    }
    
    // Pass data back to parent component
    onValidationChange(valid, {
      stayLengths,
      mealPlans,
      roomTypes
    });
  }, [stayLengthValid, mealPlanValid, roomsValid, stayLengths, mealPlans, roomTypes]);
  
  // When stay length or meal plan data changes, update state
  const handleStayLengthsUpdate = (lengths: number[]) => {
    setStayLengths(lengths);
  };
  
  const handleMealPlansUpdate = (plans: string[]) => {
    setMealPlans(plans);
  };
  
  return (
    <div className="space-y-6 mb-6">
      <StayLengthMealsSection 
        isOpen={stayLengthSectionOpen}
        onOpenChange={setStayLengthSectionOpen}
        onStayLengthValidChange={handleStayLengthValid}
        onMealPlanValidChange={handleMealPlanValid}
      />
      
      <RoomsRatesSection 
        isOpen={roomsSectionOpen}
        onOpenChange={setRoomsSectionOpen}
        onValidationChange={handleRoomsValid}
        initialData={{
          stayLengths,
          roomTypes
        }}
        onStayLengthsChange={handleStayLengthsUpdate}
        onMealPlansChange={handleMealPlansUpdate}
      />
      
      <ValidationMessages 
        error={error}
        showErrors={showErrors}
        isValid={stayLengthValid && mealPlanValid && roomsValid}
      />
    </div>
  );
}
