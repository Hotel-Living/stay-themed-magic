
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  showPrevious: boolean;
  isNextDisabled?: boolean;
}

export default function StepNavigation({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSubmit,
  showPrevious,
  isNextDisabled = false
}: StepNavigationProps) {
  const { t } = useTranslation();
  
  return (
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
        <div></div> // Empty div to maintain flex layout
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
  );
}
