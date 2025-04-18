import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getSelectedStayLengths } from "@/utils/stayLengthsContext";
import RoomInfoForm from "./roomTypes/RoomInfoForm";
import ImageUploadSection from "./roomTypes/ImageUploadSection";
import RatesSection from "./roomTypes/RatesSection";
import { useToast } from "@/hooks/use-toast";

interface RoomTypeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (roomType: any) => void;
  availableStayLengths?: number[];
}

export default function RoomTypeDialog({ 
  isOpen, 
  onClose, 
  onAdd,
  availableStayLengths = [] 
}: RoomTypeDialogProps) {
  const [newRoomType, setNewRoomType] = useState("");
  const [maxOccupancy, setMaxOccupancy] = useState(1);
  const [roomSize, setRoomSize] = useState(200);
  const [description, setDescription] = useState("");
  const [rates, setRates] = useState<Record<number, number>>({});
  const [stayLengths, setStayLengths] = useState<number[]>(availableStayLengths);
  const [roomImages, setRoomImages] = useState<File[]>([]);
  const [roomImagePreviews, setRoomImagePreviews] = useState<string[]>([]);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
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
    
    if (!newRoomType.trim()) {
      errors.roomType = "Room type name is required";
      isValid = false;
    }

    if (maxOccupancy < 1) {
      errors.maxOccupancy = "Maximum occupancy must be at least 1";
      isValid = false;
    }

    if (roomSize <= 0) {
      errors.roomSize = "Room size must be greater than 0";
      isValid = false;
    }

    if (!description.trim()) {
      errors.description = "Room description is required";
      isValid = false;
    }

    const hasRates = Object.keys(rates).length > 0;
    if (!hasRates) {
      errors.rates = "At least one rate is required";
      isValid = false;
    }
    
    if (roomImages.length === 0) {
      errors.images = "At least one room image is recommended";
    }

    setFormErrors(errors);
    
    if (!isValid) {
      toast({
        title: "Missing Information",
        description: "Please complete all required fields",
        variant: "destructive"
      });
    }
    
    return isValid;
  };

  const handleAddRoomType = () => {
    if (validateRoomType()) {
      onAdd({
        id: Date.now().toString(),
        name: newRoomType,
        maxOccupancy,
        size: roomSize,
        description,
        baseRate: 0,
        rates,
        images: roomImagePreviews
      });
      resetForm();
    }
  };

  const resetForm = () => {
    setNewRoomType("");
    setMaxOccupancy(1);
    setRoomSize(200);
    setDescription("");
    setRates({});
    setRoomImages([]);
    setRoomImagePreviews([]);
    setFormErrors({});
  };

  const handleRateChange = (duration: number, value: string) => {
    setRates(prev => ({
      ...prev,
      [duration]: parseInt(value) || 0
    }));
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setRoomImages(prev => [...prev, ...newFiles]);
      
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setRoomImagePreviews(prev => [...prev, ...newPreviews]);
    }
  };
  
  const removeImage = (index: number) => {
    setRoomImages(prev => prev.filter((_, i) => i !== index));
    
    const urlToRevoke = roomImagePreviews[index];
    URL.revokeObjectURL(urlToRevoke);
    setRoomImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#430453] text-white max-w-[80%] w-[80%]">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">Add New Room Type</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4 overflow-y-auto max-h-[70vh]">
          <RoomInfoForm
            newRoomType={newRoomType}
            maxOccupancy={maxOccupancy}
            roomSize={roomSize}
            description={description}
            onRoomTypeChange={setNewRoomType}
            onMaxOccupancyChange={setMaxOccupancy}
            onRoomSizeChange={setRoomSize}
            onDescriptionChange={setDescription}
            errors={formErrors}
          />
          
          <ImageUploadSection
            roomImages={roomImages}
            roomImagePreviews={roomImagePreviews}
            onImageUpload={handleImageUpload}
            onRemoveImage={removeImage}
            error={formErrors.images}
          />
          
          <RatesSection
            stayLengths={stayLengths}
            rates={rates}
            onRateChange={handleRateChange}
            error={formErrors.rates}
          />
        </div>
        
        <DialogFooter>
          <Button 
            onClick={handleAddRoomType} 
            className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
          >
            Add Room Type
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
