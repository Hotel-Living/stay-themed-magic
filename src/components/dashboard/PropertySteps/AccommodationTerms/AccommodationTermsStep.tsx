
import React, { useState, useEffect } from "react";
import StayLengthSection from "./StayLengthSection";
import MealPlanSection from "./MealPlanSection";
import RoomsRatesSection from "./RoomsRatesSection";
import PreferredWeekdaySection from "../rooms/PreferredWeekdaySection";
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
  const [mealPlans, setMealPlans] = useState<string[]>(formData.mealPlans || []);
  const [stayLengthValid, setStayLengthValid] = useState(false);
  const [mealPlanValid, setMealPlanValid] = useState(false);
  const [error, setError] = useState<string>("");
  const [isStayLengthOpen, setIsStayLengthOpen] = useState(false);
  const [isMealPlanOpen, setIsMealPlanOpen] = useState(false);
  const [isRoomsRatesOpen, setIsRoomsRatesOpen] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  // Preferred weekday fallback
  const preferredWeekday = formData.preferredWeekday || "Monday";

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

  // Initialize meal plan from form data when component mounts
  useEffect(() => {
    if (formData && formData.mealPlans && formData.mealPlans.length > 0) {
      setMealPlans(formData.mealPlans);
      setMealPlanValid(true);
    }
  }, [formData]);

  // Initialize validation state based on form data
  useEffect(() => {
    let isValid = true;
    
    // Check stay lengths
    if (!formData.stayLengths || formData.stayLengths.length === 0) {
      isValid = false;
    } else {
      setStayLengthValid(true);
    }
    
    // Check meal plans
    if (!formData.mealPlans || formData.mealPlans.length === 0) {
      isValid = false;
    } else {
      setMealPlanValid(true);
    }
    
    onValidationChange(isValid);
  }, [formData]);

  // Handle meal plan selection
  const handleMealPlanChange = (value: string) => {
    const newMealPlans = mealPlans.includes(value) ? mealPlans : [value];
    setMealPlans(newMealPlans);
    
    // Update parent form data
    if (updateFormData) {
      updateFormData('mealPlans', newMealPlans);
    }

    // Check validation after change
    setTimeout(checkValidation, 100);
  };

  // Handle weekday selection and store in formData
  const handlePreferredWeekdayChange = (weekday: string) => {
    updateFormData("preferredWeekday", weekday);
  };

  useEffect(() => {
    // Validate on mount and when fields change
    checkValidation();
  }, [mealPlans, stayLengthValid, mealPlanValid]);

  return (
    <div className="space-y-6">
      {/* Main title is now "ACCOMMODATION TERMS" */}
      <h2 className="text-xl font-bold mb-4 text-white">ACCOMMODATION TERMS</h2>
      
      <PreferredWeekdaySection
        preferredWeekday={preferredWeekday}
        onWeekdayChange={handlePreferredWeekdayChange}
      />
      
      <StayLengthSection 
        isOpen={isStayLengthOpen}
        onOpenChange={setIsStayLengthOpen}
        onValidationChange={(isValid) => {
          setStayLengthValid(isValid);
          checkValidation();
        }}
        formData={formData}
        updateFormData={updateFormData}
      />
      
      <MealPlanSection 
        isOpen={isMealPlanOpen}
        onOpenChange={setIsMealPlanOpen}
        onValidationChange={(isValid) => {
          setMealPlanValid(isValid);
          checkValidation();
        }}
        formData={formData}
        updateFormData={updateFormData}
      />
      
      <RoomsRatesSection 
        isOpen={isRoomsRatesOpen}
        onOpenChange={setIsRoomsRatesOpen}
        onValidationChange={() => checkValidation()}
        formData={formData}
        updateFormData={updateFormData}
      />
      
      <ValidationMessages 
        error={error}
        showErrors={showErrors}
        isValid={mealPlanValid && stayLengthValid && !error}
      />
    </div>
  );
}
