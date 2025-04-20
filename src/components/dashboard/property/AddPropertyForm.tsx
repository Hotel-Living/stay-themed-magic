
import React from "react";
import StepIndicator from "../PropertySteps/StepIndicator";
import StepContent from "../PropertySteps/StepContent";
import ImportantNotice from "../PropertySteps/ImportantNotice";
import ValidationErrorBanner from "./ValidationErrorBanner";
import SuccessMessage from "./SuccessMessage";
import PropertyFormNavigation from "./components/PropertyFormNavigation";
import { usePropertyForm } from "./hooks/usePropertyForm";

export default function AddPropertyForm() {
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
    getIncompleteFields,
    toast
  } = usePropertyForm();

  const totalSteps = 4;
  const stepTitles = ["ADD A NEW PROPERTY", "ADD A NEW PROPERTY", "ADD A NEW PROPERTY", "ADD A NEW PROPERTY"];

  const validateCurrentStep = () => {
    return stepValidation[currentStep];
  };

  const goToNextStep = () => {
    if (!validateCurrentStep()) {
      const fields = getIncompleteFields(currentStep);
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
      
      const allIncompleteFields = invalidSteps.flatMap(step => getIncompleteFields(step));
      setErrorFields(allIncompleteFields);
      setShowValidationErrors(true);
      
      toast({
        title: "Cannot Submit Property",
        description: "Please complete all required fields before submitting.",
        variant: "destructive"
      });
      return;
    }

    console.log('Submitting form data:', formData);
    setIsSubmitted(true);
    setSubmitSuccess(true);
    
    toast({
      title: "Property Submitted Successfully",
      description: "Your property has been submitted for review.",
      duration: 5000
    });
    
    setTimeout(() => {
      setCurrentStep(1);
      setIsSubmitted(false);
      setFormData({
        hotelName: "",
        propertyType: "",
        description: "",
        country: "",
        address: "",
        city: "",
        postalCode: "",
        contactName: "",
        contactEmail: "",
        contactPhone: "",
        category: "",
        stayLengths: [],
        mealPlans: [],
        roomTypes: [],
        themes: [],
        activities: [],
        faqs: [],
        terms: "",
        termsAccepted: false
      });
    }, 5000);
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    console.log('Updated form data:', field, value);
  };

  return (
    <div className="glass-card rounded-2xl p-4 py-[20px] px-[18px] bg-[#7a0486]">
      <StepIndicator 
        currentStep={currentStep} 
        totalSteps={totalSteps} 
        stepTitle={stepTitles[currentStep - 1]} 
      />
      
      <PropertyFormNavigation
        currentStep={currentStep}
        totalSteps={totalSteps}
        onPrevious={goToPreviousStep}
        onNext={goToNextStep}
        onSubmit={handleSubmitProperty}
      />
      
      {showValidationErrors && errorFields.length > 0 && (
        <ValidationErrorBanner errorFields={errorFields} />
      )}
      
      {isSubmitted && submitSuccess ? (
        <SuccessMessage />
      ) : (
        <StepContent 
          currentStep={currentStep}
          onValidationChange={isValid => validateStep(currentStep, isValid)}
          formData={formData}
          updateFormData={updateFormData}
        />
      )}
      
      <ImportantNotice />
      
      <PropertyFormNavigation
        currentStep={currentStep}
        totalSteps={totalSteps}
        onPrevious={goToPreviousStep}
        onNext={goToNextStep}
        onSubmit={handleSubmitProperty}
      />
    </div>
  );
}
