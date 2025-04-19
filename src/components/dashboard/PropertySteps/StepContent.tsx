
import React from "react";
import BasicPropertyInfo from "./steps/BasicPropertyInfo";
import AccommodationDetails from "./steps/AccommodationDetails";
import ThemesActivities from "./steps/ThemesActivities";
import FinalizeProperty from "./steps/FinalizeProperty";
import FormNavigation from "../property/FormNavigation";

interface StepContentProps {
  currentStep: number;
  onValidationChange?: (isValid: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
  onNext?: () => void;
  onPrevious?: () => void;
  onSubmit?: () => void;
  isLastStep?: boolean;
  isValid?: boolean;
}

export default function StepContent({ 
  currentStep, 
  onValidationChange = () => {},
  formData = {},
  updateFormData = () => {},
  onNext = () => {},
  onPrevious = () => {},
  onSubmit = () => {},
  isLastStep = false,
  isValid = false
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
          onSubmit={onSubmit}
        />
      }
      
      {/* Navigation buttons at the bottom of each step */}
      <div className="mt-6">
        <FormNavigation 
          currentStep={currentStep}
          onNext={onNext}
          onPrevious={onPrevious}
          onSubmit={onSubmit}
          isLastStep={isLastStep}
          isValid={isValid}
        />
      </div>
    </div>
  );
}
