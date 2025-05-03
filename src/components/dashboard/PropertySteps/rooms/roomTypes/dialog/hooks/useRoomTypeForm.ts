
import { useState, useEffect } from "react";
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
  console.log("useRoomTypeForm initialized with editingRoomType:", editingRoomType);
  
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
    removeImage,
    setRoomImagePreviews
  } = useRoomTypeImages();
  
  // Load existing images when editing
  useEffect(() => {
    if (editingRoomType && editingRoomType.images && editingRoomType.images.length > 0) {
      console.log("Loading existing images from editingRoomType:", editingRoomType.images);
      setRoomImagePreviews(editingRoomType.images);
    } else if (editingRoomType && editingRoomType.roomImages && editingRoomType.roomImages.length > 0) {
      console.log("Loading existing roomImages from editingRoomType:", editingRoomType.roomImages);
      setRoomImagePreviews(editingRoomType.roomImages);
    }
  }, [editingRoomType, setRoomImagePreviews]);

  const {
    rates,
    stayLengths,
    handleRateChange,
    setRates
  } = useRoomTypeRates(availableStayLengths);
  
  // Load existing rates when editing
  useEffect(() => {
    if (editingRoomType && editingRoomType.rates) {
      console.log("Loading existing rates from editingRoomType:", editingRoomType.rates);
      setRates(editingRoomType.rates);
    }
  }, [editingRoomType, setRates]);

  const [availabilityDates, setAvailabilityDates] = useState<string[]>([]);
  
  // Load existing availability dates when editing
  useEffect(() => {
    if (editingRoomType && editingRoomType.availabilityDates && editingRoomType.availabilityDates.length > 0) {
      console.log("Loading availability dates from editingRoomType:", editingRoomType.availabilityDates);
      setAvailabilityDates(editingRoomType.availabilityDates);
    }
  }, [editingRoomType]);

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
