
import { useCallback } from "react";

export const useFormNavigation = ({
  currentStep,
  totalSteps,
  stepValidation,
  getIncompleteFields,
  setErrorFields,
  setShowValidationErrors,
  setCurrentStep,
  formData
}) => {
  const validateCurrentStep = useCallback(() => {
    const incompleteFields = getIncompleteFields(currentStep, formData);
    
    // Show validation errors but don't block navigation
    if (incompleteFields.length > 0) {
      setErrorFields(incompleteFields);
      setShowValidationErrors(true);
    }
    
    // Always return true to allow navigation
    return true;
  }, [currentStep, getIncompleteFields, setErrorFields, setShowValidationErrors]);

  const goToNextStep = useCallback(() => {
    validateCurrentStep(); // Show validation state but proceed anyway
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  }, [validateCurrentStep, setCurrentStep, totalSteps]);

  const goToPreviousStep = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentStep(prev => Math.max(prev - 1, 1));
  }, [setCurrentStep]);

  return {
    validateCurrentStep,
    goToNextStep,
    goToPreviousStep
  };
};
