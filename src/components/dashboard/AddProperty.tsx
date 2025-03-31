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
  const totalSteps = 6;

  // Step titles in all caps
  const stepTitles = ["ADD A NEW PROPERTY", "ADD A NEW PROPERTY", "ADD A NEW PROPERTY", "ADD A NEW PROPERTY", "ADD A NEW PROPERTY", "ADD A NEW PROPERTY"];
  const {
    toast
  } = useToast();
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
    // This is a placeholder for form validation logic
    // In a real application, we would validate all required fields
    return true;
  };
  const handleSubmitProperty = () => {
    if (validateCurrentStep()) {
      if (hasNewItems) {
        toast({
          title: "Property Submitted for Review",
          description: "Your property has been submitted and is awaiting administrator approval.",
          duration: 5000
        });
      } else {
        toast({
          title: "Property Published",
          description: "Your property has been successfully published!",
          duration: 5000
        });
      }
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
  return <div className="glass-card rounded-2xl p-6 bg-[#430453]">
      <StepIndicator currentStep={currentStep} totalSteps={totalSteps} stepTitle={stepTitles[currentStep - 1]} />
      
      {/* Top Navigation Controls */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={goToPreviousStep} className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${currentStep === 1 ? "invisible" : "bg-fuchsia-950/80 hover:bg-fuchsia-900/80 text-fuchsia-100"}`} disabled={currentStep === 1}>
          Previous
        </button>
        
        {currentStep === totalSteps ? <button onClick={handleSubmitProperty} className="rounded-lg px-4 py-1.5 bg-green-600/80 hover:bg-green-600 text-white text-sm font-medium transition-colors">
            Next
          </button> : <button onClick={goToNextStep} className="rounded-lg px-4 py-1.5 bg-fuchsia-600/80 hover:bg-fuchsia-600 text-white text-sm font-medium transition-colors">
            Next
          </button>}
      </div>
      
      {/* Step Content */}
      <StepContent currentStep={currentStep} renderPriceTable={renderPriceTable} />
      
      {/* Required Fields Notification */}
      <ImportantNotice />
      
      {/* Navigation Buttons */}
      <StepNavigation currentStep={currentStep} totalSteps={totalSteps} onPrevious={goToPreviousStep} onNext={goToNextStep} onSubmit={handleSubmitProperty} showPrevious={currentStep !== 1} />
    </div>;
}