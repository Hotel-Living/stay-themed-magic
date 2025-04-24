
import React from "react";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { PREDEFINED_ROOM_TYPES } from "../constants";
import RoomTypeSelector from "./RoomTypeSelector";
import RoomDetailsForm from "./RoomDetailsForm";
import RoomImageSection from "./RoomImageSection";
import RatesSection from "./sections/RatesSection";
import AvailabilityDateSection from "./sections/AvailabilitySection";
import { useRoomTypeForm } from "./hooks/useRoomTypeForm";

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
  const {
    formState,
    setFormState,
    handleImageUpload,
    removeImage,
    resetForm
  } = useRoomTypeForm({ isOpen, editingRoomType, availableStayLengths });

  const handleAddRoomType = () => {
    if (formState.selectedRoomType && formState.roomImagePreviews.length > 0) {
      const roomType = PREDEFINED_ROOM_TYPES.find(rt => rt.id === formState.selectedRoomType);
      onAdd({
        id: formState.isEditing ? editingRoomType.id : Date.now().toString(),
        name: roomType?.name || "",
        maxOccupancy: 1,
        size: 200,
        description: formState.description,
        baseRate: 0,
        roomCount: formState.roomCount,
        rates: formState.rates,
        images: formState.roomImagePreviews,
        availabilityDates: formState.availabilityDates
      });
      resetForm();
    }
  };

  const dialogTitle = formState.isEditing ? "Edit Room Type" : "Add New Room Type";

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="bg-[#430453] text-white w-[90%] max-w-4xl h-full overflow-y-auto" side="bottom">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-white mb-6">{dialogTitle}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-8">
          <RoomTypeSelector 
            selectedRoomType={formState.selectedRoomType}
            onRoomTypeChange={(type) => setFormState(prev => ({ ...prev, selectedRoomType: type }))}
            isEditing={formState.isEditing}
          />

          {formState.selectedRoomType && (
            <>
              <RoomDetailsForm 
                selectedRoomType={formState.selectedRoomType}
                roomImages={formState.roomImages}
                onAdd={handleAddRoomType}
              />

              <RoomImageSection
                roomImages={formState.roomImages}
                roomImagePreviews={formState.roomImagePreviews}
                onImageUpload={handleImageUpload}
                onRemoveImage={removeImage}
              />
              
              <RatesSection
                stayLengths={formState.stayLengths}
                rates={formState.rates}
                onRateChange={(duration, value) => 
                  setFormState(prev => ({
                    ...prev,
                    rates: {
                      ...prev.rates,
                      [duration]: parseInt(value) || 0
                    }
                  }))
                }
              />
              
              <AvailabilityDateSection 
                preferredWeekday={preferredWeekday}
                onAvailabilityChange={(dates) => setFormState(prev => ({ ...prev, availabilityDates: dates }))}
                selectedDates={formState.availabilityDates}
              />
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
