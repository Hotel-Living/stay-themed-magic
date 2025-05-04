
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import RoomTypeSelector from "./RoomTypeSelector";
import RoomDetailsForm from "./RoomDetailsForm";
import RoomImageSection from "./RoomImageSection";
import RatesSection from "./sections/RatesSection";
import RoomCountSection from "./sections/RoomCountSection";
import { v4 as uuidv4 } from "uuid";

interface RoomTypeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (roomType: any) => void;
  initialData?: any;
  stayLengths?: number[];
  preferredWeekday?: string;
}

export default function RoomTypeDialog({
  isOpen,
  onClose,
  onSave,
  initialData = {},
  stayLengths = [],
  preferredWeekday = "Monday"
}: RoomTypeDialogProps) {
  const { toast } = useToast();
  const [selectedType, setSelectedType] = useState<string>(initialData.type || "");
  const [roomCount, setRoomCount] = useState<number>(initialData.roomCount || 1);
  const [bedCount, setBedCount] = useState<number>(initialData.bedCount || 1);
  const [guestCount, setGuestCount] = useState<number>(initialData.guestCount || 1);
  const [description, setDescription] = useState<string>(initialData.description || "");
  const [images, setImages] = useState<string[]>(initialData.images || []);
  const [rates, setRates] = useState<Record<number, number>>(initialData.rates || {});
  
  // No longer need these for availability
  // const [availabilityDates, setAvailabilityDates] = useState<string[]>(initialData.availabilityDates || []);
  
  const isEditing = !!initialData.id;

  const handleSave = () => {
    if (!selectedType) {
      toast({
        title: "Error",
        description: "Please select a room type",
        variant: "destructive",
      });
      return;
    }

    if (images.length === 0) {
      toast({
        title: "Error",
        description: "Please upload at least one image",
        variant: "destructive",
      });
      return;
    }

    const roomTypeData = {
      id: initialData.id || uuidv4(),
      type: selectedType,
      roomCount,
      bedCount,
      guestCount,
      description,
      images,
      rates,
      // The availability dates are no longer stored at the room level
      // availabilityDates,
      createdAt: initialData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSave(roomTypeData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] bg-fuchsia-950/90 text-white p-6 border-fuchsia-800/50">
        <h2 className="text-xl font-semibold mb-6">
          {isEditing ? "Edit Room Type" : "Add Room Type"}
        </h2>
        
        <div className="space-y-6">
          <RoomTypeSelector
            selectedType={selectedType}
            onTypeSelect={setSelectedType}
          />
          
          <RoomDetailsForm
            description={description}
            onDescriptionChange={setDescription}
          />
          
          <RoomCountSection 
            roomCount={roomCount}
            bedCount={bedCount}
            guestCount={guestCount}
            onRoomCountChange={setRoomCount}
            onBedCountChange={setBedCount}
            onGuestCountChange={setGuestCount}
          />
          
          <RoomImageSection
            images={images}
            onImagesChange={setImages}
          />
          
          <RatesSection
            rates={rates}
            onRatesChange={setRates}
            stayLengths={stayLengths}
          />
          
          {/* Removed the AvailabilitySection component since it's now in Step 3 */}
          
          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="ghost"
              onClick={onClose}
              className="border border-white/20 hover:bg-fuchsia-800/30"
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleSave}
              className="bg-fuchsia-600 hover:bg-fuchsia-700"
            >
              {isEditing ? "Update" : "Add"} Room
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
