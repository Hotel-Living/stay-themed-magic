
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import StayLengthSection from "./StayLengthSection";
import MealPlanSection from "./MealPlanSection";
import RoomsRatesSection from "./RoomsRatesSection";
import PreferredWeekdaySection from "./PreferredWeekdaySection";
import ValidationMessages from "./ValidationMessages";
import { weekdays } from "@/utils/constants";
import { saveSelectedStayLengths } from "@/utils/stayLengthsContext";

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
  const [hasInteracted, setHasInteracted] = useState(false);
  
  const [sectionsState, setSectionsState] = useState({
    weekday: false,
    stayLength: false,
    mealPlan: false,
    roomRates: false
  });

  useEffect(() => {
    checkValidation();
  }, [selectedStayLengths, selectedMealPlans, roomTypes]);

  useEffect(() => {
    if (formData.preferredWeekday) {
      setSelectedWeekday(formData.preferredWeekday);
    }
    
    if (formData.stayLengths && formData.stayLengths.length > 0) {
      setSelectedStayLengths(formData.stayLengths);
      // Ensure we update the context when loading from formData
      saveSelectedStayLengths(formData.stayLengths);
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
      // Only show validation errors if user has interacted with the form
      // or if they've attempted to navigate
    } else {
      setError("");
      setShowValidationErrors(false);
    }
    
    onValidationChange(isValid);
    return isValid;
  };

  const handleWeekdayChange = (weekday: string) => {
    setHasInteracted(true);
    setSelectedWeekday(weekday);
    updateFormData('preferredWeekday', weekday);
    
    // Dispatch custom event for components listening for weekday updates
    const event = new CustomEvent('preferredWeekdayUpdated', { detail: weekday });
    window.dispatchEvent(event);
    
    toast(`Preferred check-in/out day set to ${weekday}.`);
  };

  const handleStayLengthChange = (lengths: number[]) => {
    setHasInteracted(true);
    setSelectedStayLengths(lengths);
    updateFormData('stayLengths', lengths);
    
    // Update the context so other components can access it
    saveSelectedStayLengths(lengths);
    
    // Dispatch custom event for components listening for updates
    const event = new CustomEvent('stayLengthsUpdated', { detail: lengths });
    window.dispatchEvent(event);
  };

  const handleMealPlanChange = (plans: string[]) => {
    setHasInteracted(true);
    setSelectedMealPlans(plans);
    updateFormData('mealPlans', plans);
  };

  const handleRoomTypesChange = (updatedRoomTypes: any[]) => {
    setHasInteracted(true);
    setRoomTypes(updatedRoomTypes);
    updateFormData('roomTypes', updatedRoomTypes);
    checkValidation();
  };

  const isValid = selectedStayLengths.length > 0 && selectedMealPlans.length > 0 && roomTypes.length > 0;

  const toggleSection = (section: keyof typeof sectionsState) => {
    setHasInteracted(true);
    setSectionsState(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Listen for navigation attempts
  useEffect(() => {
    const handleNavigationAttempt = () => {
      setShowValidationErrors(true);
    };

    window.addEventListener('attemptStepNavigation', handleNavigationAttempt);
    
    return () => {
      window.removeEventListener('attemptStepNavigation', handleNavigationAttempt);
    };
  }, []);

  return (
    <div className="space-y-6 max-w-[80%]">
      <h2 className="text-xl font-bold mb-4 text-white">ACCOMMODATION TERMS</h2>
      
      <ValidationMessages 
        error={error}
        showErrors={hasInteracted && showValidationErrors}
        isValid={isValid}
      />
      
      <div className="space-y-6">
        <PreferredWeekdaySection 
          preferredWeekday={selectedWeekday}
          onWeekdayChange={handleWeekdayChange}
        />
        
        <StayLengthSection 
          isOpen={sectionsState.stayLength}
          onOpenChange={() => toggleSection('stayLength')}
          onValidationChange={(valid) => {
            if (!valid) checkValidation();
          }}
          formData={formData}
          updateFormData={updateFormData}
        />
        
        <MealPlanSection 
          isOpen={sectionsState.mealPlan}
          onOpenChange={() => toggleSection('mealPlan')}
          onValidationChange={(valid) => {
            if (!valid) checkValidation();
          }}
          formData={formData}
          updateFormData={updateFormData}
        />
        
        <RoomsRatesSection
          isOpen={sectionsState.roomRates}
          onOpenChange={() => toggleSection('roomRates')}
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
