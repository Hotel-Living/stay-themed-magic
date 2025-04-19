
import React from 'react';
import HotelFaqAndTermsStep from '../FaqAndTerms/HotelFaqAndTermsStep';

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
      
      {/* Form confirmation checkbox with purple background */}
      <div className="mt-4 space-y-4">
        <div className="flex items-start gap-2 bg-[#690774] p-3 rounded-lg">
          <input 
            type="checkbox" 
            id="finalize-terms" 
            className="mt-1 rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50"
            checked={termsAccepted}
            onChange={(e) => updateFormData('termsAccepted', e.target.checked)} 
          />
          <label htmlFor="finalize-terms" className="text-sm text-white">
            I confirm that all information provided is accurate and my property complies with all local regulations and safety requirements <span className="text-red-500">*</span>
          </label>
        </div>
      </div>
    </div>
  );
}
