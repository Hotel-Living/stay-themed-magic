
import React from "react";

interface StepNavigationROProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  showPrevious: boolean;
  isNextDisabled?: boolean;
}

export default function StepNavigationRO({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSubmit,
  showPrevious,
  isNextDisabled = false
}: StepNavigationROProps) {
  return (
    <div>
      <div className="flex justify-end mb-2">
        <span className="text-white/70 text-sm">Pasul {currentStep} din {totalSteps}</span>
      </div>
      
      <div className="flex items-center justify-between mt-8">
        {showPrevious ? (
          <button 
            type="button" 
            onClick={onPrevious} 
            className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors text-fuchsia-100 bg-[#f749f7]"
          >
            Anterior
          </button>
        ) : (
          <div></div>
        )}
        
        {currentStep === totalSteps ? (
          <button 
            type="button" 
            onClick={onSubmit} 
            className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
          >
            Trimite
          </button>
        ) : (
          <button 
            type="button" 
            onClick={onNext} 
            className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
          >
            Următorul
          </button>
        )}
      </div>
    </div>
  );
}
