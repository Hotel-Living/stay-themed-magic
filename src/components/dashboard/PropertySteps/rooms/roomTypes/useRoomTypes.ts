
import { useState, useEffect } from 'react';
import { getSelectedStayLengths } from "@/utils/stayLengthsContext";

export interface RoomType {
  id: string;
  name: string;
  maxOccupancy?: number;
  size?: number;
  description?: string;
  baseRate?: number;
  basePrice?: number;
  rates?: Record<number, number>; // stayDuration -> rate
  images?: string[];
  roomCount?: number; // Added this property to match expected type
}

export function useRoomTypes(initialRoomTypes: RoomType[] = []) {
  console.log("useRoomTypes initializing with:", initialRoomTypes);
  const [selectedUnit, setSelectedUnit] = useState("sq. ft.");
  const [roomTypes, setRoomTypes] = useState<RoomType[]>(initialRoomTypes);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedStayLengths, setSelectedStayLengths] = useState<number[]>([8, 15, 22, 29]); // Aligned with StayDurationSection
  
  // Initialize roomTypes if provided
  useEffect(() => {
    if (initialRoomTypes && initialRoomTypes.length > 0) {
      console.log("Setting initial room types:", initialRoomTypes);
      setRoomTypes(initialRoomTypes);
    }
  }, [initialRoomTypes]);
  
  // Get selected stay lengths from localStorage if available
  useEffect(() => {
    const storedLengths = getSelectedStayLengths();
    if (storedLengths && storedLengths.length > 0) {
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
    console.log("Adding/updating room type:", roomType);
    
    // Use functional update to ensure we have the latest state
    setRoomTypes(currentRoomTypes => {
      // Check if this is an edit (updated room type) or a new one
      const existingIndex = currentRoomTypes.findIndex(room => room.id === roomType.id);
      
      if (existingIndex >= 0) {
        // Update existing room type
        const updatedRoomTypes = [...currentRoomTypes];
        updatedRoomTypes[existingIndex] = roomType;
        console.log("Updated existing room type at index:", existingIndex);
        return updatedRoomTypes;
      } else {
        // Add new room type
        console.log("Adding new room type");
        return [...currentRoomTypes, roomType];
      }
    });
    
    setDialogOpen(false);
  };
  
  const handleDeleteRoomType = (id: string) => {
    console.log("Deleting room type with id:", id);
    
    // Use functional update to ensure we have the latest state
    setRoomTypes(currentRoomTypes => {
      const filtered = currentRoomTypes.filter(room => room.id !== id);
      console.log("Filtered room types:", filtered);
      return filtered;
    });
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
