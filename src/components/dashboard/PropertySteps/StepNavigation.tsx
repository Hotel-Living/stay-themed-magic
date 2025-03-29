
import React from "react";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  showPrevious?: boolean;
}

export default function StepNavigation({ 
  currentStep, 
  totalSteps, 
  onPrevious, 
  onNext, 
  onSubmit,
  showPrevious = true 
}: StepNavigationProps) {
  return (
    <div className="flex items-center justify-between">
      <button
        onClick={onPrevious}
        className={`rounded-lg px-6 py-2 text-sm font-medium transition-colors ${
          !showPrevious || currentStep === 1 
            ? "bg-fuchsia-800/20 text-fuchsia-300/50 cursor-not-allowed" 
            : "bg-fuchsia-950/80 hover:bg-fuchsia-900/80 text-fuchsia-100"
        }`}
        disabled={!showPrevious || currentStep === 1}
      >
        Previous
      </button>
      
      {currentStep === totalSteps ? (
        <button
          onClick={onSubmit}
          className="rounded-lg px-6 py-2 bg-green-600/80 hover:bg-green-600 text-white text-sm font-medium transition-colors"
        >
          Submit Property
        </button>
      ) : (
        <button
          onClick={onNext}
          className="rounded-lg px-6 py-2 bg-fuchsia-600/80 hover:bg-fuchsia-600 text-white text-sm font-medium transition-colors"
        >
          Next
        </button>
      )}
    </div>
  );
}
