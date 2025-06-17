
import React from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

interface PropertyFormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

const PropertyFormNavigation: React.FC<PropertyFormNavigationProps> = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSubmit
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-between items-center mt-6">
      <Button
        onClick={onPrevious}
        disabled={currentStep === 1}
        variant="outline"
        className="px-6 py-2"
      >
        Previous
      </Button>

      {currentStep < totalSteps ? (
        <Button
          onClick={onNext}
          className="px-6 py-2 bg-fuchsia-600 hover:bg-fuchsia-700"
        >
          Next
        </Button>
      ) : (
        <Button
          onClick={onSubmit}
          className="px-6 py-2 bg-green-600 hover:bg-green-700"
        >
          Submit
        </Button>
      )}
    </div>
  );
};

export default PropertyFormNavigation;
