
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import StayLengthSection from "./StayLengthSection";
import MealPlanSection from "./MealPlanSection";
import RoomsRatesSection from "./RoomsRatesSection";
import PreferredWeekdaySection from "./PreferredWeekdaySection";
import ValidationMessages from "./ValidationMessages";
import { weekdays } from "@/utils/constants";

interface AccommodationTermsStepProps {
  onValidationChange?: (isValid: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
}

const AccommodationTermsStep = ({
  onValidationChange = () => {},
  formData = {},
  updateFormData = () => {}
}: AccommodationTermsStepProps) => {
  const [selectedWeekday, setSelectedWeekday] = useState<string>(formData.preferredWeekday || "Monday");
  const [selectedStayLengths, setSelectedStayLengths] = useState<number[]>(
    formData.stayLengths?.length ? formData.stayLengths : []
  );
  const [selectedMealPlans, setSelectedMealPlans] = useState<string[]>(
    formData.mealPlans?.length ? formData.mealPlans : []
  );
  const [roomTypes, setRoomTypes] = useState<any[]>(formData.roomTypes || []);
  const { toast } = useToast();
  const [error, setError] = useState<string>("");
  const [showValidationErrors, setShowValidationErrors] = useState(false);

  useEffect(() => {
    // Update validation state when any required field changes
    checkValidation();
  }, [selectedStayLengths, selectedMealPlans, roomTypes]);

  useEffect(() => {
    // Initialize component state from formData if available
    if (formData.preferredWeekday) {
      setSelectedWeekday(formData.preferredWeekday);
    }
    
    if (formData.stayLengths && formData.stayLengths.length > 0) {
      setSelectedStayLengths(formData.stayLengths);
    }
    
    if (formData.mealPlans && formData.mealPlans.length > 0) {
      setSelectedMealPlans(formData.mealPlans);
    }
    
    if (formData.roomTypes && formData.roomTypes.length > 0) {
      setRoomTypes(formData.roomTypes);
    }
  }, [formData]);

  const checkValidation = () => {
    const isValid = 
      selectedStayLengths.length > 0 && 
      selectedMealPlans.length > 0 && 
      roomTypes.length > 0;
    
    if (!isValid) {
      setError("Please complete all required fields");
      setShowValidationErrors(true);
    } else {
      setError("");
      setShowValidationErrors(false);
    }
    
    onValidationChange(isValid);
    return isValid;
  };

  const handleWeekdayChange = (weekday: string) => {
    setSelectedWeekday(weekday);
    updateFormData('preferredWeekday', weekday);
    
    toast({
      title: "Weekday Updated",
      description: `Preferred check-in/out day set to ${weekday}.`
    });
  };

  const handleStayLengthChange = (lengths: number[]) => {
    setSelectedStayLengths(lengths);
    updateFormData('stayLengths', lengths);
    
    // Also update the local storage for the stayLengths context
    localStorage.setItem('selectedStayLengths', JSON.stringify(lengths));
    // Dispatch custom event for other components that might be listening
    const event = new CustomEvent('stayLengthsUpdated', { detail: lengths });
    window.dispatchEvent(event);
  };

  const handleMealPlanChange = (plans: string[]) => {
    setSelectedMealPlans(plans);
    updateFormData('mealPlans', plans);
  };

  const handleRoomTypesChange = (updatedRoomTypes: any[]) => {
    setRoomTypes(updatedRoomTypes);
    updateFormData('roomTypes', updatedRoomTypes);
    checkValidation();
  };

  const isValid = selectedStayLengths.length > 0 && selectedMealPlans.length > 0 && roomTypes.length > 0;

  return (
    <div className="space-y-4 max-w-[80%]">
      <h2 className="text-xl font-bold mb-2 text-white">ACCOMMODATION TERMS</h2>
      
      <ValidationMessages 
        error={error}
        showErrors={showValidationErrors}
        isValid={isValid}
      />
      
      <div className="space-y-4">
        <PreferredWeekdaySection 
          preferredWeekday={selectedWeekday}
          onWeekdayChange={handleWeekdayChange}
        />
        
        <StayLengthSection 
          isOpen={true}
          onOpenChange={() => {}}
          onValidationChange={(valid) => {
            if (!valid) checkValidation();
          }}
          formData={formData}
          updateFormData={updateFormData}
        />
        
        <MealPlanSection 
          isOpen={true}
          onOpenChange={() => {}}
          onValidationChange={(valid) => {
            if (!valid) checkValidation();
          }}
          formData={formData}
          updateFormData={updateFormData}
        />
        
        <RoomsRatesSection
          isOpen={true}
          onOpenChange={() => {}}
          onValidationChange={(valid) => {
            if (!valid) checkValidation();
          }}
          formData={{
            ...formData,
            preferredWeekday: selectedWeekday,
            stayLengths: selectedStayLengths
          }}
          updateFormData={updateFormData}
        />
      </div>
    </div>
  );
};

export default AccommodationTermsStep;
