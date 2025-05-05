import React from "react";
import { PropertyFormData } from "../property/hooks/usePropertyFormData";
import StayRatesStep from "./StayRatesStep";
interface PackagesBuilderStepProps {
  onValidationChange: (isValid: boolean) => void;
  formData: PropertyFormData;
  updateFormData: (field: string, value: any) => void;
}
export function PackagesBuilderStep({
  onValidationChange,
  formData,
  updateFormData
}: PackagesBuilderStepProps) {
  return <div className="space-y-6 max-w-[80%]">
      
      
      <StayRatesStep onValidationChange={onValidationChange} formData={formData} updateFormData={updateFormData} />
    </div>;
}