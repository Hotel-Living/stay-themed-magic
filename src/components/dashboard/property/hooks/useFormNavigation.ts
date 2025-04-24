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
    
    if (incompleteFields.length > 0) {
      setErrorFields(incompleteFields);
      setShowValidationErrors(true);
      return false;
    }
    
    return true;
  }, [currentStep, stepValidation, getIncompleteFields, setErrorFields, setShowValidationErrors]);

  const goToNextStep = useCallback(() => {
    if (validateCurrentStep()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
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
