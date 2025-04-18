
import { useState, useEffect } from "react";
import { useRoomTypes } from "./useRoomTypes";

export function useRoomTypeSection(
  onValidationChange = (isValid: boolean) => {},
  formData = {},
  updateFormData = (field: string, value: any) => {}
) {
  const {
    selectedUnit,
    roomTypes,
    setRoomTypes,
    addRoomType,
    removeRoomType
  } = useRoomTypes();
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedStayLengths, setSelectedStayLengths] = useState<number[]>([]);

  // Initialize roomTypes from formData if available
  useEffect(() => {
    if (formData.roomTypes && formData.roomTypes.length > 0) {
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

  const handleAddRoomType = (name: string, pricePerNight: number, capacity: number, description: string) => {
    addRoomType(name, pricePerNight, capacity, description);
    setDialogOpen(false);
  };

  const handleDeleteRoomType = (index: number) => {
    removeRoomType(index);
  };

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
