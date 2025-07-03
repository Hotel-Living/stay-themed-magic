
import React from 'react';
import { usePropertyForm } from './property/hooks/usePropertyForm';
import { usePropertySubmission } from './property/hooks/usePropertySubmission';
import PropertyFormNavigation from './property/components/PropertyFormNavigation';
import StepContent from './PropertySteps/StepContent';

interface AddPropertyProps {
  editingHotelId?: string;
  onDoneEditing?: () => void;
}

export default function AddProperty({ editingHotelId, onDoneEditing }: AddPropertyProps) {
  const {
    currentStep,
    formData,
    updateFormData,
    isStepValid,
    onValidationChange,
    canMoveToNextStep,
    canMoveToPrevStep,
    nextStep,
    prevStep,
    clearDraft
  } = usePropertyForm(editingHotelId);

  const { submitProperty, isSubmitting } = usePropertySubmission();

  const handleSubmit = async () => {
    try {
      const result = await submitProperty(formData, editingHotelId);
      // CRITICAL: Only proceed if submission actually succeeded
      if (result) {
        // Clear the draft after successful submission
        clearDraft();
        if (onDoneEditing) {
          onDoneEditing();
        }
      }
      // If result is null, validation failed and form data is preserved
    } catch (error) {
      console.error('Error submitting property:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Top Navigation */}
        <PropertyFormNavigation
          currentStep={currentStep}
          isStepValid={isStepValid}
          canMoveToNextStep={canMoveToNextStep}
          canMoveToPrevStep={canMoveToPrevStep}
          onNextStep={nextStep}
          onPrevStep={prevStep}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
        
        <div className="mt-8">
          <StepContent
            currentStep={currentStep}
            onValidationChange={onValidationChange}
            formData={formData}
            updateFormData={updateFormData}
          />
        </div>
        
        {/* Bottom Navigation */}
        <div className="mt-8">
          <PropertyFormNavigation
            currentStep={currentStep}
            isStepValid={isStepValid}
            canMoveToNextStep={canMoveToNextStep}
            canMoveToPrevStep={canMoveToPrevStep}
            onNextStep={nextStep}
            onPrevStep={prevStep}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}
