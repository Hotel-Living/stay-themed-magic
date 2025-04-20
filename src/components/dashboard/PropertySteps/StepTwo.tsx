
import React, { useState, useEffect } from "react";
import { RoomType } from "./rooms/roomTypes/useRoomTypes";
import RoomTypeList from "./StepTwo/RoomTypeList";
import RoomTypeForm from "./StepTwo/RoomTypeForm";
import ValidationMessages from "./StepTwo/ValidationMessages";
import { usePropertyForm } from "@/hooks/usePropertyForm";
import { Button } from "@/components/ui/button";

export default function StepTwo() {
  const { formData, setFieldValue } = usePropertyForm();

  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [error, setError] = useState<string>("");
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);

  useEffect(() => {
    if (formData?.roomTypes && formData.roomTypes.length > 0) {
      setRoomTypes(formData.roomTypes);
    }
  }, [formData]);

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
    } else {
      setError("Room type must have a name and base rate greater than 0");
    }
  };

  const handleRemoveRoomType = (id: string) => {
    const updatedRoomTypes = roomTypes.filter((room) => room.id !== id);
    setRoomTypes(updatedRoomTypes);
    setFieldValue("roomTypes", updatedRoomTypes);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white">ROOM TYPES</h2>

      {error && <ValidationMessages message={error} />}

      <RoomTypeList
        roomTypes={roomTypes}
        onRemoveRoomType={handleRemoveRoomType}
      />

      {isAddRoomOpen ? (
        <RoomTypeForm
          onAddRoomType={handleAddRoomType}
          onCancel={() => setIsAddRoomOpen(false)}
        />
      ) : (
        <Button onClick={() => setIsAddRoomOpen(true)}>Add Room Type</Button>
      )}
    </div>
  );
}

