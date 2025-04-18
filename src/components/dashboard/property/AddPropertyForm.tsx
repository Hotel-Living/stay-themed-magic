
import React, { useEffect } from "react";
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
  const stepTitles = ["ADD A NEW PROPERTY", "ROOMS & PRICING", "THEMES & ACTIVITIES", "FAQ & TERMS"];
  
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
    setFormData,
    user,
    navigate,
    toast
  } = usePropertyForm();

  const { handleSubmitProperty } = usePropertySubmission();
  const { handleStepNavigation } = useStepNavigation();

  // Debug current step and validation state
  useEffect(() => {
    console.log("Current step:", currentStep);
    console.log("Step validation state:", stepValidation);
  }, [currentStep, stepValidation]);

  const goToNextStep = () => {
    console.log("Attempting to go to next step from", currentStep);
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

  const handleStepValidationChange = (isValid: boolean, data?: any) => {
    console.log(`Step ${currentStep} validation changed:`, isValid, data);
    
    // Update step validation state
    setStepValidation(prev => ({ ...prev, [currentStep]: isValid }));
    
    // Update form data if provided
    if (data) {
      const newFormData = { ...formData };
      
      switch (currentStep) {
        case 1:
          newFormData.basicInfo = { ...newFormData.basicInfo, ...data };
          break;
        case 2:
          if (data.roomTypes) newFormData.roomTypes = data.roomTypes;
          if (data.stayLengths) newFormData.accommodationTerms.stayLengths = data.stayLengths;
          if (data.mealPlans) newFormData.accommodationTerms.mealPlans = data.mealPlans;
          break;
        case 3:
          newFormData.themesAndActivities = { ...newFormData.themesAndActivities, ...data };
          break;
        case 4:
          if (data.termsAccepted !== undefined) newFormData.termsAccepted = data.termsAccepted;
          break;
      }
      
      setFormData(newFormData);
    }
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
          onValidationChange={handleStepValidationChange}
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
