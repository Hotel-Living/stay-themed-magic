
import { useState, useEffect } from "react";
import { saveSelectedStayLengths } from "@/utils/stayLengthsContext";

interface UseAccommodationTermsProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onValidationChange: (isValid: boolean) => void;
}

export const useAccommodationTerms = ({ 
  formData, 
  updateFormData, 
  onValidationChange 
}: UseAccommodationTermsProps) => {
  const [selectedWeekday, setSelectedWeekday] = useState<string>(formData.preferredWeekday || "Monday");
  const [selectedStayLengths, setSelectedStayLengths] = useState<number[]>(
    formData.stayLengths?.length ? formData.stayLengths : []
  );
  const [selectedMealPlans, setSelectedMealPlans] = useState<string[]>(
    formData.mealPlans?.length ? formData.mealPlans : []
  );
  const [selectedMonths, setSelectedMonths] = useState<string[]>(
    formData.available_months?.length ? formData.available_months : []
  );
  const [roomTypes, setRoomTypes] = useState<any[]>(formData.roomTypes || []);
  const [error, setError] = useState<string>("");
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  const [sectionsState, setSectionsState] = useState({
    weekday: false,
    stayLength: false,
    mealPlan: false,
    roomRates: false,
    availableMonths: false
  });

  useEffect(() => {
    checkValidation();
  }, [selectedStayLengths, selectedMealPlans, roomTypes, selectedMonths]);

  useEffect(() => {
    if (formData.preferredWeekday) {
      setSelectedWeekday(formData.preferredWeekday);
    }
    
    if (formData.stayLengths && formData.stayLengths.length > 0) {
      setSelectedStayLengths(formData.stayLengths);
      saveSelectedStayLengths(formData.stayLengths);
    }
    
    if (formData.mealPlans && formData.mealPlans.length > 0) {
      setSelectedMealPlans(formData.mealPlans);
    }
    
    if (formData.available_months && formData.available_months.length > 0) {
      setSelectedMonths(formData.available_months);
    }
    
    if (formData.roomTypes && formData.roomTypes.length > 0) {
      setRoomTypes(formData.roomTypes);
    }
  }, [formData]);

  const checkValidation = () => {
    const isValid = selectedStayLengths.length > 0 && 
                   selectedMealPlans.length > 0 && 
                   roomTypes.length > 0;
    
    if (!isValid) {
      setError("Please complete all required fields");
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
    
    const event = new CustomEvent('preferredWeekdayUpdated', { detail: weekday });
    window.dispatchEvent(event);
  };

  const handleStayLengthChange = (lengths: number[]) => {
    setHasInteracted(true);
    setSelectedStayLengths(lengths);
    updateFormData('stayLengths', lengths);
    saveSelectedStayLengths(lengths);
    
    const event = new CustomEvent('stayLengthsUpdated', { detail: lengths });
    window.dispatchEvent(event);
  };

  const handleMealPlanChange = (plans: string[]) => {
    setHasInteracted(true);
    setSelectedMealPlans(plans);
    updateFormData('mealPlans', plans);
  };

  const handleMonthsChange = (months: string[]) => {
    setHasInteracted(true);
    setSelectedMonths(months);
    updateFormData('available_months', months);
  };

  const handleRoomTypesChange = (updatedRoomTypes: any[]) => {
    setHasInteracted(true);
    setRoomTypes(updatedRoomTypes);
    updateFormData('roomTypes', updatedRoomTypes);
    checkValidation();
  };

  const toggleSection = (section: keyof typeof sectionsState) => {
    setHasInteracted(true);
    setSectionsState(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  useEffect(() => {
    const handleNavigationAttempt = () => {
      setShowValidationErrors(true);
    };

    window.addEventListener('attemptStepNavigation', handleNavigationAttempt);
    return () => {
      window.removeEventListener('attemptStepNavigation', handleNavigationAttempt);
    };
  }, []);

  return {
    selectedWeekday,
    selectedStayLengths,
    selectedMealPlans,
    selectedMonths,
    roomTypes,
    error,
    showValidationErrors,
    hasInteracted,
    sectionsState,
    handleWeekdayChange,
    handleStayLengthChange,
    handleMealPlanChange,
    handleMonthsChange,
    handleRoomTypesChange,
    toggleSection,
    isValid: selectedStayLengths.length > 0 && selectedMealPlans.length > 0 && roomTypes.length > 0
  };
};
