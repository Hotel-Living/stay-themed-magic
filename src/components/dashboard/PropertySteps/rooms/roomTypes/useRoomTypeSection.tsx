
import { useState, useEffect } from "react";
import { useRoomTypes, RoomType } from "./useRoomTypes";

export function useRoomTypeSection(
  onValidationChange = (isValid: boolean) => {},
  formData = {},
  updateFormData = (field: string, value: any) => {}
) {
  const {
    selectedUnit,
    roomTypes,
    dialogOpen,
    selectedStayLengths,
    setDialogOpen,
    handleAddRoomType,
    handleDeleteRoomType
  } = useRoomTypes();
  
  // Initialize roomTypes from formData if available
  useEffect(() => {
    if (formData.roomTypes && formData.roomTypes.length > 0) {
      // We'll use the handleAddRoomType for each room type to properly add them
      // This is safer than directly setting roomTypes
      formData.roomTypes.forEach((roomType: RoomType) => {
        if (!roomTypes.some(rt => rt.id === roomType.id)) {
          handleAddRoomType(roomType);
        }
      });
    }
  }, [formData.roomTypes]);

  // Update parent form data when roomTypes change
  useEffect(() => {
    if (updateFormData && roomTypes) {
      updateFormData('roomTypes', roomTypes);
    }
  }, [roomTypes, updateFormData]);

  // Validate when roomTypes changes
  useEffect(() => {
    // Valid if there's at least one room type
    const isValid = roomTypes.length > 0;
    onValidationChange(isValid);
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
