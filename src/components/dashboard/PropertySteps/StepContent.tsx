
import React from "react";
import StepOne from "./StepOne";
import { GeneralInformationStep1 } from "./GeneralInformationStep1";
import { GeneralInformationStep2 } from "./GeneralInformationStep2";
import { AccommodationTermsStep } from "./AccommodationTermsStep";
import { PackagesBuilderStep } from "./PackagesBuilderStep";
import { FinalTermsStep } from "./FinalTermsStep";
import PriceTable from "./PriceTable";
import StayRatesStep from "./StayRatesStep";
import PicturesStep from "./PicturesStep";

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
        <GeneralInformationStep1 
          onValidationChange={onValidationChange} 
          formData={formData}
          updateFormData={updateFormData}
        />
      }
      {currentStep === 2 && 
        <GeneralInformationStep2
          onValidationChange={onValidationChange}
          formData={formData}
          updateFormData={updateFormData}
        />
      }
      {currentStep === 3 && 
        <AccommodationTermsStep 
          onValidationChange={onValidationChange}
          formData={formData}
          updateFormData={updateFormData}
        />
      }
      {currentStep === 4 && 
        <PackagesBuilderStep
          onValidationChange={onValidationChange}
          formData={formData}
          updateFormData={updateFormData}
        />
      }
      {currentStep === 5 && 
        <FinalTermsStep
          onValidationChange={onValidationChange}
          formData={formData}
          updateFormData={updateFormData}
        />
      }
    </div>
  );
}
