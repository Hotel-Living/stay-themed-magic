
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import StepIndicator from "./PropertySteps/StepIndicator";
import StepNavigation from "./PropertySteps/StepNavigation";
import StepContent from "./PropertySteps/StepContent";
import ImportantNotice from "./PropertySteps/ImportantNotice";
import PriceTable from "./PropertySteps/PriceTable";
import { AlertCircle } from "lucide-react";

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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorFields, setErrorFields] = useState<string[]>([]);
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
      // Show validation errors and list of incomplete fields
      const fields = getIncompleteFields(currentStep);
      setErrorFields(fields);
      
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
    // Use the stepValidation state to determine if the current step is valid
    return stepValidation[currentStep];
  };
  
  // Get list of incomplete fields based on current step
  const getIncompleteFields = (step: number): string[] => {
    switch(step) {
      case 1:
        return ["Property Name", "Property Type", "Description"];
      case 2:
        return ["Country", "City", "Address"];
      case 3:
        return ["Features", "Meal Plans"];
      case 4:
        return ["Themes", "Activities"];
      case 5:
        return ["Stay Rates"];
      case 6:
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
          4: false,
          5: false,
          6: false
        });
        setIsSubmitted(false);
      }, 5000);
    } else {
      // Show validation errors
      const fields = getIncompleteFields(currentStep);
      setErrorFields(fields);
      
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
      
      {/* Validation Error Banner */}
      {errorFields.length > 0 && (
        <div className="mb-6 p-4 border rounded-md bg-red-50 text-red-700">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 mt-0.5" />
            <div>
              <p className="font-medium">Please complete all required fields:</p>
              <ul className="list-disc pl-5 mt-2">
                {errorFields.map((field, index) => (
                  <li key={index}>{field}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      
      {/* Show success message if submitted */}
      {isSubmitted && submitSuccess ? (
        <div className="p-6 border rounded-md bg-[#5A1876]/30 text-black mb-6">
          <h3 className="text-lg font-medium mb-2">Property Submitted!</h3>
          <p>Thank you for submitting your property. It has been successfully received and is now awaiting review.</p>
          <p className="mt-2">You'll receive a notification once the review is complete.</p>
        </div>
      ) : (
        // Step Content
        <StepContent 
          currentStep={currentStep} 
          renderPriceTable={renderPriceTable} 
          onValidationChange={(isValid) => validateStep(currentStep, isValid)}
        />
      )}
      
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
