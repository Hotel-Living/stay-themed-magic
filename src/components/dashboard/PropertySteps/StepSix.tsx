
import React from "react";
import HotelFaqAndTermsStep from "./HotelFaqAndTermsStep";

interface StepSixProps {
  onValidationChange?: (isValid: boolean) => void;
}

export default function StepSix({ onValidationChange = () => {} }: StepSixProps) {
  return <HotelFaqAndTermsStep />;
}
