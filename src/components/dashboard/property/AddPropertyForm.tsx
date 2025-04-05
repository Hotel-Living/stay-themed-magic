
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
    // Basic Info
    2: false,
    // Accommodation Terms (formerly Step Three)
    3: false,
    // Themes & Activities (formerly Step Four)
    4: false,
    // FAQ & Terms (formerly Step Five)
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorFields, setErrorFields] = useState<string[]>([]);
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const totalSteps = 4; // Changed from 5 to 4

  // Step titles in all caps
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

  // Modified to allow navigation regardless of validation state
  const goToNextStep = () => {
    // Check validation but proceed anyway
    if (!validateCurrentStep()) {
      // Show validation errors and list of incomplete fields
      const fields = getIncompleteFields(currentStep);
      setErrorFields(fields);
      setShowValidationErrors(true);
      
      toast({
        title: "Warning",
        description: "Some fields are incomplete. You can still proceed but please complete them later.",
        variant: "destructive"
      });
    } else {
      // Clear any existing validation errors if step is valid
      setErrorFields([]);
      setShowValidationErrors(false);
    }
    
    // Always proceed to next step
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
    // Use the stepValidation state to determine if the current step is valid
    return stepValidation[currentStep];
  };

  // Get list of incomplete fields based on current step
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
    if (validateCurrentStep()) {
      // Set submitted state
      setIsSubmitted(true);
      setSubmitSuccess(true);

      // Reset the form and show a success message
      toast({
        title: "Property Submitted Successfully",
        description: "Your property has been submitted for review.",
        duration: 5000
      });

      // After a delay, reset the form
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
    } else {
      // Show validation errors
      const fields = getIncompleteFields(currentStep);
      setErrorFields(fields);
      setShowValidationErrors(true);
      
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields before submitting.",
        variant: "destructive"
      });
    }
  };

  // Helper function to render price table
  const renderPriceTable = (roomType: string, mealTypes: string[], stayDurations: number[]) => {
    return <PriceTable roomType={roomType} mealTypes={mealTypes} stayDurations={stayDurations} />;
  };
  
  return <div className="glass-card rounded-2xl p-6 py-[25px] px-[21px] bg-[#741098]">
      <StepIndicator currentStep={currentStep} totalSteps={totalSteps} stepTitle={stepTitles[currentStep - 1]} />
      
      {/* Top Navigation Controls */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={goToPreviousStep} className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${currentStep === 1 ? "invisible" : "bg-fuchsia-950/80 hover:bg-fuchsia-900/80 text-fuchsia-100"}`} disabled={currentStep === 1}>
          Previous
        </button>
        
        {currentStep === totalSteps ? <button onClick={handleSubmitProperty} className="rounded-lg px-4 py-1.5 text-white text-sm font-medium transition-colors bg-[#a209ad]/80">
            Submit
          </button> : <button onClick={goToNextStep} className="rounded-lg px-4 py-1.5 bg-fuchsia-600/80 hover:bg-fuchsia-600 text-white text-sm font-medium transition-colors">
            Next
          </button>}
      </div>
      
      {/* Validation Error Banner */}
      {showValidationErrors && errorFields.length > 0 && <ValidationErrorBanner errorFields={errorFields} />}
      
      {/* Show success message if submitted */}
      {isSubmitted && submitSuccess ? <SuccessMessage /> :
        // Step Content
        <StepContent 
          currentStep={currentStep} 
          renderPriceTable={renderPriceTable} 
          onValidationChange={isValid => validateStep(currentStep, isValid)} 
        />
      }
      
      {/* Required Fields Notification */}
      <ImportantNotice />
      
      {/* Navigation Buttons */}
      <StepNavigation 
        currentStep={currentStep} 
        totalSteps={totalSteps} 
        onPrevious={goToPreviousStep} 
        onNext={goToNextStep} 
        onSubmit={handleSubmitProperty} 
        showPrevious={currentStep !== 1} 
        isNextDisabled={false} // Changed from !stepValidation[currentStep] to always false
      />
    </div>;
}

// Import PriceTable here to avoid circular dependencies
import PriceTable from "../PropertySteps/PriceTable";
