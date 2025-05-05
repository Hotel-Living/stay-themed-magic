
import React from "react";
import HotelFaqAndTermsStep from "./FaqAndTerms/HotelFaqAndTermsStep";
import { PropertyFormData } from "../property/hooks/usePropertyFormData";

interface FinalTermsStepProps {
  onValidationChange: (isValid: boolean) => void;
  formData: PropertyFormData;
  updateFormData: (field: string, value: any) => void;
}

export function FinalTermsStep({
  onValidationChange,
  formData,
  updateFormData
}: FinalTermsStepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4 text-white">5. FAQS & TERMS</h2>
      
      <HotelFaqAndTermsStep 
        onValidationChange={onValidationChange}
        formData={formData}
        updateFormData={updateFormData}
      />
    </div>
  );
}
