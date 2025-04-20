
import React from "react";
import BasicPropertyInfo from "./steps/BasicPropertyInfo";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";

interface StepContentProps {
  currentStep: number;
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
  isLastStep: boolean;
  isValid: boolean;
}

export default function StepContent({
  currentStep,
  formData,
  updateFormData,
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
          <button
            onClick={onPrevious}
            className="rounded-lg px-4 py-1.5 text-sm font-medium transition-colors bg-fuchsia-950/80 hover:bg-fuchsia-900/80 text-fuchsia-100"
          >
            Previous
          </button>
        )}
        <div className="flex justify-end space-x-2">
          {!isLastStep ? (
            <button
              onClick={onNext}
              className="rounded-lg px-4 py-1.5 bg-fuchsia-600/80 hover:bg-fuchsia-600 text-white text-sm font-medium transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              onClick={onSubmit}
              className="rounded-lg px-4 py-1.5 bg-[#a209ad]/80 text-white text-sm font-medium transition-colors"
              disabled={!isValid}
            >
              Submit Property
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
