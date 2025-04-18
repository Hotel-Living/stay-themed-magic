
import React from 'react';
import { Button } from "@/components/ui/button";

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  termsAccepted: boolean;
}

export const FormNavigation: React.FC<FormNavigationProps> = ({
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  onSubmit,
  isSubmitting,
  termsAccepted
}) => {
  return (
    <div className="flex items-center justify-between mb-3">
      <button 
        onClick={onPrevious} 
        className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
          currentStep === 1 ? "invisible" : "bg-fuchsia-950/80 hover:bg-fuchsia-900/80 text-fuchsia-100"
        }`} 
        disabled={currentStep === 1}
      >
        Previous
      </button>
      
      {currentStep === totalSteps ? (
        <button 
          onClick={onSubmit} 
          className="rounded-lg px-4 py-1.5 text-white text-sm font-medium transition-colors bg-[#a209ad]/80 hover:bg-[#a209ad]"
          disabled={isSubmitting || !termsAccepted}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      ) : (
        <button 
          onClick={onNext} 
          className="rounded-lg px-4 py-1.5 bg-fuchsia-600/80 hover:bg-fuchsia-600 text-white text-sm font-medium transition-colors"
        >
          Next
        </button>
      )}
    </div>
  );
};
