
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

export interface RoomType {
  id: string;
  name: string;
  maxOccupancy: number;
  size: number;
  description: string;
  baseRate: number;
  rates: Record<number, number>; // stayDuration -> rate
  images?: string[];
}

export function useRoomTypes(initialRoomTypes: any[] = [], initialStayLengths: number[] = []) {
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [selectedStayLengths, setSelectedStayLengths] = useState<number[]>(initialStayLengths);
  const [selectedUnit, setSelectedUnit] = useState<string>("m²");
  const [dialogOpen, setDialogOpen] = useState(false);

  // Initialize with initial data if provided
  useEffect(() => {
    if (initialRoomTypes.length > 0) {
      setRoomTypes(initialRoomTypes);
    }
    
    if (initialStayLengths.length > 0) {
      setSelectedStayLengths(initialStayLengths);
    }
  }, []);

  const handleAddRoomType = (roomType: Omit<RoomType, "id">) => {
    const newRoomType: RoomType = {
      ...roomType,
      id: uuidv4(),
    };
    setRoomTypes((prev) => [...prev, newRoomType]);
  };

  const handleDeleteRoomType = (id: string) => {
    setRoomTypes((prev) => prev.filter((room) => room.id !== id));
  };

  const handleEditRoomType = (id: string, updatedRoomType: Partial<RoomType>) => {
    setRoomTypes((prev) =>
      prev.map((room) =>
        room.id === id ? { ...room, ...updatedRoomType } : room
      )
    );
  };

  return {
    roomTypes,
    selectedStayLengths,
    selectedUnit,
    dialogOpen,
    setDialogOpen,
    handleAddRoomType,
    handleDeleteRoomType,
    handleEditRoomType,
  };
}
