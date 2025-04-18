
import React from "react";
import { RoomTypeSection } from "../rooms/roomTypes/RoomTypeSection";

interface RoomsRatesSectionProps {
  title?: string;
  fullWidth?: boolean;
  showHeader?: boolean;
  onValidationChange: (isValid: boolean, roomTypeData?: any[]) => void;
  initialData?: {
    stayLengths?: number[];
    roomTypes?: any[];
  };
  onStayLengthsChange?: (lengths: number[]) => void;
  onMealPlansChange?: (plans: string[]) => void;
}

export const RoomsRatesSection: React.FC<RoomsRatesSectionProps> = ({
  title = "Rooms & Rates",
  fullWidth = false,
  showHeader = true,
  onValidationChange,
  initialData = { stayLengths: [], roomTypes: [] },
  onStayLengthsChange,
  onMealPlansChange
}) => {
  return (
    <div className={`${fullWidth ? "w-full" : "max-w-4xl"}`}>
      {showHeader && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-sm text-gray-300 mt-1">
            Set the room types and rates for your property.
          </p>
        </div>
      )}
      
      <div className="space-y-6">
        <RoomTypeSection 
          onValidationChange={onValidationChange} 
          title="Room Types and Rates" 
          fullWidth={true} 
          showHeader={false}
          initialData={initialData}
          onStayLengthsChange={onStayLengthsChange}
          onMealPlansChange={onMealPlansChange}
        />
      </div>
    </div>
  );
};
