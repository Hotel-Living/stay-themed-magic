
import React from 'react';
import { useNewPropertyForm } from './hooks/useNewPropertyForm';
import { NewPropertyFormNavigation } from './components/NewPropertyFormNavigation';
import { NewStepContent } from './steps/NewStepContent';

export function NewAddPropertyForm() {
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
    isSubmitting
  } = useNewPropertyForm();

  const handleSubmit = async () => {
    try {
      console.log('🚀 Submitting property with data:', formData);
      await submitProperty(formData);
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
            onValidationChange={onValidationChange}
            formData={formData}
            updateFormData={updateFormData}
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
