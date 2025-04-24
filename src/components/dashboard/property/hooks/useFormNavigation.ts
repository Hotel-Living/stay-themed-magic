
import { useToast } from "@/hooks/use-toast";
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
  const { toast } = useToast();

  const validateCurrentStep = () => {
    const isCurrentStepValid = stepValidation[currentStep];
    if (!isCurrentStepValid) {
      const incompleteFields = getIncompleteFields(currentStep, formData);
      setErrorFields(incompleteFields);
      setShowValidationErrors(true);

      // Dispatch navigation attempt event
      window.dispatchEvent(new Event('attemptStepNavigation'));
      
      toast({
        title: "Required Fields Incomplete",
        description: "Please fill in all required fields before proceeding.",
        variant: "destructive"
      });

      return false;
    }
    return true;
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const goToNextStep = () => {
    if (validateCurrentStep()) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
        setShowValidationErrors(false);
        scrollToTop(); // Added scroll to top functionality
      }
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setShowValidationErrors(false);
      scrollToTop(); // Added scroll to top functionality
    }
  };

  return {
    validateCurrentStep,
    goToNextStep,
    goToPreviousStep
  };
};
