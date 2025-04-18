
import React from "react";
import BasicPropertyInfo from "./steps/BasicPropertyInfo";
import AccommodationDetails from "./steps/AccommodationDetails";
import ThemesActivities from "./steps/ThemesActivities";
import FinalizeProperty from "./steps/FinalizeProperty";

interface StepContentProps {
  currentStep: number;
  onValidationChange?: (isValid: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
}

export default function StepContent({ 
  currentStep, 
  onValidationChange = () => {},
  formData = {},
  updateFormData = () => {}
}: StepContentProps) {
  return (
    <div className="mb-4">
      {currentStep === 1 && 
        <BasicPropertyInfo 
          onValidationChange={onValidationChange}
          formData={formData}
          updateFormData={updateFormData}
        />
      }
      
      {currentStep === 2 && 
        <AccommodationDetails 
          onValidationChange={onValidationChange}
          formData={formData}
          updateFormData={updateFormData}
        />
      }
      
      {currentStep === 3 && 
        <ThemesActivities 
          onValidationChange={onValidationChange}
          formData={formData}
          updateFormData={updateFormData}
        />
      }
      
      {currentStep === 4 && 
        <FinalizeProperty 
          onValidationChange={onValidationChange}
          formData={formData}
          updateFormData={updateFormData}
          termsAccepted={formData.termsAccepted || false}
        />
      }
    </div>
  );
}
