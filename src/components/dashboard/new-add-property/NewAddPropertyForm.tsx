
import React from 'react';
import { useNewPropertyForm } from './hooks/useNewPropertyForm';
import { NewPropertyFormNavigation } from './components/NewPropertyFormNavigation';
import { NewStepContent } from './steps/NewStepContent';

interface NewAddPropertyFormProps {
  editingHotelId?: string;
  onDoneEditing?: () => void;
}

export function NewAddPropertyForm({ editingHotelId, onDoneEditing }: NewAddPropertyFormProps = {}) {
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
    submitProperty,
    isSubmitting,
    isAdmin
  } = useNewPropertyForm(editingHotelId);

  const handleSubmit = async () => {
    try {
      console.log('🚀 Submitting property with data:', formData);
      const result = await submitProperty(formData, editingHotelId);
      if (result && onDoneEditing) {
        onDoneEditing();
      }
    } catch (error) {
      console.error('❌ Error submitting property:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Top Navigation */}
        <NewPropertyFormNavigation
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
          <NewStepContent
            currentStep={currentStep}
            onValidationChange={(isValid) => onValidationChange(currentStep, isValid)}
            formData={formData}
            updateFormData={updateFormData}
            isAdmin={isAdmin}
          />
        </div>
        
        {/* Bottom Navigation */}
        <div className="mt-8">
          <NewPropertyFormNavigation
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
