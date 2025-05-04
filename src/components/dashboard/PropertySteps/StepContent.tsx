
import React from "react";
import { stepsConfig } from "../property/constants/stepsConfig";
import { PropertyFormData } from "../property/hooks/usePropertyFormData";

interface StepContentProps {
  currentStep: number;
  onValidationChange?: (isValid: boolean) => void;
  formData?: PropertyFormData;
  updateFormData?: (field: string, value: any) => void;
}

export default function StepContent({ 
  currentStep, 
  onValidationChange = () => {},
  formData = {} as PropertyFormData,
  updateFormData = () => {}
}: StepContentProps) {
  const currentStepConfig = stepsConfig.find(step => step.id === currentStep);
  
  if (!currentStepConfig) {
    return (
      <div className="mb-4">
        <p>Step not found</p>
      </div>
    );
  }

  const StepComponent = currentStepConfig.component;

  return (
    <div className="mb-4">
      <StepComponent
        formData={formData}
        updateFormData={updateFormData}
        onValidationChange={onValidationChange}
      />
    </div>
  );
}
