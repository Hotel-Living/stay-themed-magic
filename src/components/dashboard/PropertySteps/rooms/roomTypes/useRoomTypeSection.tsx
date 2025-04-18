
import { useState, useEffect } from "react";
import { getSelectedStayLengths } from "@/utils/stayLengthsContext";

// Updated RoomType interface to align with useRoomTypes.ts
export interface RoomType {
  id: string;
  name: string;
  maxOccupancy: number;
  size: number;
  description: string;
  baseRate: number;
  images: string[]; // Making sure this is required to match the error
  rates: Record<string, number>;
  amenities: string[];
}

export function useRoomTypeSection(onValidationChange: (isValid: boolean) => void) {
  const [selectedUnit, setSelectedUnit] = useState<string>("sq. ft.");
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  // Don't prefill selected stay lengths
  const [selectedStayLengths, setSelectedStayLengths] = useState<number[]>([]);

  // Validate the room types whenever they change
  useEffect(() => {
    const isValid = roomTypes.length > 0;
    onValidationChange(isValid);
  }, [roomTypes, onValidationChange]);

  // Handle adding a new room type
  const handleAddRoomType = (roomType: RoomType) => {
    setRoomTypes(prev => [...prev, roomType]);
    setDialogOpen(false);
  };

  // Handle deleting a room type
  const handleDeleteRoomType = (roomTypeId: string) => {
    setRoomTypes(prev => prev.filter(rt => rt.id !== roomTypeId));
  };

  return {
    selectedUnit,
    roomTypes,
    dialogOpen,
    selectedStayLengths,
    setDialogOpen,
    handleAddRoomType,
    handleDeleteRoomType,
    setSelectedStayLengths
  };
}
