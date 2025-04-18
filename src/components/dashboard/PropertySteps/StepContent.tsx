
import React from "react";
import StepOne from "./StepOne";
import AccommodationTermsStep from "./AccommodationTerms/AccommodationTermsStep";
import HotelFeaturesStep from "./HotelFeaturesStep";
import ThemesAndActivitiesStep from "./ThemesAndActivitiesStep";
import HotelFaqAndTermsStep from "./FaqAndTerms/HotelFaqAndTermsStep";
import { TermsCheckbox } from "@/components/auth/TermsCheckbox";

interface StepContentProps {
  currentStep: number;
  onValidationChange?: (isValid: boolean, data?: any) => void;
  formData?: any;
  setTermsAccepted?: (value: boolean) => void;
}

export default function StepContent({ 
  currentStep, 
  onValidationChange = () => {},
  formData = {},
  setTermsAccepted = () => {}
}: StepContentProps) {
  return (
    <div className="mb-4">
      {currentStep === 1 && <StepOne onValidationChange={onValidationChange} initialData={formData.basicInfo} />}
      {currentStep === 2 && (
        <>
          <AccommodationTermsStep 
            onValidationChange={onValidationChange} 
            initialData={formData.accommodationTerms}
          />
          <div className="mt-6">
            <HotelFeaturesStep 
              onValidationChange={(isFeatureValid: boolean) => {
                // Pass both hotel features and accommodation terms validation
                const isStepValid = isFeatureValid && 
                  formData.accommodationTerms && 
                  formData.accommodationTerms.stayLengths && 
                  formData.accommodationTerms.stayLengths.length > 0 && 
                  formData.accommodationTerms.mealPlans && 
                  formData.accommodationTerms.mealPlans.length > 0;
                
                onValidationChange(isStepValid, {
                  ...formData.accommodationTerms,
                  hotelFeaturesValid: isFeatureValid
                });
              }}
            />
          </div>
        </>
      )}
      {currentStep === 3 && <ThemesAndActivitiesStep onValidationChange={onValidationChange} initialData={formData.themesAndActivities} />}
      {currentStep === 4 && (
        <div className="space-y-4">
          <HotelFaqAndTermsStep onValidationChange={(isValid) => onValidationChange(isValid)} />
          
          {/* Form confirmation checkbox */}
          <div className="mt-4 space-y-4">
            <div className="flex items-start gap-2 bg-fuchsia-900/10 p-3 rounded-lg">
              <TermsCheckbox 
                id="finalize-terms" 
                label={
                  <span className="text-white">
                    I confirm that all information provided is accurate and my property complies with all local regulations and safety requirements <span className="text-red-500">*</span>
                  </span>
                }
                checked={formData.termsAccepted || false}
                onChange={() => {
                  const newValue = !formData.termsAccepted;
                  setTermsAccepted(newValue);
                  onValidationChange(true, { termsAccepted: newValue });
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
