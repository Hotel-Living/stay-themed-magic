
import React, { useEffect } from 'react';
import HotelFaqAndTermsStep from '../FaqAndTerms/HotelFaqAndTermsStep';
import { Button } from "@/components/ui/button";

interface FinalizePropertyProps {
  onValidationChange?: (isValid: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
  termsAccepted: boolean;
  onSubmit?: () => void;
}

export default function FinalizeProperty({
  onValidationChange = () => {},
  formData = {},
  updateFormData = () => {},
  termsAccepted = false,
  onSubmit = () => {}
}: FinalizePropertyProps) {
  // When component mounts, sync termsAccepted from formData
  useEffect(() => {
    if (formData && formData.termsAccepted !== undefined) {
      // Make sure we're using the value from formData if available
      console.log("Using termsAccepted from formData:", formData.termsAccepted);
    }
  }, [formData]);

  const handleTermsAcceptedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (updateFormData) {
      updateFormData('termsAccepted', e.target.checked);
      console.log("Updated termsAccepted:", e.target.checked);
    }
  };

  return (
    <div className="space-y-4">
      {/* Submit button at the top of step 4 */}
      <div className="mb-6 flex justify-end">
        <Button 
          onClick={onSubmit}
          className="rounded-lg px-4 py-1.5 bg-[#a209ad]/80 hover:bg-[#860493]" 
          disabled={!termsAccepted}
        >
          Submit Property
        </Button>
      </div>
      
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
            onChange={handleTermsAcceptedChange} 
          />
          <label htmlFor="finalize-terms" className="text-sm text-white">
            I confirm that all information provided is accurate and my property complies with all local regulations and safety requirements <span className="text-red-500">*</span>
          </label>
        </div>
      </div>
    </div>
  );
}
