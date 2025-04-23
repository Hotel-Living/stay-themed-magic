
import { useState, useEffect } from 'react';
import { getSelectedStayLengths } from "@/utils/stayLengthsContext";

export interface RoomType {
  id: string;
  name: string;
  maxOccupancy: number;
  size: number;
  description: string;
  baseRate: number;
  rates: Record<number, number>; // stayDuration -> rate
  images?: string[];
  roomCount: number; // Added this property to match expected type
}

export function useRoomTypes(initialRoomTypes: RoomType[] = []) {
  const [selectedUnit, setSelectedUnit] = useState("sq. ft.");
  const [roomTypes, setRoomTypes] = useState<RoomType[]>(initialRoomTypes);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedStayLengths, setSelectedStayLengths] = useState<number[]>([8, 16, 24, 32]); // Updated default values
  
  // Get selected stay lengths from localStorage if available
  useEffect(() => {
    const storedLengths = getSelectedStayLengths();
    if (storedLengths.length > 0) {
      setSelectedStayLengths(storedLengths);
    }
    
    // Listen for updates to stay lengths
    const handleStayLengthsUpdate = (event: CustomEvent) => {
      setSelectedStayLengths(event.detail);
    };
    
    window.addEventListener('stayLengthsUpdated', handleStayLengthsUpdate as EventListener);
    
    return () => {
      window.removeEventListener('stayLengthsUpdated', handleStayLengthsUpdate as EventListener);
    };
  }, []);
  
  const handleAddRoomType = (roomType: RoomType) => {
    setRoomTypes([...roomTypes, roomType]);
    setDialogOpen(false);
  };
  
  const handleDeleteRoomType = (id: string) => {
    setRoomTypes(roomTypes.filter(room => room.id !== id));
  };
  
  return {
    selectedUnit,
    setSelectedUnit,
    roomTypes,
    setRoomTypes,
    dialogOpen,
    selectedStayLengths,
    setDialogOpen,
    handleAddRoomType,
    handleDeleteRoomType
  };
}
