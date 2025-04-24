
import React from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

interface RoomDetailsFormProps {
  selectedRoomType: string;
  roomImages: File[];
  onAdd: () => void;
  isEditing: boolean;
}

export default function RoomDetailsForm({
  selectedRoomType,
  roomImages,
  onAdd,
  isEditing
}: RoomDetailsFormProps) {
  return (
    <DialogFooter className="mt-8">
      <Button 
        onClick={onAdd} 
        disabled={!selectedRoomType || roomImages.length === 0}
        className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-6 py-2 text-base font-medium"
      >
        {isEditing ? "Update Room Type" : "Add Room Type"}
      </Button>
      {roomImages.length === 0 && (
        <p className="text-red-400 text-sm mt-2">Please upload at least one room image</p>
      )}
    </DialogFooter>
  );
}
