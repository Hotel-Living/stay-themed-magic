
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
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
}

export default function StepContent({ 
  currentStep, 
  onValidationChange = () => {},
  formData = {},
  updateFormData = () => {},
  onNext,
  onPrevious,
  onSubmit
}: StepContentProps) {
  return (
    <div className="mb-4">
      {currentStep === 1 && (
        <div className="space-y-6">
          <BasicPropertyInfo 
            onValidationChange={onValidationChange}
            formData={formData}
            updateFormData={updateFormData}
          />
          <FormNavigation 
            currentStep={currentStep}
            onPrevious={onPrevious}
            onNext={onNext}
            onSubmit={onSubmit}
          />
        </div>
      )}
      
      {currentStep === 2 && (
        <div className="space-y-6">
          <AccommodationDetails 
            onValidationChange={onValidationChange}
            formData={formData}
            updateFormData={updateFormData}
          />
          <FormNavigation 
            currentStep={currentStep}
            onPrevious={onPrevious}
            onNext={onNext}
            onSubmit={onSubmit}
          />
        </div>
      )}
      
      {currentStep === 3 && (
        <div className="space-y-6">
          <ThemesActivities 
            onValidationChange={onValidationChange}
            formData={formData}
            updateFormData={updateFormData}
          />
          <FormNavigation 
            currentStep={currentStep}
            onPrevious={onPrevious}
            onNext={onNext}
            onSubmit={onSubmit}
          />
        </div>
      )}
      
      {currentStep === 4 && (
        <div className="space-y-6">
          <FinalizeProperty 
            onValidationChange={onValidationChange}
            formData={formData}
            updateFormData={updateFormData}
            termsAccepted={formData.termsAccepted || false}
          />
          <FormNavigation 
            currentStep={currentStep}
            onPrevious={onPrevious}
            onNext={onNext}
            onSubmit={onSubmit}
          />
        </div>
      )}
    </div>
  );
}
