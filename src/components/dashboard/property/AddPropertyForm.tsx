// RUTA: src/components/dashboard/property/AddPropertyForm.tsx

import React from "react";
import StepIndicator from "./StepIndicator";
import StepContent from "./StepContent";
import { usePropertyForm } from "./hooks/usePropertyForm";
import { usePropertySubmission } from "./hooks/usePropertySubmission";
import { useHotelEditing } from "./hooks/useHotelEditing";
import { usePropertyUpdate } from "./hooks/usePropertyUpdate";

export default function AddPropertyForm() {
  const {
    formData,
    setFormData,
    currentStep,
    setCurrentStep,
    validateStep,
    goToNextStep,
    goToPreviousStep,
  } = usePropertyForm();

  useHotelEditing();
  usePropertyUpdate(formData);
  usePropertySubmission({ formData });

  return (
    <div className="max-w-4xl mx-auto px-4">
      <StepIndicator currentStep={currentStep} />
      <StepContent
        currentStep={currentStep}
        formData={formData}
        setFormData={setFormData}
        onNext={goToNextStep}
        onPrevious={goToPreviousStep}
        validateStep={validateStep}
      />
    </div>
  );
}
