
import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  showPrevious?: boolean;
  isNextDisabled?: boolean;
  isSubmitting?: boolean;
  termsAccepted?: boolean;
}

export default function StepNavigation({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSubmit,
  showPrevious = true,
  isNextDisabled = false,
  isSubmitting = false,
  termsAccepted = false
}: StepNavigationProps) {
  return (
    <div className="flex items-center justify-between mt-8">
      {showPrevious ? (
        <button
          onClick={onPrevious}
          className="rounded-lg px-4 py-2 text-white text-sm font-medium transition-colors bg-fuchsia-950/80 hover:bg-fuchsia-900/80 flex items-center gap-2"
          disabled={isSubmitting}
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </button>
      ) : (
        <div></div>
      )}

      {currentStep < totalSteps ? (
        <button
          onClick={onNext}
          className="rounded-lg px-4 py-2 text-white text-sm font-medium transition-colors bg-fuchsia-600/80 hover:bg-fuchsia-600 flex items-center gap-2"
          disabled={isNextDisabled || isSubmitting}
        >
          Next
          <ArrowRight className="h-4 w-4" />
        </button>
      ) : (
        <button
          onClick={onSubmit}
          className={`rounded-lg px-4 py-2 text-white text-sm font-medium transition-colors ${
            !termsAccepted 
              ? "bg-gray-500/80 cursor-not-allowed" 
              : "bg-[#a209ad]/80 hover:bg-[#a209ad]"
          }`}
          disabled={isSubmitting || !termsAccepted}
          title={!termsAccepted ? "You must accept the Terms & Conditions" : ""}
        >
          {isSubmitting ? "Submitting..." : "Submit Property"}
        </button>
      )}
    </div>
  );
}
