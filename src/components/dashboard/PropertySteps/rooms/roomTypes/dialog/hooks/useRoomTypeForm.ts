
import { useState, useEffect } from "react";
import { PREDEFINED_ROOM_TYPES } from "../../constants";

export interface RoomTypeFormState {
  selectedRoomType: string;
  description: string;
  rates: Record<number, number>;
  stayLengths: number[];
  roomImages: File[];
  roomImagePreviews: string[];
  roomCount: number;
  availabilityDates: string[];
  isEditing: boolean;
}

interface UseRoomTypeFormProps {
  isOpen: boolean;
  editingRoomType: any | null;
  availableStayLengths?: number[];
  onAdd: (roomType: any) => void;
  preferredWeekday?: string;
}

export function useRoomTypeForm({ 
  isOpen, 
  editingRoomType, 
  availableStayLengths = [],
  onAdd,
  preferredWeekday = "Monday"
}: UseRoomTypeFormProps) {
  const [formState, setFormState] = useState<RoomTypeFormState>({
    selectedRoomType: "",
    description: "",
    rates: {},
    stayLengths: availableStayLengths,
    roomImages: [],
    roomImagePreviews: [],
    roomCount: 1,
    availabilityDates: [],
    isEditing: false
  });

  useEffect(() => {
    if (isOpen) {
      if (editingRoomType) {
        loadRoomTypeData(editingRoomType);
      } else {
        resetForm();
      }
    }
  }, [isOpen, editingRoomType, availableStayLengths]);

  useEffect(() => {
    if (formState.selectedRoomType) {
      const roomType = PREDEFINED_ROOM_TYPES.find(rt => rt.id === formState.selectedRoomType);
      if (roomType) {
        setFormState(prev => ({
          ...prev,
          description: roomType.description
        }));
      }
    }
  }, [formState.selectedRoomType]);

  const loadRoomTypeData = (roomType: any) => {
    const predefinedType = PREDEFINED_ROOM_TYPES.find(rt => rt.name === roomType.name);
    setFormState({
      selectedRoomType: predefinedType?.id || "",
      description: roomType.description || "",
      roomCount: roomType.roomCount || 1,
      rates: roomType.rates || {},
      roomImages: [],
      roomImagePreviews: roomType.images || [],
      stayLengths: availableStayLengths,
      availabilityDates: roomType.availabilityDates || [],
      isEditing: true
    });
  };

  const resetForm = () => {
    setFormState({
      selectedRoomType: "",
      description: "",
      rates: {},
      stayLengths: availableStayLengths,
      roomImages: [],
      roomImagePreviews: [],
      roomCount: 1,
      availabilityDates: [],
      isEditing: false
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFormState(prev => ({
        ...prev,
        roomImages: [...prev.roomImages, ...newFiles],
        roomImagePreviews: [
          ...prev.roomImagePreviews,
          ...newFiles.map(file => URL.createObjectURL(file))
        ]
      }));
    }
  };
  
  const removeImage = (index: number) => {
    setFormState(prev => {
      const urlToRevoke = prev.roomImagePreviews[index];
      URL.revokeObjectURL(urlToRevoke);
      return {
        ...prev,
        roomImages: prev.roomImages.filter((_, i) => i !== index),
        roomImagePreviews: prev.roomImagePreviews.filter((_, i) => i !== index)
      };
    });
  };

  const handleRateChange = (duration: number, value: string) => {
    setFormState(prev => ({
      ...prev,
      rates: {
        ...prev.rates,
        [duration]: parseInt(value) || 0
      }
    }));
  };

  const handleAvailabilityChange = (dates: string[]) => {
    setFormState(prev => ({
      ...prev,
      availabilityDates: dates
    }));
  };

  const handleAddRoomType = () => {
    if (formState.selectedRoomType && formState.roomImagePreviews.length > 0) {
      const roomType = PREDEFINED_ROOM_TYPES.find(rt => rt.id === formState.selectedRoomType);
      onAdd({
        id: formState.isEditing ? editingRoomType.id : Date.now().toString(),
        name: roomType?.name || "",
        maxOccupancy: 1,
        size: 200,
        description: formState.description,
        baseRate: 0,
        roomCount: formState.roomCount,
        rates: formState.rates,
        images: formState.roomImagePreviews,
        availabilityDates: formState.availabilityDates,
        preferredWeekday
      });
      resetForm();
    }
  };

  return {
    formState,
    setFormState,
    handleImageUpload,
    removeImage,
    resetForm,
    handleRateChange,
    handleAvailabilityChange,
    handleAddRoomType,
    dialogTitle: formState.isEditing ? "Edit Room Type" : "Add New Room Type"
  };
}
