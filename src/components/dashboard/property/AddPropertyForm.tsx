import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import StepIndicator from "../PropertySteps/StepIndicator";
import StepNavigation from "../PropertySteps/StepNavigation";
import StepContent from "../PropertySteps/StepContent";
import ImportantNotice from "../PropertySteps/ImportantNotice";
import ValidationErrorBanner from "./ValidationErrorBanner";
import SuccessMessage from "./SuccessMessage";
import { StepValidationState } from "./types";

export default function AddPropertyForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [hasNewItems, setHasNewItems] = useState(false);
  const [stepValidation, setStepValidation] = useState<StepValidationState>({
    1: false,
    2: false,
    3: false,
    4: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorFields, setErrorFields] = useState<string[]>([]);
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const totalSteps = 4;

  const stepTitles = ["ADD A NEW PROPERTY", "ADD A NEW PROPERTY", "ADD A NEW PROPERTY", "ADD A NEW PROPERTY"];
  const {
    toast
  } = useToast();

  const validateStep = (step: number, isValid: boolean) => {
    setStepValidation(prev => ({
      ...prev,
      [step]: isValid
    }));
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

  const validateCurrentStep = () => {
    return stepValidation[currentStep];
  };

  const getIncompleteFields = (step: number): string[] => {
    switch (step) {
      case 1:
        return ["Property Name", "Property Type", "Description"];
      case 2:
        return ["Accommodation Terms", "Meal Plans"];
      case 3:
        return ["Themes", "Activities"];
      case 4:
        return ["FAQ", "Terms & Conditions"];
      default:
        return [];
    }
  };

  const handleSubmitProperty = () => {
    const invalidSteps = Object.entries(stepValidation).filter(([_, isValid]) => !isValid).map(([step]) => parseInt(step));
    if (invalidSteps.length > 0) {
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

    setIsSubmitted(true);
    setSubmitSuccess(true);

    toast({
      title: "Property Submitted Successfully",
      description: "Your property has been submitted for review.",
      duration: 5000
    });

    setTimeout(() => {
      setCurrentStep(1);
      setStepValidation({
        1: false,
        2: false,
        3: false,
        4: false
      });
      setIsSubmitted(false);
    }, 5000);
  };

  const renderPriceTable = (roomType: string, mealTypes: string[], stayDurations: number[]) => {
    return <PriceTable roomType={roomType} mealTypes={mealTypes} stayDurations={stayDurations} />;
  };

  return <div className="glass-card rounded-2xl p-4 py-[20px] px-[18px] bg-[#7a0486]">
      <StepIndicator currentStep={currentStep} totalSteps={totalSteps} stepTitle={stepTitles[currentStep - 1]} />
      
      <div className="flex items-center justify-between mb-3">
        <button onClick={goToPreviousStep} className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${currentStep === 1 ? "invisible" : "bg-fuchsia-950/80 hover:bg-fuchsia-900/80 text-fuchsia-100"}`} disabled={currentStep === 1}>
          Previous
        </button>
        
        {currentStep === totalSteps ? <button onClick={handleSubmitProperty} className="rounded-lg px-4 py-1.5 text-white text-sm font-medium transition-colors bg-[#a209ad]/80">
            Submit
          </button> : <button onClick={goToNextStep} className="rounded-lg px-4 py-1.5 bg-fuchsia-600/80 hover:bg-fuchsia-600 text-white text-sm font-medium transition-colors">
            Next
          </button>}
      </div>
      
      {showValidationErrors && errorFields.length > 0 && <ValidationErrorBanner errorFields={errorFields} />}
      
      {isSubmitted && submitSuccess ? <SuccessMessage /> :
    <StepContent currentStep={currentStep} renderPriceTable={renderPriceTable} onValidationChange={isValid => validateStep(currentStep, isValid)} />}
      
      <ImportantNotice />
      
      <StepNavigation currentStep={currentStep} totalSteps={totalSteps} onPrevious={goToPreviousStep} onNext={goToNextStep} onSubmit={handleSubmitProperty} showPrevious={currentStep !== 1} isNextDisabled={false} />
    </div>;
}

import PriceTable from "../PropertySteps/PriceTable";
