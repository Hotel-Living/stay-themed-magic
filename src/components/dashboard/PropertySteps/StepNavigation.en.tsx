
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

interface StepNavigationENProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  showPrevious: boolean;
  isNextDisabled?: boolean;
}

export default function StepNavigationEN({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSubmit,
  showPrevious,
  isNextDisabled = false
}: StepNavigationENProps) {
  const { t } = useTranslation();
  
  return (
    <div>
      <div className="flex justify-end mb-2">
        <span className="text-white/70 text-sm">Step {currentStep} of {totalSteps}</span>
      </div>
      
      <div className="flex items-center justify-between mt-8">
        {showPrevious ? (
          <button 
            type="button"
            onClick={onPrevious} 
            className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors text-fuchsia-100 bg-[#f749f7]"
          >
            {t('dashboard.navigation.previous')}
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
            {t('dashboard.navigation.submit')}
          </button>
        ) : (
          <button 
            type="button" 
            onClick={onNext} 
            className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
          >
            {t('dashboard.navigation.next')}
          </button>
        )}
      </div>
    </div>
  );
}
