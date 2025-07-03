
import React from 'react';
import { useTranslation } from "@/hooks/useTranslation";

interface PropertyFormNavigationProps {
  currentStep: number;
  isStepValid: boolean;
  canMoveToNextStep: boolean;
  canMoveToPrevStep: boolean;
  onNextStep: () => void;
  onPrevStep: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export default function PropertyFormNavigation({
  currentStep,
  isStepValid,
  canMoveToNextStep,
  canMoveToPrevStep,
  onNextStep,
  onPrevStep,
  onSubmit,
  isSubmitting
}: PropertyFormNavigationProps) {
  const { t } = useTranslation();
  
  const totalSteps = 5; // Assuming 5 steps total
  
  return (
    <div className="flex items-center justify-between mb-3">
      <button 
        onClick={onPrevStep} 
        className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
          !canMoveToPrevStep ? "invisible" : "bg-fuchsia-950/80 hover:bg-fuchsia-900/80 text-fuchsia-100"
        }`} 
        disabled={!canMoveToPrevStep}
      >
        {t('dashboard.navigation.previous')}
      </button>
      
      {currentStep === totalSteps ? (
        <button 
          onClick={onSubmit} 
          className="rounded-lg px-4 py-1.5 text-white text-sm font-medium transition-colors bg-[#a209ad]/80"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : t('dashboard.navigation.submit')}
        </button>
      ) : (
        <button 
          onClick={onNextStep} 
          className="rounded-lg px-4 py-1.5 bg-fuchsia-600/80 hover:bg-fuchsia-600 text-white text-sm font-medium transition-colors"
          disabled={!canMoveToNextStep}
        >
          {t('dashboard.navigation.next')}
        </button>
      )}
    </div>
  );
}
