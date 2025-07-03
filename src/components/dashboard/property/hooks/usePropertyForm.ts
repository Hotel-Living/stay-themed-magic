
import { useStepManagement } from "./useStepManagement";
import { usePropertyFormData } from "./usePropertyFormData";
import { useValidationState } from "./useValidationState";
import { useSubmissionState } from "./useSubmissionState";
import { useState, useEffect } from "react";
import type { PropertyFormData } from "./usePropertyFormData";

export type { PropertyFormData };

export const usePropertyForm = () => {
  const stepManagement = useStepManagement();
  const formDataManagement = usePropertyFormData();
  const validationState = useValidationState();
  const submissionState = useSubmissionState();
  
  // Initialize as true to allow navigation by default
  const [isStepValid, setIsStepValid] = useState(true);
  
  const onValidationChange = (isValid: boolean) => {
    console.log('Validation changed for step', stepManagement.currentStep, ':', isValid);
    setIsStepValid(isValid);
  };

  // Reset validation to true when step changes to allow navigation
  useEffect(() => {
    console.log('Step changed to:', stepManagement.currentStep);
    setIsStepValid(true);
  }, [stepManagement.currentStep]);
  
  // Allow free navigation between steps - only validate on final submit
  const canMoveToNextStep = stepManagement.currentStep < 5;
  const canMoveToPrevStep = stepManagement.currentStep > 1;
  
  console.log('Current navigation state:', {
    currentStep: stepManagement.currentStep,
    isStepValid,
    canMoveToNextStep,
    canMoveToPrevStep
  });
  
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
