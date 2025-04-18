
import React from "react";
import StepIndicator from "../PropertySteps/StepIndicator";
import StepNavigation from "../PropertySteps/StepNavigation";
import StepContent from "../PropertySteps/StepContent";
import ImportantNotice from "../PropertySteps/ImportantNotice";
import ValidationErrorBanner from "./ValidationErrorBanner";
import SuccessMessage from "./SuccessMessage";
import { usePropertyForm } from "./hooks/usePropertyForm";
import { usePropertySubmission } from "./hooks/usePropertySubmission";
import { useStepNavigation } from "./hooks/useStepNavigation";

export default function AddPropertyForm() {
  const totalSteps = 4;
  const stepTitles = ["ADD A NEW PROPERTY", "ADD A NEW PROPERTY", "ADD A NEW PROPERTY", "ADD A NEW PROPERTY"];
  
  const {
    currentStep,
    setCurrentStep,
    stepValidation,
    setStepValidation,
    isSubmitted,
    setIsSubmitted,
    submitSuccess,
    setSubmitSuccess,
    errorFields,
    setErrorFields,
    showValidationErrors,
    setShowValidationErrors,
    isSubmitting,
    setIsSubmitting,
    termsAccepted,
    setTermsAccepted,
    formData,
    user,
    navigate,
    toast
  } = usePropertyForm();

  const { handleSubmitProperty } = usePropertySubmission();
  const { handleStepNavigation } = useStepNavigation();

  const goToNextStep = () => {
    handleStepNavigation({
      action: 'next',
      currentStep,
      totalSteps,
      stepValidation,
      setCurrentStep,
      setErrorFields,
      setShowValidationErrors,
      toast
    });
  };

  const goToPreviousStep = () => {
    handleStepNavigation({
      action: 'previous',
      currentStep,
      totalSteps,
      stepValidation,
      setCurrentStep,
      setErrorFields,
      setShowValidationErrors,
      toast
    });
  };

  const onSubmit = () => {
    handleSubmitProperty({
      user,
      formData,
      termsAccepted,
      setIsSubmitting,
      setIsSubmitted,
      setSubmitSuccess,
      toast,
      navigate,
      stepValidation
    });
  };

  return (
    <div className="glass-card rounded-2xl p-4 py-[20px] px-[18px] bg-[#7a0486]">
      <StepIndicator 
        currentStep={currentStep} 
        totalSteps={totalSteps} 
        stepTitle={stepTitles[currentStep - 1]} 
      />
      
      <div className="flex items-center justify-between mb-3">
        <button 
          onClick={goToPreviousStep} 
          className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
            currentStep === 1 ? "invisible" : "bg-fuchsia-950/80 hover:bg-fuchsia-900/80 text-fuchsia-100"
          }`} 
          disabled={currentStep === 1}
        >
          Previous
        </button>
        
        {currentStep === totalSteps ? (
          <button 
            onClick={onSubmit} 
            className="rounded-lg px-4 py-1.5 text-white text-sm font-medium transition-colors bg-[#a209ad]/80 hover:bg-[#a209ad]"
            disabled={isSubmitting || !termsAccepted}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        ) : (
          <button 
            onClick={goToNextStep} 
            className="rounded-lg px-4 py-1.5 bg-fuchsia-600/80 hover:bg-fuchsia-600 text-white text-sm font-medium transition-colors"
          >
            Next
          </button>
        )}
      </div>
      
      {showValidationErrors && errorFields.length > 0 && (
        <ValidationErrorBanner errorFields={errorFields} />
      )}
      
      {isSubmitted && submitSuccess ? (
        <SuccessMessage />
      ) : (
        <StepContent 
          currentStep={currentStep} 
          onValidationChange={(isValid, data) => setStepValidation(prev => ({ ...prev, [currentStep]: isValid }))}
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
        onSubmit={onSubmit} 
        showPrevious={currentStep !== 1} 
        isNextDisabled={false}
        isSubmitting={isSubmitting}
        isSubmitDisabled={!termsAccepted}
      />
    </div>
  );
}
