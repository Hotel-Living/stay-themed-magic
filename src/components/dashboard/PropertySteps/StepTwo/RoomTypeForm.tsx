import React, { useEffect, useState } from "react";
import RoomTypeForm from "./StepTwo/RoomTypeForm";
import RoomTypeList from "./StepTwo/RoomTypeList";
import ValidationMessages from "./StepTwo/ValidationMessages";
import { RoomType } from "./StepTwo/types";

interface StepTwoProps {
  onValidationChange?: (isValid: boolean) => void;
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

export default function StepTwo({
  onValidationChange = () => {},
  formData,
  updateFormData,
}: StepTwoProps) {
  const [error, setError] = useState<string>("");
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
  const [showValidationError, setShowValidationError] = useState(false);

  const roomTypes: RoomType[] = formData.roomTypes || [];

  const checkValidation = () => {
    if (roomTypes.length === 0) {
      setError("Please add at least one room type");
      onValidationChange(false);
      return false;
    }
    setError("");
    onValidationChange(true);
    return true;
  };

  useEffect(() => {
    checkValidation();
  }, [roomTypes]);

  const handleAddRoomType = (newRoom: Omit<RoomType, "id">) => {
    if (newRoom.name.trim() && newRoom.basePrice > 0) {
      const newRoomType = {
        ...newRoom,
        id: Date.now().toString(),
      };
      const updatedRoomTypes = [...roomTypes, newRoomType];
      updateFormData("roomTypes", updatedRoomTypes);
      setIsAddRoomOpen(false);
    }
  };

  const handleRemoveRoomType = (id: string) => {
    const updatedRoomTypes = roomTypes.filter((room) => room.id !== id);
    updateFormData("roomTypes", updatedRoomTypes);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Room Types</h2>

      {error && <ValidationMessages message={error} />}

      <RoomTypeList
        roomTypes={roomTypes}
        onRemove={handleRemoveRoomType}
        onEdit={(updatedList) => updateFormData("roomTypes", updatedList)}
      />

      <button onClick={() => setIsAddRoomOpen(true)} className="btn btn-primary mt-4">
        Add Room Type
      </button>

      {isAddRoomOpen && (
        <RoomTypeForm
          onCancel={() => setIsAddRoomOpen(false)}
          onSave={handleAddRoomType}
        />
      )}
    </div>
  );
}