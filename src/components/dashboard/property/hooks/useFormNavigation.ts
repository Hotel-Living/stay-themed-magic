
import { PropertyFormData } from "./usePropertyFormData";

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  stepValidation: Record<number, boolean>;
  getIncompleteFields: (step: number, formData: PropertyFormData) => string[];
  setErrorFields: (fields: string[]) => void;
  setShowValidationErrors: (show: boolean) => void;
  setCurrentStep: (step: number) => void;
  formData: PropertyFormData;
}

export const useFormNavigation = ({
  currentStep,
  totalSteps,
  stepValidation,
  getIncompleteFields,
  setErrorFields,
  setShowValidationErrors,
  setCurrentStep,
  formData
}: FormNavigationProps) => {
  const validateCurrentStep = (): boolean => {
    const incompleteFields = getIncompleteFields(currentStep, formData);
    
    if (incompleteFields.length > 0) {
      setErrorFields(incompleteFields);
      setShowValidationErrors(true);
      return false;
    }
    
    return true;
  };

  const goToNextStep = () => {
    const isValid = validateCurrentStep();
    
    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      setShowValidationErrors(false);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setShowValidationErrors(false);
    }
  };

  return {
    validateCurrentStep,
    goToNextStep,
    goToPreviousStep
  };
};
