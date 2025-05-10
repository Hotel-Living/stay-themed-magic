
import React from "react";
import HotelFaqAndTermsStep from "./FaqAndTerms/HotelFaqAndTermsStep";
import { PropertyFormData } from "../property/hooks/usePropertyFormData";
interface FinalTermsStepProps {
  onValidationChange: (isValid: boolean) => void;
  formData: PropertyFormData;
  updateFormData: (field: string, value: any) => void;
}
export function FinalTermsStep({
  onValidationChange,
  formData,
  updateFormData
}: FinalTermsStepProps) {
  return <div className="space-y-6">
      {formData?.roomTypes?.length > 0 ? (
        formData.roomTypes.map((roomType: any) => (
          <div key={roomType.id || roomType.name}>
            {/* Render price table logic here */}
          </div>
        ))
      ) : (
        <p className="text-yellow-300">Please define room types in Step 3 before setting prices.</p>
      )}
      
      <HotelFaqAndTermsStep onValidationChange={onValidationChange} formData={formData} updateFormData={updateFormData} />
    </div>;
}
