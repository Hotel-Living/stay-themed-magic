
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { StepValidationState } from "../types";

interface UseFormNavigationProps {
  currentStep: number;
  totalSteps: number;
  stepValidation: StepValidationState;
  getIncompleteFields: (step: number) => string[];
  setErrorFields: (fields: string[]) => void;
  setShowValidationErrors: (show: boolean) => void;
  setCurrentStep: (step: number) => void;
}

export const useFormNavigation = ({
  currentStep,
  totalSteps,
  stepValidation,
  getIncompleteFields,
  setErrorFields,
  setShowValidationErrors,
  setCurrentStep
}: UseFormNavigationProps) => {
  const { toast } = useToast();

  const validateCurrentStep = () => {
    return stepValidation[currentStep];
  };

  const goToNextStep = () => {
    if (!validateCurrentStep()) {
      const fields = getIncompleteFields(currentStep);
      setErrorFields(fields);
      setShowValidationErrors(true);
      toast({
        title: "Warning",
        description: "Some fields are incomplete. You can still proceed but please complete them later.",
        variant: "destructive"
      });
    } else {
      setErrorFields([]);
      setShowValidationErrors(false);
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  return {
    validateCurrentStep,
    goToNextStep,
    goToPreviousStep
  };
};
