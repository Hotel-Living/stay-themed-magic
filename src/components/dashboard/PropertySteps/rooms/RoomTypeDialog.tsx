
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { getSelectedStayLengths } from "@/utils/stayLengthsContext";
import RoomInfoForm from "./roomTypes/RoomInfoForm";
import ImageUploadSection from "./roomTypes/ImageUploadSection";
import RatesSection from "./roomTypes/RatesSection";
import AvailabilityDateSection from "./roomTypes/AvailabilityDateSection";

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
  const [availabilityDates, setAvailabilityDates] = useState<string[]>([]);
  const [preferredWeekday, setPreferredWeekday] = useState("Monday");
  
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
        images: roomImagePreviews,
        availabilityDates
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
    setAvailabilityDates([]);
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

  const handleAvailabilityChange = (dates: string[]) => {
    setAvailabilityDates(dates);
  };

  // Get the preferred weekday from the form
  useEffect(() => {
    // This would normally be retrieved from your form data
    // Here we're just checking for any elements that might have this information
    const weekdaySelector = document.querySelector('input[name="preferred-weekday"]:checked') as HTMLInputElement;
    if (weekdaySelector && weekdaySelector.value) {
      setPreferredWeekday(weekdaySelector.value);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#430453] text-white max-w-[80%] w-[80%] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-white mb-6">Add New Room Type</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-8">
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
          
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white mb-4">RATES PER PERSON, NOT PER ROOM</h3>
            <RatesSection
              stayLengths={stayLengths}
              rates={rates}
              onRateChange={handleRateChange}
            />
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right text-base text-white">Available Rooms</Label>
              <div className="col-span-3">
                <Input 
                  type="number"
                  min="1"
                  value={roomCount}
                  onChange={(e) => setRoomCount(parseInt(e.target.value) || 1)}
                  className="bg-fuchsia-950/50 border border-white rounded-lg p-2 text-white w-32 text-base"
                />
              </div>
            </div>
          </div>
          
          <AvailabilityDateSection 
            preferredWeekday={preferredWeekday}
            onAvailabilityChange={handleAvailabilityChange}
            selectedDates={availabilityDates}
          />
        </div>
        
        <DialogFooter className="mt-8">
          <Button 
            onClick={handleAddRoomType} 
            disabled={!newRoomType.trim() || roomImages.length === 0}
            className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-6 py-2 text-base font-medium"
          >
            Add Room Type
          </Button>
          {roomImages.length === 0 && (
            <p className="text-red-400 text-sm mt-2">Please upload at least one room image</p>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
