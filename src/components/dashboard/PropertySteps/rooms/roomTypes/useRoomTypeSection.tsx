
import { useState, useEffect } from "react";
import { useRoomTypes, RoomType } from "./useRoomTypes";

// Define interface for the formData parameter
interface FormData {
  roomTypes?: RoomType[];
  [key: string]: any;
}

export function useRoomTypeSection(
  onValidationChange = (isValid: boolean) => {},
  formData: FormData = {},
  updateFormData = (field: string, value: any) => {}
) {
  const {
    selectedUnit,
    setSelectedUnit,
    roomTypes,
    setRoomTypes,
    dialogOpen,
    selectedStayLengths,
    setDialogOpen,
    handleAddRoomType,
    handleDeleteRoomType
  } = useRoomTypes();
  
  // Initialize roomTypes from formData if available
  useEffect(() => {
    if (formData.roomTypes && formData.roomTypes.length > 0) {
      // Directly set room types from form data to ensure they're properly loaded
      setRoomTypes(formData.roomTypes);
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
