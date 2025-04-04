
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import StepIndicator from "./PropertySteps/StepIndicator";
import StepNavigation from "./PropertySteps/StepNavigation";
import StepContent from "./PropertySteps/StepContent";
import ImportantNotice from "./PropertySteps/ImportantNotice";
import PriceTable from "./PropertySteps/PriceTable";

export default function AddProperty() {
  const [currentStep, setCurrentStep] = useState(1);
  const [hasNewItems, setHasNewItems] = useState(false);
  const [stepValidation, setStepValidation] = useState({
    1: false, // Basic Info
    2: false, // Location
    3: false, // Features
    4: false, // Rooms & Pricing
    5: false, // Stay Rates
    6: false, // FAQ & Terms
  });
  const totalSteps = 6;

  // Step titles in all caps
  const stepTitles = ["ADD A NEW PROPERTY", "ADD A NEW PROPERTY", "ADD A NEW PROPERTY", "ADD A NEW PROPERTY", "ADD A NEW PROPERTY", "ADD A NEW PROPERTY"];
  const { toast } = useToast();
  
  const validateStep = (step: number, isValid: boolean) => {
    setStepValidation(prev => ({
      ...prev,
      [step]: isValid
    }));
  };
  
  const goToNextStep = () => {
    if (validateCurrentStep()) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
        window.scrollTo(0, 0);
      }
    } else {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields before proceeding.",
        variant: "destructive"
      });
    }
  };
  
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const validateCurrentStep = () => {
    // Implement real validation based on the step data
    return stepValidation[currentStep];
  };
  
  const handleSubmitProperty = () => {
    if (validateCurrentStep()) {
      // Reset the form and show a success message
      toast({
        title: "Property Submitted Successfully",
        description: "Your property has been submitted for review.",
        duration: 5000
      });
      
      // Reset to step 1 after submission
      setCurrentStep(1);
      setStepValidation({
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false
      });
    } else {
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
  
  return (
    <div className="glass-card rounded-2xl p-6 bg-[#430453]">
      <StepIndicator currentStep={currentStep} totalSteps={totalSteps} stepTitle={stepTitles[currentStep - 1]} />
      
      {/* Top Navigation Controls */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={goToPreviousStep} 
          className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${currentStep === 1 ? "invisible" : "bg-fuchsia-950/80 hover:bg-fuchsia-900/80 text-fuchsia-100"}`} 
          disabled={currentStep === 1}
        >
          Previous
        </button>
        
        {currentStep === totalSteps ? (
          <button 
            onClick={handleSubmitProperty} 
            className="rounded-lg px-4 py-1.5 text-white text-sm font-medium transition-colors bg-[#a209ad]/80"
          >
            Submit
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
      
      {/* Step Content */}
      <StepContent 
        currentStep={currentStep} 
        renderPriceTable={renderPriceTable} 
        onValidationChange={(isValid) => validateStep(currentStep, isValid)}
      />
      
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
        isNextDisabled={!stepValidation[currentStep]}
      />
    </div>
  );
}
