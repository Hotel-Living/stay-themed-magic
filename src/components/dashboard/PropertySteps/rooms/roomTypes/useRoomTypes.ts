
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
}

export function useRoomTypes() {
  const [selectedUnit, setSelectedUnit] = useState("sq. ft.");
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([
    {
      id: "1",
      name: "Single Room",
      maxOccupancy: 1,
      size: 200,
      description: "A cozy room for one person",
      baseRate: 100,
      rates: { 8: 800, 16: 1500 }
    }
  ]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedStayLengths, setSelectedStayLengths] = useState<number[]>([8, 16]); // Default values
  
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
  
  return {
    selectedUnit,
    roomTypes,
    dialogOpen,
    selectedStayLengths,
    setDialogOpen,
    handleAddRoomType
  };
}
