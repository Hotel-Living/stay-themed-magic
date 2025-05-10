
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
        formData.roomTypes.map((roomType: any) =>
          renderPriceTable?.(roomType.name || roomType, formData.mealPlans || [], [8, 16, 24, 32])
        )
      ) : (
        <p className="text-yellow-300">Please define room types in Step 3 before setting prices.</p>
      )}
      
      <HotelFaqAndTermsStep onValidationChange={onValidationChange} formData={formData} updateFormData={updateFormData} />
    </div>;
}

// Helper function to render price tables
const renderPriceTable = (roomType: string, mealTypes: string[], stayDurations: number[]) => {
  return (
    <div key={roomType} className="mb-6 overflow-x-auto">
      <div className="bg-fuchsia-800/40 p-3 rounded-t-lg">
        <h3 className="text-base font-medium text-center">{roomType}</h3>
        <p className="text-xs text-center mt-1">(Rates per person)</p>
      </div>
      
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-fuchsia-900/50">
            <th className="p-2 text-left text-xs"></th>
            {stayDurations.map(duration => (
              <th key={duration} className="p-2 text-center text-xs bg-[#5d0083]">{duration} DAYS</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {mealTypes.map((mealType, index) => (
            <tr key={mealType} className={index % 2 === 0 ? "bg-fuchsia-900/20" : "bg-fuchsia-900/30"}>
              <td className="p-2 text-xs font-medium bg-[#5d0083]">{mealType}</td>
              {stayDurations.map(duration => (
                <td key={`${mealType}-${duration}`} className="p-2 text-center text-xs">
                  <input 
                    type="number" 
                    placeholder="0.00" 
                    required 
                    className="w-16 border border-fuchsia-800/30 rounded-lg p-1 text-center bg-[#5d0083]" 
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
