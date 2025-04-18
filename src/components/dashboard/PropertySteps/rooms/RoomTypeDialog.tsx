
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"; // Add missing Label import
import { Input } from "@/components/ui/input"; // Add missing Input import
import { getSelectedStayLengths } from "@/utils/stayLengthsContext";
import RoomInfoForm from "./roomTypes/RoomInfoForm";
import ImageUploadSection from "./roomTypes/ImageUploadSection";
import RatesSection from "./roomTypes/RatesSection";

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
  const [roomCount, setRoomCount] = useState(1);
  
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

  const handleAddRoomType = () => {
    if (newRoomType.trim() && roomImages.length > 0) {
      onAdd({
        id: Date.now().toString(),
        name: newRoomType,
        maxOccupancy,
        size: roomSize,
        description,
        baseRate: 0,
        roomCount,
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
    setRoomCount(1);
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
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right text-sm text-white">Available Rooms</Label>
            <div className="col-span-3">
              <Input 
                type="number"
                min="1"
                value={roomCount}
                onChange={(e) => setRoomCount(parseInt(e.target.value) || 1)}
                className="bg-fuchsia-950/50 border border-white rounded-lg p-2 text-white w-24"
              />
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            onClick={handleAddRoomType} 
            disabled={!newRoomType.trim() || roomImages.length === 0}
            className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
          >
            Add Room Type
          </Button>
          {roomImages.length === 0 && (
            <p className="text-red-400 text-sm">Please upload at least one room image</p>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
