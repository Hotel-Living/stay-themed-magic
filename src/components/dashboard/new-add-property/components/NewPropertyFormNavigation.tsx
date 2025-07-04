
import React from 'react';

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
  const isLastStep = currentStep === 5;

  return (
    <div className="flex justify-between items-center p-4 bg-white/10 rounded-lg">
      <div className="flex space-x-2">
        {[1, 2, 3, 4, 5].map((step) => (
          <div
            key={step}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step === currentStep
                ? 'bg-fuchsia-500 text-white'
                : step < currentStep
                ? 'bg-green-500 text-white'
                : 'bg-white/20 text-white/60'
            }`}
          >
            {step}
          </div>
        ))}
      </div>

      <div className="flex space-x-3">
        <button
          type="button"
          onClick={onPrevStep}
          disabled={!canMoveToPrevStep}
          className={`px-4 py-2 rounded-lg font-medium ${
            canMoveToPrevStep
              ? 'bg-white/20 text-white hover:bg-white/30'
              : 'bg-white/10 text-white/50 cursor-not-allowed'
          }`}
        >
          Previous
        </button>

        {isLastStep ? (
          <button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting}
            className={`px-6 py-2 rounded-lg font-medium ${
              isSubmitting
                ? 'bg-fuchsia-400 text-white cursor-not-allowed'
                : 'bg-fuchsia-500 text-white hover:bg-fuchsia-600'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        ) : (
          <button
            type="button"
            onClick={onNextStep}
            disabled={!canMoveToNextStep}
            className={`px-4 py-2 rounded-lg font-medium ${
              canMoveToNextStep
                ? 'bg-fuchsia-500 text-white hover:bg-fuchsia-600'
                : 'bg-fuchsia-400 text-white cursor-not-allowed'
            }`}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};
