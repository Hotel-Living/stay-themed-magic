
import React from "react";
import ThemesAndActivitiesStep from "./ThemesAndActivitiesStep";

interface StepFourProps {
  onValidationChange?: (isValid: boolean) => void;
}

export default function StepFour({ onValidationChange = () => {} }: StepFourProps) {
  return <ThemesAndActivitiesStep />;
}
