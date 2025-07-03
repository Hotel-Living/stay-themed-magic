
import React from 'react';
import { usePropertyForm } from './hooks/usePropertyForm';
import { usePropertySubmission } from './hooks/usePropertySubmission';
import PropertyFormNavigation from './components/PropertyFormNavigation';
import StepContent from '../PropertySteps/StepContent';

interface AddPropertyFormProps {
  editingHotelId?: string;
  onDoneEditing?: () => void;
}

export default function AddPropertyForm({ editingHotelId, onDoneEditing }: AddPropertyFormProps) {
  const {
    currentStep,
    formData,
    updateFormData,
    isStepValid,
    onValidationChange,
    canMoveToNextStep,
    canMoveToPrevStep,
    nextStep,
    prevStep
  } = usePropertyForm();

  const { submitProperty, isSubmitting } = usePropertySubmission();

  const handleSubmit = async () => {
    try {
      await submitProperty(formData, editingHotelId);
      if (onDoneEditing) {
        onDoneEditing();
      }
    } catch (error) {
      console.error('Error submitting property:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
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
      </div>
    </div>
  );
}
