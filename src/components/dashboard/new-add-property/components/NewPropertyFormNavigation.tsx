
import React from 'react';
import { Button } from "@/components/ui/button";
import { useTranslation } from '@/hooks/useTranslation';

interface NewPropertyFormNavigationProps {
  currentStep: number;
  isStepValid: boolean;
  canMoveToNextStep: boolean;
  canMoveToPrevStep: boolean;
  onNextStep: () => void;
  onPrevStep: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export const NewPropertyFormNavigation: React.FC<NewPropertyFormNavigationProps> = ({
  currentStep,
  isStepValid,
  canMoveToNextStep,
  canMoveToPrevStep,
  onNextStep,
  onPrevStep,
  onSubmit,
  isSubmitting
}) => {
  const { t } = useTranslation();

  const handleNextClick = () => {
    if (!isStepValid) {
      // Dispatch event to trigger validation error display
      window.dispatchEvent(new CustomEvent('attemptStepNavigation'));
    } else {
      onNextStep();
    }
  };

  const handleSubmitClick = () => {
    if (!isStepValid) {
      // Dispatch event to trigger validation error display
      window.dispatchEvent(new CustomEvent('attemptStepNavigation'));
    } else {
      onSubmit();
    }
  };

  return (
    <div className="flex justify-between items-center py-4">
      <Button
        onClick={onPrevStep}
        disabled={!canMoveToPrevStep}
        variant="outline"
        className="bg-purple-800/50 border-purple-600 text-white hover:bg-purple-700 disabled:opacity-50"
      >
        {t('dashboard.previous')}
      </Button>

      <div className="flex items-center space-x-2">
        <span className="text-white text-sm">
          {t('dashboard.step1Of5').replace('1', currentStep.toString())}
        </span>
      </div>

      {currentStep === 5 ? (
        <Button
          onClick={handleSubmitClick}
          disabled={isSubmitting}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          {isSubmitting ? t('dashboard.submitting') : t('dashboard.submit')}
        </Button>
      ) : (
        <Button
          onClick={handleNextClick}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          {t('dashboard.next')}
        </Button>
      )}
    </div>
  );
};
