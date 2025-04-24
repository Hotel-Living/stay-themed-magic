
import { useState } from "react";
import { PREDEFINED_ROOM_TYPES } from "../../constants";
import { useRoomTypeImages } from "./useRoomTypeImages";
import { useRoomTypeRates } from "./useRoomTypeRates";
import { useRoomTypeDetails } from "./useRoomTypeDetails";

interface UseRoomTypeFormProps {
  isOpen: boolean;
  editingRoomType: any | null;
  availableStayLengths?: number[];
  onAdd: (roomType: any) => void;
  preferredWeekday?: string;
}

export function useRoomTypeForm({ 
  editingRoomType, 
  availableStayLengths = [],
  onAdd,
  preferredWeekday = "Monday"
}: UseRoomTypeFormProps) {
  const {
    selectedRoomType,
    description,
    roomCount,
    isEditing,
    setSelectedRoomType,
    setDescription,
    setRoomCount
  } = useRoomTypeDetails(editingRoomType);

  const {
    roomImages,
    roomImagePreviews,
    handleImageUpload,
    removeImage
  } = useRoomTypeImages();

  const {
    rates,
    stayLengths,
    handleRateChange
  } = useRoomTypeRates(availableStayLengths);

  const [availabilityDates, setAvailabilityDates] = useState<string[]>([]);

  const handleAvailabilityChange = (dates: string[]) => {
    setAvailabilityDates(dates);
  };

  const handleAddRoomType = () => {
    if (selectedRoomType && roomImagePreviews.length > 0) {
      const roomType = PREDEFINED_ROOM_TYPES.find(rt => rt.id === selectedRoomType);
      onAdd({
        id: isEditing ? editingRoomType.id : Date.now().toString(),
        name: roomType?.name || "",
        maxOccupancy: 1,
        size: 200,
        description,
        baseRate: 0,
        roomCount,
        rates,
        images: roomImagePreviews,
        availabilityDates,
        preferredWeekday
      });
    }
  };

  return {
    formState: {
      selectedRoomType,
      description,
      rates,
      stayLengths,
      roomImages,
      roomImagePreviews,
      roomCount,
      availabilityDates,
      isEditing
    },
    setters: {
      setSelectedRoomType,
      setDescription,
      setRoomCount
    },
    handleImageUpload,
    removeImage,
    handleRateChange,
    handleAvailabilityChange,
    handleAddRoomType,
    dialogTitle: isEditing ? "Edit Room Type" : "Add New Room Type"
  };
}
