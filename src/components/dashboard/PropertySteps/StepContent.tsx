
import React from "react";
import StepOne from "./steps/BasicPropertyInfo";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";

interface StepContentProps {
  currentStep: number;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
  isLastStep: boolean;
}

export default function StepContent({
  currentStep,
  onNext,
  onPrevious,
  onSubmit,
  isLastStep
}: StepContentProps) {
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepOne />;
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

      <div className="flex justify-between mt-6">
        {currentStep > 1 && (
          <button
            className="bg-white text-purple-800 px-4 py-2 rounded-lg font-semibold"
            onClick={onPrevious}
          >
            Previous
          </button>
        )}

        <div className="flex-1" />

        <button
          className={`px-4 py-2 rounded-lg text-white font-semibold ${
            isLastStep ? "bg-green-600" : "bg-purple-700"
          }`}
          onClick={isLastStep ? onSubmit : onNext}
        >
          {isLastStep ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
}
