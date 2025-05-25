
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
  
  // Track if we're in the middle of an update to prevent race conditions
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Initialize roomTypes from formData if available
  useEffect(() => {
    console.log("useRoomTypeSection effect with formData.roomTypes:", formData.roomTypes);
    
    if (formData.roomTypes && Array.isArray(formData.roomTypes) && formData.roomTypes.length > 0 && !isUpdating) {
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
  }, [formData.roomTypes, setRoomTypes, isUpdating]);

  // Wrapped handlers to prevent race conditions
  const handleAddRoomType = useCallback((roomType: RoomType) => {
    if (isUpdating) {
      console.log("Already updating, skipping add room type");
      return;
    }
    
    setIsUpdating(true);
    console.log("Adding room type:", roomType);
    
    try {
      originalHandleAddRoomType(roomType);
    } catch (error) {
      console.error("Error adding room type:", error);
    } finally {
      // Reset updating flag after a short delay
      setTimeout(() => {
        setIsUpdating(false);
      }, 100);
    }
  }, [originalHandleAddRoomType, isUpdating]);

  const handleDeleteRoomType = useCallback((id: string) => {
    if (isUpdating) {
      console.log("Already updating, skipping delete room type");
      return;
    }
    
    setIsUpdating(true);
    console.log("Deleting room type:", id);
    
    try {
      originalHandleDeleteRoomType(id);
    } catch (error) {
      console.error("Error deleting room type:", error);
    } finally {
      // Reset updating flag after a short delay
      setTimeout(() => {
        setIsUpdating(false);
      }, 100);
    }
  }, [originalHandleDeleteRoomType, isUpdating]);

  // Update parent form data when roomTypes change, but only if not currently updating
  useEffect(() => {
    if (isUpdating) {
      console.log("Skipping form data update while updating");
      return;
    }
    
    console.log("Room types changed, updating form data:", roomTypes);
    if (updateFormData && roomTypes) {
      // Use a timeout to ensure the update happens after all state changes are complete
      const timeoutId = setTimeout(() => {
        updateFormData('roomTypes', roomTypes);
        
        // Validate when roomTypes changes
        const isValid = roomTypes.length > 0;
        onValidationChange(isValid);
      }, 50);
      
      return () => clearTimeout(timeoutId);
    }
  }, [roomTypes, updateFormData, onValidationChange, isUpdating]);

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
