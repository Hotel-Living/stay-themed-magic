
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
    const isStepValid = stepValidation[currentStep] || false;
    
    // Additional validation check directly using formData for step 1
    if (currentStep === 1) {
      const hasName = Boolean(formData.hotelName);
      const hasType = Boolean(formData.propertyType);
      const hasDesc = Boolean(formData.description);
      const hasImages = formData.hotelImages && formData.hotelImages.length > 0;
      
      console.log("Direct validation check in navigation:", {
        hasName, hasType, hasDesc, hasImages,
        stepValidation: stepValidation[currentStep]
      });
      
      if (hasName && hasType && hasDesc && hasImages) {
        return true;
      }
    }
    
    if (!isStepValid) {
      const incompleteFields = getIncompleteFields(currentStep, formData);
      setErrorFields(incompleteFields);
      setShowValidationErrors(true);
      return false;
    }
    
    return isStepValid;
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
