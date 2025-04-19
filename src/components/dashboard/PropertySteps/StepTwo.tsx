
import React, { useState, useEffect } from "react";
import { RoomType } from "./rooms/roomTypes/useRoomTypes";
import RoomTypeList from "./rooms/roomTypes/RoomTypeList";
import RoomTypeForm from "./StepTwo/RoomTypeForm";
import ValidationMessages from "./StepTwo/ValidationMessages";

interface StepTwoProps {
  onValidationChange?: (isValid: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
}

export default function StepTwo({
  onValidationChange = () => {},
  formData = {},
  updateFormData = () => {}
}: StepTwoProps) {
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
      onValidationChange(false);
      return false;
    }
    setError("");
    onValidationChange(true);
    return true;
  };

  const handleAddRoomType = (newRoom: Omit<RoomType, 'id'>) => {
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
      if (updateFormData) {
        updateFormData('roomTypes', updatedRoomTypes);
      }
      setIsAddRoomOpen(false);
    }
  };

  const handleRemoveRoomType = (id: string) => {
    const updatedRoomTypes = roomTypes.filter(room => room.id !== id);
    setRoomTypes(updatedRoomTypes);
    if (updateFormData) {
      updateFormData('roomTypes', updatedRoomTypes);
    }
  };

  useEffect(() => {
    checkValidation();
  }, [roomTypes]);

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold mb-4">Room Types</h2>
      
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <button 
            onClick={() => setIsAddRoomOpen(!isAddRoomOpen)}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            {isAddRoomOpen ? 'Cancel' : 'Add Room Type'}
          </button>
        </div>
        
        {isAddRoomOpen && (
          <RoomTypeForm 
            onCancel={() => setIsAddRoomOpen(false)}
            onSave={handleAddRoomType}
          />
        )}
        
        <RoomTypeList
          roomTypes={roomTypes}
          selectedStayLengths={[]}
          selectedUnit="sq. ft."
          onDelete={handleRemoveRoomType}
          onEdit={() => {}}
        />
        
        <ValidationMessages
          error={error}
          showValidationError={showValidationError}
          roomTypesCount={roomTypes.length}
        />
      </div>
    </div>
  );
}
