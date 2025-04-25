import React from "react";
import StepOne from "./StepOne";
import AccommodationTermsStep from "./AccommodationTerms/AccommodationTermsStep";
import HotelFeaturesStep from "./HotelFeaturesStep";
import ThemesAndActivitiesStep from "./ThemesAndActivitiesStep";
import HotelFaqAndTermsStep from "./FaqAndTerms/HotelFaqAndTermsStep";
import PriceTable from "./PriceTable";

interface StepContentProps {
  currentStep: number;
  renderPriceTable?: (roomType: string, mealTypes: string[], stayDurations: number[]) => React.ReactNode;
  onValidationChange?: (isValid: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
}

export default function StepContent({ 
  currentStep, 
  renderPriceTable, 
  onValidationChange = () => {},
  formData = {},
  updateFormData = () => {}
}: StepContentProps) {
  const defaultRenderPriceTable = (roomType: string, mealTypes: string[], stayDurations: number[]) => (
    <PriceTable 
      roomType={roomType} 
      mealTypes={mealTypes} 
      stayDurations={stayDurations} 
    />
  );

  const tableFn = renderPriceTable || defaultRenderPriceTable;

  return (
    <div className="mb-4">
      {currentStep === 1 && 
        <StepOne 
          onValidationChange={onValidationChange} 
          formData={formData}
          updateFormData={updateFormData}
        />
      }
      {currentStep === 2 && (
        <>
          <AccommodationTermsStep 
            onValidationChange={onValidationChange}
            formData={formData}
            updateFormData={updateFormData}
          />
          <div className="mt-6">
            <HotelFeaturesStep />
          </div>
        </>
      )}
      {currentStep === 3 && 
        <ThemesAndActivitiesStep 
          onValidationChange={onValidationChange}
          formData={formData}
          updateFormData={updateFormData}
        />
      }
      {currentStep === 4 && (
        <div className="space-y-4">
          <HotelFaqAndTermsStep 
            onValidationChange={onValidationChange}
            formData={formData}
            updateFormData={updateFormData}
          />
        </div>
      )}
    </div>
  );
}
