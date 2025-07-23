
import { useState, useEffect } from "react";

interface UseValidationStateProps {
  selectedStayLengths: number[];
  selectedMealPlans: string[];
  roomTypes: any[];
  onValidationChange: (isValid: boolean) => void;
}

export const useValidationState = ({
  selectedStayLengths,
  selectedMealPlans,
  roomTypes,
  onValidationChange
}: UseValidationStateProps) => {
  const [error, setError] = useState<string>("");
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
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
  }, [selectedStayLengths, selectedMealPlans, roomTypes, onValidationChange]);

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
    error,
    setError,
    showValidationErrors,
    setShowValidationErrors,
    hasInteracted,
    setHasInteracted,
    isValid: selectedStayLengths.length > 0 && selectedMealPlans.length > 0 && roomTypes.length > 0
  };
};
