
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getSelectedStayLengths } from "@/utils/stayLengthsContext";
import { PREDEFINED_ROOM_TYPES } from "./roomTypes/constants";
import RoomInfoForm from "./roomTypes/RoomInfoForm";
import ImageUploadSection from "./roomTypes/ImageUploadSection";
import RatesSection from "./roomTypes/RatesSection";
import AvailabilityDateSection from "./roomTypes/AvailabilityDateSection";
import { Sheet, SheetContent } from "@/components/ui/sheet";

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
  const [maxOccupancy, setMaxOccupancy] = useState(1);
  const [roomSize, setRoomSize] = useState(200);
  const [description, setDescription] = useState("");
  const [rates, setRates] = useState<Record<number, number>>({});
  const [stayLengths, setStayLengths] = useState<number[]>(availableStayLengths);
  const [roomImages, setRoomImages] = useState<File[]>([]);
  const [roomImagePreviews, setRoomImagePreviews] = useState<string[]>([]);
  const [roomCount, setRoomCount] = useState(1);
  const [availabilityDates, setAvailabilityDates] = useState<string[]>([]);
  
  // Track the effective preferred weekday
  const [effectiveWeekday, setEffectiveWeekday] = useState<string>(preferredWeekday);

  // Update when prop changes
  useEffect(() => {
    setEffectiveWeekday(preferredWeekday);
  }, [preferredWeekday]);

  useEffect(() => {
    if (selectedRoomType) {
      const roomType = PREDEFINED_ROOM_TYPES.find(rt => rt.id === selectedRoomType);
      if (roomType) {
        setDescription(roomType.description);
      }
    }
  }, [selectedRoomType]);

  useEffect(() => {
    if (isOpen) {
      // First try to use the props passed from parent
      if (availableStayLengths && availableStayLengths.length > 0) {
        setStayLengths(availableStayLengths);
      } else {
        // Fall back to stored durations if needed
        const storedLengths = getSelectedStayLengths();
        if (storedLengths && storedLengths.length > 0) {
          setStayLengths(storedLengths);
        }
      }
    }
  }, [isOpen, availableStayLengths]);

  const handleAddRoomType = () => {
    if (selectedRoomType && roomImages.length > 0) {
      const roomType = PREDEFINED_ROOM_TYPES.find(rt => rt.id === selectedRoomType);
      onAdd({
        id: Date.now().toString(),
        name: roomType?.name || "",
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
    setSelectedRoomType("");
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

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="bg-[#430453] text-white w-[90%] max-w-4xl h-full overflow-y-auto" side="bottom">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-white mb-6">Add New Room Type</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-8">
          <div className="space-y-4">
            <div>
              <Label className="text-white mb-2">Room Type</Label>
              <Select value={selectedRoomType} onValueChange={setSelectedRoomType}>
                <SelectTrigger className="bg-[#850390] text-white border-white">
                  <SelectValue placeholder="Select a room type" />
                </SelectTrigger>
                <SelectContent className="bg-[#850390] border-white">
                  {PREDEFINED_ROOM_TYPES.map((type) => (
                    <SelectItem 
                      key={type.id} 
                      value={type.id}
                      className="text-white hover:bg-[#8A0499] focus:bg-[#8A0499] focus:text-white"
                    >
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedRoomType && (
              <>
                <div className="space-y-4">
                  <div>
                    <Label className="text-white">Description</Label>
                    <Input 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="bg-[#850390] text-white border-white"
                    />
                  </div>
                </div>

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
                  preferredWeekday={effectiveWeekday}
                  onAvailabilityChange={handleAvailabilityChange}
                  selectedDates={availabilityDates}
                />
              </>
            )}
          </div>
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
