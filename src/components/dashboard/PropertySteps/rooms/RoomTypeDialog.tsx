
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
  const { toast } = useToast();
  
  // Get the latest stay lengths on open
  useEffect(() => {
    if (isOpen) {
      // First try to use the provided lengths
      if (availableStayLengths && availableStayLengths.length > 0) {
        setStayLengths(availableStayLengths);
      } else {
        // Fallback to getting from localStorage
        const storedLengths = getSelectedStayLengths();
        if (storedLengths && storedLengths.length > 0) {
          setStayLengths(storedLengths);
        }
      }
    }
  }, [isOpen, availableStayLengths]);

  const validateRoomType = (): boolean => {
    if (!newRoomType.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter a room type name",
        variant: "destructive"
      });
      return false;
    }

    if (maxOccupancy < 1) {
      toast({
        title: "Invalid Occupancy",
        description: "Maximum occupancy must be at least 1",
        variant: "destructive"
      });
      return false;
    }

    if (roomSize <= 0) {
      toast({
        title: "Invalid Room Size",
        description: "Room size must be greater than 0",
        variant: "destructive"
      });
      return false;
    }

    if (!description.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter a room description",
        variant: "destructive"
      });
      return false;
    }

    // Check if at least one rate is provided for any stay length
    const hasRates = Object.keys(rates).length > 0;
    if (!hasRates) {
      toast({
        title: "Missing Rates",
        description: "Please enter at least one rate for a stay duration",
        variant: "destructive"
      });
      return false;
    }

    return true;
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
      
      // Create preview URLs
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setRoomImagePreviews(prev => [...prev, ...newPreviews]);
    }
  };
  
  const removeImage = (index: number) => {
    setRoomImages(prev => prev.filter((_, i) => i !== index));
    
    // Also remove the preview and revoke the object URL to free memory
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
          />
          
          <ImageUploadSection
            roomImages={roomImages}
            roomImagePreviews={roomImagePreviews}
            onImageUpload={handleImageUpload}
            onRemoveImage={removeImage}
          />
          
          <RatesSection
            stayLengths={stayLengths}
            rates={rates}
            onRateChange={handleRateChange}
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
