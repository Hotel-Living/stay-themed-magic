
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
  // Create default price table renderer if one wasn't provided
  const defaultRenderPriceTable = (roomType: string, mealTypes: string[], stayDurations: number[]) => (
    <PriceTable 
      roomType={roomType} 
      mealTypes={mealTypes} 
      stayDurations={stayDurations} 
    />
  );

  const tableFn = renderPriceTable || defaultRenderPriceTable;

  // Handle checkbox changes for the final step confirmation
  const handleTermsCheckboxChange = (checked: boolean) => {
    console.log("Final step checkbox changed to:", checked);
    updateFormData('termsAccepted', checked);
    onValidationChange(checked);
  };

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
          
          {/* Form confirmation checkbox */}
          <div className="mt-4 space-y-4">
            <div className="flex items-start gap-2 bg-fuchsia-900/10 p-3 rounded-lg">
              <input 
                type="checkbox" 
                id="finalize-terms" 
                className="mt-1 rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50"
                checked={formData.termsAccepted || false}
                onChange={(e) => handleTermsCheckboxChange(e.target.checked)} 
              />
              <label htmlFor="finalize-terms" className="text-sm text-white">
                I confirm that all information provided is accurate and my property complies with all local regulations and safety requirements <span className="text-red-500">*</span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
