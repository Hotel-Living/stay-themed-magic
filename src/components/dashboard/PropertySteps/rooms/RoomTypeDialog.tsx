
import React from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import RoomTypeSelector from "./roomTypes/dialog/RoomTypeSelector";
import RoomImageSection from "./roomTypes/dialog/RoomImageSection";
import RatesSection from "./roomTypes/dialog/sections/RatesSection";
import AvailabilitySection from "./roomTypes/dialog/sections/AvailabilitySection";
import RoomCountSection from "./roomTypes/dialog/sections/RoomCountSection";
import RoomDetailsForm from "./roomTypes/dialog/RoomDetailsForm";
import { useRoomTypeForm } from "./roomTypes/dialog/hooks/useRoomTypeForm";

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
  React.useEffect(() => {
    if (editingRoomType) {
      console.log("RoomTypeDialog - Editing room type:", editingRoomType);
    }
    if (availableStayLengths.length > 0) {
      console.log("RoomTypeDialog - Available stay lengths:", availableStayLengths);
    }
    console.log("RoomTypeDialog - Preferred weekday:", preferredWeekday);
  }, [editingRoomType, availableStayLengths, preferredWeekday, isOpen]);

  const {
    formState,
    setters,
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
      <SheetContent 
        className="bg-[#430453] text-white fixed inset-y-[15vh] max-h-[70vh] w-[90%] max-w-3xl mx-auto overflow-y-auto rounded-lg" 
        side="bottom"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white mb-4">
            {dialogTitle} {formState.isEditing ? ` - ${formState.selectedRoomType}` : ''}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <RoomTypeSelector 
            selectedRoomType={formState.selectedRoomType}
            onRoomTypeChange={setters.setSelectedRoomType}
            isEditing={formState.isEditing}
          />

          {formState.selectedRoomType && (
            <>
              <div className="space-y-3">
                <label className="block text-white text-sm">Description</label>
                <textarea 
                  value={formState.description}
                  onChange={(e) => setters.setDescription(e.target.value)}
                  className="w-full bg-[#850390] text-white border-white rounded p-2 text-sm h-20"
                  rows={2}
                  placeholder="Describe this room type"
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
                onChange={setters.setRoomCount}
              />
              
              <AvailabilitySection />
            </>
          )}
        </div>
        
        <RoomDetailsForm
          selectedRoomType={formState.selectedRoomType}
          roomImages={formState.roomImages}
          onAdd={handleAddRoomType}
          isEditing={formState.isEditing}
        />
      </SheetContent>
    </Sheet>
  );
}
