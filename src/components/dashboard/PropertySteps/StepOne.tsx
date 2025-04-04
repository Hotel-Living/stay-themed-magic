
import React, { useEffect } from "react";
import BasicInfoStep from "./BasicInfoStep";
import LocationStep from "./LocationStep";
import PicturesStep from "./PicturesStep";

interface StepOneProps {
  onValidationChange?: (isValid: boolean) => void;
}

export default function StepOne({ onValidationChange = () => {} }: StepOneProps) {
  return (
    <div className="space-y-8">
      <BasicInfoStep />
      <LocationStep />
      <PicturesStep />
    </div>
  );
}
