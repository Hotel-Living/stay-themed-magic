
import { useState } from "react";
import { TOTAL_STEPS } from "../constants";
import { StepValidationState } from "../types";

export const useStepManagement = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [stepValidation, setStepValidation] = useState<StepValidationState>({
    1: false,
    2: false,
    3: false,
    4: false
  });

  const validateStep = (step: number, isValid: boolean) => {
    setStepValidation(prev => ({
      ...prev,
      [step]: isValid
    }));
  };

  return {
    currentStep,
    setCurrentStep,
    stepValidation,
    validateStep
  };
};
