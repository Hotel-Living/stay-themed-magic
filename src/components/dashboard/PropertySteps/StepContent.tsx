
import React from "react";
import BasicPropertyInfo from "./steps/BasicPropertyInfo";
import RoomTypesStep from "./StepTwo";
import ThemesStep from "./StepThree";
import TermsStep from "./StepFour";

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
  onNext,
  onPrevious,
  onSubmit,
  isLastStep
}: StepContentProps) {
  return (
    <div>
      {currentStep === 1 && <BasicPropertyInfo />}
      {currentStep === 2 && <RoomTypesStep />}
      {currentStep === 3 && <ThemesStep />}
      {currentStep === 4 && <TermsStep />}

      <div className="flex justify-between mt-6">
        {currentStep > 1 && (
          <button
            onClick={onPrevious}
            className="rounded-lg px-4 py-2 text-sm font-medium transition-colors bg-fuchsia-950/80 hover:bg-fuchsia-900/80 text-fuchsia-100"
          >
            Previous
          </button>
        )}
        <div className="ml-auto">
          {!isLastStep ? (
            <button
              onClick={onNext}
              className="rounded-lg px-4 py-2 text-sm font-medium transition-colors bg-fuchsia-600/80 hover:bg-fuchsia-600 text-white"
            >
              Next
            </button>
          ) : (
            <button
              onClick={onSubmit}
              className="rounded-lg px-4 py-2 text-sm font-medium transition-colors bg-[#a209ad]/80 text-white"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
