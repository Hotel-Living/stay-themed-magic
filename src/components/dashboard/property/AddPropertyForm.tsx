import React from "react";
import AddPropertyForm from "./property/AddPropertyForm";
import StepIndicator from "../PropertySteps/StepIndicator";
import StepContent from "../PropertySteps/StepContent";
import ImportantNotice from "../PropertySteps/ImportantNotice";
import ValidationErrorBanner from "./ValidationErrorBanner";
import SuccessMessage from "./SuccessMessage";
import PropertyFormNavigation from "./components/PropertyFormNavigation";
import { usePropertyForm } from "./hooks/usePropertyForm";
import { useAuth } from "@/context/AuthContext";
import { useFormNavigation } from "./hooks/useFormNavigation";
import { useHotelEditing } from "./hooks/useHotelEditing";
import { usePropertySubmission } from "./hooks/usePropertySubmission";
import { TOTAL_STEPS, STEP_TITLES } from "./constants";
import { PropertyFormData } from "./hooks/usePropertyFormData"; // Added import for PropertyFormData

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

  const { validateCurrentStep, goToNextStep, goToPreviousStep } = useFormNavigation({
    currentStep,
    totalSteps: TOTAL_STEPS,
    stepValidation,
    getIncompleteFields,
    setErrorFields,
    setShowValidationErrors,
    setCurrentStep,
    formData
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
    onDoneEditing
  });

  const handleSubmit = () => handleSubmitProperty(editingHotelId);

  return (
    <div className="glass-card rounded-2xl p-4 py-[20px] px-[18px] bg-[#7a0486]">
      <StepIndicator 
        currentStep={currentStep} 
        totalSteps={TOTAL_STEPS} 
        stepTitle={STEP_TITLES[currentStep - 1]} 
      />

      {showValidationErrors && errorFields.length > 0 && (
        <ValidationErrorBanner 
          errorFields={errorFields} 
          isWarning={true} // New prop to indicate this is a warning not a blocker
        />
      )}

      {isSubmitted && submitSuccess ? (
        <SuccessMessage />
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
        showValidationWarning={showValidationErrors && errorFields.length > 0}
      />

      {editingHotelId && (
        <div className="mt-4">
          <button
            onClick={onDoneEditing}
            className="px-4 py-2 rounded bg-fuchsia-700 text-white"
          >
            Cancel Editing
          </button>
        </div>
      )}
    </div>
  );
}
