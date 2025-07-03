
import { useStepManagement } from "./useStepManagement";
import { usePropertyFormData } from "./usePropertyFormData";
import { useValidationState } from "./useValidationState";
import { useSubmissionState } from "./useSubmissionState";
import { usePropertyFormAutoSave } from "./usePropertyFormAutoSave";
import { useHotelEditing } from "./useHotelEditing";
import { useState, useEffect } from "react";
import type { PropertyFormData } from "./usePropertyFormData";

export type { PropertyFormData };

export const usePropertyForm = (editingHotelId?: string) => {
  const stepManagement = useStepManagement();
  const formDataManagement = usePropertyFormData(editingHotelId);
  const validationState = useValidationState();
  const submissionState = useSubmissionState();
  
  // Initialize auto-save functionality (only for new properties)
  const autoSaveHook = usePropertyFormAutoSave(
    formDataManagement.formData,
    formDataManagement.setFormData,
    editingHotelId
  );

  // Initialize hotel editing (only for existing properties)
  const { isLoading: isLoadingHotel } = useHotelEditing({
    editingHotelId,
    setFormData: formDataManagement.setFormData,
    setCurrentStep: stepManagement.setCurrentStep
  });
  
  // Initialize as true to allow navigation by default
  const [isStepValid, setIsStepValid] = useState(true);
  
  // Load data on initialization - prioritize hotel data over draft for editing
  useEffect(() => {
    if (editingHotelId) {
      // For editing mode, hotel data will be loaded by useHotelEditing hook
      console.log('Editing mode: Hotel data will be loaded from database');
    } else {
      // For new properties, try to load draft
      const draft = autoSaveHook.loadDraft();
      if (draft) {
        console.log('Loading draft data for new property:', draft);
        formDataManagement.setFormData(draft);
      }
    }
  }, [editingHotelId]); // Only run when editingHotelId changes
  
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
    prevStep: stepManagement.previousStep,
    clearDraft: autoSaveHook.clearDraft
  };
};
