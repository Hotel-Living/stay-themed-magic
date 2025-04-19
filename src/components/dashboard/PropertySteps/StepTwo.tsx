
import React, { useState, useEffect } from "react";
import RoomsAndPricingStep from "./RoomsAndPricingStep";
import RoomTypeForm from "./StepTwo/RoomTypeForm";
import RoomTypeList from "./StepTwo/RoomTypeList";
import ValidationMessages from "./StepTwo/ValidationMessages";
import { RoomType } from "./StepTwo/types";

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

  // Load initial data from parent formData if available
  useEffect(() => {
    if (formData) {
      // Process room types
      if (formData.roomTypes && formData.roomTypes.length > 0) {
        console.log("Loading room types from session:", formData.roomTypes);
        setRoomTypes(formData.roomTypes);
      }

      // Check validation state
      checkValidation();
    }
  }, [formData]);

  const checkValidation = () => {
    const isValid = roomTypes.length > 0;
    
    if (!isValid) {
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
      const updatedRoomTypes = [...roomTypes, newRoomType];
      setRoomTypes(updatedRoomTypes);
      
      if (updateFormData) {
        console.log("Saving room types to session:", updatedRoomTypes);
        updateFormData('roomTypes', updatedRoomTypes);
      }
      
      setIsAddRoomOpen(false);
    }
  };

  const handleRemoveRoomType = (id: string) => {
    const updatedRoomTypes = roomTypes.filter(room => room.id !== id);
    setRoomTypes(updatedRoomTypes);
    
    if (updateFormData) {
      console.log("Updating room types after removal:", updatedRoomTypes);
      updateFormData('roomTypes', updatedRoomTypes);
    }
  };

  useEffect(() => {
    checkValidation();
  }, [roomTypes]);

  return (
    <div className="space-y-8">
      <RoomsAndPricingStep 
        formData={formData}
        updateFormData={updateFormData}
      />
      
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
