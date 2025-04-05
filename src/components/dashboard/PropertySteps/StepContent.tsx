
import React, { useEffect } from "react";
import StepOne from "./StepOne";
import StepThree from "./StepThree";
import ThemesAndActivitiesStep from "./ThemesAndActivitiesStep";
import HotelFaqAndTermsStep from "./HotelFaqAndTermsStep";
import PriceTable from "./PriceTable";

interface StepContentProps {
  currentStep: number;
  renderPriceTable?: (roomType: string, mealTypes: string[], stayDurations: number[]) => React.ReactNode;
  onValidationChange?: (isValid: boolean) => void;
}

export default function StepContent({ 
  currentStep, 
  renderPriceTable, 
  onValidationChange = () => {} 
}: StepContentProps) {
  // Create default price table renderer if one wasn't provided
  const defaultRenderPriceTable = (roomType: string, mealTypes: string[], stayDurations: number[]) => (
    <PriceTable 
      roomType={roomType} 
      mealTypes={mealTypes} 
      stayDurations={stayDurations} 
    />
  );

  const tableFn = renderPriceTable || defaultRenderPriceTable;

  return (
    <div className="mb-8">
      {currentStep === 1 && <StepOne onValidationChange={onValidationChange} />}
      {currentStep === 2 && <StepThree onValidationChange={onValidationChange} />}
      {currentStep === 3 && <ThemesAndActivitiesStep onValidationChange={onValidationChange} />}
      {currentStep === 4 && (
        <div className="space-y-8">
          <HotelFaqAndTermsStep onValidationChange={onValidationChange} />
          
          {/* Form confirmation checkbox */}
          <div className="mt-8 space-y-8">
            <div className="flex items-start gap-2 bg-fuchsia-900/10 p-4 rounded-lg">
              <input 
                type="checkbox" 
                id="finalize-terms" 
                className="mt-1 rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50" 
              />
              <label htmlFor="finalize-terms" className="text-sm">
                I confirm that all information provided is accurate and my property complies with all local regulations and safety requirements <span className="text-red-500">*</span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
