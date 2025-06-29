
import React from "react";
import RoomTypeContent from "./RoomTypeContent";
import CollapsibleRoomTypeSection from "./CollapsibleRoomTypeSection";
import { useRoomTypeSection } from "./useRoomTypeSection";

interface RoomTypeSectionProps {
  onValidationChange: (isValid: boolean) => void;
  title?: string;
  fullWidth?: boolean;
  showHeader?: boolean;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
}

export default function RoomTypeSection({ 
  onValidationChange,
  title = "ROOM TYPES",
  fullWidth = false,
  showHeader = true,
  formData = {},
  updateFormData = () => {}
}: RoomTypeSectionProps) {
  const {
    selectedUnit,
    roomTypes,
    dialogOpen,
    selectedStayLengths,
    setDialogOpen,
    handleAddRoomType,
    handleDeleteRoomType
  } = useRoomTypeSection(onValidationChange, formData, updateFormData);
  
  // Get the preferred weekday from formData, default to Monday if not set
  const preferredWeekday = formData.preferredWeekday || "Monday";

  const mainContent = (
    <div className="space-y-2">
      <RoomTypeContent
        roomTypes={roomTypes}
        selectedStayLengths={selectedStayLengths}
        selectedUnit={selectedUnit}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        handleAddRoomType={handleAddRoomType}
        handleDeleteRoomType={handleDeleteRoomType}
        preferredWeekday={preferredWeekday}
      />
    </div>
  );

  if (!showHeader) {
    return <div className={`${fullWidth ? "w-full" : ""}`}>{mainContent}</div>;
  }

  return (
    <div className={`${fullWidth ? "w-full" : ""}`}>
      <CollapsibleRoomTypeSection title={title} defaultOpen={false}>
        {mainContent}
      </CollapsibleRoomTypeSection>
    </div>
  );
}
