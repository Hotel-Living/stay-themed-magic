
import React, { useState, useEffect } from "react";
import { RoomType } from "./rooms/roomTypes/useRoomTypes";
import RoomTypeList from "./rooms/roomTypes/RoomTypeList";
import RoomTypeForm from "./StepTwo/RoomTypeForm";
import ValidationMessages from "./StepTwo/ValidationMessages";
import { usePropertyForm } from "@/hooks/usePropertyForm";
import { Button } from "@/components/ui/button";

interface ValidationMessageProps {
  message: string;
  type?: "error" | "success";
}

export default function StepTwo() {
  const { formData, setFieldValue } = usePropertyForm();

  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [error, setError] = useState<string>("");
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
  const [isAvailableRoomsOpen, setIsAvailableRoomsOpen] = useState(false);
  const [showValidationError, setShowValidationError] = useState(false);

  useEffect(() => {
    if (formData && formData.roomTypes && formData.roomTypes.length > 0) {
      setRoomTypes(formData.roomTypes);
    }
  }, [formData]);

  const checkValidation = () => {
    if (roomTypes.length === 0) {
      setError("Please add at least one room type");
      return false;
    }
    setError("");
    return true;
  };

  const handleAddRoomType = (newRoom: Omit<RoomType, "id">) => {
    if (newRoom.name && newRoom.baseRate > 0) {
      const newRoomType: RoomType = {
        ...newRoom,
        id: Date.now().toString(),
        rates: {},
        roomCount: 1,
        maxOccupancy: newRoom.maxOccupancy || 2,
        size: newRoom.size || 200,
        description: newRoom.description || "",
        images: []
      };

      const updatedRoomTypes = [...roomTypes, newRoomType];
      setRoomTypes(updatedRoomTypes);
      setFieldValue("roomTypes", updatedRoomTypes);
      setIsAddRoomOpen(false);
    }
  };

  const handleRemoveRoomType = (id: string) => {
    const updatedRoomTypes = roomTypes.filter((room) => room.id !== id);
    setRoomTypes(updatedRoomTypes);
    setFieldValue("roomTypes", updatedRoomTypes);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold text-white">ROOM TYPES</h2>

      {error && <ValidationMessages message={error} />}

      <RoomTypeList
        roomTypes={roomTypes}
        onRemoveRoomType={handleRemoveRoomType}
        isOpen={isAvailableRoomsOpen}
        setIsOpen={setIsAvailableRoomsOpen}
      />

      {isAddRoomOpen && (
        <RoomTypeForm
          onAddRoomType={handleAddRoomType}
          onCancel={() => setIsAddRoomOpen(false)}
        />
      )}

      {!isAddRoomOpen && (
        <Button
          variant="default"
          onClick={() => setIsAddRoomOpen(true)}
          className="w-full"
        >
          Add Room Type
        </Button>
      )}
    </div>
  );
}
