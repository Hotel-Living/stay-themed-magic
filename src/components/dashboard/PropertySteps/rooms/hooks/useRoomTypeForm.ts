
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { getSelectedStayLengths } from "@/utils/stayLengthsContext";

export interface RoomTypeFormState {
  newRoomType: string;
  maxOccupancy: number;
  roomSize: number;
  description: string;
  rates: Record<number, number>;
  roomImages: File[];
  roomImagePreviews: string[];
  formErrors: Record<string, string>;
}

export const useRoomTypeForm = (isOpen: boolean, availableStayLengths: number[] = []) => {
  const [formState, setFormState] = useState<RoomTypeFormState>({
    newRoomType: "",
    maxOccupancy: 1,
    roomSize: 200,
    description: "",
    rates: {},
    roomImages: [],
    roomImagePreviews: [],
    formErrors: {}
  });
  const [stayLengths, setStayLengths] = useState<number[]>(availableStayLengths);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      if (availableStayLengths && availableStayLengths.length > 0) {
        setStayLengths(availableStayLengths);
      } else {
        const storedLengths = getSelectedStayLengths();
        if (storedLengths && storedLengths.length > 0) {
          setStayLengths(storedLengths);
        }
      }
    }
  }, [isOpen, availableStayLengths]);

  const validateRoomType = (): boolean => {
    const errors: Record<string, string> = {};
    let isValid = true;
    
    if (!formState.newRoomType.trim()) {
      errors.roomType = "Room type name is required";
      isValid = false;
    }

    if (formState.maxOccupancy < 1) {
      errors.maxOccupancy = "Maximum occupancy must be at least 1";
      isValid = false;
    }

    if (formState.roomSize <= 0) {
      errors.roomSize = "Room size must be greater than 0";
      isValid = false;
    }

    if (!formState.description.trim()) {
      errors.description = "Room description is required";
      isValid = false;
    }

    const hasRates = Object.keys(formState.rates).length > 0;
    if (!hasRates) {
      errors.rates = "At least one rate is required";
      isValid = false;
    }
    
    if (formState.roomImages.length === 0) {
      errors.images = "At least one room image is recommended";
    }

    setFormState(prev => ({ ...prev, formErrors: errors }));
    
    if (!isValid) {
      toast({
        title: "Missing Information",
        description: "Please complete all required fields",
        variant: "destructive"
      });
    }
    
    return isValid;
  };

  const resetForm = () => {
    setFormState({
      newRoomType: "",
      maxOccupancy: 1,
      roomSize: 200,
      description: "",
      rates: {},
      roomImages: [],
      roomImagePreviews: [],
      formErrors: {}
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

  return {
    formState,
    stayLengths,
    setFormState,
    validateRoomType,
    resetForm,
    handleRateChange,
    handleImageUpload,
    removeImage
  };
};
