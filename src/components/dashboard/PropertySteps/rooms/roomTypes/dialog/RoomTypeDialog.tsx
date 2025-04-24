
import React from "react";
import { DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { PREDEFINED_ROOM_TYPES } from "../constants";
import RoomTypeSelector from "./RoomTypeSelector";
import RoomImageSection from "./RoomImageSection";
import RatesSection from "./sections/RatesSection";
import AvailabilitySection from "./sections/AvailabilitySection";
import RoomCountSection from "./sections/RoomCountSection";
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
    handleRateChange,
    handleAvailabilityChange,
    handleAddRoomType,
    dialogTitle
  } = useRoomTypeForm({ 
    isOpen, 
    editingRoomType, 
    availableStayLengths,
    onAdd,
    preferredWeekday
  });

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
              <div className="space-y-4">
                <label className="block text-white">Description</label>
                <textarea 
                  value={formState.description}
                  onChange={(e) => setFormState(prev => ({ ...prev, description: e.target.value}))}
                  className="w-full bg-[#850390] text-white border-white rounded p-2"
                  rows={3}
                />
              </div>

              <RoomImageSection
                roomImages={formState.roomImages}
                roomImagePreviews={formState.roomImagePreviews}
                onImageUpload={handleImageUpload}
                onRemoveImage={removeImage}
              />
              
              <RatesSection
                stayLengths={formState.stayLengths}
                rates={formState.rates}
                onRateChange={handleRateChange}
              />
              
              <RoomCountSection 
                roomCount={formState.roomCount}
                onChange={(count) => setFormState(prev => ({ ...prev, roomCount: count }))}
              />
              
              <AvailabilitySection 
                preferredWeekday={preferredWeekday}
                onAvailabilityChange={handleAvailabilityChange}
                selectedDates={formState.availabilityDates}
              />
            </>
          )}
        </div>
        
        <DialogFooter className="mt-8">
          <Button 
            onClick={handleAddRoomType} 
            disabled={!formState.selectedRoomType || formState.roomImagePreviews.length === 0}
            className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-6 py-2 text-base font-medium"
          >
            {formState.isEditing ? "Update Room Type" : "Add Room Type"}
          </Button>
          {formState.roomImagePreviews.length === 0 && (
            <p className="text-red-400 text-sm mt-2">Please upload at least one room image</p>
          )}
        </DialogFooter>
      </SheetContent>
    </Sheet>
  );
}
