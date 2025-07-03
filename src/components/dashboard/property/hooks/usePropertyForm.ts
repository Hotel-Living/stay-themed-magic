
import { useStepManagement } from "./useStepManagement";
import { usePropertyFormData } from "./usePropertyFormData";
import { useValidationState } from "./useValidationState";
import { useSubmissionState } from "./useSubmissionState";
import { useState } from "react";
import type { PropertyFormData } from "./usePropertyFormData";

export type { PropertyFormData };

export const usePropertyForm = () => {
  const stepManagement = useStepManagement();
  const formDataManagement = usePropertyFormData();
  const validationState = useValidationState();
  const submissionState = useSubmissionState();
  
  // Add missing validation state
  const [isStepValid, setIsStepValid] = useState(false);
  
  const onValidationChange = (isValid: boolean) => {
    setIsStepValid(isValid);
  };
  
  const canMoveToNextStep = isStepValid;
  const canMoveToPrevStep = stepManagement.currentStep > 1;
  
  return {
    ...stepManagement,
    ...formDataManagement,
    ...validationState,
    ...submissionState,
    isStepValid,
    onValidationChange,
    canMoveToNextStep,
    canMoveToPrevStep,
    nextStep: stepManagement.nextStep,
    prevStep: stepManagement.previousStep
  };
};
