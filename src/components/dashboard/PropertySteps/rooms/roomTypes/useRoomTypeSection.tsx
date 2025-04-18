
import { useState, useEffect } from "react";
import { useRoomTypes, RoomType } from "./useRoomTypes";

export function useRoomTypeSection(
  onValidationChange: (isValid: boolean) => void, 
  formData: any = {}, 
  updateFormData: (field: string, value: any) => void = () => {}
) {
  const {
    selectedUnit,
    roomTypes: initialRoomTypes,
    dialogOpen,
    selectedStayLengths,
    setDialogOpen,
    handleAddRoomType: addRoomType,
    handleDeleteRoomType: deleteRoomType
  } = useRoomTypes();
  
  const [roomTypes, setRoomTypes] = useState<RoomType[]>(initialRoomTypes);
  
  // Load room types from parent formData if available
  useEffect(() => {
    if (formData && formData.roomTypes && formData.roomTypes.length > 0) {
      setRoomTypes(formData.roomTypes);
    }
  }, [formData]);
  
  // Validate room types
  useEffect(() => {
    const isValid = roomTypes.length > 0;
    onValidationChange(isValid);
  }, [roomTypes, onValidationChange]);
  
  const handleAddRoomType = (roomType: RoomType) => {
    const updatedRoomTypes = [...roomTypes, roomType];
    setRoomTypes(updatedRoomTypes);
    updateFormData('roomTypes', updatedRoomTypes);
    addRoomType(roomType);
  };
  
  const handleDeleteRoomType = (id: string) => {
    const updatedRoomTypes = roomTypes.filter(room => room.id !== id);
    setRoomTypes(updatedRoomTypes);
    updateFormData('roomTypes', updatedRoomTypes);
    deleteRoomType(id);
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
