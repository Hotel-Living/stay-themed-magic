
import React from "react";

interface StepNavigationESProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  showPrevious: boolean;
  isNextDisabled?: boolean;
}

export default function StepNavigationES({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSubmit,
  showPrevious,
  isNextDisabled = false
}: StepNavigationESProps) {
  return (
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
          Enviar
        </button>
      ) : (
        <button 
          type="button" 
          onClick={onNext} 
          className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
        >
          Siguiente
        </button>
      )}
    </div>
  );
}
