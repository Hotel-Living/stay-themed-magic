
import React, { useEffect } from "react";
import { NewStep1HotelInfo } from "./NewStep1HotelInfo";
import { NewStep2PropertyDetails } from "./NewStep2PropertyDetails"; 
import { NewStep3AccommodationTerms } from "./NewStep3AccommodationTerms";
import { NewStep4PricingPackages } from "./NewStep4PricingPackages";
import { NewStep5FinalReview } from "./NewStep5FinalReview";

interface NewStepContentProps {
  currentStep: number;
  onValidationChange: (isValid: boolean) => void;
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

export function NewStepContent({
  currentStep,
  onValidationChange,
  formData,
  updateFormData
}: NewStepContentProps) {
  
  // Set validation to true by default to allow navigation
  useEffect(() => {
    console.log('📋 Step content loaded for step:', currentStep);
    onValidationChange(true);
  }, [currentStep, onValidationChange]);

  switch (currentStep) {
    case 1:
      return (
        <NewStep1HotelInfo
          formData={formData}
          updateFormData={updateFormData}
          onValidationChange={onValidationChange}
        />
      );
    case 2:
      return (
        <NewStep2PropertyDetails
          formData={formData}
          updateFormData={updateFormData}
          onValidationChange={onValidationChange}
        />
      );
    case 3:
      return (
        <NewStep3AccommodationTerms
          formData={formData}
          updateFormData={updateFormData}
          onValidationChange={onValidationChange}
        />
      );
    case 4:
      return (
        <NewStep4PricingPackages
          formData={formData}
          updateFormData={updateFormData}
          onValidationChange={onValidationChange}
        />
      );
    case 5:
      return (
        <NewStep5FinalReview
          formData={formData}
          updateFormData={updateFormData}
          onValidationChange={onValidationChange}
        />
      );
    default:
      return <div>Step not found</div>;
  }
}
