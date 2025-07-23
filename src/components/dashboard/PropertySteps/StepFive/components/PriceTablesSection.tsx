
import React from "react";

interface PriceTablesSectionProps {
  shouldRenderPriceTables: boolean;
  formData: any;
  renderPriceTable?: (roomType: string, mealTypes: string[], stayDurations: number[]) => React.ReactNode;
}

export const PriceTablesSection: React.FC<PriceTablesSectionProps> = ({
  shouldRenderPriceTables,
  formData,
  renderPriceTable
}) => {
  if (!shouldRenderPriceTables) {
    return (
      <div className="bg-fuchsia-950/30 p-4 rounded-lg border border-fuchsia-800/30">
        <p className="text-yellow-300">Please define room types, meal plans, and stay lengths in Step 3 before setting prices.</p>
      </div>
    );
  }

  return (
    <>
      {formData.roomTypes.map((roomType: any) => (
        renderPriceTable?.(
          roomType.name || roomType.selectedRoomType || roomType, 
          formData.mealPlans || [], 
          formData.stayLengths || []
        )
      ))}
    </>
  );
};
