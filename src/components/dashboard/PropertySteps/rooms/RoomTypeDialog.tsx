
import React, { useEffect } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import RoomInfoForm from "./roomTypes/RoomInfoForm";
import ImageUploadSection from "./roomTypes/ImageUploadSection";
import RatesSection from "./roomTypes/RatesSection";
import { useRoomTypeForm } from "./hooks/useRoomTypeForm";

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
  const {
    formState,
    stayLengths,
    validateRoomType,
    resetForm,
    handleRateChange,
    handleImageUpload,
    removeImage,
    setFormState
  } = useRoomTypeForm(isOpen, availableStayLengths);

  // Listen for custom dialog toggle event
  useEffect(() => {
    const handleToggleDialog = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail && typeof customEvent.detail.open === 'boolean') {
        onClose();
      }
    };

    window.addEventListener('toggle-room-type-dialog', handleToggleDialog);
    return () => {
      window.removeEventListener('toggle-room-type-dialog', handleToggleDialog);
    };
  }, [onClose]);

  const handleAddRoomType = () => {
    if (validateRoomType()) {
      onAdd({
        id: Date.now().toString(),
        name: formState.newRoomType,
        maxOccupancy: formState.maxOccupancy,
        size: formState.roomSize,
        description: formState.description,
        baseRate: 0,
        rates: formState.rates,
        images: formState.roomImagePreviews
      });
      resetForm();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#430453] text-white max-w-[80%] w-[80%]">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">Add New Room Type</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4 overflow-y-auto max-h-[70vh]">
          <RoomInfoForm
            newRoomType={formState.newRoomType}
            maxOccupancy={formState.maxOccupancy}
            roomSize={formState.roomSize}
            description={formState.description}
            onRoomTypeChange={(value) => setFormState(prev => ({ ...prev, newRoomType: value }))}
            onMaxOccupancyChange={(value) => setFormState(prev => ({ ...prev, maxOccupancy: value }))}
            onRoomSizeChange={(value) => setFormState(prev => ({ ...prev, roomSize: value }))}
            onDescriptionChange={(value) => setFormState(prev => ({ ...prev, description: value }))}
            errors={formState.formErrors}
          />
          
          <ImageUploadSection
            roomImages={formState.roomImages}
            roomImagePreviews={formState.roomImagePreviews}
            onImageUpload={handleImageUpload}
            onRemoveImage={removeImage}
            error={formState.formErrors.images}
          />
          
          <RatesSection
            stayLengths={stayLengths}
            rates={formState.rates}
            onRateChange={handleRateChange}
            error={formState.formErrors.rates}
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
