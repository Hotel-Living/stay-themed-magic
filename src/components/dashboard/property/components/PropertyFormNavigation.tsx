
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
  
  const totalSteps = 5;

  const handleNextClick = () => {
    console.log('Next button clicked - Step:', currentStep, 'Can move:', canMoveToNextStep, 'Valid:', isStepValid);
    onNextStep();
  };

  const handlePrevClick = () => {
    console.log('Previous button clicked - Step:', currentStep, 'Can move:', canMoveToPrevStep);
    onPrevStep();
  };

  const handleSubmitClick = () => {
    console.log('Submit button clicked - Step:', currentStep, 'Submitting:', isSubmitting);
    onSubmit();
  };
  
  return (
    <div className="flex items-center justify-between mb-6">
      <button 
        onClick={handlePrevClick} 
        className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
          !canMoveToPrevStep ? "invisible" : "bg-fuchsia-950/80 hover:bg-fuchsia-900/80 text-fuchsia-100"
        }`} 
        disabled={!canMoveToPrevStep}
      >
        {t('dashboard.previous')}
      </button>
      
      {currentStep === totalSteps ? (
        <button 
          onClick={handleSubmitClick} 
          className="rounded-lg px-4 py-1.5 text-white text-sm font-medium transition-colors bg-[#a209ad]/80 hover:bg-[#a209ad] disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? t('dashboard.submitting') : t('dashboard.submit')}
        </button>
      ) : (
        <button 
          onClick={handleNextClick} 
          className="rounded-lg px-4 py-1.5 bg-fuchsia-600/80 hover:bg-fuchsia-600 text-white text-sm font-medium transition-colors disabled:opacity-50"
          disabled={!canMoveToNextStep}
        >
          {t('dashboard.next')}
        </button>
      )}
    </div>
  );
}
