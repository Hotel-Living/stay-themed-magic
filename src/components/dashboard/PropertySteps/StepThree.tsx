
import React from "react";
import HotelFeaturesStep from "./HotelFeaturesStep";

interface StepThreeProps {
  onValidationChange?: (isValid: boolean) => void;
}

export default function StepThree({ onValidationChange = () => {} }: StepThreeProps) {
  return <HotelFeaturesStep />;
}
