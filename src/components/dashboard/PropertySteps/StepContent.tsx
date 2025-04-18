
import React from "react";
import StepOne from "./StepOne";
import AccommodationTermsStep from "./AccommodationTerms/AccommodationTermsStep";
import HotelFeaturesStep from "./HotelFeaturesStep";
import ThemesAndActivitiesStep from "./ThemesAndActivitiesStep";
import HotelFaqAndTermsStep from "./FaqAndTerms/HotelFaqAndTermsStep";
import { AlertTriangle } from "lucide-react";

interface StepContentProps {
  currentStep: number;
  onValidationChange?: (isValid: boolean, data?: any) => void;
  formData?: any;
  termsAccepted?: boolean;
  setTermsAccepted?: (value: boolean) => void;
  showValidationWarning?: boolean;
}

export default function StepContent({ 
  currentStep, 
  onValidationChange = () => {},
  formData = {},
  termsAccepted = false,
  setTermsAccepted = () => {},
  showValidationWarning = false
}: StepContentProps) {
  return (
    <div className="mb-4">
      {currentStep === 1 && <StepOne onValidationChange={onValidationChange} />}
      
      {currentStep === 2 && (
        <>
          <AccommodationTermsStep 
            onValidationChange={onValidationChange} 
            initialData={formData.accommodationTerms} 
          />
          <div className="mt-6">
            <HotelFeaturesStep />
          </div>
        </>
      )}
      
      {currentStep === 3 && (
        <ThemesAndActivitiesStep 
          onValidationChange={onValidationChange} 
          initialData={formData.themesAndActivities}
        />
      )}
      
      {currentStep === 4 && (
        <div className="space-y-4">
          <HotelFaqAndTermsStep 
            onValidationChange={onValidationChange}
            termsAccepted={termsAccepted}
            setTermsAccepted={setTermsAccepted}
          />
          
          {showValidationWarning && !termsAccepted && (
            <div className="p-3 mt-4 rounded-md bg-amber-600/20 border border-amber-600/30 text-white flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-400" />
              <p className="text-sm">You must accept the Terms & Conditions to submit your property.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
