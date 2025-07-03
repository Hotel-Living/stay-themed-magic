
import { useState } from "react";
import { TOTAL_STEPS } from "../constants";
import { StepValidationState } from "../types";

export const useStepManagement = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [stepValidation, setStepValidation] = useState<StepValidationState>({
    1: true, // Initialize as true to allow navigation
    2: true,
    3: true,
    4: true,
    5: true
  });

  const validateStep = (step: number, isValid: boolean) => {
    console.log(`Step ${step} validation:`, isValid);
    setStepValidation(prev => ({
      ...prev,
      [step]: isValid
    }));
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= TOTAL_STEPS) {
      console.log(`Navigating to step ${step}`);
      setCurrentStep(step);
    }
  };

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      const next = currentStep + 1;
      console.log(`Moving to next step: ${next}`);
      setCurrentStep(next);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      const prev = currentStep - 1;
      console.log(`Moving to previous step: ${prev}`);
      setCurrentStep(prev);
    }
  };

  return {
    currentStep,
    setCurrentStep: goToStep,
    stepValidation,
    validateStep,
    nextStep,
    previousStep
  };
};
