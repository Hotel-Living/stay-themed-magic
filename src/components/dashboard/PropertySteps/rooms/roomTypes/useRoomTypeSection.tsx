import { useState, useEffect } from "react";
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
    handleAddRoomType,
    handleDeleteRoomType
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
    
    // Note: We're not using setSelectedStayLengths here because it's not available
    // in the return value from useRoomTypes. The selectedStayLengths will be updated
    // internally by useRoomTypes based on formData.stayLengths and localStorage.
  }, [formData.roomTypes, setRoomTypes]);

  // Update parent form data when roomTypes change
  useEffect(() => {
    console.log("Room types changed, updating form data:", roomTypes);
    if (updateFormData && roomTypes) {
      updateFormData('roomTypes', roomTypes);
    }
    
    // Validate when roomTypes changes
    const isValid = roomTypes.length > 0;
    onValidationChange(isValid);
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
