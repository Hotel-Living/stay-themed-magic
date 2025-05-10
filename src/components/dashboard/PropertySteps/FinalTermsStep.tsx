
import React from "react";
import StepFive from "./StepFive";
import { PropertyFormData } from "../property/hooks/usePropertyFormData";
import PriceTable from "./PriceTable";

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
  const renderPriceTable = (roomType: string, mealTypes: string[], stayDurations: number[]) => {
    return (
      <PriceTable
        roomType={roomType}
        mealTypes={mealTypes}
        stayDurations={stayDurations}
      />
    );
  };

  return (
    <div className="space-y-6">
      <StepFive 
        onValidationChange={onValidationChange} 
        renderPriceTable={renderPriceTable}
        formData={formData}
        updateFormData={updateFormData} 
      />

      {/* Add the conditional check for room types before rendering price tables */}
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Price Tables Preview</h3>
        {formData?.roomTypes?.length > 0 ? (
          formData.roomTypes.map((roomType: any, index: number) =>
            renderPriceTable(
              roomType.name || roomType.selectedRoomType || "Room Type",
              formData.mealPlans || ["Breakfast only", "Half board", "Full board", "All inclusive"],
              [8, 16, 24, 32]
            )
          )
        ) : (
          <p className="text-yellow-300">Please define room types in Step 3 before setting prices.</p>
        )}
      </div>
    </div>
  );
}
