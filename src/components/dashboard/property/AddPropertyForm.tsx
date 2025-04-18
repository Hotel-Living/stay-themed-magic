
import React from "react";
import { usePropertyForm } from "./hooks/usePropertyForm";
import { FormNavigation } from "./FormNavigation";
import StepIndicator from "../PropertySteps/StepIndicator";
import StepContent from "../PropertySteps/StepContent";
import ImportantNotice from "../PropertySteps/ImportantNotice";
import ValidationErrorBanner from "./ValidationErrorBanner";
import SuccessMessage from "./SuccessMessage";
import StepNavigation from "../PropertySteps/StepNavigation";

export default function AddPropertyForm() {
  const {
    currentStep,
    setCurrentStep,
    formData,
    isSubmitted,
    submitSuccess,
    errorFields,
    showValidationErrors,
    isSubmitting,
    termsAccepted,
    setTermsAccepted,
    validateStep,
    handleSubmitProperty,
    setErrorFields,
    setShowValidationErrors
  } = usePropertyForm();

  const totalSteps = 4;
  const stepTitles = ["ADD A NEW PROPERTY", "ADD A NEW PROPERTY", "ADD A NEW PROPERTY", "ADD A NEW PROPERTY"];

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const goToNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
      setShowValidationErrors(false);
      setErrorFields([]);
    }
  };

  return (
    <div className="glass-card rounded-2xl p-4 py-[20px] px-[18px] bg-[#7a0486]">
      <StepIndicator 
        currentStep={currentStep} 
        totalSteps={totalSteps} 
        stepTitle={stepTitles[currentStep - 1]} 
      />
      
      <FormNavigation
        currentStep={currentStep}
        totalSteps={totalSteps}
        onNext={goToNextStep}
        onPrevious={goToPreviousStep}
        onSubmit={handleSubmitProperty}
        isSubmitting={isSubmitting}
        termsAccepted={termsAccepted}
      />
      
      {showValidationErrors && errorFields.length > 0 && (
        <ValidationErrorBanner errorFields={errorFields} />
      )}
      
      {isSubmitted && submitSuccess ? (
        <SuccessMessage />
      ) : (
        <StepContent 
          currentStep={currentStep} 
          onValidationChange={validateStep}
          formData={formData}
          setTermsAccepted={setTermsAccepted}
        />
      )}
      
      <ImportantNotice />
      
      <StepNavigation 
        currentStep={currentStep} 
        totalSteps={totalSteps} 
        onPrevious={goToPreviousStep} 
        onNext={goToNextStep} 
        onSubmit={handleSubmitProperty} 
        showPrevious={currentStep !== 1} 
        isNextDisabled={false}
        isSubmitting={isSubmitting}
        isSubmitDisabled={!termsAccepted}
      />
    </div>
  );
}
