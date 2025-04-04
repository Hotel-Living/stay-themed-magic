
import React from "react";
import RoomsAndPricingStep from "./RoomsAndPricingStep";

interface StepTwoProps {
  onValidationChange?: (isValid: boolean) => void;
}

export default function StepTwo({ onValidationChange = () => {} }: StepTwoProps) {
  return (
    <div className="space-y-8">
      <RoomsAndPricingStep />
    </div>
  );
}
