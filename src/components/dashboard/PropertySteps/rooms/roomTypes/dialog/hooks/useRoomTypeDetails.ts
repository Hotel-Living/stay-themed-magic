
import { useState, useEffect } from "react";
import { PREDEFINED_ROOM_TYPES } from "../../../constants";

interface UseRoomTypeDetailsReturn {
  selectedRoomType: string;
  description: string;
  roomCount: number;
  isEditing: boolean;
  setSelectedRoomType: (type: string) => void;
  setDescription: (desc: string) => void;
  setRoomCount: (count: number) => void;
}

export function useRoomTypeDetails(editingRoomType: any | null = null): UseRoomTypeDetailsReturn {
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [description, setDescription] = useState("");
  const [roomCount, setRoomCount] = useState(1);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (editingRoomType) {
      const predefinedType = PREDEFINED_ROOM_TYPES.find(rt => rt.name === editingRoomType.name);
      setSelectedRoomType(predefinedType?.id || "");
      setDescription(editingRoomType.description || "");
      setRoomCount(editingRoomType.roomCount || 1);
      setIsEditing(true);
    }
  }, [editingRoomType]);

  useEffect(() => {
    if (selectedRoomType) {
      const roomType = PREDEFINED_ROOM_TYPES.find(rt => rt.id === selectedRoomType);
      if (roomType) {
        setDescription(roomType.description);
      }
    }
  }, [selectedRoomType]);

  return {
    selectedRoomType,
    description,
    roomCount,
    isEditing,
    setSelectedRoomType,
    setDescription,
    setRoomCount
  };
}
