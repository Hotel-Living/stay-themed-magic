
import React from 'react';
import { Button } from "@/components/ui/button";

interface FormNavigationProps {
  currentStep: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isLastStep?: boolean;
  isValid?: boolean;
}

export default function FormNavigation({
  currentStep,
  onPrevious,
  onNext,
  onSubmit,
  isLastStep = false,
  isValid = false
}: FormNavigationProps) {
  const totalSteps = 4;

  return (
    <div className="flex items-center justify-between mb-3">
      <button
        onClick={onPrevious}
        className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
          currentStep === 1
            ? "invisible"
            : "bg-fuchsia-950/80 hover:bg-fuchsia-900/80 text-fuchsia-100"
        }`}
        disabled={currentStep === 1}
      >
        Previous
      </button>

      {currentStep === totalSteps || isLastStep ? (
        <button
          onClick={onSubmit}
          className="rounded-lg px-4 py-1.5 text-white text-sm font-medium transition-colors bg-[#a209ad]/80"
          disabled={!isValid && currentStep === totalSteps}
        >
          Submit Property
        </button>
      ) : (
        <button
          onClick={onNext}
          className="rounded-lg px-4 py-1.5 bg-fuchsia-600/80 hover:bg-fuchsia-600 text-white text-sm font-medium transition-colors"
          disabled={!isValid && currentStep === totalSteps}
        >
          Next
        </button>
      )}
    </div>
  );
}
