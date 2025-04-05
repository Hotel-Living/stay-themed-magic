
import React from "react";
import HotelFaqAndTermsStep from "./HotelFaqAndTermsStep";

interface StepFiveProps {
  onValidationChange?: (isValid: boolean) => void;
}

export default function StepFive({ onValidationChange = () => {} }: StepFiveProps) {
  return (
    <div className="space-y-8">
      <h3 className="text-lg font-semibold uppercase mb-4">FAQ & TERMS AND CONDITIONS</h3>
      
      <div className="bg-fuchsia-900/10 rounded-lg p-6">
        <HotelFaqAndTermsStep onValidationChange={onValidationChange} />
      </div>
    </div>
  );
}
