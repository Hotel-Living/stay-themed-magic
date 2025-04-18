
import React from 'react';
import HotelFaqAndTermsStep from '../FaqAndTerms/HotelFaqAndTermsStep';
import { TermsCheckbox } from '@/components/auth/TermsCheckbox';

interface FinalizePropertyProps {
  onValidationChange?: (isValid: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
  termsAccepted: boolean;
}

export default function FinalizeProperty({
  onValidationChange = () => {},
  formData = {},
  updateFormData = () => {},
  termsAccepted = false
}: FinalizePropertyProps) {
  return (
    <div className="space-y-4">
      <HotelFaqAndTermsStep 
        onValidationChange={onValidationChange}
        formData={formData}
        updateFormData={updateFormData}
      />
      
      {/* Form confirmation checkbox */}
      <div className="mt-4 space-y-4">
        <div className="flex items-start gap-2 bg-purple-900/60 p-3 rounded-lg">
          <TermsCheckbox
            id="finalize-terms"
            checked={termsAccepted}
            onChange={() => updateFormData('termsAccepted', !termsAccepted)}
            label={
              <span className="text-sm text-white">
                I confirm that all information provided is accurate and my property complies with all local regulations and safety requirements <span className="text-red-500">*</span>
              </span>
            }
          />
        </div>
      </div>
    </div>
  );
}
