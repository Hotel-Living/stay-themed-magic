
import React, { useEffect } from "react";
import StepIndicator from "../PropertySteps/StepIndicator";
import StepContent from "../PropertySteps/StepContent";
import ImportantNotice from "../PropertySteps/ImportantNotice";
import ValidationErrorBanner from "./ValidationErrorBanner";
import SuccessMessage from "./SuccessMessage";
import usePropertyForm from "@/hooks/usePropertyForm";
import { getIncompleteFields, validateCurrentStep } from "@/utils/propertyFormUtils";

export default function AddPropertyForm() {
  const {
    currentStep,
    setCurrentStep,
    stepValidation,
    isSubmitted,
    submitSuccess,
    errorFields,
    setErrorFields,
    showValidationErrors,
    setShowValidationErrors,
    formData,
    updateFormData,
    toast,
    setIsSubmitted,
    setSubmitSuccess
  } = usePropertyForm();

  const totalSteps = 4;
  const stepTitles = ["ADD A NEW PROPERTY", "ADD A NEW PROPERTY", "ADD A NEW PROPERTY", "ADD A NEW PROPERTY"];

  // Only clear session storage on successful submission
  useEffect(() => {
    if (isSubmitted && submitSuccess) {
      console.log("Clearing sessionStorage on successful submission");
      sessionStorage.removeItem('propertyFormData');
    }
  }, [isSubmitted, submitSuccess]);

  const goToNextStep = () => {
    const fields = getIncompleteFields(currentStep, formData);
    if (!validateCurrentStep(stepValidation, currentStep)) {
      setErrorFields(fields);
      setShowValidationErrors(true);
      toast({
        title: "Warning",
        description: "Some fields are incomplete. You can still proceed but please complete them later.",
        variant: "destructive"
      });
    } else {
      setErrorFields([]);
      setShowValidationErrors(false);
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmitProperty = () => {
    const allStepsValid = Object.values(stepValidation).every(isValid => isValid);
    
    if (!allStepsValid) {
      const invalidSteps = Object.entries(stepValidation)
        .filter(([_, isValid]) => !isValid)
        .map(([step]) => parseInt(step));
      
      const allIncompleteFields = invalidSteps.flatMap(step => getIncompleteFields(step, formData));
      setErrorFields(allIncompleteFields);
      setShowValidationErrors(true);
      
      toast({
        title: "Cannot Submit Property",
        description: "Please complete all required fields before submitting.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitted(true);
    setSubmitSuccess(true);
    
    toast({
      title: "Property Submitted Successfully",
      description: "Your property has been submitted for review.",
      duration: 5000
    });
    
    // Clear session storage after successful submission
    sessionStorage.removeItem('propertyFormData');
    
    setTimeout(() => {
      setCurrentStep(1);
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <div className="glass-card rounded-2xl p-4 py-[20px] px-[18px] bg-[#7a0486]">
      <StepIndicator 
        currentStep={currentStep} 
        totalSteps={totalSteps} 
        stepTitle={stepTitles[currentStep - 1]} 
      />
      
      {showValidationErrors && errorFields.length > 0 && (
        <ValidationErrorBanner errorFields={errorFields} />
      )}
      
      {isSubmitted && submitSuccess ? (
        <SuccessMessage />
      ) : (
        <StepContent 
          currentStep={currentStep}
          formData={formData}
          updateFormData={updateFormData}
          onNext={goToNextStep}
          onPrevious={goToPreviousStep}
          onSubmit={handleSubmitProperty}
          isLastStep={currentStep === totalSteps}
          isValid={stepValidation[currentStep] || false}
        />
      )}
      
      <ImportantNotice />
    </div>
  );
}
