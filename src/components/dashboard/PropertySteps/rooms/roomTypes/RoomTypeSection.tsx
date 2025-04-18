
import React, { useState } from "react";
import RoomTypeContent from "./RoomTypeContent";
import CollapsibleRoomTypeSection from "./CollapsibleRoomTypeSection";
import { useRoomTypeSection } from "./useRoomTypeSection";
import RoomTypeDialog from "../RoomTypeDialog";

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

  // Directly show the add dialog on component mount
  useState(() => {
    // Only open the dialog if there are no room types yet
    if (roomTypes.length === 0) {
      setDialogOpen(true);
    }
  });

  const mainContent = (
    <>
      <RoomTypeContent
        roomTypes={roomTypes}
        selectedStayLengths={selectedStayLengths}
        selectedUnit={selectedUnit}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        handleAddRoomType={handleAddRoomType}
        handleDeleteRoomType={handleDeleteRoomType}
      />
      
      {/* We maintain the RoomTypeDialog here to avoid nesting issues */}
      <RoomTypeDialog 
        isOpen={dialogOpen} 
        onClose={() => setDialogOpen(false)} 
        onAdd={handleAddRoomType}
        availableStayLengths={selectedStayLengths}
      />
    </>
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
