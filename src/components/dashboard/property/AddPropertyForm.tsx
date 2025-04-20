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
    setSubmitSuccess,
    setStepValidation
  } = usePropertyForm();

  const totalSteps = 4;
  const stepTitles = [
    "ADD A NEW PROPERTY",
    "ADD A NEW PROPERTY",
    "ADD A NEW PROPERTY",
    "ADD A NEW PROPERTY"
  ];

  useEffect(() => {
    if (isSubmitted && submitSuccess) {
      sessionStorage.removeItem("propertyFormData");
    }
  }, [isSubmitted, submitSuccess]);

  const goToNextStep = async () => {
    console.log("VALIDATING STEP:", currentStep);

    // Esperar un poco para asegurar que formData se haya actualizado
    await new Promise((resolve) => setTimeout(resolve, 50));

    console.log("CURRENT FORM DATA:", formData);

    const isValid = validateCurrentStep(stepValidation, currentStep);
    const fields = getIncompleteFields(currentStep, formData);

    console.log("INCOMPLETE FIELDS:", fields);

    if (!isValid) {
      // Prevención de falsos positivos: si no es válido pero no hay campos incompletos, no mostrar el banner
      if (fields.length === 0) {
        console.log("⚠️ Campos válidos pero estado de validación no se actualizó correctamente.");
        setErrorFields([]);
        setShowValidationErrors(false);
        return;
      }

      setErrorFields(fields);
      setShowValidationErrors(true);

      toast({
        title: "Warning",
        description:
          "Some fields are incomplete. You can still proceed but please complete them later.",
        variant: "destructive",
      });
    } else {
      setErrorFields([]);
      setShowValidationErrors(false);
    }

    // Pasar al siguiente paso
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
    const invalidSteps = Object.entries(stepValidation)
      .filter(([_, isValid]) => !isValid)
      .map(([step]) => parseInt(step));

    const allIncompleteFields = invalidSteps.flatMap(step =>
      getIncompleteFields(step, formData)
    );

    if (allIncompleteFields.length > 0) {
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

    sessionStorage.removeItem("propertyFormData");

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
          onNext={goToNextStep}
          onPrevious={goToPreviousStep}
          onSubmit={handleSubmitProperty}
          isLastStep={currentStep === totalSteps}
        />
      )}

      <ImportantNotice />
    </div>
  );
}
