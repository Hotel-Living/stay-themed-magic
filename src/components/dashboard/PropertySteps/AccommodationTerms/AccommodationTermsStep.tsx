
import React, { useState, useEffect } from "react";
import StayLengthMealsSection from "./StayLengthMealsSection";
import RoomsRatesSection from "./RoomsRatesSection";
import PreferredWeekdaySection from "./PreferredWeekdaySection";
import ValidationMessages from "./ValidationMessages";

export interface AccommodationTermsStepProps {
  onValidationChange?: (isValid: boolean) => void;
  initialData?: any;
}

export default function AccommodationTermsStep({
  onValidationChange = () => {},
  initialData = {}
}: AccommodationTermsStepProps) {
  const [mealPlans, setMealPlans] = useState<string[]>(initialData.mealPlans || []);
  const [stayLengthValid, setStayLengthValid] = useState(false);
  const [mealPlanValid, setMealPlanValid] = useState(false);
  const [error, setError] = useState<string>("");
  const [isStayLengthMealsOpen, setIsStayLengthMealsOpen] = useState(true);
  const [isRoomsRatesOpen, setIsRoomsRatesOpen] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  // Check if all required fields are completed
  const checkValidation = () => {
    if (!mealPlanValid) {
      setError("Please select at least one meal plan");
      onValidationChange(false);
      return false;
    }
    if (!stayLengthValid) {
      setError("Please select at least one stay length");
      onValidationChange(false);
      return false;
    }
    setError("");
    onValidationChange(true);
    return true;
  };

  // Handle meal plan selection
  const handleMealPlanChange = (value: string) => {
    if (!mealPlans.includes(value)) {
      setMealPlans([value]);
    }

    // Check validation after change
    setTimeout(checkValidation, 100);
  };

  useEffect(() => {
    // Validate on mount and when fields change
    checkValidation();
  }, [mealPlans, stayLengthValid, mealPlanValid]);

  // Show validation errors only when user tries to navigate away
  const handleNextStep = () => {
    setShowErrors(true);
  };

  return (
    <div className="space-y-6">
      {/* Main title is now "ACCOMMODATION TERMS" */}
      <h2 className="text-xl font-bold mb-4 text-white">ACCOMMODATION TERMS</h2>
      
      <StayLengthMealsSection 
        isOpen={isStayLengthMealsOpen}
        onOpenChange={setIsStayLengthMealsOpen}
        onStayLengthValidChange={(isValid) => {
          setStayLengthValid(isValid);
          checkValidation();
        }}
        onMealPlanValidChange={(isValid) => {
          setMealPlanValid(isValid);
          checkValidation();
        }}
        initialStayLengths={initialData.stayLengths || []}
        initialMealPlans={initialData.mealPlans || []}
      />
      
      <RoomsRatesSection 
        isOpen={isRoomsRatesOpen}
        onOpenChange={setIsRoomsRatesOpen}
        onValidationChange={() => checkValidation()}
      />
      
      <PreferredWeekdaySection />
      
      <ValidationMessages 
        error={error}
        showErrors={showErrors}
        isValid={mealPlanValid && stayLengthValid && !error}
      />
    </div>
  );
}
