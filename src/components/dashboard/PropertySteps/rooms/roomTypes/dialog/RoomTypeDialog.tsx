
import React, { useState, useEffect } from "react";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
  editingRoomType?: any | null;
}

export default function RoomTypeDialog({ 
  isOpen, 
  onClose, 
  onAdd,
  availableStayLengths = [],
  preferredWeekday = "Monday",
  editingRoomType = null
}: RoomTypeDialogProps) {
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [description, setDescription] = useState("");
  const [rates, setRates] = useState<Record<number, number>>({});
  const [stayLengths, setStayLengths] = useState<number[]>(availableStayLengths);
  const [roomImages, setRoomImages] = useState<File[]>([]);
  const [roomImagePreviews, setRoomImagePreviews] = useState<string[]>([]);
  const [roomCount, setRoomCount] = useState(1);
  const [availabilityDates, setAvailabilityDates] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (editingRoomType) {
        setIsEditing(true);
        loadRoomTypeData(editingRoomType);
      } else {
        setIsEditing(false);
        resetForm();
      }
    }
  }, [isOpen, editingRoomType]);

  useEffect(() => {
    if (selectedRoomType) {
      const roomType = PREDEFINED_ROOM_TYPES.find(rt => rt.id === selectedRoomType);
      if (roomType) {
        setDescription(roomType.description);
      }
    }
  }, [selectedRoomType]);

  const loadRoomTypeData = (roomType: any) => {
    const predefinedType = PREDEFINED_ROOM_TYPES.find(rt => rt.name === roomType.name);
    setSelectedRoomType(predefinedType?.id || "");
    setDescription(roomType.description || "");
    setRoomCount(roomType.roomCount || 1);
    setRates(roomType.rates || {});
    if (roomType.images && roomType.images.length > 0) {
      setRoomImagePreviews(roomType.images);
    }
    if (roomType.availabilityDates && roomType.availabilityDates.length > 0) {
      setAvailabilityDates(roomType.availabilityDates);
    }
  };

  const handleAddRoomType = () => {
    if (selectedRoomType && roomImages.length > 0) {
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
    setIsEditing(false);
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

  const dialogTitle = isEditing ? "Edit Room Type" : "Add New Room Type";

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="bg-[#430453] text-white w-[90%] max-w-4xl h-full overflow-y-auto" side="bottom">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-white mb-6">{dialogTitle}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-8">
          <RoomTypeSelector 
            selectedRoomType={selectedRoomType}
            onRoomTypeChange={setSelectedRoomType}
            isEditing={isEditing}
          />

          {selectedRoomType && (
            <>
              <RoomDetailsForm 
                selectedRoomType={selectedRoomType}
                roomImages={roomImages}
                onAdd={handleAddRoomType}
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
      </SheetContent>
    </Sheet>
  );
}
