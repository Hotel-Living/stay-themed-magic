
import React, { useState, useEffect } from "react";
import { DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { PREDEFINED_ROOM_TYPES } from "../constants";
import RoomTypeSelector from "./RoomTypeSelector";
import RoomDetailsForm from "./RoomDetailsForm";
import RoomImageSection from "./RoomImageSection";
import RatesSection from "../RatesSection";
import AvailabilityDateSection from "../AvailabilityDateSection";

interface RoomTypeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (roomType: any) => void;
  availableStayLengths?: number[];
  preferredWeekday?: string;
}

export default function RoomTypeDialog({ 
  isOpen, 
  onClose, 
  onAdd,
  availableStayLengths = [],
  preferredWeekday = "Monday",
}: RoomTypeDialogProps) {
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [description, setDescription] = useState("");
  const [rates, setRates] = useState<Record<number, number>>({});
  const [stayLengths, setStayLengths] = useState<number[]>(availableStayLengths);
  const [roomImages, setRoomImages] = useState<File[]>([]);
  const [roomImagePreviews, setRoomImagePreviews] = useState<string[]>([]);
  const [roomCount, setRoomCount] = useState(1);
  const [availabilityDates, setAvailabilityDates] = useState<string[]>([]);

  useEffect(() => {
    if (selectedRoomType) {
      const roomType = PREDEFINED_ROOM_TYPES.find(rt => rt.id === selectedRoomType);
      if (roomType) {
        setDescription(roomType.description);
      }
    }
  }, [selectedRoomType]);

  const handleAddRoomType = () => {
    if (selectedRoomType && roomImages.length > 0) {
      const roomType = PREDEFINED_ROOM_TYPES.find(rt => rt.id === selectedRoomType);
      onAdd({
        id: Date.now().toString(),
        name: roomType?.name || "",
        maxOccupancy: 1,
        size: 200,
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
    setSelectedRoomType("");
    setDescription("");
    setRates({});
    setRoomImages([]);
    setRoomImagePreviews([]);
    setRoomCount(1);
    setAvailabilityDates([]);
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
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="bg-[#430453] text-white w-[90%] max-w-4xl h-full overflow-y-auto" side="bottom">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-white mb-6">Add New Room Type</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-8">
          <RoomTypeSelector 
            selectedRoomType={selectedRoomType}
            onRoomTypeChange={setSelectedRoomType}
          />

          {selectedRoomType && (
            <>
              <RoomDetailsForm 
                description={description}
                onDescriptionChange={setDescription}
                roomCount={roomCount}
                onRoomCountChange={setRoomCount}
              />

              <RoomImageSection
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
                  onRateChange={(duration, value) => 
                    setRates(prev => ({
                      ...prev,
                      [duration]: parseInt(value) || 0
                    }))
                  }
                />
              </div>
              
              <AvailabilityDateSection 
                preferredWeekday={preferredWeekday}
                onAvailabilityChange={setAvailabilityDates}
                selectedDates={availabilityDates}
              />
            </>
          )}
        </div>
        
        <DialogFooter className="mt-8">
          <Button 
            onClick={handleAddRoomType} 
            disabled={!selectedRoomType || roomImages.length === 0}
            className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-6 py-2 text-base font-medium"
          >
            Add Room Type
          </Button>
          {roomImages.length === 0 && (
            <p className="text-red-400 text-sm mt-2">Please upload at least one room image</p>
          )}
        </DialogFooter>
      </SheetContent>
    </Sheet>
  );
}
