
import React from "react";
import RoomTypeContent from "./RoomTypeContent";
import CollapsibleRoomTypeSection from "./CollapsibleRoomTypeSection";
import { useRoomTypeSection } from "./useRoomTypeSection";

interface RoomTypeSectionProps {
  onValidationChange: (isValid: boolean) => void;
  title?: string;
  fullWidth?: boolean;
  showHeader?: boolean;
}

export default function RoomTypeSection({ 
  onValidationChange,
  title = "ROOM TYPES",
  fullWidth = false,
  showHeader = true
}: RoomTypeSectionProps) {
  const {
    selectedUnit,
    roomTypes,
    dialogOpen,
    selectedStayLengths,
    setDialogOpen,
    handleAddRoomType,
    handleDeleteRoomType
  } = useRoomTypeSection(onValidationChange);

  const mainContent = (
    <RoomTypeContent
      roomTypes={roomTypes}
      selectedStayLengths={selectedStayLengths}
      selectedUnit={selectedUnit}
      dialogOpen={dialogOpen}
      setDialogOpen={setDialogOpen}
      handleAddRoomType={handleAddRoomType}
      handleDeleteRoomType={handleDeleteRoomType}
    />
  );

  if (!showHeader) {
    return <div className={`${fullWidth ? "w-full" : ""}`}>{mainContent}</div>;
  }

  return (
    <div className={`${fullWidth ? "w-full" : ""}`}>
      <CollapsibleRoomTypeSection title={title}>
        {mainContent}
      </CollapsibleRoomTypeSection>
    </div>
  );
}
