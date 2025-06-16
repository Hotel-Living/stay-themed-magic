
import React from 'react';
import { useTranslation } from "@/hooks/useTranslation";

interface PropertyFormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export default function PropertyFormNavigation({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSubmit
}: PropertyFormNavigationProps) {
  const { t } = useTranslation();
  
  return (
    <div className="flex justify-between mt-6 pt-4 border-t border-white/20">
      <button
        type="button"
        onClick={onPrevious}
        disabled={currentStep === 1}
        className={`px-6 py-2 rounded-lg transition-colors ${
          currentStep === 1
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
            : 'bg-gray-700 text-white hover:bg-gray-600'
        }`}
      >
        {t('buttons.previous')}
      </button>
      
      {currentStep < totalSteps ? (
        <button
          type="button"
          onClick={onNext}
          className="px-6 py-2 bg-fuchsia-600 text-white rounded-lg hover:bg-fuchsia-700 transition-colors"
        >
          {t('buttons.next')}
        </button>
      ) : (
        <button
          type="button"
          onClick={onSubmit}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          {t('buttons.submit')}
        </button>
      )}
    </div>
  );
}
