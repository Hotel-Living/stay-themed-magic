
import React, { useState, useEffect } from "react";
import RoomsAndPricingStep from "./RoomsAndPricingStep";
import RoomTypeForm from "./StepTwo/RoomTypeForm";
import RoomTypeList from "./StepTwo/RoomTypeList";
import ValidationMessages from "./StepTwo/ValidationMessages";
import { RoomType } from "./StepTwo/types";

interface StepTwoProps {
  onValidationChange?: (isValid: boolean) => void;
}

export default function StepTwo({
  onValidationChange = () => {}
}: StepTwoProps) {
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [error, setError] = useState<string>("");
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
  const [isAvailableRoomsOpen, setIsAvailableRoomsOpen] = useState(false);
  const [showValidationError, setShowValidationError] = useState(false);

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
    if (newRoom.name.trim() && newRoom.basePrice > 0) {
      const newRoomType = {
        ...newRoom,
        id: Date.now().toString()
      };
      setRoomTypes([...roomTypes, newRoomType]);
      setIsAddRoomOpen(false);
    }
  };

  const handleRemoveRoomType = (id: string) => {
    setRoomTypes(roomTypes.filter(room => room.id !== id));
  };

  useEffect(() => {
    checkValidation();
  }, [roomTypes]);

  return (
    <div className="space-y-8">
      <RoomsAndPricingStep />
      
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4"></div>
        
        <RoomTypeForm 
          isOpen={isAddRoomOpen} 
          setIsOpen={setIsAddRoomOpen}
          onAddRoomType={handleAddRoomType}
        />
        
        <RoomTypeList
          roomTypes={roomTypes}
          isOpen={isAvailableRoomsOpen}
          setIsOpen={setIsAvailableRoomsOpen}
          onRemoveRoomType={handleRemoveRoomType}
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
