
import React from "react";
import RoomTypeList from "./RoomTypeList";

export interface RoomTypeSectionProps {
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

export const RoomTypeSection: React.FC<RoomTypeSectionProps> = ({
  title = "Room Types",
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
            Configure the room types available at your property.
          </p>
        </div>
      )}
      
      <div className="space-y-6">
        <RoomTypeList 
          initialRoomTypes={initialData?.roomTypes || []}
          initialStayLengths={initialData?.stayLengths || []}
          onStayLengthsChange={onStayLengthsChange}
          onMealPlansChange={onMealPlansChange}
          onRoomTypesChange={(roomTypes) => {
            onValidationChange(roomTypes.length > 0, roomTypes);
          }}
        />
      </div>
    </div>
  );
};
