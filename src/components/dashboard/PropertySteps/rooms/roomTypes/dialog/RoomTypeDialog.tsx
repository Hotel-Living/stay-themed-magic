
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
}

export default function RoomTypeDialog({
  isOpen,
  onClose,
  onSave,
  initialData = {},
  stayLengths = [],
}: RoomTypeDialogProps) {
  const { toast } = useToast();
  const [selectedRoomType, setSelectedRoomType] = useState<string>(initialData.type || "");
  const [roomCount, setRoomCount] = useState<number>(initialData.roomCount || 1);
  const [description, setDescription] = useState<string>(initialData.description || "");
  const [images, setImages] = useState<string[]>(initialData.images || []);
  const [rates, setRates] = useState<Record<number, number>>(initialData.rates || {});
  
  // No longer need availability dates
  
  const isEditing = !!initialData.id;

  const handleSave = () => {
    if (!selectedRoomType) {
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
      type: selectedRoomType,
      roomCount,
      description,
      images,
      rates,
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
            selectedRoomType={selectedRoomType}
            onRoomTypeChange={setSelectedRoomType}
          />
          
          <div className="space-y-3">
            <label className="text-white text-sm">Description</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#850390] text-white border-white rounded p-2 text-sm h-20"
              rows={2}
              placeholder="Describe this room type"
            />
          </div>
          
          <RoomCountSection 
            roomCount={roomCount}
            onChange={setRoomCount}
          />
          
          <RoomImageSection
            roomImages={[]}
            roomImagePreviews={images}
            onImageUpload={(e) => {
              // Handle image upload
              console.log("Image upload handled externally");
            }}
            onRemoveImage={(index) => {
              setImages(prev => prev.filter((_, i) => i !== index));
            }}
          />
          
          <RatesSection
            stayLengths={stayLengths}
            rates={rates}
            onRateChange={(duration, value) => {
              setRates(prev => ({
                ...prev,
                [duration]: Number(value) || 0
              }));
            }}
          />
          
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
