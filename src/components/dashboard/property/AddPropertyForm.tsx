
import React, { useEffect, useCallback } from "react";
import StepIndicator from "../PropertySteps/StepIndicator";
import StepContent from "../PropertySteps/StepContent";
import { ImportantNotice } from "../PropertySteps/ImportantNotice";
import ValidationErrorBanner from "./ValidationErrorBanner";
import SuccessMessage from "./SuccessMessage";
import PropertyFormNavigation from "./components/PropertyFormNavigation";
import { AutoSaveIndicator } from "./AutoSaveIndicator";
import { usePropertyForm } from "./hooks/usePropertyForm";
import { usePropertyFormAutoSave } from "./hooks/usePropertyFormAutoSave";
import { useAuth } from "@/context/AuthContext";
import { useFormNavigation } from "./hooks/useFormNavigation";
import { useHotelEditing } from "./hooks/useHotelEditing";
import { usePropertySubmission } from "./hooks/usePropertySubmission";
import { propertyFormValidator } from "@/utils/propertyFormValidation";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/useTranslation";
import { TOTAL_STEPS, STEP_TITLES } from "./constants";
import { PropertyFormData } from "./hooks/usePropertyFormData";

export default function AddPropertyForm({
  editingHotelId,
  onDoneEditing
}: {
  editingHotelId?: string | null;
  onDoneEditing?: () => void;
} = {}) {
  const {
    currentStep,
    setCurrentStep,
    stepValidation,
    validateStep,
    isSubmitted,
    setIsSubmitted,
    submitSuccess,
    setSubmitSuccess,
    errorFields,
    setErrorFields,
    showValidationErrors,
    setShowValidationErrors,
    formData,
    setFormData,
    getIncompleteFields
  } = usePropertyForm();

  const { user } = useAuth();
  const { toast } = useToast();
  const { t } = useTranslation();

  // Auto-save functionality
  const {
    isSaving,
    lastSaved,
    loadDraft,
    clearDraft,
    forceSave
  } = usePropertyFormAutoSave(formData, setFormData, editingHotelId);

  // Load draft on component mount
  useEffect(() => {
    if (!editingHotelId) {
      const draft = loadDraft();
      if (draft) {
        setFormData(draft);
        toast({
          title: t('dashboard.draftLoaded'),
          description: t('dashboard.draftLoadedDescription'),
        });
      }
    }
  }, [editingHotelId, loadDraft, setFormData, toast, t]);

  // Enhanced validation with unified validator
  const validateCurrentStepEnhanced = useCallback(() => {
    const errors = propertyFormValidator.validate(formData, currentStep);
    
    if (errors.length > 0) {
      setErrorFields(errors.map(e => e.message));
      setShowValidationErrors(true);
      return false;
    }
    
    setErrorFields([]);
    setShowValidationErrors(false);
    return true;
  }, [formData, currentStep, setErrorFields, setShowValidationErrors]);

  const { validateCurrentStep, goToNextStep, goToPreviousStep } = useFormNavigation({
    currentStep,
    totalSteps: TOTAL_STEPS,
    stepValidation,
    getIncompleteFields,
    setErrorFields,
    setShowValidationErrors,
    setCurrentStep,
    formData,
    customValidator: validateCurrentStepEnhanced
  });

  useHotelEditing({
    editingHotelId,
    setFormData,
    setCurrentStep
  });

  // Create wrapper functions to match expected signatures
  const getIncompleteFieldsWrapper = (step: number) => {
    return getIncompleteFields(step, formData);
  };
  
  const setFormDataWrapper = (data: Partial<PropertyFormData>) => {
    setFormData(prev => ({...prev, ...data}));
  };

  const { handleSubmitProperty } = usePropertySubmission({
    formData,
    stepValidation,
    setIsSubmitted,
    setSubmitSuccess,
    setErrorFields,
    setShowValidationErrors,
    getIncompleteFields: getIncompleteFieldsWrapper,
    setCurrentStep,
    setFormData: setFormDataWrapper,
    userId: user?.id,
    onDoneEditing: () => {
      clearDraft(); // Clear draft on successful submission
      onDoneEditing?.();
    }
  });

  const handleSubmit = useCallback(async () => {
    try {
      await forceSave(); // Force save before submission
      await handleSubmitProperty(editingHotelId);
    } catch (error) {
      console.error('Submission error:', error);
    }
  }, [forceSave, handleSubmitProperty, editingHotelId]);

  return (
    <div className="glass-card rounded-2xl p-4 py-[20px] px-[18px] bg-[#7a0486]">
      <div className="flex justify-between items-center mb-4">
        <StepIndicator 
          currentStep={currentStep} 
          totalSteps={TOTAL_STEPS} 
          stepTitle={STEP_TITLES[currentStep - 1]} 
        />
        
        <AutoSaveIndicator 
          isSaving={isSaving}
          lastSaved={lastSaved}
        />
      </div>

      <PropertyFormNavigation
        currentStep={currentStep}
        totalSteps={TOTAL_STEPS}
        onPrevious={goToPreviousStep}
        onNext={goToNextStep}
        onSubmit={handleSubmit}
      />

      {showValidationErrors && errorFields.length > 0 && (
        <ValidationErrorBanner errorFields={errorFields} />
      )}

      {isSubmitted && submitSuccess ? (
        <SuccessMessage isEditingMode={!!editingHotelId} />
      ) : (
        <StepContent 
          currentStep={currentStep}
          onValidationChange={isValid => validateStep(currentStep, isValid)}
          formData={formData}
          updateFormData={(field, value) => setFormData(prev => ({ ...prev, [field]: value }))}
        />
      )}

      <ImportantNotice />

      <PropertyFormNavigation
        currentStep={currentStep}
        totalSteps={TOTAL_STEPS}
        onPrevious={goToPreviousStep}
        onNext={goToNextStep}
        onSubmit={handleSubmit}
      />

      {editingHotelId && (
        <div className="mt-4">
          <button
            onClick={onDoneEditing}
            className="px-4 py-2 rounded bg-fuchsia-700 text-white"
          >
            {t('dashboard.cancelEditing')}
          </button>
        </div>
      )}
    </div>
  );
}
