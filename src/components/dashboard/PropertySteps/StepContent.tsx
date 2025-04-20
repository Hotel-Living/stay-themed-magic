
import React from "react";
import BasicPropertyInfo from "./steps/BasicPropertyInfo";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import { Button } from "@/components/ui/button";

interface StepContentProps {
  currentStep: number;
  formData: any;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
  isLastStep: boolean;
  isValid: boolean;
}

export default function StepContent({
  currentStep,
  formData,
  onNext,
  onPrevious,
  onSubmit,
  isLastStep,
  isValid
}: StepContentProps) {
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicPropertyInfo />;
      case 2:
        return <StepTwo />;
      case 3:
        return <StepThree />;
      case 4:
        return <StepFour />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {renderStep()}

      <div className="flex justify-between pt-4">
        {currentStep > 1 && (
          <Button
            variant="outline"
            className="bg-fuchsia-950/80 hover:bg-fuchsia-900/80 text-fuchsia-100"
            onClick={onPrevious}
          >
            Previous
          </Button>
        )}
        <div className="flex justify-end space-x-2">
          {!isLastStep ? (
            <Button 
              variant="default"
              className="bg-fuchsia-600/80 hover:bg-fuchsia-600 text-white"
              onClick={onNext}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="default"
              className="bg-[#a209ad]/80 text-white"
              onClick={onSubmit}
            >
              Submit Property
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
