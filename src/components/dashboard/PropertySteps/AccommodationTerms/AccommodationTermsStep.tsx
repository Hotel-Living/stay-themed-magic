
import React, { useState } from "react";
import StayLengthSection from "./StayLengthSection";
import MealPlanSection from "./MealPlanSection";
import RoomsRatesSection from "./RoomsRatesSection";
import PreferredWeekdaySection from "./PreferredWeekdaySection";
import ValidationMessages from "./ValidationMessages";

interface AccommodationTermsStepProps {
  onValidationChange?: (isValid: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
}

export default function AccommodationTermsStep({
  onValidationChange = () => {},
  formData = {},
  updateFormData = () => {}
}: AccommodationTermsStepProps) {
  const [hasStayLengths, setHasStayLengths] = useState(
    formData.stayLengths && formData.stayLengths.length > 0
  );
  
  const [hasMealPlans, setHasMealPlans] = useState(
    formData.mealPlans && formData.mealPlans.length > 0
  );
  
  const [hasRoomTypes, setHasRoomTypes] = useState(
    formData.roomTypes && formData.roomTypes.length > 0
  );

  // Update validation state when any of the flags change
  React.useEffect(() => {
    const isValid = hasStayLengths && hasMealPlans && hasRoomTypes;
    onValidationChange(isValid);
  }, [hasStayLengths, hasMealPlans, hasRoomTypes, onValidationChange]);

  return (
    <div className="space-y-4 max-w-[80%]">
      <ValidationMessages 
        hasStayLengths={hasStayLengths}
        hasMealPlans={hasMealPlans}
        hasRoomTypes={hasRoomTypes}
      />
      
      <div className="space-y-4">
        <StayLengthSection 
          onValidityChange={setHasStayLengths} 
          formData={formData}
          updateFormData={updateFormData}
        />
        
        <MealPlanSection 
          onValidityChange={setHasMealPlans} 
          formData={formData}
          updateFormData={updateFormData}
        />
      </div>
      
      <div className="space-y-4">
        <PreferredWeekdaySection 
          formData={formData}
          updateFormData={updateFormData}
        />
        
        <RoomsRatesSection 
          onValidityChange={setHasRoomTypes} 
          formData={formData}
          updateFormData={updateFormData}
        />
      </div>
    </div>
  );
}
