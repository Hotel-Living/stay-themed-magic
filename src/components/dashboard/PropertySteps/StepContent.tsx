import React from "react";
import StepOne from "./StepOne";
import { GeneralInformationStep2 } from "./GeneralInformationStep2";
import AccommodationTermsStep from "./AccommodationTerms/AccommodationTermsStep";
import PackagesBuilderStep from "./PackagesBuilderStep";
import { FinalTermsStep } from "./FinalTermsStep";

interface StepContentProps {
  currentStep: number;
  onValidationChange: (isValid: boolean) => void;
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

const StepContent: React.FC<StepContentProps> = ({
  currentStep,
  onValidationChange,
  formData,
  updateFormData
}) => {
  switch (currentStep) {
    case 1:
      return (
        <StepOne
          formData={formData}
          updateFormData={updateFormData}
          onValidationChange={onValidationChange}
          showHeading={false}
        />
      );
    case 2:
      return (
        <GeneralInformationStep2
          formData={formData}
          updateFormData={updateFormData}
          onValidationChange={onValidationChange}
        />
      );
    case 3:
      return (
        <AccommodationTermsStep
          formData={formData}
          updateFormData={updateFormData}
        />
      );
    case 4:
      return (
        <PackagesBuilderStep
          formData={formData}
          updateFormData={updateFormData}
          onValidationChange={onValidationChange}
        />
      );
    case 5:
      return (
        <FinalTermsStep
          formData={formData}
          updateFormData={updateFormData}
          onValidationChange={onValidationChange}
        />
      );
    default:
      return <div>Step not found</div>;
  }
};

export default StepContent;
