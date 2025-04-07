
import { useState, useEffect } from "react";
import { useRoomTypes, RoomType } from "./useRoomTypes";

export function useRoomTypeSection(onValidationChange: (isValid: boolean) => void) {
  const {
    selectedUnit,
    roomTypes,
    dialogOpen,
    selectedStayLengths,
    setDialogOpen,
    handleAddRoomType,
    handleDeleteRoomType
  } = useRoomTypes();
  
  // Notify parent when room types change
  useEffect(() => {
    if (roomTypes.length > 0) {
      onValidationChange(true);
    } else {
      onValidationChange(false);
    }
  }, [roomTypes, onValidationChange]);
  
  return {
    selectedUnit,
    roomTypes,
    dialogOpen,
    selectedStayLengths,
    setDialogOpen,
    handleAddRoomType,
    handleDeleteRoomType
  };
}
