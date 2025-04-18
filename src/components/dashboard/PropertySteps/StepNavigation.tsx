
import React from "react";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  showPrevious?: boolean;
  isNextDisabled?: boolean;
  isSubmitting?: boolean;
}

export default function StepNavigation({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSubmit,
  showPrevious = true,
  isNextDisabled = false,
  isSubmitting = false
}: StepNavigationProps) {
  return (
    <div className="flex items-center justify-between mt-8">
      {showPrevious ? (
        <button
          onClick={onPrevious}
          className="rounded-lg px-4 py-2 text-white text-sm font-medium transition-colors bg-fuchsia-950/80 hover:bg-fuchsia-900/80"
          disabled={isSubmitting}
        >
          Previous
        </button>
      ) : (
        <div></div>
      )}

      {currentStep < totalSteps ? (
        <button
          onClick={onNext}
          className="rounded-lg px-4 py-2 text-white text-sm font-medium transition-colors bg-fuchsia-600/80 hover:bg-fuchsia-600"
          disabled={isNextDisabled || isSubmitting}
        >
          Next
        </button>
      ) : (
        <button
          onClick={onSubmit}
          className="rounded-lg px-4 py-2 text-white text-sm font-medium transition-colors bg-[#a209ad]/80 hover:bg-[#a209ad]"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Property"}
        </button>
      )}
    </div>
  );
}
