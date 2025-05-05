
import React from "react";
import { PropertyFormData } from "../property/hooks/usePropertyFormData";

interface StepProps {
  onValidationChange: (isValid: boolean) => void;
  formData: PropertyFormData;
  updateFormData: (field: string, value: any) => void;
}

export function GeneralInformationStep1({ 
  onValidationChange, 
  formData, 
  updateFormData 
}: StepProps) {
  // Basic implementation to make imports work
  // This will use the existing Step1 component
  React.useEffect(() => {
    // Trigger validation on mount
    onValidationChange(true);
  }, [onValidationChange]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-white">1. GENERAL INFORMATION</h2>
      
      {/* The actual implementation is handled in StepOne.tsx */}
      <StepOne 
        formData={formData} 
        updateFormData={updateFormData}
        onValidationChange={onValidationChange}
        showHeading={false}
      />
    </div>
  );
}

// Import the actual implementation
import StepOne from "./StepOne";
