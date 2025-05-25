import { useState, useEffect, useCallback } from "react";
import { useRoomTypes, RoomType } from "./useRoomTypes";

// Define interface for the formData parameter
interface FormData {
  roomTypes?: RoomType[];
  stayLengths?: number[];
  preferredWeekday?: string;
  [key: string]: any;
}

export function useRoomTypeSection(
  onValidationChange = (isValid: boolean) => {},
  formData: FormData = {},
  updateFormData = (field: string, value: any) => {}
) {
  console.log("useRoomTypeSection initializing with formData:", formData);
  
  // Initialize useRoomTypes with empty array
  const {
    selectedUnit,
    setSelectedUnit,
    roomTypes,
    setRoomTypes,
    dialogOpen,
    selectedStayLengths,
    setDialogOpen,
    handleAddRoomType: originalHandleAddRoomType,
    handleDeleteRoomType: originalHandleDeleteRoomType
  } = useRoomTypes([]);
  
  // Initialize roomTypes from formData if available
  useEffect(() => {
    console.log("useRoomTypeSection effect with formData.roomTypes:", formData.roomTypes);
    
    if (formData.roomTypes && Array.isArray(formData.roomTypes) && formData.roomTypes.length > 0) {
      console.log("Setting room types from formData:", formData.roomTypes);
      
      // Ensure all required fields are present in each room type
      const processedRoomTypes = formData.roomTypes.map((roomType: any) => {
        // Normalize the roomType object to ensure it has all expected fields
        return {
          id: roomType.id || `rt-${Math.random().toString(36).substr(2, 9)}`,
          name: roomType.name || roomType.selectedRoomType || "Unnamed Room",
          description: roomType.description || "",
          maxOccupancy: roomType.maxOccupancy || 2,
          size: roomType.size || roomType.roomSize || 0,
          roomCount: roomType.roomCount || 1,
          basePrice: roomType.basePrice || roomType.baseRate || 0,
          images: roomType.images || roomType.roomImages || [],
          availabilityDates: roomType.availabilityDates || [],
          rates: roomType.rates || {},
          // Other fields that might be present
          selectedRoomType: roomType.selectedRoomType || roomType.name || "Unnamed Room",
          roomImages: roomType.roomImages || roomType.images || [],
          baseRate: roomType.baseRate || roomType.basePrice || 0,
          roomSize: roomType.roomSize || roomType.size || 0
        };
      });
      
      setRoomTypes(processedRoomTypes);
    }
  }, [formData.roomTypes, setRoomTypes]);

  // Wrapped handlers with immediate form data updates
  const handleAddRoomType = useCallback((roomType: RoomType) => {
    console.log("Adding room type:", roomType);
    
    // Update local state first
    originalHandleAddRoomType(roomType);
    
    // Immediately update parent form data
    const updatedRoomTypes = [...roomTypes];
    const existingIndex = updatedRoomTypes.findIndex(room => room.id === roomType.id);
    
    if (existingIndex >= 0) {
      updatedRoomTypes[existingIndex] = roomType;
    } else {
      updatedRoomTypes.push(roomType);
    }
    
    console.log("Immediately updating form data with room types:", updatedRoomTypes);
    updateFormData('roomTypes', updatedRoomTypes);
    
    // Validate immediately
    const isValid = updatedRoomTypes.length > 0;
    onValidationChange(isValid);
  }, [originalHandleAddRoomType, roomTypes, updateFormData, onValidationChange]);

  const handleDeleteRoomType = useCallback((id: string) => {
    console.log("Deleting room type:", id);
    
    // Update local state first
    originalHandleDeleteRoomType(id);
    
    // Immediately update parent form data
    const updatedRoomTypes = roomTypes.filter(room => room.id !== id);
    
    console.log("Immediately updating form data after deletion:", updatedRoomTypes);
    updateFormData('roomTypes', updatedRoomTypes);
    
    // Validate immediately
    const isValid = updatedRoomTypes.length > 0;
    onValidationChange(isValid);
  }, [originalHandleDeleteRoomType, roomTypes, updateFormData, onValidationChange]);

  // Update parent form data when roomTypes change (backup sync)
  useEffect(() => {
    console.log("Room types changed, syncing with form data:", roomTypes);
    if (updateFormData && roomTypes && roomTypes.length > 0) {
      updateFormData('roomTypes', roomTypes);
      
      // Validate when roomTypes changes
      const isValid = roomTypes.length > 0;
      onValidationChange(isValid);
    }
  }, [roomTypes, updateFormData, onValidationChange]);

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
