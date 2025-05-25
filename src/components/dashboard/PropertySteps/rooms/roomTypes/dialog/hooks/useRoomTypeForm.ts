
import { useState, useEffect } from 'react';
import { useRoomTypeImages } from './useRoomTypeImages';
import { useRoomImagePersistence } from '@/hooks/useRoomImagePersistence';

interface UseRoomTypeFormProps {
  isOpen: boolean;
  editingRoomType?: any | null;
  availableStayLengths: number[];
  onAdd: (roomType: any) => void;
  preferredWeekday: string;
}

export function useRoomTypeForm({ 
  isOpen, 
  editingRoomType, 
  availableStayLengths,
  onAdd,
  preferredWeekday
}: UseRoomTypeFormProps) {
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [description, setDescription] = useState('');
  const [roomCount, setRoomCount] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { persistRoomImages, convertBlobUrlsToPermanent, uploading: imageUploading } = useRoomImagePersistence();
  
  const {
    roomImages,
    roomImagePreviews,
    handleImageUpload,
    removeImage,
    setRoomImagePreviews
  } = useRoomTypeImages();

  // Initialize form when editing
  useEffect(() => {
    if (isOpen && editingRoomType) {
      console.log("useRoomTypeForm - Initializing for editing:", editingRoomType);
      setIsEditing(true);
      setSelectedRoomType(editingRoomType.name || '');
      setDescription(editingRoomType.description || '');
      setRoomCount(editingRoomType.roomCount || 1);
      
      // Set existing images as previews
      if (editingRoomType.images && editingRoomType.images.length > 0) {
        console.log("useRoomTypeForm - Setting existing images:", editingRoomType.images);
        setRoomImagePreviews(editingRoomType.images);
      }
    } else if (isOpen) {
      // Reset form for new room type
      setIsEditing(false);
      setSelectedRoomType('');
      setDescription('');
      setRoomCount(1);
      setRoomImagePreviews([]);
    }
  }, [isOpen, editingRoomType, setRoomImagePreviews]);

  const handleAvailabilityChange = (dates: string[]) => {
    // Availability handling logic here
    console.log("Room type availability changed:", dates);
  };

  const handleAddRoomType = async () => {
    if (!selectedRoomType) {
      console.warn("No room type selected");
      return;
    }

    if (isSubmitting) {
      console.log("Already submitting, preventing duplicate submission");
      return;
    }

    setIsSubmitting(true);

    try {
      let finalImages: string[] = [];

      // Process images - convert any blob URLs to permanent storage URLs
      if (roomImagePreviews.length > 0) {
        const hotelId = 'temp-hotel-id'; // This should be the actual hotel ID
        const roomTypeId = `${selectedRoomType}-${Date.now()}`;
        
        // Check if we have blob URLs that need to be converted
        const hasBlobUrls = roomImagePreviews.some(url => url.startsWith('blob:'));
        
        if (hasBlobUrls) {
          console.log("Converting blob URLs to permanent storage...");
          finalImages = await convertBlobUrlsToPermanent(roomImagePreviews, hotelId, roomTypeId);
        } else {
          // All images are already permanent URLs
          finalImages = roomImagePreviews;
        }
      }

      const roomTypeData = {
        id: isEditing ? editingRoomType?.id : `${selectedRoomType}-${Date.now()}`,
        name: selectedRoomType,
        description,
        roomCount,
        images: finalImages,
        rates: {},
        availabilityDates: [],
        maxOccupancy: 2,
        size: null
      };

      console.log("Adding/updating room type with data:", roomTypeData);
      
      // Add a small delay to ensure all state updates are processed
      await new Promise(resolve => setTimeout(resolve, 50));
      
      onAdd(roomTypeData);
      
      // Reset form
      setSelectedRoomType('');
      setDescription('');
      setRoomCount(1);
      setRoomImagePreviews([]);
      
    } catch (error) {
      console.error("Error processing room type:", error);
    } finally {
      // Reset submitting flag after a delay to prevent rapid re-submissions
      setTimeout(() => {
        setIsSubmitting(false);
      }, 200);
    }
  };

  const dialogTitle = isEditing ? "Edit Room Type" : "Add Room Type";

  const formState = {
    selectedRoomType,
    description,
    roomCount,
    roomImages,
    roomImagePreviews,
    isEditing,
    isSubmitting
  };

  const setters = {
    setSelectedRoomType,
    setDescription,
    setRoomCount
  };

  return {
    formState,
    setters,
    handleImageUpload,
    removeImage,
    handleAvailabilityChange,
    handleAddRoomType,
    dialogTitle,
    imageUploading
  };
}
